import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import InfoIcon from '@mui/icons-material/Info';
import { useRecoilState } from "recoil"
import { menuIndexState } from './store';
import { CreateCert } from './create_cert/creat_cert'
import { VersionIndication } from './version_indication/version_indication';

const drawerWidth = 240;

export default function Home() {
  const [menuIndex, setMenuIndex] = useRecoilState(menuIndexState)
  const menuList = [
    {title: 'Create Cert',icon: CardMembershipIcon}, 
    {title: 'Info', icon: InfoIcon}];
  const mainList = [CreateCert, VersionIndication];
  const MainItem = mainList[menuIndex];
  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Divider />
        <List>
          {menuList.map((item, index) => (
            <ListItem button key={item.title} onClick={()=>{setMenuIndex(index)}} >
              <ListItemIcon>
                <item.icon />
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <MainItem/>
    </Box>
  );
}