'use client';

import React, { useEffect, useState } from 'react';

import dayjs, { Dayjs } from 'dayjs';
import duration, { Duration } from 'dayjs/plugin/duration';
import { Clock } from 'lucide-react';
import Image from 'next/image';

import CoinGIF from '@/assets/images/coin.gif';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Label } from '@/components/ui/label';
import { TimePickerInput } from '@/components/ui/time-picker-input';

import styles from './page.module.scss';

dayjs.extend(duration);

const App = () => {
  const [state, setState] = useState<'start' | 'stop'>('stop');
  const [time, setTime] = useState<Duration | undefined>();
  const [startTime, setStartTime] = useState<Dayjs | undefined>();

  const minuteRef = React.useRef<HTMLInputElement>(null);
  const hourRef = React.useRef<HTMLInputElement>(null);
  const secondRef = React.useRef<HTMLInputElement>(null);
  const [date, setDate] = useState<Date>();

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
      <Drawer>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>设置</DrawerTitle>
            <DrawerDescription>请输入一些基本信息</DrawerDescription>
          </DrawerHeader>
          <div className="flex items-end gap-2">
            <div className="grid gap-1 text-center">
              <Label htmlFor="hours" className="text-xs">
                Hours
              </Label>
              <TimePickerInput
                picker="hours"
                date={date}
                setDate={setDate}
                ref={hourRef}
                onRightFocus={() => minuteRef.current?.focus()}
              />
            </div>
            <div className="grid gap-1 text-center">
              <Label htmlFor="minutes" className="text-xs">
                Minutes
              </Label>
              <TimePickerInput
                picker="minutes"
                date={date}
                setDate={setDate}
                ref={minuteRef}
                onLeftFocus={() => hourRef.current?.focus()}
                onRightFocus={() => secondRef.current?.focus()}
              />
            </div>
            <div className="grid gap-1 text-center">
              <Label htmlFor="seconds" className="text-xs">
                Seconds
              </Label>
              <TimePickerInput
                picker="seconds"
                date={date}
                setDate={setDate}
                ref={secondRef}
                onLeftFocus={() => minuteRef.current?.focus()}
              />
            </div>
            <div className="flex h-10 items-center">
              <Clock className="ml-2 h-4 w-4" />
            </div>
          </div>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default App;
