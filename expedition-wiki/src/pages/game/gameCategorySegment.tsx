import { Link } from 'react-router-dom';

import { useGameContext } from '../../context/gameContext';

import { Categories, type Category } from '../../services/categoryManager';

import ExCard from "../../components/exCard/exCard";
import { Box, CardContent, Grid, Typography } from "@mui/material";

interface CategoryCardProps {
  category: Category
  index: number,
}

function CategoryCard({ category, index }: CategoryCardProps) {

  const { gameModel } = useGameContext();

  return (
    <Grid key={index} size={1}>
      <ExCard key={index}>
        <CardContent sx={{ height: '100%', padding: 1, '&:last-child': { paddingBottom: 1 } }}>
          <Typography align='center' noWrap sx={{width: '100%'}}>
            <Link 
              className='link'
              to={`/${ gameModel.name }/${ category.page }`}
              mask={`/${ gameModel.name.replaceAll(' ', '_')}/${ category.page }`}
            >
              {category.label}
            </Link>
          </Typography>
        </CardContent>
      </ExCard>
    </Grid>
  )
}

export default function GameCategorySegment() {

	return (
    <Box>
      <Grid 
        container
        spacing={2}
        columns={{ 
          xs: 2, 
          sm: Math.ceil(Categories.length / 3), 
          md: Math.ceil(Categories.length / 2), 
          lg: Categories.length 
        }}
        sx={{
          width: '100%',
          padding: 5,
          boxSizing: 'border-box' 
        }}
      >
        {Categories.map((category, index) => (
          <CategoryCard category={category} index={index} />
        ))}
      </Grid>
    </Box>
	)
}