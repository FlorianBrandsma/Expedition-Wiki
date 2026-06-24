import * as React from 'react';
import { AppBar, Toolbar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import GameAutoComplete from './gameAutoComplete';
import CategoryDrawer from '../../drawer/components/categoryDrawer';
import ExSearchField from '../../../components/exSearchField/exSearchField';

export default function AppHeader() {

  const [openDrawer, setOpenDrawer] = React.useState(false);

  return (
    <>
      <AppBar position="fixed" square>
        <Toolbar sx={{ display: 'flex' }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
            onClick={() => setOpenDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <GameAutoComplete sx={{ minWidth: 250 }}/>
          <ExSearchField placeholder="Search database..." sx={{ flex: 1, marginLeft: 2, width: 'auto' }}/>
        </Toolbar>
      </AppBar>
      <Toolbar/>
      <CategoryDrawer open={openDrawer} setOpen={setOpenDrawer} />
    </>
  )
}