import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { Card, CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

interface DataType {
  after: string;
  data: Card[];
}

export default function Home(): JSX.Element {
  const fetchImages = async ({ pageParam = null }): Promise<DataType> => {
    if (pageParam) {
      const { data } = await api.get('/api/images', {
        params: {
          after: pageParam,
        },
      });

      return data;
    }

    const { data } = await api.get('/api/images');

    return data;
  };

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    // TODO AXIOS REQUEST WITH PARAM
    fetchImages,
    // TODO GET AND RETURN NEXT PAGE PARAM
    {
      getNextPageParam: lastPage => lastPage.after ?? null,
    }
  );

  const formattedData = useMemo(() => {
    // TODO FORMAT AND FLAT DATA ARRAY
    let formattedDataArray = [];
    const dataPages = data?.pages;

    dataPages?.map(page => {
      formattedDataArray = [...formattedDataArray, ...page.data];
      // eslint-disable-next-line no-useless-return
      return;
    });

    return formattedDataArray;
  }, [data]);

  // TODO RENDER LOADING SCREEN
  if (isLoading) {
    return <Loading />;
  }

  // TODO RENDER ERROR SCREEN
  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && (
          <Button
            onClick={() => fetchNextPage({ pageParam: data.pages[0]?.after })}
          >
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}
