'use client';

import { Avatar, Indicator } from '@mantine/core';
import { useAuth } from '../context/AuthContext';
import { IconBellFilled } from '@tabler/icons-react';
import { Black_Ops_One } from 'next/font/google';
import { useRouter } from 'next/navigation';

const blackOpsOne = Black_Ops_One({
  subsets: ['latin'],
  weight: '400',
});

export function Navbar() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <>
      <nav className="flex h-14 justify-between bg-white sticky top-0 z-[100]">
        <div
          className={`${blackOpsOne.className} flex cursor-pointer flex-col items-center text-xl uppercase px-10`}
          onClick={() => {
            router.push('/');
          }}
        >
          <span>heathy</span>
          <span>meals</span>
        </div>
        <div className="flex items-center h-full pr-10 gap-5">
          <Indicator inline color="red" size={9} offset={6}>
            <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center">
              <IconBellFilled className="w-7 h-7" />
            </div>
          </Indicator>
          <Avatar src={user?.photoURL} />
        </div>
      </nav>
    </>
  );
}
