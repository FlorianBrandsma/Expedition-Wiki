import * as React from 'react';
import { alpha } from '@mui/material/styles';
import { TablePagination } from '@mui/material';

interface EnhancedTablePaginationProps {
  rowsPerPageOptions: number[];
  totalCount: number;
  rowsPerPage: number;
  page: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function EnhancedTablePagination(props: EnhancedTablePaginationProps) {
  const { rowsPerPage, totalCount, rowsPerPageOptions, page, onPageChange, onRowsPerPageChange } = props;

  return (
    <TablePagination
      component='div'
      rowsPerPageOptions={rowsPerPageOptions}
      count={totalCount}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
      sx={{ 
        backgroundColor: 'primary.light',
        maxWidth: '100%',

        '& .MuiTablePagination-toolbar': {
          flexWrap: { xs: 'wrap', sm: 'nowrap' },
          justifyContent: { xs: 'center', sm: 'flex-end' },
          paddingLeft: { xs: 1, sm: 0 },
          paddingRight: { xs: 1, sm: 0},
          minHeight: { xs: 1, sm: '52px' },
          py: { xs: 1, sm: 0 }
        },

        '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
          my: { xs: 0.5, sm: 0 }
        },

        '& .MuiTablePagination-actions': {
          marginLeft: { xs: 'auto', sm: 2 },
          marginRight: { xs: 'auto', sm: 0 }
        }
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
  )
}