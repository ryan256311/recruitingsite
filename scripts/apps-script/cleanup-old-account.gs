/**
 * 旧アカウント（exceet.shinke.r@gmail.com）に残った作業用ファイルを片付ける。
 *
 * お問い合わせはGoogleフォーム（exceet.analytics@gmail.com 所有）に移行したため、
 * ここで作ったものはすべて不要になった。
 *
 * ■ 安全のための作り
 *   ドライブには似た名前の既存ファイル（「採用サイト」「採用PT」など、
 *   今回の作業とは無関係のもの）がある。取り違えないよう、IDで指定したうえで
 *   名前が想定どおりの場合だけ処理する。
 *
 * ■ 完全削除はしない
 *   ゴミ箱へ移動するだけなので、30日以内なら元に戻せる。
 */

var TARGETS = [
  {
    id: '1VpEdkbBI4SOugwcpBjBSy6W2hQ3PO28okELNsuMxs3o',
    expectedName: '採用サイト お問い合わせ',
    note: '旧スプレッドシート（テスト行9件を含む）',
  },
  {
    id: '1zESHNwXqQ5lS1QjiveCsqBB3Weqqk_tzKKrQ223axB4',
    expectedName: '株式会社エクシート 採用お問い合わせ',
    note: '旧Googleフォーム（1つ目に作ったもの）',
  },
];

var TARGET_FOLDERS = [
  {
    id: '1VAQPIzFEKLVw6v4A-tvVRk1i3s-Rrc1D',
    expectedName: '採用サイト 応募書類',
    note: '添付ファイルの保存先（テストPDF）',
  },
];

function cleanupOldAccount() {
  var log = [];

  TARGETS.forEach(function (t) {
    log.push(trashIfNameMatches(DriveApp.getFileById(t.id), t));
  });

  TARGET_FOLDERS.forEach(function (t) {
    var folder = DriveApp.getFolderById(t.id);
    // フォルダをゴミ箱に入れると中身も一緒に入る
    log.push(trashIfNameMatches(folder, t));
  });

  log.push('');
  log.push('このApps Scriptプロジェクト自体は、Apps Scriptの一覧画面から手動で削除してください。');
  console.log(log.join('\n'));
  return log.join('\n');
}

function trashIfNameMatches(item, target) {
  var name = item.getName();
  if (name !== target.expectedName) {
    return 'スキップ: ' + target.id + ' の名前が「' + name +
      '」で想定（' + target.expectedName + '）と違うため、触りませんでした';
  }
  if (item.isTrashed()) {
    return '処理済み: ' + name + '（すでにゴミ箱にあります）';
  }
  item.setTrashed(true);
  return 'ゴミ箱へ移動: ' + name + ' — ' + target.note;
}
