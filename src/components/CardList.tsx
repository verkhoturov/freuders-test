import type { RootState } from '../store';
import { useSelector } from 'react-redux';
import { EmptySearchIcon } from "./Icons";

import styles from './CardList.module.scss';

export const CardList = () => {

  const specialistsList = useSelector((state: RootState) => state.specialists.list);

  console.log("specialistsList", specialistsList);

  if (specialistsList.length === 0) {
    return <div className={styles.emptyWrapper}>
      <div className={styles.emptyInner}>
        <EmptySearchIcon />
        <p>К сожалению, нет анкет <br /> с такими параметрами </p>
      </div>
    </div>
  }

  return (
    <div>
      {specialistsList.map(({name, userId}) => <p key={userId}>{name}</p>)}
    </div>
  )
}
