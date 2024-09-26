import { Select as UISelect, Flex, useMediaQuery } from '@chakra-ui/react';
import clsx from 'clsx';
import styles from './Select.module.scss';

interface SelectProps {
  name?: string;
  id?: string;
  placeholder?: string;
  options: {
    value?: number;
    label: string
  }[];
  label?: string;
  isLargeLabel?: boolean;
}

export const Select = ({ label, options, isLargeLabel, ...rest }: SelectProps) => {
  return (
    <div className={styles.wrapper}>
      {label && <label className={clsx(styles.label, { [styles.large]: isLargeLabel })} htmlFor={rest.id}>{label}</label>}

      <UISelect className={styles.uiSelect} size="lg" {...rest}>
        {options.map(({ value, label }, i) => <option key={i} value={value}>{label}</option>)}
      </UISelect>
    </div>
  )
}

export const SelectAgeRange = ({ label }: { label?: string }) => {
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');
  const options = new Array(82).fill(0).map((_, index) => ({
    value: index + 18,
    label: `${index + 18}`
  }));

  return (
    <div className={clsx(styles.wrapper, styles.ageRange)}>
      {label && <label className={styles.label} htmlFor="age-range">{label}</label>}

      <Flex className={styles.inner} alignItems="center" justifyContent="space-between">
        <Flex alignItems="center" gap={isLargerThan768 ? 3 : 1} flexBasis={124}>
          <span>От</span>
          <UISelect className={styles.uiSelect} size="lg" id="age-range" name="age-range-from">
            {options.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
          </UISelect>
        </Flex>

        <Flex alignItems="center" gap={isLargerThan768 ? 3 : 1} flexBasis={124}>
          <span>До</span>
          <UISelect className={styles.uiSelect} size="lg" id="age-range" name="age-range-from" defaultValue={options[options.length - 1].value}>
            {options.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
          </UISelect>
        </Flex>
      </Flex>

    </div>
  )
}