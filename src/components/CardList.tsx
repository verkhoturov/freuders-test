import React from 'react';
import { RootState, useAppDispatch, setSpecialistsList, useAppSelector } from '../store';
import { EmptySearchIcon } from './Icons';
import { Card } from './Card';
import { Button } from './Button';
import { getSpecialistsList } from '../api/getSpecialistsList';

import styles from './CardList.module.scss';

export const CardList = () => {
    const [loadingMore, setLoadingMore] = React.useState(false);
    const [hideLoadMoreButton, setHideLoadMoreButton] = React.useState(false);
    const { loading, list } = useAppSelector((state: RootState) => state.specialists);

    const dispatch = useAppDispatch();
    const filterFormState = useAppSelector((state: RootState) => state.filterForm);

    const onLoadMore = async () => {
        setLoadingMore(true);

        const offfset = list.length;

        const newList = await getSpecialistsList(filterFormState, offfset);

        if (newList?.items?.length) {
            const updatedList = [...list, ...newList.items];
            dispatch(setSpecialistsList(updatedList));
        } else {
            setHideLoadMoreButton(true);
        }
        setLoadingMore(false);
    };

    if (loading && list.length === 0) return null;

    if (list.length === 0) {
        return (
            <div className={styles.emptyWrapper}>
                <div className={styles.emptyInner}>
                    <EmptySearchIcon />
                    <p>
                        К сожалению, нет анкет <br /> с такими параметрами
                    </p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className={styles.list}>
                {list.map((specialist) => (
                    <Card key={specialist.userId} {...specialist} />
                ))}
            </div>

            {list.length > 0 && (
                <div className={styles.loadButton}>
                    {hideLoadMoreButton ? (
                        <p>К сожалению, больше нет анкет с такими параметрами</p>
                    ) : (
                        <Button onClick={onLoadMore} colorScheme="pink" isLoading={loadingMore}>
                            Показать еще
                        </Button>
                    )}
                </div>
            )}
        </>
    );
};
