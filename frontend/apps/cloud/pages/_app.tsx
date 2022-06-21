import { ThemeProvider } from "styled-components";
import { GlobalStyle, LightTheme, DarkTheme } from "ui";
import { ThemeProvider as NextThemeProvider, useTheme } from "next-themes";
import { AppProps } from "next/app";

function AppWithContext({ Component, pageProps }: AppProps) {
  const { resolvedTheme } = useTheme();

  return (
    <ThemeProvider theme={resolvedTheme === "light" ? LightTheme : DarkTheme}>
      <Component {...pageProps} />
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
