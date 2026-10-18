/**
 * 採用サイトのお問い合わせ用 Google フォームを生成する（一度だけ実行する）。
 *
 * 用途ごとに2つ作る。応募と会社見学では聞くべきことが違うため。
 *   1. 採用応募フォーム（新卒・キャリア共通）
 *   2. 会社見学フォーム
 *
 * 回答先は同じスプレッドシートにまとめる。フォームごとにシート（タブ）が
 * 分かれるので、採用担当が開くファイルは1つで済む。
 *
 * ■ 添付ファイルは扱わない
 *   Googleフォームでファイル添付を使うと、回答者にGoogleアカウントでの
 *   ログインが必須になる。採用フォームでは応募の離脱につながるため、
 *   書類は受付後に個別のメールでやり取りする運用とする。
 *
 * ■ 実行後に管理画面で行う設定
 *   各フォームの 回答タブ → 右上メニュー → 「新しい回答についてメール通知を受け取る」
 */

/** 回答を書き込むスプレッドシート（exceet.analytics@gmail.com 所有） */
var DEST_SHEET_ID = '1Sq6ZnZac9YDa1DSUI-crt1F_L8O0HnCUGR5aE1sCusg';

var JOB_OPTIONS = [
  'Webコーダー・HTMLコーダー',
  'ルート営業',
  '印刷製本機での製造・補助スタッフ',
  '印刷機オペレーター',
  '企画営業職（推し活グッズ事業）',
  '企画営業',
  '営業事務',
  'その他',
];

var RECRUITMENT_TYPES = ['新卒採用', 'キャリア採用'];

var PRIVACY_URL = 'https://recruitingsitenext.vercel.app/privacy-policy';

function createAllForms() {
  var result = {
    応募フォーム: createApplicationForm(),
    会社見学フォーム: createCompanyVisitForm(),
  };
  console.log(JSON.stringify(result, null, 2));
  return result;
}

/** 新卒・キャリアの応募／カジュアル面談を受け付ける */
function createApplicationForm() {
  var form = FormApp.create('株式会社エクシート 採用エントリー');

  form.setDescription(
    '株式会社エクシートの採用にご関心をお持ちいただき、ありがとうございます。\n' +
    '以下をご記入のうえ送信してください。3営業日以内に担当者よりご連絡いたします。\n\n' +
    '※ 履歴書・職務経歴書は、こちらからのご連絡メールに返信する形でお送りください。'
  );

  setupCommon(form);

  form.addMultipleChoiceItem()
    .setTitle('お問い合わせ種別')
    .setChoiceValues(['選考への応募', 'カジュアル面談'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('採用区分')
    .setChoiceValues(RECRUITMENT_TYPES)
    .setRequired(true);

  form.addCheckboxItem()
    .setTitle('応募職種')
    .setHelpText('複数選択できます')
    .setChoiceValues(JOB_OPTIONS);

  addContactItems(form);

  form.addTextItem()
    .setTitle('ポートフォリオURL')
    .setHelpText('Web上で公開されている場合はURLをご記入ください（任意）');

  form.addParagraphTextItem()
    .setTitle('ご質問・ご要望など')
    .setHelpText('任意');

  addPrivacyConsent(form);

  form.setConfirmationMessage(
    'ご応募ありがとうございます。\n' +
    '内容を確認のうえ、3営業日以内に担当者よりご連絡いたします。\n\n' +
    '履歴書・職務経歴書をお持ちの方は、担当者からのご連絡メールに返信する形でお送りください。'
  );

  form.setDestination(FormApp.DestinationType.SPREADSHEET, DEST_SHEET_ID);
  return summarize(form);
}

/** 会社見学の申し込みを受け付ける。選考用の設問は置かない */
function createCompanyVisitForm() {
  var form = FormApp.create('株式会社エクシート 会社見学のお申し込み');

  form.setDescription(
    '株式会社エクシートの会社見学にお申し込みいただき、ありがとうございます。\n' +
    '以下をご記入のうえ送信してください。3営業日以内に担当者より日程のご連絡をいたします。'
  );

  setupCommon(form);

  form.addMultipleChoiceItem()
    .setTitle('採用区分')
    .setHelpText('見学内容のご案内に使わせていただきます')
    .setChoiceValues(RECRUITMENT_TYPES)
    .setRequired(true);

  form.addCheckboxItem()
    .setTitle('興味のある職種')
    .setHelpText('複数選択できます（任意）')
    .setChoiceValues(JOB_OPTIONS);

  addContactItems(form);

  form.addParagraphTextItem()
    .setTitle('ご希望の日程・ご質問など')
    .setHelpText('ご都合のよい時期や曜日があればお書きください（任意）');

  addPrivacyConsent(form);

  form.setConfirmationMessage(
    'お申し込みありがとうございます。\n' +
    '内容を確認のうえ、3営業日以内に担当者より日程のご連絡をいたします。'
  );

  form.setDestination(FormApp.DestinationType.SPREADSHEET, DEST_SHEET_ID);
  return summarize(form);
}

function setupCommon(form) {
  // 回答者が自分で入力する方式。ログインを求めずにメールアドレスを集められ、
  // 「回答のコピーを回答者に送信」も使える。
  try {
    form.setEmailCollectionType(FormApp.EmailCollectionType.RESPONDER_INPUT);
  } catch (err) {
    console.warn(
      'メールアドレス収集の自動設定に失敗しました。管理画面の ' +
      '設定 → 回答 → メールアドレスを収集する → 「回答者による入力」 を設定してください: ' + err
    );
  }
  form.setLimitOneResponsePerUser(false);
  form.setProgressBar(true);
}

function addContactItems(form) {
  form.addTextItem().setTitle('お名前').setRequired(true);
  form.addTextItem().setTitle('フリガナ').setRequired(true);
  form.addTextItem().setTitle('電話番号').setRequired(true);
}

function addPrivacyConsent(form) {
  form.addCheckboxItem()
    .setTitle('プライバシーポリシーへの同意')
    .setHelpText(PRIVACY_URL)
    .setChoiceValues(['プライバシーポリシーに同意します'])
    .setRequired(true);
}

function summarize(form) {
  return {
    タイトル: form.getTitle(),
    回答用URL: form.getPublishedUrl(),
    編集用URL: form.getEditUrl(),
    フォームID: form.getId(),
  };
}

/** createAllForms() が作成したフォーム */
var APPLICATION_FORM_ID = '1QmdLHpBepvAQOu0oVdcqeAfiPa7aoQZJ6R1631C2Wc0';
var COMPANY_VISIT_FORM_ID = '1OKiNIv23_2oBSDX827ONVhmvt5hNzpzZHAIDJa3NPp4';

/**
 * 作成済みのフォームで電話番号を必須にする。
 *
 * フォームを作り直すとURLと設問IDが変わり、サイト側の差し替えが
 * 必要になるため、既存フォームを書き換える。
 */
function makePhoneRequired() {
  [APPLICATION_FORM_ID, COMPANY_VISIT_FORM_ID].forEach(function (id) {
    var form = FormApp.openById(id);
    var items = form.getItems(FormApp.ItemType.TEXT);
    var updated = false;
    items.forEach(function (item) {
      if (item.getTitle() === '電話番号') {
        item.asTextItem().setRequired(true);
        updated = true;
      }
    });
    console.log(form.getTitle() + ': ' + (updated ? '電話番号を必須にしました' : '電話番号の設問が見つかりません'));
  });
}
