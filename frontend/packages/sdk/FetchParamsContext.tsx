import { createContext } from "react";

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
