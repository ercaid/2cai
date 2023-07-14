import { useEffect, useState } from 'react';

import { getDayDiff } from './config';
import styles from './index.module.scss';

interface CardProps {
  /** 描述 */
  description: string;
  /** 具体时间 */
  date: string;
  /** 表情图标 */
  emoji: string;
  /** 背景颜色 */
  background?: string;
  /** 是否精确模式 */
  needAccurate?: boolean;
}

export const Card = ({ description, date, emoji, needAccurate = false, background }: CardProps) => {
  const [timeDuration, setTimeDuration] = useState(getDayDiff(date));

  useEffect(() => {
    const interval = setInterval(() => {
      const res = getDayDiff(date);
      setTimeDuration(res);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [date]);

  return (
    <div className={styles.card} style={{ background }}>
      <div className={styles.content}>
        <div className={styles.description}>{description}</div>
        <div className={styles.date}>{date}</div>
        <div>
          <span>{timeDuration.isCountDown ? '还有' : '已经'} </span>
          <span className={styles.days}>{timeDuration.days}</span>
          <span> 天 </span>
          {needAccurate && (
            <span>
              {timeDuration.hours} 时 {timeDuration.minutes} 分 {timeDuration.seconds} 秒
            </span>
          )}
        </div>
      </div>
      <div className={styles.emoji}>{emoji}</div>
    </div>
  );
};
