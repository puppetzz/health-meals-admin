'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useUserQuery } from '../../queries';
import { useCreateQueryString } from '../../hooks';
import { DEFAULT_PAGE_SIZE } from '../../common/constants';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActionIcon,
  Avatar,
  Button,
  ComboboxData,
  Input,
  Pagination,
  Rating,
  Select,
  Table,
} from '@mantine/core';
import {
  IconEdit,
  IconTrash,
  IconSearch,
  IconFilter,
  IconX,
  IconEye,
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useRecipesQuery } from '../../queries';
import { useFoodCategoriesQuery } from '../../queries/useFoodCategories';
import { late } from 'zod';

export default function Recipes() {
  const [openedSearchBox, { toggle: toggleSearchBox }] = useDisclosure(false);
  const [openedFilter, { toggle: toggleFilter }] = useDisclosure(false);
  const [searchBoxValue, setSearchBoxValue] = useState<string>('');
  const [foodCategorySelected, setFoodCategorySelected] = useState<string>('');

  const router = useRouter();
  const searchParams = useSearchParams();
  const createQueryString = useCreateQueryString();
  const pathname = usePathname();

  const page = Number.parseInt(searchParams.get('page') || '1') || 1;
  const pageSize = DEFAULT_PAGE_SIZE;
  const search = searchParams.get('q') || '';

  const { data, refetch } = useRecipesQuery({
    page,
    pageSize,
    search,
    category: searchParams.get('category') || '',
  });

  const { data: foodCategories } = useFoodCategoriesQuery();

  const foodCategoriesSelectData: ComboboxData = useMemo(() => {
    if (!foodCategories?.data) return [];

    return foodCategories.data.map((foodCategory) => ({
      value: foodCategory.key,
      label: foodCategory.name,
    }));
  }, [foodCategories]);

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
        category: searchParams.get('category') || '',
        calories: searchParams.get('calories') || '',
        protein: searchParams.get('protein') || '',
        fat: searchParams.get('fat') || '',
        carbs: searchParams.get('carbs') || '',
        sodium: searchParams.get('sodium') || '',
        fiber: searchParams.get('fiber') || '',
        sugar: searchParams.get('sugar') || '',
      });
      router.push(pathname + '?' + queryString);
    },
    [pathname, page, createQueryString, searchParams, router]
  );

  const handleFilterByCategory = useCallback(
    (value: string) => {
      setFoodCategorySelected(value);
      const queryString = createQueryString({
        q: searchParams.get('q') || '',
        page: page.toString(),
        category: value,
        calories: searchParams.get('calories') || '',
        protein: searchParams.get('protein') || '',
        fat: searchParams.get('fat') || '',
        carbs: searchParams.get('carbs') || '',
        sodium: searchParams.get('sodium') || '',
        fiber: searchParams.get('fiber') || '',
        sugar: searchParams.get('sugar') || '',
      });
      router.push(pathname + '?' + queryString);
    },
    [pathname, page, createQueryString, searchParams, router]
  );

  const recipes = useMemo(() => {
    if (!data) return [];

    return data.data.data;
  }, [data]);

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  return (
    <div className="max-w-[1500px] mx-auto px-5">
      <h2 className="text-xl font-bold mt-5">Quản Lý Công Thức</h2>
      <div className="my-3 flex justify-between">
        <div>
          <Button color="orange" onClick={() => router.push('/recipes/new')}>
            Tạo Công Thức
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
          <div className="flex gap-1 items-center">
            {openedFilter && (
              <Select
                data={foodCategoriesSelectData}
                placeholder="Thể loại"
                value={foodCategorySelected}
                onChange={(value) => handleFilterByCategory(value || '')}
              />
            )}
            <ActionIcon
              variant="light"
              aria-label="edit"
              color="orange"
              size="lg"
              onClick={() => {
                toggleFilter();
              }}
            >
              {openedFilter ? (
                <IconX style={{ width: '70%', height: '70%' }} stroke={1.5} />
              ) : (
                <IconFilter
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
                <Table.Th className="w-32">Thể loại</Table.Th>
                <Table.Th className="w-24">Trạng Thái</Table.Th>
                <Table.Th className="w-28">Đánh giá</Table.Th>
                <Table.Th className="w-32"></Table.Th>
              </div>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {recipes.map((recipe, index) => (
              <Table.Tr key={recipe.id} className="flex justify-between">
                <Table.Td className="font-semibold w-12">
                  {(page - 1) * pageSize + index + 1}
                </Table.Td>
                <div className="flex justify-between flex-1 ml-3">
                  <Table.Td className="flex gap-2 items-center font-semibold w-72">
                    <Avatar src={recipe.thumbnail} radius="sm" />
                    {recipe.title}
                  </Table.Td>
                  <Table.Td className="w-60">
                    {recipe.author?.fullName}
                  </Table.Td>
                  <Table.Td className="w-32">
                    {recipe.recipe?.recipeFoodCategory
                      .map((foodCategory) => foodCategory.foodCategory.name)
                      .join(', ')}
                  </Table.Td>
                  <Table.Td className="uppercase w-24">
                    {recipe.status}
                  </Table.Td>
                  <Table.Td className="w-28">
                    <Rating value={recipe.rating || 0} readOnly />
                  </Table.Td>
                  <Table.Td className="w-32">
                    <div className="flex gap-2">
                      <ActionIcon
                        variant="filled"
                        aria-label="view"
                        color="green"
                        onClick={() => router.push(`/recipes/${recipe.id}`)}
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
                          router.push(`/recipes/${recipe.id}/update`)
                        }
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
