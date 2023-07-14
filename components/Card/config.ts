import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(duration);

/** 获取时间间隔 */
export const getDayDiff = (date: string) => {
  let startTime;
  let endTime;
  let isCountDown;

  if (dayjs().isBefore(dayjs(date))) {
    startTime = dayjs();
    endTime = dayjs(date);
    isCountDown = true;
  } else {
    startTime = dayjs(date);
    endTime = dayjs();
    isCountDown = false;
  }

  // 计算时间差
  const duration = dayjs.duration(endTime.diff(startTime));

  // 提取天数、小时数、分钟数和秒数
  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();

  return {
    isCountDown,
    days,
    hours,
    minutes,
    seconds,
  };
};
