import * as React from 'react';
import { type SxProps, type Theme } from '@mui/material/styles';
import { Paper, Typography, TableContainer, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import ExTable from '../../components/exTable/exTable';

type BaseHeadCell = {
  label: string;
  align: 'right' | 'left' | 'center';
  sx?: SxProps<Theme>;
}

type AutoHeadCell<T> = BaseHeadCell & {
  id: keyof T;
  render?: (row: T) => React.ReactNode;
}

type RenderHeadCell<T> = BaseHeadCell & {
  id?: never;
  render: (row: T) => React.ReactNode;
}

export type HeadCell<T> = AutoHeadCell<T> | RenderHeadCell<T>

interface BasicTableHeadProps<T> {
  headCells: readonly HeadCell<T>[];
}

function BasicTableHead<T>({ headCells }: BasicTableHeadProps<T>) {

  return (
    <TableHead>
      <TableRow sx={{ backgroundColor: 'primary.dark' }}>
        {headCells.map((headCell, index) => (
          <TableCell
            key={String(headCell.id ?? index)}
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

interface BasicTableProps<T> extends BasicTableHeadProps<T> {
  rows: T[];
  rowKey: keyof T;
}

export default function BasicTable<T extends Record<string, any>>(props: BasicTableProps<T>) {

  const { rows, headCells, rowKey } = props;

  return (
    <Paper 
      sx={{ 
        display:'inline-block', 
        borderRadius: 0,
        minWidth: '150px',
        maxWidth: '100%'
      }} 
    >
      <TableContainer sx={{ overflowX: 'auto', maxWidth: '100%' }}>
        <ExTable size='small'>
          <BasicTableHead
            headCells={headCells}
          />
          <TableBody>
            {rows.map((row, index) => {
              return (
                <TableRow key={String(row[rowKey])}>
                  {
                    headCells.map((cell, cellIndex) => {

                      const cellKey = (cell.id as string) || `$c-${index}-${cellIndex}`;

                      return (
                        <TableCell
                          key={cellKey}
                          align={cell.align}
                          component={cellIndex === 0 ? 'th' : 'td'}
                          scope={cellIndex === 0 ? 'row' : undefined}
                          sx={{ whiteSpace: 'nowrap', ...cell.sx }}
                        >
                          {cell.render ? (
                            cell.render(row)
                          ) : (
                            (() => {

                              if (!cell.id) return;
                              
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
    </Paper>
  );
}
