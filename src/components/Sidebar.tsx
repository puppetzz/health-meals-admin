'use client';

import {
  IconUser,
  IconToolsKitchen2,
  IconCalendarEvent,
} from '@tabler/icons-react';
import { cn } from '../lib/utils';
import { useDisclosure } from '@mantine/hooks';
import { Burger } from '@mantine/core';
import { usePathname, useRouter } from 'next/navigation';

export function Sidebar() {
  const [opened, { toggle }] = useDisclosure(false);
  const router = useRouter();

  const pathName = usePathname();

  const isActive = (currentPathName: string) => {
    return pathName.includes(currentPathName);
  };

  return (
    <div
      className={cn(
        'sticky top-0  h-screen bg-gray-200 flex flex-col',
        opened ? 'w-60' : 'w-12',
        'transition-opacity'
      )}
    >
      {opened ? (
        <div>
          <div className="flex justify-end p-3">
            <Burger
              opened={opened}
              onClick={toggle}
              aria-label="Toggle navigation"
            />
          </div>
          <div className="mt-2 flex flex-col gap-1 p-2">
            <div
              className={cn(
                'flex gap-2 p-2 hover:bg-[#ff885c] rounded-lg',
                isActive('/users') ? 'bg-[#ff885c]' : ''
              )}
              onClick={() => {
                router.push('/users');
              }}
            >
              <IconUser />
              <span className="font-semibold text-md">Quản Lý Người Dùng</span>
            </div>
            <div
              className={cn(
                'flex gap-2 p-2 hover:bg-[#ff885c] rounded-lg',
                isActive('/recipes') ? 'bg-[#ff885c]' : ''
              )}
              onClick={() => {
                router.push('/recipes');
              }}
            >
              <IconToolsKitchen2 />
              <span className="font-semibold text-md">Quản Lý Công Thức</span>
            </div>
            <div
              className={cn(
                'flex gap-2 p-2 hover:bg-[#ff885c] rounded-lg',
                isActive('/meal-plans') ? 'bg-[#ff885c]' : ''
              )}
              onClick={() => {
                router.push('/meal-plans');
              }}
            >
              <IconCalendarEvent />
              <span className="font-semibold text-md">Kế Hoạch Ăn Uống</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="">
          <div className="flex items-center justify-center py-3">
            <Burger
              opened={opened}
              onClick={toggle}
              aria-label="Toggle navigation"
            />
          </div>
          <div
            className={cn(
              'flex p-2 hover:bg-[#ff885c] rounded-lg justify-center m-1',
              isActive('/users') ? 'bg-[#ff885c]' : ''
            )}
            onClick={() => {
              router.push('/users');
            }}
          >
            <IconUser />
          </div>
          <div
            className={cn(
              'flex p-2 hover:bg-[#ff885c] rounded-lg justify-center m-1',
              isActive('/recipes') ? 'bg-[#ff885c]' : ''
            )}
            onClick={() => {
              router.push('/recipes');
            }}
          >
            <IconToolsKitchen2 />
          </div>
          <div
            className={cn(
              'flex p-2 hover:bg-[#ff885c] rounded-lg justify-center m-1',
              isActive('/meal-plans') ? 'bg-[#ff885c]' : ''
            )}
            onClick={() => {
              router.push('/meal-plans');
            }}
          >
            <IconCalendarEvent />
          </div>
        </div>
      )}
    </div>
  );
}
