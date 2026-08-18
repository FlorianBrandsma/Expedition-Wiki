import { Box, Table, TableBody, TableCell, TableRow } from "@mui/material";
import type { CaseConditionModel } from "../../data/models/caseConditionModel";

interface CaseConditionTableProps {
  caseConditionModelList: CaseConditionModel[];
}

export default function CaseConditionTable({ caseConditionModelList }: CaseConditionTableProps) {

  return (
    <>
      {caseConditionModelList.length > 0 && (
        <Table 
          size='small' 
          sx={{
            borderSpacing: '0 5px',
            '& .MuiTableCell-root': { border: 'none' }
          }}
        >
          <TableBody>
            {caseConditionModelList.map((caseConditionModel) => { 
              return (
                <TableRow key={caseConditionModel.id}>
                  <TableCell sx={{ padding: 0 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, maxWidth: '200px' }}>
                      <Box sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: 'primary.dark',
                        flexShrink: 0
                      }}/>
                      <Box>
                        {caseConditionModel.descriptionComponent()}
                      </Box>
                    </Box>
                  </TableCell>
                  
                </TableRow>
              )}
            )}
          </TableBody>
        </Table>
      )}
    </>
  )
}