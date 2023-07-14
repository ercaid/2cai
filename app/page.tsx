'use client';

import { Card } from '@/components/Card';

import styles from './page.module.scss';

const Record = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Days</div>
      <Card description="卡卡按下按钮" date="2023/07/08 21:59:58" emoji="🥺" needAccurate={true} />
      <Card
        description="卡卡回北京"
        date="2023/07/21 23:00:00"
        emoji="🥰"
        background="#fbeceb"
        needAccurate={true}
      />
    </div>
  );
};

export default Record;
