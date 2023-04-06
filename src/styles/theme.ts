import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false
};

const theme = extendTheme({
  colors: {
    gray: {
      "900": "#131520",
      "800": "#262B40",
      "700": "#394060",
      "600": "#4C5580",
      "500": "#5F6BA0",
      "400": "#828AB0",
      "300": "#A3A8C2",
      "200": "#C0C4D8",
      "100": "#E3E4E8",
      "50": "#EEEEF2"
    },
    brand: {
      100: "#f7fafc",
      // ...
      900: "#1a202c"
    }
  },
  fonts: {
    heading: "Roboto",
    body: "Roboto"
  },
  styles: {
    global: {
      body: {
        bg: "#292E45",
        color: "gray.50"
      }
    }
  },
  config
});

export default theme;
