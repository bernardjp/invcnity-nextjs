import { defineStyleConfig } from '@chakra-ui/react';

export type ThemeVariant = 'primary' | 'secondary' | 'tertiary';
export enum listVariant {
  apartment = 'tertiary',
  house = 'primary',
  countryside = 'primary',
  vacation = 'secondary',
}

export const Button = defineStyleConfig({
  baseStyle: {
    borderRadius: 'full',
  },
  variants: {
    primary: {
      bg: 'brand.red',
      border: '2px solid',
      borderColor: 'brand.red',
      color: 'white',
      transition: '0.15s',
      _hover: {
        bg: 'brand.darkRed',
        borderColor: 'brand.darkRed',
      },
    },
    primaryOutline: {
      color: 'brand.darkRed',
      borderColor: 'brand.red',
      border: '2px solid',
      transition: '0.15s',
      _hover: {
        bg: 'brand.red',
        borderColor: 'brand.red',
        color: 'white',
      },
    },
    secondary: {
      bg: 'teal.400',
      border: '2px solid',
      borderColor: 'teal.400',
      color: 'white',
    },
    secondaryOutline: {
      color: 'teal.400',
      borderColor: 'teal.400',
      border: '2px solid',
    },
  },
});

export const Tooltip = defineStyleConfig({
  baseStyle: {
    borderRadius: 'md',
    color: 'white',
  },
  variants: {
    primary: {
      bg: 'brand.darkRed',
    },
    secondary: {
      bg: 'brand.darkTeal',
    },
    tertiary: {
      bg: 'brand.darkOrange',
    },
  },
});

export const CardImage = defineStyleConfig({
  baseStyle: {
    width: '30rem',
    height: '30rem',
  },
  variants: {
    primary: {
      filter: 'hue-rotate(310deg)',
      paddingBottom: '1rem',
      paddingTop: '2rem',
    },
    secondary: {
      filter: 'hue-rotate(95deg) brightness(0.85)',
      paddingTop: '5rem',
    },
    tertiary: {
      paddingTop: '2rem',
    },
  },
});

export const CardIcon = defineStyleConfig({
  variants: {
    primary: {
      borderColor: 'brand.darkRed',
      filter:
        'invert(27%) sepia(51%) saturate(2500%) hue-rotate(330deg) brightness(150%) contrast(97%)',
    },
    secondary: {
      borderColor: 'brand.darkTeal',
      filter:
        'invert(27%) sepia(51%) saturate(2500%) hue-rotate(127deg) brightness(135%) contrast(97%)',
    },
    tertiary: {
      borderColor: 'brand.darkOrange',
      filter:
        'invert(27%) sepia(51%) saturate(2800%) hue-rotate(20deg) brightness(190%) contrast(97%)',
    },
  },
});

export const VariantText = defineStyleConfig({
  variants: {
    primary: {
      bg: 'brand.darkRed',
      color: 'white',
    },
    secondary: {
      bg: 'brand.darkTeal',
      color: 'white',
    },
    tertiary: {
      bg: 'brand.darkOrange',
      color: 'white',
    },
  },
});
