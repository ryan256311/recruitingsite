/**
 * 採用サイトのお問い合わせを受け取り、スプレッドシートに記録してメールを送る。
 *
 * ■ このファイルの役割
 *   応募データの「記録の正本」はスプレッドシートの1行。
 *   メール送信はあくまで通知であり、失敗しても記録は残す。
 *   （メール送信サービスが将来止まっても、応募データは失われない）
 *
 * ■ 設置手順は docs/contact-form-setup.md を参照
 *
 * ■ 設定値（スクリプトプロパティに登録する。コードに直接書かない）
 *   WEBHOOK_SECRET … サイト側と共有する合言葉。これが一致しないリクエストは拒否する
 *   ADMIN_EMAIL    … 採用担当への通知先
 *   SHEET_ID       … 記録先スプレッドシートのID。スプレッドシートの
 *                     「拡張機能 → Apps Script」から作った場合は省略できる
 *   FROM_ALIAS     … （任意）送信元に使うエイリアス。Gmailで確認済みのアドレスのみ有効
 *   UPLOAD_FOLDER_ID … 応募書類の保存先フォルダID。未設定なら自動で作成して記録する
 */

var SHEET_NAME = 'お問い合わせ';

/** 応募書類の保存先フォルダ名（初回に自動作成する） */
var UPLOAD_FOLDER_NAME = '採用サイト 応募書類';

var HEADERS = [
  '受信日時',
  '対応状況',
  'お問い合わせ種別',
  '採用区分',
  '応募職種',
  'お名前',
  'フリガナ',
  'メールアドレス',
  '電話番号',
  'ポートフォリオURL',
  'その他',
  '履歴書',
  '職務経歴書',
  'ポートフォリオ（ファイル）',
];

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ ok: false, error: 'リクエストボディがありません' });
    }

    var payload = JSON.parse(e.postData.contents);

    if (!isAuthorized(payload.secret)) {
      // 合言葉が合わない＝サイト以外からの呼び出し。詳細は返さない
      return jsonResponse({ ok: false, error: 'unauthorized' });
    }

    // 応募書類のアップロードは記録とは別の用途で呼ばれる
    if (payload.action === 'upload') {
      return jsonResponse(saveUpload(payload.file || {}));
    }

    var data = payload.data || {};

    // 記録が最優先。ここが失敗したら応募を受け付けたことにしない
    var rowNumber = appendRow(data);

    // メールは通知にすぎないので、失敗しても応募は成立させる
    var mailError = null;
    try {
      notifyAdmin(data, rowNumber);
      if (data.email) {
        sendConfirmation(data);
      }
    } catch (err) {
      mailError = String(err);
      console.error('メール送信に失敗しました: ' + mailError);
    }

    return jsonResponse({ ok: true, row: rowNumber, mailError: mailError });
  } catch (err) {
    console.error('受信処理に失敗しました: ' + err);
    return jsonResponse({ ok: false, error: String(err) });
  }
}

/** 設置確認用。ブラウザでWebアプリのURLを開くと表示される */
function doGet() {
  return jsonResponse({ ok: true, message: '採用サイトのお問い合わせ受付が動作しています' });
}

function isAuthorized(given) {
  var expected = PropertiesService.getScriptProperties().getProperty('WEBHOOK_SECRET');
  if (!expected) {
    throw new Error('スクリプトプロパティ WEBHOOK_SECRET が未設定です');
  }
  return typeof given === 'string' && given === expected;
}

/**
 * 応募書類をドライブに保存する。
 *
 * 保存先はこのスクリプトを所有するアカウントのマイドライブ内のフォルダで、
 * 既定では本人しか開けない。採用担当に見せるときはフォルダごと共有する。
 * （公開リンクにはしない。履歴書がURLを知る全員に見えてしまうため）
 */
function saveUpload(file) {
  if (!file.data || !file.name || !file.mimeType) {
    return { ok: false, error: 'ファイルの情報が不足しています' };
  }

  var folder = getUploadFolder();
  var blob = Utilities.newBlob(Utilities.base64Decode(file.data), file.mimeType, file.name);
  var created = folder.createFile(blob);

  return { ok: true, fileId: created.getId() };
}

function getUploadFolder() {
  var props = PropertiesService.getScriptProperties();
  var id = props.getProperty('UPLOAD_FOLDER_ID');

  if (id) {
    try {
      return DriveApp.getFolderById(id);
    } catch (err) {
      // フォルダが消された場合は作り直す。応募を受け付けられなくなる方が困る
      console.warn('保存先フォルダが見つからないため作り直します: ' + err);
    }
  }

  var folder = DriveApp.createFolder(UPLOAD_FOLDER_NAME);
  props.setProperty('UPLOAD_FOLDER_ID', folder.getId());
  return folder;
}

/**
 * 記録先のスプレッドシートを得る。
 *
 * スプレッドシートの「拡張機能 → Apps Script」から作ったスクリプトは
 * getActiveSpreadsheet() で開けるが、単独で作ったスクリプトでは取れない。
 * どちらの作り方でも動くよう、SHEET_ID があればそちらを優先する。
 */
function getBook() {
  var id = PropertiesService.getScriptProperties().getProperty('SHEET_ID');
  if (id) return SpreadsheetApp.openById(id);

  var active = SpreadsheetApp.getActiveSpreadsheet();
  if (!active) {
    throw new Error('記録先が分かりません。スクリプトプロパティ SHEET_ID を設定してください');
  }
  return active;
}

