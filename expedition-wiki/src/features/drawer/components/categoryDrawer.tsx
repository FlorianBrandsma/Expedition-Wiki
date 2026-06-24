import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Box, Typography, Drawer, List, ListItem, ListItemText, Button, Collapse, ListSubheader } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

interface DrawerOptions
{
    label: string,
    children: DrawerOptions[]
}

const DrawerOptions: DrawerOptions[] = [
  { 
    label: "Items",
    children: [
      {
        label: "Supplies", children: []
      },
      {
        label: "Equipment", children: []
      }
    ]
  },
  { 
    label: "Interactables", 

    children: [
      {
        label: "Agents", children: []
      },
      {
        label: "Objects", children: []
      }
    ]
  }
]

interface CategoryDrawerProps
{
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CategoryDrawer(props: CategoryDrawerProps) 
{ 
  return (
    <Drawer slotProps={{ paper: { sx: { backgroundColor: 'primary.main' } } }} open={props.open} onClose={() => props.setOpen(false)}>
      <Box sx={{ width: 250 }} role="presentation" >
      <List 
        disablePadding 
          subheader={
          <ListSubheader sx={{ color: 'white', backgroundColor: 'primary.dark'}}>
            <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', height: '45px'}}>
            Categories
            </Typography>
          </ListSubheader> 
        }
      >
      {DrawerOptions.map(options => (
        <CustomListItem key={options.label} depth={0} options={options} />
      ))}
      </List>
    </Box>
    </Drawer>
  )
}

const CustomButton = styled(Button)(({ theme }) => ({
  borderRadius: 0,
  margin: '1px',
  background: theme.palette.primary.light,
  textTransform: 'none',
  color: 'black',
  textAlign: 'left',
  '&:hover': {
    background: alpha(theme.palette.common.white, 0.25),
  },
}));

interface CustomListItemProps
{
  depth: number,
  options: DrawerOptions
}

function CustomListItem(props: CustomListItemProps) {

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
      setOpen(!open);
  };

  return (
    <div key={props.options.label}>
      <ListItem disablePadding sx={{ display: 'flex', alignItems: 'stretch', height: '45px'}}>
        <CustomButton sx={{ flex: 1, pl: 2 + props.depth * 2 }} onClick={() => { console.log("Click!") }}>
          <ListItemText primary={props.options.label} />
        </CustomButton>
        { props.options.children.length > 0 && (
          <CustomButton sx={{ minWidth: '45px' }} onClick={handleClick}>
            { open ? <ExpandLess /> : <ExpandMore />}
          </CustomButton>
        )}
      </ListItem>
      { props.options.children.length > 0 && (
        <Collapse in={open}>
          <List disablePadding>
            {props.options.children.map(options => (
              <CustomListItem key={options.label} depth={props.depth + 1} options={options} />
            ))}
          </List>
        </Collapse>
      )}
    </div>
  )
}