import { Box, Table, TableBody, TableCell, TableRow } from "@mui/material";

interface CellTableProps<T> {
  bulleted?: boolean;
  highlited?: (model: T) => boolean;
  list: T[];
  component: (model: T) => React.ReactNode;
}

export default function CellTable<T>({ bulleted, highlited, list, component }: CellTableProps<T>) {

  if (!list || !list.length) return null;

  return (
    <Table 
      size='small' 
      sx={{
        borderCollapse: 'separate',
        borderSpacing: '0 2px',
        '& td.MuiTableCell-root': { 
          border: 'none'
        }
      }}
    >
      <TableBody>
        {list.map((model, index) => (
          <TableRow key={index}>
            <TableCell sx={{ padding: 0 }}>
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'baseline', 
                  gap: 1,
                  maxWidth: '200px' 
                }}
              >
                {bulleted && (
                  <Box 
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: 'primary.dark',
                      flexShrink: 0
                    }}
                  />
                )}
                <Box 
                  sx={{ 
                    width: '100%',
                    padding:         highlited?.(model) ? '1px' : '0px', 
                    backgroundColor: highlited?.(model) ? 'primary.main' : 'none'
                  }}
                >
                  {component(model)}
                </Box>
              </Box>   
            </TableCell>        
          </TableRow>
        ))} 
      </TableBody>
    </Table>
  )
}