import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

// Import Poppins font from Google Fonts
import "typeface-poppins";

const breakpoints = createBreakpoints({
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
});

const theme = extendTheme({
  fonts: {
    heading: "Poppins",
    body: "Poppins",
  },
  breakpoints,
});

export default theme;
