import { useContext } from "react";
import { FetchParamsContext } from "./FetchParamsContext";

export const useFetchData = <TData, TVariables>(
  query: string,
  options?: RequestInit["headers"]
): ((variables?: TVariables) => Promise<TData>) => {
  const { url, headers } = useContext(FetchParamsContext);

  return async (variables?: TVariables) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
        ...(options ?? {}),
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0] || "Error..";
      throw new Error(message);
    }

    return json.data;
  };
};
