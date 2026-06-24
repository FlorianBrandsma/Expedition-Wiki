import { useLocation, Link } from 'react-router-dom';

import { Table, TableBody, TableContainer, TableHead, TableRow, TableCell, Paper } from '@mui/material';

import type { Item } from '../../data/types/types';

import { styled } from '@mui/material/styles';
import styles from './ExTable.module.css';

interface TableProps {
  data: Item[]
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
          <TableCellHeader align="right" >Id</TableCellHeader>
          <TableCellHeader align="right" >Type</TableCellHeader>
          <TableCellHeader align="right" >Slot</TableCellHeader>
          <TableCellHeader align="right" >Source</TableCellHeader>
        </TableRow>
        </TableHead>
        <TableBody>
        {data.map(item => (
          <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0} }}>
            <TableCell component="th" scope="row">
              <Link 
                className={styles['link']}
                key={item.id} 
                to={`item/${item.name}`} 
                mask={`${ location.mask?.pathname }/item/${item.name.replaceAll(' ', '_')}`}
              >
                {item.name}
              </Link>
            </TableCell>
            <TableCell align="right">{item.id}</TableCell>
            <TableCell align="right">{item.id}</TableCell>
            <TableCell align="right">{item.id}</TableCell>
            <TableCell align="right">{item.id}</TableCell>
          </TableRow>
        ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}