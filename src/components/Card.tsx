import { memo } from 'react';
import clsx from 'clsx';
import { Specialist, Sex, OnlineStatus } from '../types';
import { getTimeSince } from '../utils/getTimeSince';

import styles from './Card.module.scss';

// eslint-disable-next-line
interface CardProps extends Specialist {}

export const Card = memo(
    ({
        photoUrl,
        name,
        sex,
        age,
        onlineStatus,
        rating,
        defaultSubjectName,
        subjectsCount,
        lastActivityTime,
    }: CardProps) => {
        const isMan = sex === Sex.Male;
        const isOnline = onlineStatus === OnlineStatus.Online;
        const imgSrc = photoUrl
            ? photoUrl
            : isMan
              ? '/common/no_photo_man.svg'
              : '/common/no_photo_woman.svg';

        return (
            <div className={styles.wrapper}>
                <img className={styles.photo} src={imgSrc} alt={name} />

                <div className={styles.rating}>
                    <span className={styles.title}>РЕЙТИНГ</span>
                    <span className={styles.number}>{rating}</span>
                </div>

                <div className={styles.inner}>
                    <span
                        className={clsx(styles.name, {
                            [styles.isOnline]: isOnline,
                        })}
                    >
                        {name}, {age}
                    </span>
                </div>

                <div className={styles.inner}>
                    <span className={styles.topic}>
                        {defaultSubjectName}{' '}
                        {subjectsCount > 0 ? (
                            <span className={styles.more}>
                                и еще {subjectsCount} тем{subjectsCount > 1 ? 'ы' : 'а'}
                            </span>
                        ) : null}
                    </span>
                </div>

                {!isOnline && (
                    <span className={styles.offline}>
                        Был{isMan ? '' : 'а'} {getTimeSince(lastActivityTime)}
                    </span>
                )}
            </div>
        );
    },
);
