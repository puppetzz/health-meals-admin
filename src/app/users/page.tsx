'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useUserQuery } from '../../queries';
import { useCreateQueryString } from '../../hooks';
import { DEFAULT_PAGE_SIZE } from '../../common/constants';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ActionIcon, Avatar, Button, Pagination, Table } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';

type UserTable = {
  id: string;
  stt: number;
  fullName: string;
  email: string;
  createdAt: Date;
  picture: string;
  role: string;
};

export default function Users() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const createQueryString = useCreateQueryString();
  const pathname = usePathname();

  const page = Number.parseInt(searchParams.get('page') || '1') || 1;
  const pageSize = DEFAULT_PAGE_SIZE;

  const { data, refetch } = useUserQuery({
    page,
    pageSize,
  });

  const onPageChange = useCallback(
    (page: number) => {
      const queryString = createQueryString({
        page: page.toString(),
      });
      router.push(pathname + '?' + queryString);
    },
    [pathname, router, createQueryString]
  );

  const users = useMemo(() => {
    if (!data) return [];

    return data.data.users.map((user, index) => ({
      id: user.id,
      stt: index + 1,
      fullName: user.fullName,
      email: user.email,
      createdAt: user.createdAt,
      picture: user.picture,
      role: user.role.name,
    }));
  }, [data]);

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  return (
    <div className="max-w-[1200px] mx-auto px-10">
      <div className="p-5">
        <h2 className="text-xl font-bold mt-5">Quản Lý Người Dùng</h2>
        <div></div>
        <div className="mt-5 border-[1px] border-[#dfe2e6] rounded-lg">
          <Table className="">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>STT</Table.Th>
                <Table.Th>Họ Tên</Table.Th>
                <Table.Th>Email</Table.Th>
                <Table.Th>Role</Table.Th>
                <Table.Th>Số Công Thức</Table.Th>
                <Table.Th></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {users.map((user, index) => (
                <Table.Tr key={user.id}>
                  <Table.Td className="font-semibold">
                    {(page - 1) * pageSize + index + 1}
                  </Table.Td>
                  <Table.Td className="flex gap-2 items-center font-semibold">
                    <Avatar src={user.picture} />
                    <span>{user.fullName}</span>
                  </Table.Td>
                  <Table.Td>{user.email}</Table.Td>
                  <Table.Td className="uppercase">{user.role}</Table.Td>
                  <Table.Td>{1}</Table.Td>
                  <Table.Td>
                    <div className="flex gap-2">
                      <ActionIcon
                        variant="filled"
                        aria-label="edit"
                        color="blue"
                      >
                        <IconEdit
                          style={{ width: '70%', height: '70%' }}
                          stroke={1.5}
                        />
                      </ActionIcon>
                      <ActionIcon
                        variant="filled"
                        aria-label="edit"
                        color="red"
                      >
                        <IconTrash
                          style={{ width: '70%', height: '70%' }}
                          stroke={1.5}
                        />
                      </ActionIcon>
                    </div>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </div>
        {!!data?.data.total && data?.data.total > 1 && (
          <div className="flex justify-end w-full mt-3">
            <Pagination
              total={data.data.total}
              color="orange"
              onChange={onPageChange}
              value={page}
            />
          </div>
        )}
      </div>
    </div>
  );
}
