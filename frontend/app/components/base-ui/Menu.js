import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


const Item = ({icon, href, text}) => (
    <ListItem key={text} disablePadding>
        <ListItemButton href={href}>
        <ListItemIcon >
            {icon}
        </ListItemIcon>
        <ListItemText primary={text} />
        </ListItemButton>
  </ListItem>
);

const Menu = ({items}) => (
    <List>
        {items.map((item) => (
        <Item key={item.text} icon={item.icon} href={item.href} text={item.text}/>
        ))}
    </List>
  );

export default Menu;