function getSheet() {
  var book = getBook();
  var sheet = book.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = book.insertSheet(SHEET_NAME);
  }

  // 空のシートなら見出し行を作る。毎回作り直すと担当者の書式変更を壊すので初回だけ
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    var header = sheet.getRange(1, 1, 1, HEADERS.length);
    header.setFontWeight('bold');
    header.setBackground('#f1f3f4');
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function appendRow(data) {
  var sheet = getSheet();

  sheet.appendRow([
    // Dateをそのまま渡すと、スクリプトとスプレッドシートのタイムゾーン設定次第で
    // 実際より何時間もずれた時刻が記録される（実機で7時間ずれるのを確認した）。
    // 応募の受信時刻がずれるのは致命的なので、日本時間の文字列として固定する。
    Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyy/MM/dd HH:mm:ss'),
    '未対応',
    data.inquiryType || '',
    data.recruitmentType || '',
    (data.jobs || []).join('\n'),
    data.name || '',
    data.furigana || '',
    data.email || '',
    data.phone || '',
    data.portfolioUrl || '',
    data.message || '',
    fileCell(data.resumeName, data.resumeUrl),
    fileCell(data.careerHistoryName, data.careerHistoryUrl),
    fileCell(data.portfolioFileName, data.portfolioFileUrl),
  ]);

  return sheet.getLastRow();
}

/**
 * 添付ファイルのセルを作る。
 * ファイル名のリンクにすると、セルが長いURLで埋まらずに済む。
 */
function fileCell(name, url) {
  if (!url) return '';
  var label = name || 'ファイル';
  return '=HYPERLINK("' + String(url).replace(/"/g, '') + '","' + String(label).replace(/"/g, '') + '")';
}

function notifyAdmin(data, rowNumber) {
  var admin = PropertiesService.getScriptProperties().getProperty('ADMIN_EMAIL');
  if (!admin) {
    throw new Error('スクリプトプロパティ ADMIN_EMAIL が未設定です');
  }

  var sheetUrl = getBook().getUrl();
  var lines = [
    '採用サイトのお問い合わせフォームから応募がありました。',
    '',
    'お問い合わせ種別: ' + (data.inquiryType || ''),
    '採用区分: ' + (data.recruitmentType || ''),
    '応募職種: ' + ((data.jobs || []).join(' / ') || '未選択'),
    'お名前: ' + (data.name || '') + '（' + (data.furigana || '') + '）',
    'メールアドレス: ' + (data.email || ''),
    '電話番号: ' + (data.phone || '未入力'),
    '',
    'その他:',
    (data.message || '未入力'),
    '',
    '添付ファイル:',
    fileLine('履歴書', data.resumeName, data.resumeUrl),
    fileLine('職務経歴書', data.careerHistoryName, data.careerHistoryUrl),
    fileLine('ポートフォリオ', data.portfolioFileName, data.portfolioFileUrl),
    data.portfolioUrl ? 'ポートフォリオURL: ' + data.portfolioUrl : '',
    '',
    '────────────────',
    'スプレッドシート（' + rowNumber + '行目）:',
    sheetUrl,
  ];

  send({
    to: admin,
    replyTo: data.email || undefined,
    subject: '【採用サイト】' + (data.inquiryType || 'お問い合わせ') + ' - ' + (data.name || '') + '様',
    body: lines.filter(function (l) { return l !== ''; }).join('\n'),
  });
}

function fileLine(label, name, url) {
  if (!url) return label + ': なし';
  return label + ': ' + (name || '') + ' ' + url;
}

function sendConfirmation(data) {
  var body = [
    (data.name || '') + ' 様',
    '',
    'この度は株式会社エクシートの採用サイトよりお問い合わせいただき、誠にありがとうございます。',
    '以下の内容でお問い合わせを受け付けました。',
    '内容を確認の上、3営業日以内に担当者よりご連絡いたします。',
    '',
    '────────────────',
    'お問い合わせ種別: ' + (data.inquiryType || ''),
    '採用区分: ' + (data.recruitmentType || ''),
    '応募職種: ' + ((data.jobs || []).join(' / ') || '未選択'),
    'お名前: ' + (data.name || ''),
    'フリガナ: ' + (data.furigana || ''),
    'メールアドレス: ' + (data.email || ''),
    '電話番号: ' + (data.phone || '未入力'),
    '────────────────',
    '',
    'ご不明な点がございましたら、下記までお問い合わせください。',
    '',
    '株式会社エクシート 採用担当',
    'TEL: 0776-97-8466',
    'Email: recruit@exceet.co.jp',
    '',
    '※このメールは自動送信されています。',
    '※心当たりのない場合は、お手数ですが本メールを破棄してください。',
  ].join('\n');

  send({
    to: data.email,
    subject: '【株式会社エクシート】お問い合わせを受け付けました',
    body: body,
  });
}

/**
 * メールを送る。
 *
 * FROM_ALIAS が設定されていて、かつGmailで確認済みのエイリアスであれば
 * その送信元を使う（例: recruit@exceet.co.jp）。
 * 未設定・未確認なら、このスクリプトを所有するGoogleアカウントのアドレスで送る。
 */
function send(options) {
  var alias = PropertiesService.getScriptProperties().getProperty('FROM_ALIAS');
  var mail = {
    to: options.to,
    subject: options.subject,
    body: options.body,
    name: '株式会社エクシート 採用担当',
  };

  if (options.replyTo) {
    mail.replyTo = options.replyTo;
  }

  if (alias && GmailApp.getAliases().indexOf(alias) !== -1) {
    mail.from = alias;
  }

  GmailApp.sendEmail(mail.to, mail.subject, mail.body, mail);
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
