import * as React from 'react';
import { type SxProps, type Theme } from '@mui/material/styles';
import { Paper, Typography, TableContainer, TableHead, TableBody, TableRow, TableCell, TableSortLabel } from '@mui/material';
import { EnhancedTablePagination } from './enhancedTablePagination';
import ExTable from '../../components/exTable/exTable';

export interface HeadCell<T> {
  id: keyof T;
  label: string;
  align: 'right' | 'left' | 'center';
  sx?: SxProps<Theme>
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
  }

  return (
    <TableHead>
      <TableRow sx={{ backgroundColor: 'primary.dark' }}>
        {headCells.map((headCell) => (
          <TableCell
            key={String(headCell.id)}
            align={headCell.align}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ whiteSpace: 'nowrap', ...headCell.sx }}
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
            align={headCell.align}
            sx={{ whiteSpace: 'nowrap', ...headCell.sx }}
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

interface BaseTableProps<T> extends BasicTableHeadProps<T> {
  rows: T[];
  rowKey: keyof T;
  enableOrder?: boolean | undefined;
  enablePagination?: boolean | undefined;
}

interface ClientPaginatedProps<T> extends BaseTableProps<T> {
  totalCount?: never;
  page?: never;
  rowsPerPage?: never;
  onPageChange?: never;
  onRowsPerPageChange?: never;
  order?: never;
  orderBy?: never;
  onRequestSort?: never;
}

interface ServerPaginatedProps<T> extends BaseTableProps<T> {
  totalCount: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  order?: Order;
  orderBy?: keyof T | undefined;
  onRequestSort?: (property: keyof T) => void;
}

type EnhancedTableProps<T> = ClientPaginatedProps<T> | ServerPaginatedProps<T>;

function getComparator<T>(order: Order, orderBy: keyof T): (a: T, b: T) => number {

  return order === 'desc' ? (a, b) =>  descendingComparator(a, b, orderBy) : 
                            (a, b) => -descendingComparator(a, b, orderBy);
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {

  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return  1;
  
  return 0;
}

export default function EnhancedTable<T extends Record<string, any>>(props: EnhancedTableProps<T>) {

  const rowsPerPageOptions = [25, 50, 100];

  const { rows, headCells, rowKey, enableOrder, enablePagination } = props;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(rowsPerPageOptions[0]);
  const [order, setOrder] = React.useState<Order>();
  const [orderBy, setOrderBy] = React.useState<keyof T | undefined>();

  const serverProps = props.totalCount !== undefined ? (props as ServerPaginatedProps<T>) : null;

  const activePage        = serverProps?.page ?? page;
  const activeRowsPerPage = serverProps?.rowsPerPage ?? rowsPerPage;
  const activeTotalCount  = serverProps?.totalCount ?? rows.length;
  const activeOrder       = serverProps?.order ?? order;
  const activeOrderBy     = serverProps?.orderBy ?? orderBy;

  const handleRequestSort = (_event: React.MouseEvent<unknown>, property: keyof T ) => {
    if (serverProps?.onRequestSort) {

      serverProps.onRequestSort(property);

    } else {

      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    }
  }

  const handleChangePage = (_event: unknown, newPage: number) => {
    if (serverProps) {     

      serverProps.onPageChange(newPage);

    } else {

      setPage(newPage);
    }
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {

    const newRowsPerPage = parseInt(event.target.value, 10);

    if (serverProps) {

      serverProps.onRowsPerPageChange(newRowsPerPage);

    } else {

      setRowsPerPage(newRowsPerPage);
      setPage(0);
    }
  }

  const visibleRows = React.useMemo(() => {

    if (serverProps) {
      return rows;
    }

    const sortedRows = activeOrderBy ? [...rows].sort(getComparator(activeOrder, activeOrderBy)) : [...rows];
    
    if (enablePagination) {
      return sortedRows.slice(activePage * activeRowsPerPage, activePage * activeRowsPerPage + activeRowsPerPage)
    }
    
    return sortedRows;

    }, [activeOrder, activeOrderBy, activePage, activeRowsPerPage, rows]
  );

  const paginationComponent = enablePagination && (
    <EnhancedTablePagination 
      rowsPerPageOptions={rowsPerPageOptions}
      totalCount={activeTotalCount}
      rowsPerPage={activeRowsPerPage}
      page={activePage}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  )

  return (
    <Paper 
      sx={{ 
        display:'inline-block', 
        borderRadius: 0,
        minWidth: '150px',
        maxWidth: '100%'
      }} 
    >
      {paginationComponent}
      <TableContainer 
        sx={{ 
          overflowX: 'auto', 
          maxWidth: '100%',
          overscrollBehaviorX: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <ExTable size='small'>
          {enableOrder ? (
            <EnhancedTableHead
              order={activeOrder}
              orderBy={activeOrderBy}
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
                      
                      return (
                        <TableCell
                          key={String(cell.id)}
                          align={cell.align}
                          component={cellIndex === 0 ? 'th' : 'td'}
                          id={cellIndex === 0 ? labelId : undefined}
                          scope={cellIndex === 0 ? 'row' : undefined}
                          sx={{ whiteSpace: 'nowrap', ...cell.sx }}
                        >
                          {cell.render ? (
                            cell.render(row)
                          ) : (
                            (() => {
                              const value = row[cell.id];
                              return typeof value === 'object' ? JSON.stringify(value) : String(value ?? '')
                            })()
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
      {paginationComponent}
    </Paper>
  );
}