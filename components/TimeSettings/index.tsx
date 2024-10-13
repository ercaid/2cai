import { useEffect, useState } from 'react';

import { Settings } from 'lucide-react';

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
import { settingManager } from '@/utils';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { TimePicker } from './TimePicker';

const initSettings = settingManager.getLocalSettings();

export const TimeSettings = () => {
  const [startTime, setStartTime] = useState<Date | undefined>(
    initSettings?.startTime ? new Date(initSettings?.startTime) : undefined,
  );
  const [endTime, setEndTime] = useState<Date | undefined>(
    initSettings?.endTime ? new Date(initSettings?.endTime) : undefined,
  );
  const [salary, setSalary] = useState<number | undefined>(initSettings?.salary);

  const handleConfirm = () => {
    settingManager.setLocalSettings({
      startTime: startTime?.getTime(),
      endTime: endTime?.getTime(),
      salary,
    });
  };

  useEffect(() => {
    console.log('test::', salary);
  }, [salary]);

  return (
    <Drawer>
      <DrawerTrigger>
        <Settings className="h-[22px] w-[22px] fixed top-[12px] right-[12px]" />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>设置</DrawerTitle>
          <DrawerDescription>请输入一些基本信息</DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          <TimePicker date={startTime} setDate={setStartTime} label="上班时间" />
          <div className="py-[12px]" />
          <TimePicker date={endTime} setDate={setEndTime} label="下班时间" />
          <div className="py-[12px]" />
          <div className="mb-2">
            <Label>月薪</Label>
          </div>
          <Input
            type="number"
            placeholder="请输入"
            value={salary || undefined}
            onChange={(e) => setSalary(Number(e.target.value))}
          />
          <div className="py-[8px]" />
        </div>
        <DrawerFooter>
          <div className="flex">
            <DrawerClose>
              <Button variant="outline">取消</Button>
            </DrawerClose>
            <Button
              className="flex-1 ml-2"
              disabled={!startTime || !endTime || !salary}
              onClick={handleConfirm}
            >
              <DrawerClose>确定</DrawerClose>
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
