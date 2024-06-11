'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCreateQueryString } from '../../hooks';
import { DEFAULT_PAGE_SIZE } from '../../common/constants';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActionIcon,
  Avatar,
  Button,
  Input,
  Pagination,
  Rating,
  Table,
} from '@mantine/core';
import {
  IconEdit,
  IconTrash,
  IconSearch,
  IconX,
  IconEye,
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useMealPlansQuery } from '../../queries/useMealPlans';
import { useDeleteMealPlanMutation } from '../../mutation/useDeleteMealPlan';

export default function MealPlans() {
  const [openedSearchBox, { toggle: toggleSearchBox }] = useDisclosure(false);
  const [searchBoxValue, setSearchBoxValue] = useState<string>('');

  const router = useRouter();
  const searchParams = useSearchParams();
  const createQueryString = useCreateQueryString();
  const pathname = usePathname();

  const page = Number.parseInt(searchParams.get('page') || '1') || 1;
  const pageSize = DEFAULT_PAGE_SIZE;
  const search = searchParams.get('q') || '';

  const deleteMealPlanMutation = useDeleteMealPlanMutation();

  const { data, refetch } = useMealPlansQuery({
    page,
    pageSize,
    search,
  });

  const onPageChange = useCallback(
    (page: number) => {
      const queryString = createQueryString({
        q: search,
        page: page.toString(),
      });
      router.push(pathname + '?' + queryString);
    },
    [pathname, router, createQueryString, search]
  );

  const handleSearchBoxChange = useCallback(
    (value: string) => {
      setSearchBoxValue(value);
      const queryString = createQueryString({
        q: value,
        page: page.toString(),
      });
      router.push(pathname + '?' + queryString);
    },
    [pathname, page, createQueryString, router]
  );

  const mealPlans = useMemo(() => {
    if (!data) return [];

    return data.data.data;
  }, [data]);

  const handleDeleteMealPlan = (id: number) => {
    deleteMealPlanMutation.mutateAsync(id).then(() => {
      refetch();
    });
  };

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  return (
    <div className="max-w-[1500px] mx-auto px-5">
      <h2 className="text-xl font-bold mt-5">
        Quản Lý Kế Hoạch Cho Các Bửa Ăn
      </h2>
      <div className="my-3 flex justify-between">
        <div>
          <Button color="orange" onClick={() => router.push('/meal-plans/new')}>
            Tạo Kế Hoạch
          </Button>
        </div>
        <div className="flex gap-2">
          <div className="flex gap-1 items-center">
            {openedSearchBox && (
              <Input
                value={searchBoxValue}
                onChange={(event) => handleSearchBoxChange(event.target.value)}
              />
            )}
            <ActionIcon
              variant="light"
              aria-label="edit"
              color="orange"
              size="lg"
              onClick={() => {
                toggleSearchBox();
              }}
            >
              {openedSearchBox ? (
                <IconX style={{ width: '70%', height: '70%' }} stroke={1.5} />
              ) : (
                <IconSearch
                  style={{ width: '70%', height: '70%' }}
                  stroke={1.5}
                />
              )}
            </ActionIcon>
          </div>
        </div>
      </div>
      <div className="border-[1px] border-[#dfe2e6] rounded-lg">
        <Table striped className="flex flex-col">
          <Table.Thead className="w-full">
            <Table.Tr className="flex">
              <Table.Th className="w-12">STT</Table.Th>
              <div className="flex justify-between flex-1 ml-3">
                <Table.Th className="w-72">
                  <span className="pl-[44px]">Tiêu đề</span>
                </Table.Th>
                <Table.Th className="w-60">Tác giả</Table.Th>
                <Table.Th className="w-24">Trạng Thái</Table.Th>
                <Table.Th className="w-28">Đánh giá</Table.Th>
                <Table.Th className="w-32"></Table.Th>
              </div>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {mealPlans.map((mealPlan, index) => (
              <Table.Tr key={mealPlan.id} className="flex justify-between">
                <Table.Td className="font-semibold w-12">
                  {(page - 1) * pageSize + index + 1}
                </Table.Td>
                <div className="flex justify-between flex-1 ml-3">
                  <Table.Td className="flex gap-2 items-center font-semibold w-72">
                    <Avatar
                      src={mealPlan.mealPlanRecipe[0].recipe.post?.thumbnail}
                      radius="sm"
                    />
                    {mealPlan.title}
                  </Table.Td>
                  <Table.Td className="w-60">
                    {mealPlan.author?.fullName}
                  </Table.Td>
                  <Table.Td className="uppercase w-24">
                    {mealPlan.status}
                  </Table.Td>
                  <Table.Td className="w-28">
                    <Rating value={mealPlan.rating || 0} readOnly />
                  </Table.Td>
                  <Table.Td className="w-32">
                    <div className="flex gap-2">
                      <ActionIcon
                        variant="filled"
                        aria-label="view"
                        color="green"
                        onClick={() =>
                          router.push(`/meal-plans/${mealPlan.id}`)
                        }
                      >
                        <IconEye
                          style={{ width: '70%', height: '70%' }}
                          stroke={1.5}
                        />
                      </ActionIcon>
                      <ActionIcon
                        variant="filled"
                        aria-label="edit"
                        color="blue"
                        onClick={() =>
                          router.push(`/meal-plans/${mealPlan.id}/update`)
                        }
                      >
                        <IconEdit
                          style={{ width: '70%', height: '70%' }}
                          stroke={1.5}
                        />
                      </ActionIcon>
                      <ActionIcon
                        variant="filled"
                        aria-label="delete"
                        color="red"
                        onClick={() => handleDeleteMealPlan(mealPlan.id)}
                      >
                        <IconTrash
                          style={{ width: '70%', height: '70%' }}
                          stroke={1.5}
                        />
                      </ActionIcon>
                    </div>
                  </Table.Td>
                </div>
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
  );
}
