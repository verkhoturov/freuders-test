import React from 'react';
import { Flex, useMediaQuery } from '@chakra-ui/react';
import { Select, SelectAgeRange, SelectOption } from "./Select";
import { Button } from './Button';

import styles from './FilterForm.module.scss';

const sexOptions: SelectOption[] = [{
  label: 'Любого пола'
}, {
  value: "1",
  label: 'М'
}, {
  value: "2",
  label: 'Ж'
}];

const levelOptions = [{
  label: "Все варианты",
},
{
  value: "0",
  label: "Базовый",
},
{
  value: "1",
  label: "Премиум",
}];

const ratingOptions = [{
  label: "Не важен",
},
{
  value: "0",
  label: "Новые",
},
{
  value: "100",
  label: "От 100 до 80",
},
{
  value: "79",
  label: "От 79 до 60",
},
{
  value: "59",
  label: "От 59 до 40",
},
];

const topicOptions = [{
  label: "Любая тема"
}];

const SelectorWrapper = ({ children, alignItems }: { children: React.ReactNode; alignItems?: string }) => {
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');

  return <Flex basis={isLargerThan768 ? 312 : "100%"} alignItems={alignItems}>
    {children}
  </Flex>
}


export const FilterForm = () => {
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');
  const [sex, setSex] = React.useState("");
  const [topic, setTopic] = React.useState("");
  const [level, setLevel] = React.useState("");
  const [rating, setRating] = React.useState("");
  const [ageFrom, setAgeFrom] = React.useState("18");
  const [ageTo, setAgeTo] = React.useState("99");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <Flex justifyContent="space-between" wrap="wrap" rowGap={isLargerThan768 ? 9 : 5} columnGap={2}>
        <SelectorWrapper>
          <Select label="Я ищу психолога"
            id="sex"
            onSelectionChange={setSex}
            options={sexOptions}
            isLargeLabel
          />
        </SelectorWrapper>

        <SelectorWrapper>
          <SelectAgeRange label="В возрасте"
            ageFrom={ageFrom}
            ageTo={ageTo}
            onSelectionFrom={setAgeFrom}
            onSelectionTo={setAgeTo}
          />
        </SelectorWrapper>

        <SelectorWrapper >
          <Select label="Тема"
            id="topic"
            onSelectionChange={setTopic}
            options={topicOptions}
          />
        </SelectorWrapper>

        <SelectorWrapper >
          <Select label="Квалификация"
            id="level"
            onSelectionChange={setLevel}
            options={levelOptions}
          />
        </SelectorWrapper>

        <SelectorWrapper  >
          <Select label="Рейтинг"
            id="rating"
            onSelectionChange={setRating}
            options={ratingOptions}
          />
        </SelectorWrapper>


        <SelectorWrapper alignItems="flex-end" >
          <Button colorScheme='pink' type='submit'>Показать анкеты</Button>
        </SelectorWrapper>

      </Flex>
    </form>
  )
}
