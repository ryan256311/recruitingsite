/**
 * 採用サイトのお問い合わせ用 Google フォームの生成と、CTA用の事前入力URLの取得。
 *
 * createRecruitForm() は一度だけ実行する（実行済み）。
 * getPrefilledUrls() は、サイトのCTAに貼るURLを作り直したいときに実行する。
 *
 * ■ 添付ファイルは扱わない
 *   Googleフォームでファイル添付を使うと、回答者にGoogleアカウントでの
 *   ログインが必須になる。採用フォームでは応募の離脱につながるため、
 *   書類は受付後に個別のメールでやり取りする運用とする。
 */

/** 回答を書き込むスプレッドシート（既存のものに回答用シートが追加される） */
var FORM_DEST_SHEET_ID = '1VpEdkbBI4SOugwcpBjBSy6W2hQ3PO28okELNsuMxs3o';

/** createRecruitForm() が作成したフォーム */
var FORM_ID = '1zESHNwXqQ5lS1QjiveCsqBB3Weqqk_tzKKrQ223axB4';

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

function createRecruitForm() {
  var form = FormApp.create('株式会社エクシート 採用お問い合わせ');

  form.setDescription(
    '株式会社エクシートの採用にご関心をお持ちいただき、ありがとうございます。\n' +
    '以下をご記入のうえ送信してください。3営業日以内に担当者よりご連絡いたします。\n\n' +
    '※ 履歴書・職務経歴書は、こちらからのご連絡メールに返信する形でお送りください。'
  );

  // 回答者が自分で入力する方式。ログインを求めずにメールアドレスを集められ、
  // 「回答のコピーを回答者に送信」も使える。
  setEmailCollection(form);

  form.setLimitOneResponsePerUser(false);
  form.setProgressBar(true);

  form.addMultipleChoiceItem()
    .setTitle('お問い合わせ種別')
    .setChoiceValues(['選考への応募', 'カジュアル面談', '会社見学'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('採用区分')
    .setChoiceValues(['新卒採用', 'キャリア採用'])
    .setRequired(true);

  form.addCheckboxItem()
    .setTitle('応募職種')
    .setHelpText('複数選択できます')
    .setChoiceValues(JOB_OPTIONS);

  form.addTextItem().setTitle('お名前').setRequired(true);
  form.addTextItem().setTitle('フリガナ').setRequired(true);
  form.addTextItem().setTitle('電話番号');

  form.addTextItem()
    .setTitle('ポートフォリオURL')
    .setHelpText('Web上で公開されている場合はURLをご記入ください（任意）');

  form.addParagraphTextItem()
    .setTitle('ご質問・ご要望など')
    .setHelpText('任意');

  form.addCheckboxItem()
    .setTitle('プライバシーポリシーへの同意')
    .setHelpText('https://recruitingsitenext.vercel.app/privacy-policy')
    .setChoiceValues(['プライバシーポリシーに同意します'])
    .setRequired(true);

  form.setConfirmationMessage(
    'お問い合わせありがとうございます。\n' +
    '内容を確認のうえ、3営業日以内に担当者よりご連絡いたします。\n\n' +
    '履歴書・職務経歴書をお持ちの方は、担当者からのご連絡メールに返信する形でお送りください。'
  );

  // 回答は既存のスプレッドシートへ。応募データを1か所にまとめる
  form.setDestination(FormApp.DestinationType.SPREADSHEET, FORM_DEST_SHEET_ID);

  var info = {
    回答用URL: form.getPublishedUrl(),
    編集用URL: form.getEditUrl(),
    フォームID: form.getId(),
  };
  console.log(JSON.stringify(info, null, 2));
  return info;
}

/**
 * サイトのCTAごとに、該当の選択肢を事前に選んだ状態で開くURLを作る。
 *
 * 「キャリア採用エントリー」を押した人が、フォームで区分を選び直さずに済む。
 * ここで出力したURLを src/app/data/forms.ts に反映する。
 */
function getPrefilledUrls() {
  var form = FormApp.openById(FORM_ID);
  var inquiry = findChoiceItem(form, 'お問い合わせ種別');
  var recruitment = findChoiceItem(form, '採用区分');

  function build(inquiryValue, recruitmentValue) {
    var response = form.createResponse();
    if (inquiryValue) {
      response = response.withItemResponse(inquiry.createResponse(inquiryValue));
    }
    if (recruitmentValue) {
      response = response.withItemResponse(recruitment.createResponse(recruitmentValue));
    }
    return response.toPrefilledUrl();
  }

  var urls = {
    career: build('選考への応募', 'キャリア採用'),
    graduate: build('選考への応募', '新卒採用'),
    companyVisit: build('会社見学', null),
    plain: form.getPublishedUrl(),
  };
  console.log(JSON.stringify(urls, null, 2));
  return urls;
}

function findChoiceItem(form, title) {
  var items = form.getItems(FormApp.ItemType.MULTIPLE_CHOICE);
  for (var i = 0; i < items.length; i++) {
    if (items[i].getTitle() === title) return items[i].asMultipleChoiceItem();
  }
  throw new Error('設問が見つかりません: ' + title);
}

/**
 * メールアドレスの収集方法を「回答者による入力」にする。
 *
 * この設定ができないApps Scriptのバージョンでは、収集なしのまま進めて
 * 管理画面で設定してもらう（フォーム生成そのものは止めない）。
 */
function setEmailCollection(form) {
  try {
    form.setEmailCollectionType(FormApp.EmailCollectionType.RESPONDER_INPUT);
  } catch (err) {
    console.warn(
      'メールアドレス収集の自動設定に失敗しました。' +
      '管理画面の 設定 → 回答 → メールアドレスを収集する → 「回答者による入力」' +
      'を手動で設定してください: ' + err
    );
  }
}
