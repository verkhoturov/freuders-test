import React from 'react';
import { Flex, useMediaQuery } from '@chakra-ui/react';
import { Select, SelectAgeRange, SelectOption } from './Select';
import { Button } from './Button';
import { Sex, Level } from '../types';
import {
    RootState,
    useAppDispatch,
    setFormState,
    setSubjectsState,
    fetchSpecialists,
    useAppSelector,
} from '../store';

import styles from './FilterForm.module.scss';
import { getSubjectsList } from '../api/getSubjectsList';

const sexOptions: SelectOption[] = [
    {
        label: 'Любого пола',
    },
    {
        value: Sex.Male,
        label: 'М',
    },
    {
        value: Sex.Female,
        label: 'Ж',
    },
];

const levelOptions = [
    {
        label: 'Все варианты',
    },
    {
        value: Level.Basic,
        label: 'Базовый',
    },
    {
        value: Level.Premium,
        label: 'Премиум',
    },
];

const ratingOptions = [
    {
        label: 'Не важен',
    },
    {
        value: 0,
        label: 'Новые',
    },
    {
        value: 100,
        label: 'От 100 до 80',
    },
    {
        value: 79,
        label: 'От 79 до 60',
    },
    {
        value: 59,
        label: 'От 59 до 40',
    },
];

const SelectorWrapper = ({
    children,
    alignItems,
}: {
    children: React.ReactNode;
    alignItems?: string;
}) => {
    const [isLargerThan768] = useMediaQuery('(min-width: 768px)');

    return (
        <Flex basis={isLargerThan768 ? 312 : '100%'} alignItems={alignItems}>
            {children}
        </Flex>
    );
};

export const FilterForm = () => {
    const [isLargerThan768] = useMediaQuery('(min-width: 768px)');

    const [loading, setLoading] = React.useState(false);

    const dispatch = useAppDispatch();
    const filterFormState = useAppSelector((state: RootState) => state.filterForm);
    const subjectsState = useAppSelector((state: RootState) => state.subjects);

    const subjectOptions = React.useMemo(() => {
        const subjectsOptions: SelectOption[] = subjectsState.list.map((item) => ({
            value: item.id,
            label: item.name,
        }));

        return subjectsOptions;
    }, [subjectsState]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        dispatch(
            setFormState({
                ...filterFormState,
                [name]: value,
            }),
        );
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        await dispatch(fetchSpecialists(filterFormState));
        setLoading(false);
    };

    const getSubjects = async () => {
        if (subjectOptions.length === 1) {
            const res = await getSubjectsList();

            if (res?.list) {
                dispatch(
                    setSubjectsState({
                        list: res.list,
                    }),
                );
            }
        }
    };

    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <Flex
                justifyContent="space-between"
                wrap="wrap"
                rowGap={isLargerThan768 ? 9 : 5}
                columnGap={2}
            >
                <SelectorWrapper>
                    <Select
                        label="Я ищу психолога"
                        id="sex"
                        name="sex"
                        value={filterFormState.sex}
                        onSelectionChange={handleChange}
                        options={sexOptions}
                        isLargeLabel
                    />
                </SelectorWrapper>

                <SelectorWrapper>
                    <SelectAgeRange
                        label="В возрасте"
                        ageFrom={filterFormState.ageFrom}
                        ageTo={filterFormState.ageTo}
                        onSelectionChange={handleChange}
                    />
                </SelectorWrapper>

                <SelectorWrapper>
                    <Select
                        label="Тема"
                        id="subject"
                        name="subjectId"
                        value={filterFormState.subjectId}
                        onSelectionChange={handleChange}
                        options={subjectOptions}
                        onClick={getSubjects}
                    />
                </SelectorWrapper>

                <SelectorWrapper>
                    <Select
                        label="Квалификация"
                        id="level"
                        name="level"
                        value={filterFormState.level}
                        onSelectionChange={handleChange}
                        options={levelOptions}
                    />
                </SelectorWrapper>

                <SelectorWrapper>
                    <Select
                        label="Рейтинг"
                        id="rating"
                        name="rating"
                        value={filterFormState.rating}
                        onSelectionChange={handleChange}
                        options={ratingOptions}
                    />
                </SelectorWrapper>

                <SelectorWrapper alignItems="flex-end">
                    <Button colorScheme="pink" type="submit" isLoading={loading}>
                        Показать анкеты
                    </Button>
                </SelectorWrapper>
            </Flex>
        </form>
    );
};
