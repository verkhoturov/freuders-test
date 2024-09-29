import { useAppSelector, RootState } from '../store';
import { EmptySearchIcon } from './Icons';
import { Card } from './Card';

import styles from './CardList.module.scss';

export const CardList = () => {
    const { loading, list } = useAppSelector((state: RootState) => state.specialists);

    if (loading && list.length === 0) return null;

    if (list.length === 0) {
        return (
            <div className={styles.emptyWrapper}>
                <div className={styles.emptyInner}>
                    <EmptySearchIcon />
                    <p>
                        К сожалению, нет анкет <br /> с такими параметрами{' '}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.list}>
            {list.map((specialist) => (
                <Card key={specialist.userId} {...specialist} />
            ))}
        </div>
    );
};
