#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

mod logger;
mod cert;

use cert::{create_cert, CertInput, CertOutput};
use tracing::{info, info_span, error};

/** 証明書生成コマンド */
#[tauri::command]
async fn create_cert_cmd(cert_input: CertInput) -> Result<CertOutput, String>{
  let span = info_span!("create_cert").entered();
  let result = create_cert(cert_input);
  span.exit();
  result
}

fn main() {
  logger::logger_init();
  info!("アプリを起動しました");
  let tauri_result = tauri::Builder::default()
    // コマンドを登録
    .invoke_handler(tauri::generate_handler![create_cert_cmd])
    // tauri起動
    .run(tauri::generate_context!());
  match tauri_result {
    Ok(_) => {},
    Err(e) => {
      error!("Tauri起動に失敗しました");
      error!("{}", e);
    }
  };
}