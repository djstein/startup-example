import { useUsersQuery } from "sdk";

export const User = () => {
  const { data } = useUsersQuery();
  return <p>User ID: {data?.users?.edges?.[0]?.node?.id}</p>;
};
