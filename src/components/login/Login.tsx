'use client';

import { Button } from '@mantine/core';
import Image from 'next/image';
import { useAuth } from '../../context/AuthContext';

export function Login() {
  const { signInGoogle } = useAuth();

  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col">
      <h1 className="text-3xl font-bold uppercase mb-5">Đăng Nhập</h1>
      <Button
        variant="default"
        className="p-1 w-fit h-fit px-4"
        onClick={signInGoogle}
      >
        <Image
          src="/svg/google.svg"
          alt="google icon"
          height={40}
          width={40}
          className="mr-1"
        />
        <span className="font-bold text-lg">Đăng Nhập Với Google</span>
      </Button>
    </div>
  );
}
