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
