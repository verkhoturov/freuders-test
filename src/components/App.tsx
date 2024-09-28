import React from "react";
import { Page } from "./Page";
import { useAppDispatch, useAppSelector, fetchSpecialists, RootState } from '../store';
 
import { FilterForm } from "./FilterForm";
import { CardList } from "./CardList";
import { Spinner, Divider, Center, Flex } from '@chakra-ui/react'; 

import "../styles/global.scss";

export const App = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state: RootState) => state.specialists);
  const filterFormState = useAppSelector((state: RootState) => state.filterForm);

  React.useEffect(() => {
    dispatch(fetchSpecialists(filterFormState));
  }, []);

  if (loading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Page>
      <FilterForm />
      <Center height='50px'>
        <Divider />
      </Center>
      <CardList />
    </Page>
  )
}
