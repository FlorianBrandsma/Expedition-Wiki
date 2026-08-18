import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useGameContext } from '../../../context/gameContext';

import { Categories, type Category } from '../../../services/categoryManager';

import { styled, alpha } from '@mui/material/styles';
import { Box, Typography, Drawer, List, ListItem, ListItemText, Button, Collapse, ListSubheader } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

interface CategoryDrawerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CategoryDrawer(props: CategoryDrawerProps) 
{ 
  const closeDrawer = () => {
    props.setOpen(false);
  }

  return (
    <Drawer 
      open={props.open} 
      onClose={closeDrawer}
      slotProps={{ paper: { sx: { backgroundColor: 'primary.main' } } }} 
    >
      <Box sx={{ width: 250 }} role='presentation' >
      <List 
        disablePadding 
          subheader={
          <ListSubheader sx={{ color: 'white', backgroundColor: 'primary.dark'}}>
            <Typography variant='body1' sx={{ display: 'flex', alignItems: 'center', height: '45px'}}>
            Categories
            </Typography>
          </ListSubheader> 
        }
      >
      {Categories.map(category => (
        <CustomListItem key={category.label} depth={0} category={category} closeDrawer={closeDrawer} />
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
  }
})) as typeof Button;

interface CustomListItemProps
{
  depth: number,
  category: Category
  closeDrawer: () => void
}

function CustomListItem(props: CustomListItemProps) {

  const { depth, category, closeDrawer } = props;

  const [open, setOpen] = React.useState(false);

  const { gameModel } = useGameContext();

  const handleClick = () => {
    setOpen(!open);
  }

  const location = useLocation();

  const searchParams = category.state ? `?${new URLSearchParams(category.state).toString()}` : '';
  const path         = `${ gameModel.name }/${ category.page }${searchParams}`;
  const maskPath     =`/${ gameModel.name.replaceAll(' ', '_')}/${ category.page }${searchParams}`;
  const replace      = maskPath.split('?')[0] === location.mask?.pathname;

  return (
    <div key={category.label}>
      <ListItem disablePadding sx={{ display: 'flex', alignItems: 'stretch', height: '45px'}}>
        <CustomButton 
          component={Link}
          to={path}
          {...({
            mask: maskPath,
            replace: replace
          })}
          onClick={() => { closeDrawer(); }}
          sx={{ flex: 1, pl: 2 + depth * 2 }} 
        >
          <ListItemText primary={category.label} />
        </CustomButton>
        { category.children.length > 0 && (
          <CustomButton sx={{ minWidth: '45px' }} onClick={handleClick}>
            { open ? <ExpandLess /> : <ExpandMore />}
          </CustomButton>
        )}
      </ListItem>
      { category.children.length > 0 && (
        <Collapse in={open}>
          <List disablePadding>
            {category.children.map(childCategory => (
              <CustomListItem key={childCategory.label} depth={depth + 1} category={childCategory} closeDrawer={closeDrawer} />
            ))}
          </List>
        </Collapse>
      )}
    </div>
  )
}