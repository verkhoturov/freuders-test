import { Page } from "./Page";
import { FilterForm } from "./FilterForm";
import { CardList } from "./CardList";
import { Divider, Center } from '@chakra-ui/react';

import "../styles/global.scss";

export const App = () => {
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
