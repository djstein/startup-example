import React, { createContext } from "react";

interface FetchParamContextInterface {
  header: Record<string, unknown>;
  url: undefined | string;
}

export const FetchParamsContext =
  createContext<FetchParamContextInterface | null>(null);

const InitialFetchParamsContext: FetchParamContextInterface = {
  header: {},
  url: "http://localhost:8000/graphql/",
};

interface FetchParamsProviderInterface extends FetchParamContextInterface {
  children: JSX.Element;
}
export const FetchParamsProvider = ({
  children,
  header,
  url,
}: FetchParamsProviderInterface) => {
  return (
    <FetchParamsContext.Provider value={{ header, url }}>
      {children}
    </FetchParamsContext.Provider>
  );
};
