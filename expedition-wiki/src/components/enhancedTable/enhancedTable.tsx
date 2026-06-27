import * as React from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {

  if (b[orderBy] < a[orderBy]) {
    return -1;
  }

  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  
  return 0;
}

type Order = 'asc' | 'desc' | undefined;

function getComparator<T>(order: Order, orderBy: keyof T): (a: T, b: T) => number {

  return order === 'desc' ? (a, b) =>  descendingComparator(a, b, orderBy) : 
                            (a, b) => -descendingComparator(a, b, orderBy);
}

export interface HeadCell<T> {
  id: keyof T;
  label: string;
  numeric: boolean;
}

interface EnhancedTableHeadProps<T> {
  order: Order;
  orderBy: keyof T | undefined;
  headCells: readonly HeadCell<T>[];
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void;
}

function EnhancedTableHead<T>(props: EnhancedTableHeadProps<T>) {
  
  const { order, orderBy, headCells, onRequestSort } = props;
  
  const createSortHandler = (property: keyof T) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow sx={{ backgroundColor: 'primary.dark' }}>
        {headCells.map((headCell) => (
          <TableCell
            key={String(headCell.id)}
            align={headCell.numeric ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              sx={{ 
                color: 'primary.contrastText',
                '&.Mui-active': {
                  color: 'primary.contrastText'
                },
                '&:hover': {
                  color: 'primary.contrastText'
                },
                '& .MuiTableSortLabel-icon': {
                  color: 'var(--mui-palette-primary-contrastText) !important'
                }
              }}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableProps<T> {
  rows: T[];
  headCells: readonly HeadCell<T>[];
  rowKey: keyof T;
}

export default function EnhancedTable<T extends Record<string, any>>({ rows, headCells, rowKey }: EnhancedTableProps<T>) {
  
  const navigate = useNavigate();
  const location = useLocation();

  const [order, setOrder] = React.useState<Order>();
  const [orderBy, setOrderBy] = React.useState<keyof T | undefined>();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);

  const handleRequestSort = (_event: React.MouseEvent<unknown>, property: keyof T ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(() =>
    (orderBy ? [...rows].sort(getComparator(order, orderBy)) : [...rows])
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
             
    [order, orderBy, page, rowsPerPage, rows]
  );

  const handleClick = (row: T) => {

    navigate(`${ row.name }`, {
        mask:`${ location.mask?.pathname }/${ row.name.replaceAll(' ', '_')}`
      })
  }

  return (
    <Box sx={{ width: 750, maxWidth: '100%' }}>
      <Paper sx={{ borderRadius: 0, width: '100%' }} >
        <TableContainer >
          <Table
            aria-labelledby="tableTitle"
            size={'small'}
            sx={{ backgroundColor: 'primary.light' }}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              headCells={headCells}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    hover
                    onClick={() => handleClick(row)}
                    key={String(row[rowKey])}
                    sx={{ cursor: 'pointer' }}
                  >
                    {
                      headCells.map((cell, cellIndex) => {
                        const value = row[cell.id];
                        return (
                          <TableCell
                            key={String(cell.id)}
                            align={cell.numeric ? 'right' : 'left'}
                            component={cellIndex === 0 ? 'th' : 'td'}
                            id={cellIndex === 0 ? labelId : undefined}
                            scope={cellIndex === 0 ? 'row' : undefined}
                          >
                            {typeof value === 'object' ? JSON.stringify(value) : value}
                          </TableCell>
                        )
                      })
                    }
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 100/3 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[50, 100, 250]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ backgroundColor: 'primary.light' }}
          slotProps={{
            select: {
              MenuProps: {
                slotProps: {
                  paper: {
                    sx: {
                      backgroundColor: 'primary.light',
                      borderRadius: 0,
                      '& .MuiMenuItem-root ': {
                        '&:hover': {
                          backgroundColor: alpha('#000', 0.1)
                        },
                        '&.Mui-selected': {
                          backgroundColor: alpha('#000', 0.2),
                          '&:hover': {
                            backgroundColor: alpha('#000', 0.3)
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }}
        />
      </Paper>
    </Box>
  );
}
