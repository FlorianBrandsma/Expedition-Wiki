import { Table, TableBody, Box } from '@mui/material';

interface ExCardTableProps
{
    children?: React.ReactNode;
}

export default function ExCardTable(props:ExCardTableProps) {

  return (
    <Box sx={{ padding: 1 }}>
      <Table size='small' sx={{ 
        '& .MuiTableCell-root': { 
          lineHeight: 1
        } 
      }}>
        <TableBody>
          {props.children}
        </TableBody>
      </Table>
    </Box>    
  )
}