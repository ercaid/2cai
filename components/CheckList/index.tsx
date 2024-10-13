import dayjs from 'dayjs';
import { List } from 'lucide-react';

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { IChecks } from '@/utils';

import { ScrollArea } from '../ui/scroll-area';

export const CheckList = ({ checkList: originCheckList }: { checkList: IChecks[] }) => {
  const checkList = [...originCheckList];

  return (
    <Drawer>
      <DrawerTrigger>
        <List className="h-[22px] w-[22px] fixed top-[12px] right-[50px]" />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>打卡记录</DrawerTitle>
        </DrawerHeader>
        <div className="px-4 mb-7">
          <ScrollArea className="h-[60vh] rounded-md border p-4">
            {checkList.length
              ? checkList.reverse().map((item, index) => {
                  return (
                    <div key={index} className="text-[12px] mb-2">
                      <div className="font-semibold">{dayjs(item.startTime).format('YYYY-MM-DD')}</div>
                      <span className="mr-2">开始时间: {dayjs(item.startTime).format('HH:mm:ss')}</span>
                      <span>结束时间: {item.endTime ? dayjs(item.endTime).format('HH:mm:ss') : '--'}</span>
                    </div>
                  );
                })
              : '暂无数据'}
          </ScrollArea>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
