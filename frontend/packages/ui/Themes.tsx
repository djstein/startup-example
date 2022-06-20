interface ThemeInterface {
  colors: {
    primary: string;
  };
}

export const LightTheme: ThemeInterface = {
  colors: {
    primary: "red",
  },
};

export const DarkTheme: ThemeInterface = {
  colors: {
    primary: "blue",
  },
};
