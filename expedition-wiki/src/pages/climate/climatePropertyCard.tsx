import { useClimatePageContext } from './climatePageContext';

import type { ChunkModel } from '../../data/models/chunkModel';

import { CardContent, TableBody, TableCell, TableRow } from '@mui/material';

import ExCard from '../../components/exCard/exCard';
import ExCardHeader from '../../components/exCard/exCardHeader';
import ExCardTableRow from '../../components/exCard/exCardTableRow';
import ExCardTable from '../../components/exCard/exCardTable';
import ExLink from '../../components/exLink/exLink';
import ExCollapse from '../../components/exCollapse/exCollapse';
import ExTable from '../../components/exTable/exTable';
import ExIconThumbnail from '../../components/exIconThumbnail/exIconThumbnail';

interface ChunkTableProps {
  chunkModelList: ChunkModel[];
}

function ChunkTable({ chunkModelList }: ChunkTableProps) {

  return (
    <ExTable size='small'>
      <TableBody>
        {chunkModelList.map((row) => (
          <TableRow key={row.id}>
            <TableCell>
              {row.name}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </ExTable>
  )
}

export default function ClimatePropertyCard() {

  const { climateModel } = useClimatePageContext();

  return (
    <ExCard sx={{ 
        float: 'right', 
        width: '250px',
        ml: 1, mb: 1
      }}
    >
      {climateModel.iconResourceName && (
        <>
          <ExCardHeader title={climateModel.name} />
          <CardContent 
            sx={{ 
              height: '100%', 
              padding: 1, 
              '&:last-child': { paddingBottom: 1 }
            }}
          >
            <ExIconThumbnail resourceName={climateModel.iconResourceName} />
          </CardContent>
        </>
      )}

      {/* Properties */}
      <ExCardHeader title='Properties' /> 
      <ExCardTable>
        <ExCardTableRow 
          label='Terrain' 
          value={<ExLink name={climateModel.terrainName} params={['terrain', climateModel.regionName, climateModel.terrainName]} />}
        />

        {/* Chunks */}
        {climateModel.chunkModelList.length > 0 && (
          <TableRow sx={{ '& > .MuiTableCell-root': { borderBottom: 'unset' } }}>
            <TableCell colSpan={2} sx={{ padding: 0 }}>
              <ExCollapse 
                label='Chunks'
                collapseComponent={
                  <ChunkTable chunkModelList={climateModel.chunkModelList} />
                }/>
            </TableCell>
          </TableRow>
        )} 
      </ExCardTable>
    </ExCard>
  )
}