import { createContext } from "react";
import { useContext } from "react";

interface FetchParamContextInterface {
  headers: Record<string, unknown>;
  url: string;
}

export const FetchParamsContext = createContext<FetchParamContextInterface>({
  headers: {},
  url: "http://localhost:8000",
});

interface FetchParamsProviderInterface extends FetchParamContextInterface {
  children: JSX.Element;
}
export const FetchParamsProvider = ({
  children,
  headers,
  url,
}: FetchParamsProviderInterface) => {
  return (
    <FetchParamsContext.Provider value={{ headers, url }}>
      {children}
    </FetchParamsContext.Provider>
  );
};

export const useFetchData = <TData, TVariables>(
  query: string,
  variables?: TVariables
): (() => Promise<TData>) => {
  const { url, headers } = useContext(FetchParamsContext);

  return async () => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
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
