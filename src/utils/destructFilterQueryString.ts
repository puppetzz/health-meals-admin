import { notifications } from "@mantine/notifications";

export const destructFilterQueryString = (
  queryString: string | undefined | null,
): number[] | undefined => {
  if (!queryString) {
    return;
  }
  return queryString.split("-").map((item) => {
    if (isNaN(Number(item)))
      notifications.show({
        title: "Query error",
        message: "The filter range must be a number",
        color: "red",
      });
    return Number(item);
  });
};
