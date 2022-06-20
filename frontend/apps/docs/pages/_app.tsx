import { ThemeProvider } from "styled-components";
import { GlobalStyle, LightTheme, DarkTheme } from "ui";
import { ThemeProvider as NextThemeProvider, useTheme } from "next-themes";

function AppWithContext({ Component, pageProps }) {
  const { resolvedTheme } = useTheme();

  return (
    <ThemeProvider theme={resolvedTheme === "light" ? LightTheme : DarkTheme}>
      <Component {...pageProps} />
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
