import React from 'react';
import { Select as UISelect, Flex, useMediaQuery } from '@chakra-ui/react';
import clsx from 'clsx';
import styles from './Select.module.scss';

export type SelectOption = {
  label: string;
  value?: string;
}

interface SelectProps {
  name?: string;
  id?: string;
  placeholder?: string;
  options: SelectOption[];
  label?: string;
  isLargeLabel?: boolean;
  onSelectionChange?: (value: string) => void;
}

export const Select = ({ label, options, isLargeLabel, onSelectionChange, ...rest }: SelectProps) => {

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onSelectionChange) {
      onSelectionChange(e.target.value);
    }
  }

  return (
    <div className={styles.wrapper}>
      {label && <label className={clsx(styles.label, { [styles.large]: isLargeLabel })} htmlFor={rest.id}>{label}</label>}

      <UISelect className={styles.uiSelect} size="lg" onChange={onChange}  {...rest}>
        {options.map(({ value, label }, i) => <option key={i} value={value}>{label}</option>)}
      </UISelect>
    </div>
  )
}

export const SelectAgeRange = ({ label, ageFrom, ageTo, onSelectionFrom, onSelectionTo }: {
  label?: string; ageFrom: string; ageTo: string; onSelectionFrom: (value: string) => void; onSelectionTo: (value: string) => void
}) => {
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');

  const options = new Array(82).fill(0).map((_, index) => ({
    value: index + 18,
    label: `${index + 18}`
  }));

  React.useEffect(() => {
    if (Number(ageFrom) > Number(ageTo)) {
      onSelectionFrom(ageTo);
      onSelectionTo(ageFrom);
    }
  }, [ageFrom, ageTo]);


  const onChangeFrom = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectionFrom(e.target.value);
  }

  const onChangeTo = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectionTo(e.target.value);
  }

  return (
    <div className={clsx(styles.wrapper, styles.ageRange)}>
      {label && <label className={styles.label} htmlFor="age-range">{label}</label>}

      <Flex className={styles.inner} alignItems="center" justifyContent="space-between">
        <Flex alignItems="center" gap={isLargerThan768 ? 3 : 1} flexBasis={124}>
          <span>От</span>
          <UISelect className={styles.uiSelect} value={ageFrom} onChange={onChangeFrom} size="lg" id="age-range" name="age-range-from">
            {options.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
          </UISelect>
        </Flex>

        <Flex alignItems="center" gap={isLargerThan768 ? 3 : 1} flexBasis={124}>
          <span>До</span>
          <UISelect className={styles.uiSelect} value={ageTo} onChange={onChangeTo} size="lg" id="age-range" name="age-range-from">
            {options.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
          </UISelect>
        </Flex>
      </Flex>

    </div>
  )
}