import * as React from 'react';
import { alpha } from '@mui/material/styles';
import { Paper, Typography, TableContainer, TableHead, TableBody, TableRow, TableCell, TableSortLabel, TablePagination } from '@mui/material';
import ExTable from '../../components/exTable/exTable';

export interface HeadCell<T> {
  id: keyof T;
  label: string;
  numeric: boolean;
  render?: (row: T) => React.ReactNode;
}

type Order = 'asc' | 'desc' | undefined;

interface EnhancedTableHeadProps<T> {
  order: Order;
  orderBy: keyof T | undefined;
  headCells: readonly HeadCell<T>[];
  enableOrder?: boolean | undefined;
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
                fontSize:'1rem',
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

interface BasicTableHeadProps<T> {
  headCells: readonly HeadCell<T>[];
}

function BasicTableHead<T>({ headCells }: BasicTableHeadProps<T>) {

  return (
    <TableHead>
      <TableRow sx={{ backgroundColor: 'primary.dark' }}>
        {headCells.map((headCell) => (
          <TableCell
            key={String(headCell.id)}
            align={headCell.numeric ? 'right' : 'left'}
          >
            <Typography
              sx={{
                color: 'primary.contrastText',
                fontSize: '1rem'
              }}
            >
              {headCell.label}
            </Typography>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableProps<T> extends BasicTableHeadProps<T> {
  rows: T[];
  rowKey: keyof T;
  enableOrder?: boolean | undefined;
  enablePagination?: boolean | undefined;
}

function getComparator<T>(order: Order, orderBy: keyof T): (a: T, b: T) => number {

  return order === 'desc' ? (a, b) =>  descendingComparator(a, b, orderBy) : 
                            (a, b) => -descendingComparator(a, b, orderBy);
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {

  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return  1;
  
  return 0;
}

export default function EnhancedTable<T extends { name: string } & Record<string, any>>(props: EnhancedTableProps<T>) {

  const rowsPerPageOptions = [25, 50, 100];

  const { rows, headCells, rowKey, enableOrder, enablePagination } = props;

  const [order, setOrder] = React.useState<Order>();
  const [orderBy, setOrderBy] = React.useState<keyof T | undefined>();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(rowsPerPageOptions[0]);

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

  const visibleRows = React.useMemo(() => {

    const sortedRows = orderBy ? [...rows].sort(getComparator(order, orderBy)) : [...rows];
    
    if (enablePagination) {
      return sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    }
    
    return sortedRows;

    }, [order, orderBy, page, rowsPerPage, rows]
  );

  return (
    <Paper sx={{ borderRadius: 0, width: '100%' }} >
      <TableContainer>
        <ExTable size={'small'}>
          {enableOrder ? (
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              headCells={headCells}
              onRequestSort={handleRequestSort}
            />
          ) : (
            <BasicTableHead
              headCells={headCells}
            />
          )}       
          <TableBody>
            {visibleRows.map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;
              return (
                <TableRow key={String(row[rowKey])}>
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
                          {cell.render ? (
                            cell.render(row)
                          ) : (
                            typeof value === 'object' ? JSON.stringify(value) : String(value ?? '')
                          )}
                        </TableCell>
                      )
                    })
                  }
                </TableRow>
              );
            })}
          </TableBody>
        </ExTable>
      </TableContainer>

      {enablePagination && (
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ 
            backgroundColor: 'primary.light'
          }}
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
      )}
    </Paper>
  );
}
