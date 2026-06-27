import { useLocation, Link } from 'react-router-dom';

import { Table, TableBody, TableContainer, TableHead, TableRow, TableCell, Paper } from '@mui/material';

import { ItemModel } from '../../data/models/itemModel';

import { styled } from '@mui/material/styles';
import styles from './ExTable.module.css';

interface TableProps {
  data: ItemModel[]
  columns: string[]
}

const TableCellHeader = styled(TableCell)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
}));

export default function ExTable({ data }: TableProps) {

  const location = useLocation();

  return (
    <TableContainer component={Paper} square>
      <Table sx={{ backgroundColor: 'primary.light' }} size="small" aria-label="simple-table">
        <TableHead>
        <TableRow sx={{ backgroundColor: 'primary.dark' }}>
          <TableCellHeader >Name</TableCellHeader>
          <TableCellHeader >Id</TableCellHeader>
          <TableCellHeader >Type</TableCellHeader>
          <TableCellHeader >Slot</TableCellHeader>
          <TableCellHeader >Source</TableCellHeader>
        </TableRow>
        </TableHead>
        <TableBody>
        {data.map(item => (
          <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0} }}>
            <TableCell component="th" scope="row">
              <Link 
                className={styles['link']}
                key={item.id} 
                to={`${item.name}`}
                mask={`${ location.mask?.pathname }/${ item.name.replaceAll(' ', '_') }`}
              >
                {item.name}
              </Link>
            </TableCell>
            <TableCell >{item.id}</TableCell>
            <TableCell >{item.id}</TableCell>
            <TableCell >{item.id}</TableCell>
            <TableCell >{item.id}</TableCell>
          </TableRow>
        ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}