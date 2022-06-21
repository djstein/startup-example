import { ThemeProvider } from "styled-components";
import { GlobalStyle, LightTheme, DarkTheme } from "ui";
import { ThemeProvider as NextThemeProvider, useTheme } from "next-themes";
import { FetchParamsProvider } from "sdk";
import { QueryClient, QueryClientProvider } from "react-query";

function AppWithContext({ Component, pageProps }) {
  const { resolvedTheme } = useTheme();
  const queryClient = new QueryClient();

  return (
    <ThemeProvider theme={resolvedTheme === "light" ? LightTheme : DarkTheme}>
      <FetchParamsProvider url={"http://localhost:8000/graphql/"} header={{}}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </FetchParamsProvider>
    </ThemeProvider>
  );
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <NextThemeProvider>
        <AppWithContext Component={Component} pageProps={pageProps} />
      </NextThemeProvider>
    </>
  );
}
