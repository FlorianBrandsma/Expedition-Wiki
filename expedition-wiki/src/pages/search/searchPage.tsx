import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useDebounce } from '../../hooks/useDebounce';

import { useGameContext } from '../../context/gameContext';

import { WikiSearchResultModel } from '../../data/models/wikiSearchResultModel';
import { WikiSearchResultPageModel } from '../../data/models/pages/wikiSearchResultPageModel';
import { WikiSearchResultPageParameters } from '../../data/parameters/pages/wikiSearchResultPageParameters';
import { getData } from '../../services/dataManager';

import { WikiSearchResultType } from '../../types/enums'

import { Box, Button, Stack, Typography } from '@mui/material';

import PageHeader from '../general/components/pageHeader';

import EnhancedTable, { type HeadCell } from '../../components/enhancedTable/enhancedTable';
import ExFilterSelection from '../../components/exFilterSelection/exFilterSelection';
import ExTextField from '../../components/exTextField/exTextField';
import ExIcon from '../../components/exIcon/exIcon';
import ExLink from '../../components/exLink/exLink';

export default function SearchPage() {

  document.title = 'Search - Expedition Wiki';

  const { gameModel } = useGameContext();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState<string>('');
  const [wikiSearchResultType, setWikiSearchResultType] = useState<number[]>([]);
  const [nameInput, setNameInput] = useState<string>('');
  const debouncedName = useDebounce<string>(nameInput, 500);

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(25);

  /* Save parameters from URL */
  const [routeParams, setRouteParams] = useState(() => 
    Object.fromEntries(searchParams)
  );

  useEffect(() => {
    /* Reset parameters when the page has been opened */
    if (searchParams.size > 0) {
      setRouteParams(Object.fromEntries(searchParams));

      /* Remove parameters from URL */
      const cleanPath = location.mask?.pathname ?? location.pathname;
      navigate(cleanPath, { replace: true, mask: cleanPath });
    }
  }, [searchParams, navigate, location.pathname]);

  /* Set default filters */
  useEffect(() => {

    setName(routeParams.name);

    const wikiSearchResultTypeIndex = WikiSearchResultType.findIndex(type => type == routeParams.wikiSearchResultType);

    setWikiSearchResultType(wikiSearchResultTypeIndex >= 0 ? [wikiSearchResultTypeIndex] : [])

  }, [routeParams])

  const handleWikiSearchResultTypeChange = (wikiSearchResultType: number[]) => {
    setWikiSearchResultType(wikiSearchResultType);
    setPage(0);
  }

  useEffect(() => {
    setName(debouncedName);
    setPage(0);
  }, [debouncedName])

	const parameters = useMemo(() => new WikiSearchResultPageParameters({
		gameId:               [gameModel.id],
    page:                 page,
    pageSize:             rowsPerPage,
    wikiSearchResultType: wikiSearchResultType,
    partialName:          name,
	}), [gameModel, wikiSearchResultType, name, page, rowsPerPage]);

	const wikiSearchResultQuery = useQuery<WikiSearchResultPageModel[]>({
		queryKey: ["parameters", parameters],
		queryFn: () => getData(parameters, WikiSearchResultPageModel),
    enabled: name.length > 0,
		initialData: []
	});

  const headers = useMemo<HeadCell<WikiSearchResultModel>[]>(() => [
    { 
      id: 'name', 
      label: 'Name', 
      align: 'left',
      render: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {row.iconResourceName && (
            <ExIcon resourceName={row.iconResourceName} size={20} />
          )}
          <ExLink name={row.name} params={row.params} optionalParams={row.optionalParams} />
        </Box>
      )
    },
    {
      id: 'typeDescription',
      label: 'Type',
      align: 'left'
    },
    {
      id: 'description',
      label: 'Description',
      align: 'left'
    },
  ], [gameModel]);

	return (
		<Box sx={{ display: "flex", flexDirection: "column"}}>
			<PageHeader primaryName='Search' />
      <Stack 
        spacing={2} 
        direction="column" 
        sx={{ pt: 1, pb: 1, width: '750px', maxWidth: '100%' }}
      >
        <ExTextField
          label={"Name"}
          defaultValue={name}
          setValue={setNameInput}
        />
        <ExFilterSelection 
          label={"Type"}
          types={WikiSearchResultType} 
          type={wikiSearchResultType}
          setType={handleWikiSearchResultTypeChange} 
        />
      </Stack>
			{wikiSearchResultQuery.isLoading ? (
				<Typography variant="h5">Loading...</Typography>
			) : (
				<Stack spacing={1} direction="column" sx={{ width: '750px', maxWidth: '100%' }}>
          <EnhancedTable 
            rowKey="key" 
            rows={wikiSearchResultQuery.data[0]?.wikiSearchResultModelList ?? []}
            totalCount={wikiSearchResultQuery.data[0]?.totalCount ?? 0}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={setPage}
            onRowsPerPageChange={(size) => {
              setRowsPerPage(size);
              setPage(0);
            }}
            headCells={headers} 
            enablePagination 
          />
					<Button onClick={() => wikiSearchResultQuery.refetch()}>
						Reload
					</Button>
				</Stack>
			)}
		</Box>
	)
}