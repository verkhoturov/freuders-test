import React from 'react';
import { Page } from './Page';
import { useAppDispatch, useAppSelector, fetchSpecialists, RootState } from '../store';

import { FilterForm } from './FilterForm';
import { CardList } from './CardList';
import { Divider, Center } from '@chakra-ui/react';

import '../styles/global.scss';

export const App = () => {
    const dispatch = useAppDispatch();
    const filterFormState = useAppSelector((state: RootState) => state.filterForm);

    React.useEffect(() => {
        dispatch(fetchSpecialists(filterFormState));
    }, []);

    return (
        <Page>
            <FilterForm />
            <Center height="50px">
                <Divider />
            </Center>
            <CardList />
        </Page>
    );
};
