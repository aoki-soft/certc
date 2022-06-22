

use tracing::Level;
use tracing_subscriber::fmt::format::FmtSpan;
use time::UtcOffset;

/** # ロガーセットアップ関数 */
pub(super) fn logger_init() {
  // 時刻フォーマットの設定
  let offset = UtcOffset::current_local_offset().expect("should get local offset!");
  let time_format = time::format_description::well_known::Rfc3339;

  let format = tracing_subscriber::fmt::format()
    // 時刻フォーマットの設定投入
    .with_timer( tracing_subscriber::fmt::time::OffsetTime::new(offset, time_format))
    // ログ書き出し部分のファイルパス出力
    .with_file(true)
    .with_line_number(true)
    .with_source_location(true)
    .with_thread_names(true)
    .with_thread_ids(true);

  tracing_subscriber::fmt()
  .event_format(format)
  .with_span_events(FmtSpan::NEW | FmtSpan::CLOSE)
  .with_max_level(Level::DEBUG)
  .init();
}