import dayjs from 'dayjs';

interface ISettings {
  startTime?: number;
  endTime?: number;
  salary?: number;
}

const getLocalSettings = (): ISettings => {
  let finalRes = {};
  try {
    const res = localStorage.getItem('2cai_settings') ?? '{}';
    finalRes = JSON.parse(res);
  } catch {
    //
  }
  return finalRes;
};
const setLocalSettings = (props: ISettings) => {
  localStorage.setItem('2cai_settings', JSON.stringify(props));
};
export const settingManager = {
  getLocalSettings,
  setLocalSettings,
};

interface IChecks {
  startTime?: number;
  endTime?: number;
}

const getCheckList = (): IChecks[] => {
  let finalRes = [];
  try {
    const res = localStorage.getItem('2cai_checks') ?? '[]';
    finalRes = JSON.parse(res);
  } catch {
    //
  }
  return finalRes;
};
const getLatestCheck = () => {
  const res = getCheckList();

  return res?.length ? res[res.length - 1] : undefined;
};
const setCheckList = (props: IChecks) => {
  const checks = getCheckList();
  const latestCheck = getLatestCheck();

  if (latestCheck?.endTime || !checks.length) {
    checks.push(props);
  } else {
    checks[checks.length - 1] = props;
  }
  localStorage.setItem('2cai_checks', JSON.stringify(checks));
};
export const checkManager = {
  /** 获取打卡列表 */
  getCheckList,
  /** 获取最新一条打卡记录 */
  getLatestCheck,
  /** 设置打卡 */
  setCheckList,
};

/** 计算今天赚了多少钱 */
export const calTodaysSalary = () => {
  const settings = settingManager.getLocalSettings();
  if (!settings.startTime || !settings.endTime || !settings.salary) {
    return undefined;
  }
  // 时间进度
  const currentTime = dayjs();
  const elapsedTime = currentTime.diff(settings.startTime, 'millisecond');
  const totalTime = dayjs(settings.endTime).diff(settings.startTime, 'millisecond');

  const curSalary =
    (settings.salary / 30) * ((elapsedTime > totalTime ? totalTime : elapsedTime) / totalTime);

  console.log('test::', {
    curSalary,
    settings,
    elapsedTime,
    totalTime,
  });

  return curSalary;
};
