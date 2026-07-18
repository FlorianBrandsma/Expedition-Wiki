import { Table, type TableProps } from '@mui/material';

import { styled } from '@mui/material/styles';

interface BaseTableProps extends Omit<TableProps, 'data'> {
  children?: React.ReactNode;
}

function BaseTable({children, ...props}: BaseTableProps) {

  return (
    <Table 
      {...props}
      size="small" 
      aria-label="simple-table"
    >
      {children}
    </Table>
  )
}

const ExTable = styled(BaseTable)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light, 
  borderRadius: 0,
  border: '1px solid',
  borderColor: theme.palette.primary.dark,
  '& .MuiTableCell-root': {
          border: '1px solid',
          borderColor: theme.palette.primary.dark
  }
}));

export default ExTable;