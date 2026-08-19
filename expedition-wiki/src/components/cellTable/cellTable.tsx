import { Box, Table, TableBody, TableCell, TableRow } from "@mui/material";

interface CellTableProps<T> {
  bulleted?: boolean;
  list: T[];
  component: (model: T) => React.ReactNode;
}

export default function CellTable<T extends { id: number }>({ bulleted, list, component }: CellTableProps<T>) {

  if (!list.length) return null;

  return (
    <>
      {list.length > 0 && (
        <Table 
          size='small' 
          sx={{
            borderCollapse: 'separate',
            borderSpacing: '0 2px',
            '& .MuiTableCell-root': { border: 'none' }
          }}
        >
          <TableBody>
            {list.map((model) => (
              <TableRow key={model.id}>
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
                    <Box>
                      {component(model)}
                    </Box>
                  </Box>   
                </TableCell>        
              </TableRow>
            ))} 
          </TableBody>
        </Table>
      )}
    </>
  )
}