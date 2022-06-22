import { atom } from 'recoil'
import { darkTheme, UiTheme } from './theme'
import { PaletteMode } from '@mui/material';

export type CertOutput = {
  fingerprint: string,
  pem_cert: string,
  pem_private_key:string,
  der_cert: Uint8Array,
  der_private_key: Uint8Array
}

export type CertInput = {
  start: {
    year: number,
    month: number,
    day: number
  }
  end: {
    year: number,
    month: number,
    day: number
  }
};

export type ValidPeriod = {
  start: Date;
  end: Date;
}

// 状態の宣言
/** メニューの選択状態 */
export const menuIndexState = atom({
  key: "menuIndex",
  default: 0
})

/** 証明書生成終了ダイアログの表示 非表示 */
export const openFinDialogState = atom({
  key: "openFinDialog",
  default: false,
});
/** 証明書の生成結果 */
export  const certState = atom<CertOutput | null>({
  key: 'cert',
  default: null
})
/** 証明書生成中 */
export const creatingState = atom({
  key: 'creating',
  default: false,
})
/** 証明書生成ボタンの活性 非活性 */
export const creatBtnDisabledState = atom({
  key: 'creatBtnDisabled',
  default: false,
})
/** 生成する証明書の有効期間開始 */
export const validStartState = atom<Date>({
  key: 'validStart',
  default: new Date('2022-05-04')
})
/** 生成する証明書の有効期間終了 */
export const validEndState = atom<Date>({
  key: 'validEnd',
  default: new Date('2099-12-31')
})

/** Muiのテーマ */
export const paletteModeState = atom<PaletteMode>({
  key: 'paletteModeState',
  default: 'dark'
})

/** 自前のテーマ */
export const themeState = atom<UiTheme>({
  key: 'themeState',
  default: darkTheme
})