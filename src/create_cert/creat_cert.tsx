import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { invoke } from '@tauri-apps/api/tauri';
import CircularProgress from '@mui/material/CircularProgress';
import { save } from '@tauri-apps/api/dialog';
import { useRecoilState } from "recoil"
import CreateIcon from '@mui/icons-material/Create';
import SaveIcon from '@mui/icons-material/Save';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { openFinDialogState, certState, creatingState, creatBtnDisabledState, CertOutput, CertInput, validStartState, validEndState} from '../store';
import { writeBinaryFile, writeFile } from '@tauri-apps/api/fs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { Typography } from '@mui/material';


export const CreateCert = () => {
  const [openFinDialog, setOpenFinDialog] = useRecoilState(openFinDialogState)
  const [cert, setCert] = useRecoilState(certState);
  const [creating, setCreating] = useRecoilState(creatingState);
  const [createBtnDisabled, setCreateBtnDisabled] = useRecoilState(creatBtnDisabledState);
  const [validStart, setValidStart] = useRecoilState(validStartState);
  const [validEnd, setValidEnd] = useRecoilState(validEndState);

  const creatButtonOnClick = async () => {
    setCreateBtnDisabled(true);
    setCreating(true);
    let certInput : CertInput = {
      start: {
        year: dayjs(validStart).year(),
        month: dayjs(validStart).month() +1,
        day: dayjs(validStart).date()
      },
      end: {
        year: dayjs(validEnd).year(),
        month: dayjs(validEnd).month() +1,
        day: dayjs(validEnd).date()
      }
    };
    console.log(certInput);
    
    invoke('create_cert_cmd',{ certInput: certInput}).then((output) => {
      let res = output as CertOutput;
      setCert(res);
      setCreating(false);
      setOpenFinDialog(true);
    }).catch((message) => {
      console.log('エラー');
      console.log(message);});
  }
  const dialogOnClick = () => {
    setCreateBtnDisabled(false);
    setOpenFinDialog(false);
  }

  /** pem形式の証明書を保存する */
  const savePemCert = async () => {
      let certPath = await save({
      title: "証明書を保存する",
      defaultPath: "^/cert.pem",
      filters: [{name: 'pem', extensions: ['pem']}, {name: 'cer', extensions: ['cer']}]
    });
    console.log(certPath);
    await writeFile({path: certPath, contents: cert!.pem_cert}).catch(()=>{
      console.log('証明書の保存に失敗しました');
    });
    console.log('証明書の保存に成功しました');
  }

  /** pem形式の秘密鍵を保存する */
  const savePemPrivateKey = async () => {
      let certPath = await save({
      title: "秘密鍵を保存する",
      defaultPath: "^/private_key.pem",
      filters: [{name: 'pem', extensions: ['pem']}, {name: 'key', extensions: ['key']}]
    });
    console.log(certPath);
    await writeFile({path: certPath, contents: cert!.pem_private_key}).catch(()=>{
      console.log('秘密鍵の保存に失敗しました');
    });
    console.log('秘密鍵の保存に成功しました');
  }

  /** der形式の証明書を保存する */
  const saveDerCert = async () => {
      let certPath = await save({
      title: "証明書を保存する",
      defaultPath: "^/cert.cer",
      filters: [{name: 'cer', extensions: ['cer']}]
    });
    console.log(certPath);
    await writeBinaryFile({ path: certPath, contents: cert!.der_cert}).catch(()=>{
      console.log('証明書の保存に失敗しました');
    });
    console.log('証明書の保存に成功しました');
  }

  /** der形式の秘密鍵を保存する */
  const saveDerPrivateKey = async () => {
      let certPath = await save({
      title: "秘密鍵を保存する",
      defaultPath: "^/private_key.key",
      filters: [{name: 'key', extensions: ['key']}]
    });
    console.log(certPath);
    await writeBinaryFile({path: certPath, contents: cert!.der_private_key}).catch(()=>{
      console.log('秘密鍵の保存に失敗しました');
    });
    console.log('秘密鍵の保存に成功しました');
  }

  return (<>
  <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
    <Typography variant='h1'> 証明書生成</Typography>
    
    <Box sx={{mt: 2}}>
      <Typography sx={{mb: 2}}>証明書の有効期限</Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{'display': "flex"}} >
          <Box sx={{"marginRight": "20px"}} >
          <DesktopDatePicker
            label="開始"
            inputFormat="YYYY/MM/DD"
            value={validStart}
            onChange={(newValue)=>{if (newValue) {setValidStart(newValue)}}}
            renderInput={(params) => <TextField {...params} />}
          />
          </Box>
          <Box sx={{}} >
            <DesktopDatePicker
              label="終了"
              inputFormat="YYYY/MM/DD"
              value={validEnd}
              onChange={(newValue)=>{if (newValue) {setValidEnd(newValue)}}}
              renderInput={(params) => <TextField {...params} />}
            />
          </Box>
        </Box>
      </LocalizationProvider>
    </Box>
    <Button variant="contained" size="large" onClick={creatButtonOnClick} disabled={createBtnDisabled} sx={{mt: 3}}>
      
      {creating ? <CircularProgress color='inherit' size={25}/> : <CreateIcon />}
      <div style={{"marginLeft": "7px", "marginRight": "7px"}}>証明書を作成する</div>
    </Button>
    

    {cert && <>
      <Box sx={{display: "flex", flexDirection: "column"}}>
        <Typography>フィンガープリント:</Typography> 
        <Typography sx={{width: 400, overflowWrap: 'break-word'}}>{cert.fingerprint}</Typography>
        <Box sx={{mt: 2}}>
          <Button variant='contained' size='large' onClick={savePemCert} >
            <SaveIcon /> <span style={{'marginLeft': '7px'}}>Pem形式で証明書を保存する</span>
          </Button>
        </Box>
        <Box sx={{mt: 1}}>
          <Button variant='contained' size='large' onClick={savePemPrivateKey} >
            <SaveIcon /> <span style={{'marginLeft': '7px'}}>Pem形式で秘密鍵を保存する</span>
          </Button>
        </Box>
        <Box sx={{mt: 1}}>
          <Button variant='contained' size='large' onClick={saveDerCert} >
            <SaveIcon /> <span style={{'marginLeft': '7px'}}>Der形式で証明書を保存する</span>
          </Button>
        </Box>
        <Box sx={{mt: 1}}>
          <Button variant='contained' size='large' onClick={saveDerPrivateKey} >
            <SaveIcon /> <span style={{'marginLeft': '7px'}}>Der形式で秘密鍵を保存する</span>
          </Button>
        </Box>
      </Box>
    </>}


    <Dialog open={openFinDialog}>
      <DialogTitle id="alert-dialog-title">
          証明書の作成が完了しました。
      </DialogTitle>
      <DialogContent>
          <DialogContentText id="alert-dialog-description">
            作成された証明書は自己署名の証明書です。<br/>
            ローカル環境での検証目的に使用してください。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick = {dialogOnClick}>
            完了
          </Button>
        </DialogActions>
    </Dialog>
  </Box>
  </>)
}