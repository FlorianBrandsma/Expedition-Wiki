import * as React from 'react';
import { AppBar, Toolbar, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import GameAutoComplete from './gameAutoComplete';
import CategoryDrawer from '../../drawer/components/categoryDrawer';
import ExSearchField from '../../../components/exSearchField/exSearchField';

export default function AppHeader() {

  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [showMobileSearch, setShowMobileSearch] = React.useState(false);

  return (
    <>
      <AppBar position="fixed" square>
        <Toolbar 
          disableGutters 
          sx={{ 
            display: 'flex', 
            px: { xs: 2, sm: 3 }
          }}
        >
          <Box sx={{
            display: { xs: showMobileSearch ? 'flex' : 'none', sm: 'none'},
            alignItems: 'center',
            flex: 1
          }}>
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              onClick={() => setShowMobileSearch(false)}
              sx={{
                mr: { xs: 0.5, sm: 1.5 }
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <ExSearchField 
              placeholder="Search..." 
              sx={{ flex: 1 }}
            />
          </Box>

          <Box sx={{
            display: { xs: showMobileSearch ? 'none' : 'flex', sm: 'flex' },
            alignItems: 'center',
            flex: 1
          }}>
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              onClick={() => setOpenDrawer(true)}
              sx={{
                mr: { xs: 0.5, sm: 1.5 }
              }}
            >
              <MenuIcon />
            </IconButton>

            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              flex: 1
            }}>
              <GameAutoComplete 
                sx={{ 
                  minWidth: 250,
                  flex: { xs: 1, sm: 'initial' }
                }}
              />

              <ExSearchField 
                placeholder="Search..." 
                sx={{ 
                  flex: 1, 
                  marginLeft: 1, 
                  marginRight: '314px',
                  width: 'auto',
                  display: { xs: 'none', sm: 'block' }
                }}
              />
            </Box>

            <IconButton
              size='large'
              edge='end'
              color='inherit'
              onClick={() => setShowMobileSearch(true)}
              sx={{
                ml: { xs: 0.5, sm: 0 },
                display: { xs: 'inline-flex', sm: 'none' }
              }}
            >
              <SearchIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar/>
      <CategoryDrawer open={openDrawer} setOpen={setOpenDrawer} />
    </>
  )
}