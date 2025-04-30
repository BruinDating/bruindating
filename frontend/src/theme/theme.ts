import { createTheme } from "@mantine/core";

export const theme = createTheme({
  breakpoints: {
    x2l: "100em",
    x3l: "120em",
    x4l: "128em",
    x5l: "160em",
  },
  fontSizes: {
    x2l: "1.5rem",
    x3l: "2.25rem",
    x4l: "3rem",
    x5l: "4rem",
  },
  spacing: {
    x2l: "3rem",
    x3l: "4rem",
  },
  colors: {
    ucla: [
      '#D8E5F3', // 0
      '#B1CEE8', // 1
      '#8AB6DD', // 2
      '#639FD2', // 3
      '#3C88C7', // 4
      '#2774AE', // 5 - Primary UCLA Blue
      '#205F8C', // 6
      '#1A4B6A', // 7
      '#133849', // 8
      '#0D2427'  // 9
    ],
    uclaGold: [
      '#FFF6CC', // 0
      '#FFEF99', // 1
      '#FFE866', // 2
      '#FFE033', // 3
      '#FFD800', // 4
      '#FFD100', // 5 - Primary UCLA Gold
      '#CCA700', // 6
      '#997D00', // 7
      '#665300', // 8
      '#332A00'  // 9
    ],
  },
  primaryColor: 'ucla',
});
