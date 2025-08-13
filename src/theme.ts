import { createTheme } from '@shopify/restyle';

const palette = {
  // Primary colors
  trustGreen: '#00463D',
  screenGreen: '#00D264',
  white: '#FFFFFF',

  // Interferer color
  magenta: '#E6007E',

  // Secondary colors
  grey1: '#343434',
  grey2: '#535353',
  grey3: '#727272',
  grey4: '#D0D0D0',
  grey5: '#EDEDED',
  grey6: '#F2F2F2',
  grey7: '#FAF8F8',

  // Complementary colors
  success300: '#108455',
  success200: '#ABD4C4',
  success100: '#CFE6DD',
  success50: '#E7F3EE',
};

const theme = createTheme({
  colors: {
    // semantic aliases
    background: palette.grey7,
    surface: palette.white,
    primary: palette.trustGreen,
    onPrimary: palette.white,
    cta: palette.screenGreen,
    onCta: palette.white,
    danger: palette.magenta,
    text: palette.grey1,
    textMuted: palette.grey3,
    border: palette.grey4,
    divider: palette.grey5,
    success: palette.success300,
    successBg: palette.success50,
  },
  spacing: {
    0: 0,
    2: 2,
    4: 4,
    6: 6,
    8: 8,
    12: 12,
    16: 16,
    20: 20,
    24: 24,
    32: 32,
    40: 40,
  },
  borderRadii: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    pill: 999,
  },
  textVariants: {
    // Typographies
    title1: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: 28,
      lineHeight: 34,
      color: 'text',
    },
    title2: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: 18,
      lineHeight: 27,
      color: 'text',
    },
    title3: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: 16,
      lineHeight: 24,
      color: 'text',
    },
    title4: {
      fontFamily: 'Poppins-Bold',
      fontSize: 13,
      lineHeight: 20,
      color: 'text',
    },
    body1: {
      fontFamily: 'Poppins-Regular',
      fontSize: 16,
      lineHeight: 24,
      color: 'text',
    },
    body1sb: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: 16,
      lineHeight: 24,
      color: 'text',
    },
    body2: {
      fontFamily: 'Poppins-Medium',
      fontSize: 14,
      lineHeight: 21,
      color: 'text',
    },
    body3: {
      fontFamily: 'Poppins-Regular',
      fontSize: 13,
      lineHeight: 24,
      color: 'text',
    },
    body3m: {
      fontFamily: 'Poppins-Medium',
      fontSize: 13,
      lineHeight: 24,
      color: 'text',
    },
    caption1: {
      fontFamily: 'Poppins-Regular',
      fontSize: 12,
      lineHeight: 18,
      color: 'textMuted',
    },
    caption1m: {
      fontFamily: 'Poppins-Medium',
      fontSize: 12,
      lineHeight: 18,
      color: 'text',
    },
    caption2: {
      fontFamily: 'Poppins-Regular',
      fontSize: 10,
      lineHeight: 15,
      color: 'textMuted',
    },
    buttonMd: {
      fontFamily: 'Poppins-Medium',
      fontSize: 16,
      lineHeight: 22,
      color: 'onCta',
    },
    buttonLink: {
      fontFamily: 'Poppins-Medium',
      fontSize: 13,
      lineHeight: 18,
      color: 'primary',
      textDecorationLine: 'underline',
    },
    inputText: {
      fontFamily: 'Poppins-Regular',
      fontSize: 18,
      lineHeight: 22,
      color: 'text',
    },
    helper: {
      fontFamily: 'Poppins-Regular',
      fontSize: 12,
      lineHeight: 18,
      color: 'textMuted',
    },
    label: {
      fontFamily: 'Poppins-Regular',
      fontSize: 10,
      lineHeight: 12,
      color: 'textMuted',
    },
  },
  breakpoints: {},
});

export type Theme = typeof theme;
export default theme;
