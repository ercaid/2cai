'use client';

import React, { useEffect, useState } from 'react';

import dayjs, { Dayjs } from 'dayjs';
import duration, { Duration } from 'dayjs/plugin/duration';
import Image from 'next/image';

import CoinGIF from '@/assets/images/coin.gif';
import { TimeSettings } from '@/components/TimeSettings';

import styles from './page.module.scss';

dayjs.extend(duration);

const App = () => {
  const [state, setState] = useState<'start' | 'stop'>('stop');
  const [time, setTime] = useState<Duration | undefined>();
  const [startTime, setStartTime] = useState<Dayjs | undefined>();

  useEffect(() => {
    let interval: any;
    if (state === 'start') {
      // 启动计时器
      interval = setInterval(() => {
        const currentTime = dayjs();
        const elapsedTime = currentTime.diff(startTime, 'millisecond');
        const formattedTime = dayjs.duration(elapsedTime);
        console.log({ currentTime, startTime, formattedTime });

        setTime(formattedTime);
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [state, startTime]);

  const handleStartOrStop = () => {
    if (state === 'stop') {
      !startTime && setStartTime(dayjs());
      setState('start');
    } else {
      setState('stop');
    }
  };

  return (
    <>
      <TimeSettings />
      <div className={styles.container}>
        <Image src={CoinGIF} alt="coin" className={styles.coin} />
        <div className={styles.calculator}>{time?.format('HH:mm:ss') ?? '00:00:00'}</div>
        <div className={styles.text}>You&apos;ve made: </div>
        <div className={styles.money}>${((time?.asSeconds() ?? 0) * 0.02).toFixed(2)}</div>
        <div className={styles.actions}>
          <div className={styles.btn} onClick={handleStartOrStop}>
            {state === 'start' ? 'stop' : 'start'}
          </div>
          <div className={styles.btn}>clear</div>
        </div>
      </div>
    </>
  );
};

export default App;
