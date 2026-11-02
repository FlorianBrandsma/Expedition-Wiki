import { TableRow, TableCell } from '@mui/material';

export interface ExCardTableRowProps {
  label: React.ReactNode;
  value: React.ReactNode;
}

export default function ExCardTableRow(props: ExCardTableRowProps) {
  
  return (
    <TableRow 
      sx={{ 
        '& > .MuiTableCell-root': { 
          borderBottom: 'unset' 
        },
        '& .MuiTableCell-root': { 
          padding: { 
            xs: '2px 4px', 
            sm: '2px 6px'
          } 
        }
      }}
    >
      <TableCell 
        variant='head' 
        align='right' 
        sx={{
          borderRight: '2px solid',
          borderColor: 'primary.dark'
        }}> 
        {props.label} 
      </TableCell>
      <TableCell 
        sx={{
          maxWidth: 0,
          width: '60%'
        }}> 
        {props.value} 
      </TableCell>
    </TableRow>
  )
}