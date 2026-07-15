import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useAlert } from './context/alertContext';

import { createTheme, ThemeProvider } from '@mui/material';

import HomePage from './pages/homePage';
import GamePage from './pages/gamePage';
import ItemsPage from './pages/itemsPage';
import ItemPage from './pages/item/itemPage';

import MenuBG from './images/MenuBG.png'

export default function App() {

  document.body.style.backgroundImage     = `linear-gradient( #FFFF001A), url(${ MenuBG })`;
  document.body.style.backgroundSize      = "cover";
  document.body.style.backgroundRepeat    = "no-repeat";
  document.body.style.backgroundAttachment= "fixed";

  const exLight = '#DCDCC3';
  const exMain  = '#B4B4A0';
  const exDark  = '#5A5A50';

  const theme = createTheme({

    palette: {
      primary: {
        light: exLight,
        main: exMain,
        dark: exDark,
        contrastText: '#FFF'
      },
    },

    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: exDark
          }
        }
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottomColor: exDark
          }
        }
      },
      MuiIconButton: {
        defaultProps: {
          disableRipple: true
        }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            color: 'black',
            fontSize: '1rem',
            textTransform: 'none',
            borderRadius: 0,
            background: `linear-gradient( ${ exLight } 50%, ${ exMain })`,
            '&.Mui-disabled': {
              background: `linear-gradient( ${ exMain } 50%, ${ exDark })`
            }
          }
        },
        defaultProps: {
          disableRipple: true
        }
      }
    }
  });

  const router = createBrowserRouter(
    [
      {
        path:'/',
        element: <HomePage />,
        errorElement: <div>404 Not Found</div>,
        children:[
          {
            path:'/:gameName',
            element: <GamePage />
          },
          {
            path:'/:gameName/item',
            element: <ItemsPage />
          },
          {
            path:'/:gameName/item/:name',
            element: <ItemPage />,
          }
        ]
      },
    ]
  );
  
  const showAlert = useAlert(); 

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => showAlert(`${ error.cause.status }: ${ error.cause.statusText }`, error.severity)
    })
  });

  return (
    <QueryClientProvider client={ queryClient }>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router}/>
      </ThemeProvider>
    </QueryClientProvider>
  )
}