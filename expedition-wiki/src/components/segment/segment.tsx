import { Divider, Box, Typography } from '@mui/material';

import type { ContentSegment } from '../../components/contentTable/contentTable';

interface SegmentProps {
  segment: ContentSegment;
  subSegment?: boolean | undefined;
}

export default function Segment(props: SegmentProps) {

  const { segment, subSegment } = props;
  const { label, id, component, children } = segment;

  return (
    <Box id={id} sx={{ mt: subSegment ? 1 : 3, scrollMarginTop: '64px' }}>
      <Typography variant={ subSegment ? 'h6' : 'h5'}>{label}</Typography>
      {!subSegment && <Divider/>}
      {component}
      {children?.map((segment) => (
        <Segment key={segment.id} segment={segment} subSegment />     
      ))}
    </Box>
  )
}