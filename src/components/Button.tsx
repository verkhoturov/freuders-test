import { Button as UIButton, ButtonProps } from '@chakra-ui/react';
import styles from './Button.module.scss';

export const Button = ({ children, ...rest }: ButtonProps) => {
    return (
        <UIButton className={styles.button} size={'lg'} {...rest}>
            {children}
        </UIButton>
    );
};
