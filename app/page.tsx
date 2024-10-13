'use client';

import { AddBtn } from '@/components/AddBtn';
import { Card, CardProps } from '@/components/Card';

import styles from './page.module.scss';

const MOCK_LIST: CardProps[] = [
  {
    description: '卡卡按下按钮',
    date: '2023/07/08 21:59:58',
    emoji: '🥺',
    needAccurate: true,
  },
  {
    description: '卡卡回北京',
    date: '2023/07/21 23:00:00',
    emoji: '🥰',
    background: '#fbeceb',
  },
];

const Record = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Days</div>
      {MOCK_LIST.map((item, index) => {
        return (
          <Card
            key={item.description + index}
            description={item.description}
            date={item.date}
            background={item.background}
            emoji={item.emoji}
            needAccurate={item.needAccurate}
          />
        );
      })}

      <AddBtn />
    </div>
  );
};

export default Record;
