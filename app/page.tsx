'use client';

import React, { useEffect, useState } from 'react';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';

import styles from './page.module.scss';

dayjs.extend(utc);
dayjs.extend(duration);

const day = '2023/07/08 21:59:58';
const backday = '2023/07/21 23:00:00';

const Record = () => {
  const [timeDuration, setTimeDuration] = useState({
    d: 0,
    h: 0,
    m: 0,
    s: 0,
  });
  const [backTimeDuration, setBackTimeDuration] = useState({
    d: 0,
    h: 0,
    m: 0,
    s: 0,
  });

  /** 获取时间间隔 */
  const getDayDiff = () => {
    const endTime = dayjs();
    const startTime = dayjs(day);

    // 计算时间差
    const duration = dayjs.duration(endTime.diff(startTime));

    // 提取天数、小时数、分钟数和秒数
    const days = duration.days();
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    setTimeDuration({
      d: days,
      h: hours,
      m: minutes,
      s: seconds,
    });
  };

  /** 获取时间间隔 */
  const getBackDayDiff = () => {
    const startTime = dayjs();
    const endTime = dayjs(backday);

    // 计算时间差
    const duration = dayjs.duration(endTime.diff(startTime));

    // 提取天数、小时数、分钟数和秒数
    const days = duration.days();
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    setBackTimeDuration({
      d: days,
      h: hours,
      m: minutes,
      s: seconds,
    });
  };

  useEffect(() => {
    document.title = 'Days';

    getDayDiff();
    getBackDayDiff();

    const interval = setInterval(() => {
      getDayDiff();
      getBackDayDiff();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Days</div>
      <div className={styles.card}>
        <div className={styles.content}>
          <div className={styles.description}>卡卡按下按钮</div>
          <div className={styles.day}>{day}</div>
          <div>
            已经 <span className={styles.days}>{timeDuration.d}</span> 天 {timeDuration.h} 时 {timeDuration.m}{' '}
            分 {timeDuration.s} 秒
          </div>
        </div>
        <div className={styles.icon}>🥺</div>
      </div>

      <div className={styles.card} style={{ background: '#fbeceb' }}>
        <div className={styles.content}>
          <div className={styles.description}>卡卡回北京</div>
          <div className={styles.day}>{backday}</div>
          <div>
            还有 <span className={styles.days}>{backTimeDuration.d}</span> 天 {backTimeDuration.h} 时{' '}
            {backTimeDuration.m} 分 {backTimeDuration.s} 秒
          </div>
        </div>
        <div className={styles.icon}>🥰</div>
      </div>
    </div>
  );
};

export default Record;
