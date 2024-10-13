'use client';

import React, { useEffect, useState } from 'react';

import dayjs, { Dayjs } from 'dayjs';
import duration, { Duration } from 'dayjs/plugin/duration';
import Image from 'next/image';

import CoinGIF from '@/assets/images/coin.gif';
import { CheckList } from '@/components/CheckList';
import { TimeSettings } from '@/components/TimeSettings';
import { Button } from '@/components/ui/button';
import { calTodaysSalary, checkManager } from '@/utils';

import styles from './page.module.scss';

dayjs.extend(duration);

const App = () => {
  const [state, setState] = useState<'start' | 'stop'>('stop');
  const [time, setTime] = useState<Duration | undefined>();
  const [salary, setSalary] = useState<number>();
  const [startTime, setStartTime] = useState<Dayjs | undefined>();
  const [checkList, setCheckList] = useState(checkManager.getCheckList());

  useEffect(() => {
    const latestCheck = checkManager.getLatestCheck();
    // 打卡开始，暂未结束
    if (latestCheck?.startTime && !latestCheck?.endTime) {
      setStartTime(dayjs(latestCheck?.startTime));
      setState('start');
    }
    let interval: any;
    interval = setInterval(() => {
      setSalary(calTodaysSalary());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    let interval: any;
    if (state === 'start') {
      interval = setInterval(() => {
        const currentTime = dayjs();
        const elapsedTime = currentTime.diff(startTime, 'millisecond');
        const formattedTime = dayjs.duration(elapsedTime);
        setTime(formattedTime);
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [state, startTime]);

  const handleStartOrStop = () => {
    if (state === 'stop') {
      const now = dayjs();
      !startTime && setStartTime(now);
      checkManager.setCheckList({ startTime: +now });
      setState('start');
    } else {
      setState('stop');
      checkManager.setCheckList({ startTime: startTime?.valueOf(), endTime: +dayjs() });
      setStartTime(undefined);
      setTime(undefined);
    }
    setCheckList(checkManager.getCheckList());
  };

  return (
    <div className={styles.container}>
      <TimeSettings />
      <CheckList checkList={checkList} />
      <Image src={CoinGIF} alt="coin" className={styles.coin} />
      <div className={styles.calculator}>{time?.format('HH:mm:ss') ?? '00:00:00'}</div>
      {salary ? (
        <>
          <div className={styles.text}>今日收入</div>
          <div className="flex items-center">
            <div className="text-[28px]">{salary.toFixed(2)}</div>
            <div className="text-[14px] font-semibold ml-[8px]">元</div>
          </div>
        </>
      ) : null}
      <div className={styles.actions}>
        <Button onClick={handleStartOrStop}>{state === 'start' ? '下班打卡 🥳' : '上班打卡 🫨'}</Button>
      </div>
    </div>
  );
};

export default App;
