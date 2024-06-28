'use client';

import { Avatar, Button, Indicator, Menu, Popover, rem } from '@mantine/core';
import { useAuth } from '@/context/AuthContext';
import { IconBellFilled, IconLogout } from '@tabler/icons-react';
import { Black_Ops_One } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { useNotificationsQuery } from '../queries/useNotification';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { ReviewModal } from './modals/RecipeReviewModal';
import { useMealPlanByIdQuery, useRecipeByIdQuery } from '@/queries';
import { ENotificationExternalTable } from '@/common/enums/NotificationExternalTable';

const blackOpsOne = Black_Ops_One({
  subsets: ['latin'],
  weight: '400',
});

export function Navbar() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [
    openedRecipeReviewModal,
    { open: openRecipeReviewModal, close: closeRecipeReviewModal },
  ] = useDisclosure(false);
  const [
    openedNotification,
    { toggle: toggleNotification, close: closeNotification },
  ] = useDisclosure(false);
  const [recipeId, setRecipeId] = useState<string>();
  const [mealPlanId, setMealPlanId] = useState<number>();
  const [notificationId, setNotificationId] = useState<number>();
  const [isReviewRecipe, setIsReviewRecipe] = useState<boolean>(true);

  const { data: notifications } = useNotificationsQuery();

  const isHaveUnsolvedNotification = useMemo(() => {
    if (notifications) {
      return !!notifications.data.find(
        (notification) => !notification.isSolved
      );
    }
  }, [notifications]);

  const { data: recipe } = useRecipeByIdQuery(recipeId, isReviewRecipe);
  const { data: mealPlan } = useMealPlanByIdQuery(
    mealPlanId || 0,
    !isReviewRecipe
  );

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
          <Popover
            width={500}
            position="bottom"
            shadow="md"
            opened={openedNotification}
            closeOnClickOutside={true}
            closeOnEscape={true}
            onClose={closeNotification}
          >
            <Popover.Target>
              {isHaveUnsolvedNotification ? (
                <Indicator inline color="red" size={9} offset={6}>
                  <div
                    className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center"
                    onClick={toggleNotification}
                  >
                    <IconBellFilled className="w-7 h-7" />
                  </div>
                </Indicator>
              ) : (
                <div
                  className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center"
                  onClick={toggleNotification}
                >
                  <IconBellFilled className="w-7 h-7" />
                </div>
              )}
            </Popover.Target>
            <Popover.Dropdown>
              <div className="flex flex-col gap-3 max-h-[600px] overflow-auto">
                {notifications?.data.map((notification) => (
                  <>
                    <div
                      key={notification.id}
                      className={`flex gap-3 items-center hover:bg-gray-100 p-2 rounded-md cursor-pointer relative ${
                        notification.isSolved ? 'text-gray-500' : ''
                      }`}
                      onClick={() => {
                        console.log(notification.detail.externalTable);
                        if (
                          notification.detail.externalTable ===
                          ENotificationExternalTable.POST
                        ) {
                          setRecipeId(
                            notification.detail.externalId.toString()
                          );

                          console.log('review recieps');
                          setIsReviewRecipe(true);
                        } else {
                          setMealPlanId(notification.detail.externalId);
                          setIsReviewRecipe(false);
                        }

                        setNotificationId(notification.id);
                        closeNotification();
                        openRecipeReviewModal();
                      }}
                    >
                      <div>
                        <Avatar
                          src={notification.detail.author.picture}
                          size="lg"
                        />
                      </div>
                      <div>
                        <span className="font-bold">{notification.title}</span>
                        <p>{notification.content}</p>
                        <span className="font-semibold">
                          {dayjs(notification.createAt).format('MMM DD, YYYY')}
                        </span>
                      </div>
                      {!notification.isSolved && (
                        <div className="absolute h-3 w-3 bg-red-500 top-2 right-2 rounded-full"></div>
                      )}
                    </div>
                  </>
                ))}
              </div>
            </Popover.Dropdown>
          </Popover>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Avatar src={user?.photoURL} alt="avatar" />
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                leftSection={
                  <IconLogout style={{ width: rem(14), height: rem(14) }} />
                }
                color="red"
                onClick={signOut}
              >
                Đăng Xuất
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      </nav>
      <ReviewModal
        opened={openedRecipeReviewModal}
        close={closeRecipeReviewModal}
        recipe={recipe?.data}
        mealPlan={mealPlan?.data}
        notificationId={notificationId || 0}
        isReviewRecipe={isReviewRecipe || false}
      />
    </>
  );
}
