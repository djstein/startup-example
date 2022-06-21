import { ThemeProvider } from "styled-components";
import { GlobalStyle, LightTheme, DarkTheme } from "ui";
import { ThemeProvider as NextThemeProvider, useTheme } from "next-themes";
import { FetchParamsProvider } from "sdk";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppProps } from "next/app";

function AppWithContext({ Component, pageProps }: AppProps) {
  const { resolvedTheme } = useTheme();
  const queryClient = new QueryClient();

  return (
    <ThemeProvider theme={resolvedTheme === "light" ? LightTheme : DarkTheme}>
      <FetchParamsProvider url={"http://localhost:8000/graphql/"} headers={{}}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </FetchParamsProvider>
    </ThemeProvider>
  );
}

export default function App(props: AppProps) {
  return (
    <>
      <GlobalStyle />
      <NextThemeProvider>
        <AppWithContext {...props} />
      </NextThemeProvider>
    </>
  );
}
