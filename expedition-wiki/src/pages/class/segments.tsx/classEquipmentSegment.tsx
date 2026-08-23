import { Link } from 'react-router-dom';

import { useGameContext } from '../../../context/gameContext';

import type { Category } from '../../../services/categoryManager';

import ExTable from '../../../components/exTable/exTable';
import { Box, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

interface ClassEquipmentSegmentProps {
  category: Category;
  typeList: string[];
  enumKey: string;
}

export default function ClassEquipmentSegmen({ category, typeList, enumKey }: ClassEquipmentSegmentProps) {

  const { gameModel } = useGameContext();

  return (
    <Box sx={{ mt: 1, maxWidth: '200px' }}>
      <ExTable size='small'>
        <TableHead>
          <TableRow sx={{ backgroundColor: 'primary.dark' }}>
            <TableCell>
              <Typography
                sx={{
                  color: 'primary.contrastText',
                  fontSize: '1rem'
                }}
              >
                {category.label}
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {typeList.map((type) => { 

            const state = {
              ...category.state,
              [enumKey]: type
            };

            const searchParams = `?${new URLSearchParams(state as any)}`;

            const path     = `/${ gameModel.name }/${ category.page }${searchParams}`;
            const maskPath = `/${ gameModel.name.replaceAll(' ', '_')}/${ category.page }${searchParams}`;

            return (
              <TableRow key={type}>
                <TableCell>
                  <Link 
                    className='link'
                    to={path}
                    mask={maskPath}
                  >
                    {type}
                  </Link>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </ExTable>
    </Box>
  )
}