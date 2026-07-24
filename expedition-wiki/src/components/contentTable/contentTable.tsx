import { Box, List, ListItem, Link } from '@mui/material';

import ExCard from '../../components/exCard/exCard';
import ExCollapse from '../../components/exCollapse/exCollapse';

export interface ContentSegment {
  label: string;
  id: string;
  component?: React.ReactNode;
  children?: ContentSegment[];
}

interface ContentTableItemProps {
  segment: ContentSegment;
}

function ContentTableItem(props: ContentTableItemProps) {

  const { id, label, children } = props.segment;

  return (
    <ListItem 
      disablePadding 
      sx={{ 
        display: 'block' 
      }}>
      <Link
        href={`#${id}`}
        underline='hover'
        sx={{
          typography: 'body1'
        }}
      >
        {label}
      </Link>

      {children && (
        <List sx={{ 
          borderLeft: '1px dotted', ml: 1, pt: 0.5, pb: 0, pl: 1.25, pr: 2.5 
        }}>
          {children.map((segment) => (
            <ContentTableItem key={segment.id} segment={segment} />
          ))}
        </List>
      )}
    </ListItem>
  )
}

interface ContentTableProps {
  segments: ContentSegment[];
}

export default function ContentTable(props: ContentTableProps) {

  const { segments } = props;

  return (
    <Box sx={{
        display: 'inline-block',
        minWidth: '200px',
        mt: 1.5
      }}>
      <ExCollapse 
        label='Content'
        isOpen={true}
        collapseComponent={
          <ExCard>
            <List sx={{ py: 1.25, px: 2.5}}>
              {segments.map((segment) => (
                <ContentTableItem key={segment.id} segment={segment} />
              ))}
            </List>
        </ExCard>
      }/>  
    </Box>
  )
}