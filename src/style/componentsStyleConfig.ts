import { defineStyleConfig } from '@chakra-ui/react';

export type ThemeVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'primaryLight'
  | 'secondaryLight'
  | 'tertiaryLight';
export enum listVariant {
  apartment = 'tertiary',
  house = 'primary',
  countryside = 'primary',
  vacation = 'secondary',
}

export const Button = defineStyleConfig({
  variants: {
    primary: {
      bg: 'brand.red',
      border: '2px solid',
      borderColor: 'brand.red',
      borderRadius: 'full',
      color: 'white',
      transition: '0.15s',
      _hover: {
        bg: 'brand.darkRed',
        borderColor: 'brand.darkRed',
      },
    },
    primaryOutline: {
      border: '2px solid',
      borderColor: 'brand.red',
      borderRadius: 'full',
      color: 'brand.darkRed',
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
      borderRadius: 'full',
      color: 'white',
    },
    secondaryOutline: {
      border: '2px solid',
      borderColor: 'teal.400',
      borderRadius: 'full',
      color: 'teal.400',
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

export const CardContainer = defineStyleConfig({
  baseStyle: {
    bg: 'white',
    border: '2px solid',
    borderRadius: '24px',
    flexDir: 'column',
    boxShadow: '0px 10px 35px -20px rgba(0,0,0,0.75)',
    height: 'fit-content',
  },
  variants: {
    primary: {
      borderColor: 'brand.red',
    },
    secondary: {
      borderColor: 'brand.teal',
    },
    tertiary: {
      borderColor: 'brand.orange',
    },
    list: {
      borderColor: 'transparent',
    },
  },
});

export const CardImage = defineStyleConfig({
  baseStyle: {
    width: '30rem',
    height: '30rem',
  },
  variants: {
    house: {
      filter: 'hue-rotate(310deg)',
      paddingTop: '1.9rem',
    },
    countryside: {
      filter: 'hue-rotate(310deg)',
      paddingTop: '3rem',
    },
    vacation: {
      filter: 'hue-rotate(95deg) brightness(0.85)',
      paddingTop: '5.7rem',
    },
    apartment: {
      paddingTop: '2rem',
    },
  },
});

export const CardIcon = defineStyleConfig({
  variants: {
    primary: {
      borderColor: 'brand.darkRed',
      filter:
        'invert(27%) sepia(51%) saturate(2500%) hue-rotate(340deg) brightness(150%) contrast(97%)',
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
    primaryLight: {
      bg: 'brand.lightRed',
      color: 'brand.darkChocolate',
    },
    secondaryLight: {
      bg: 'brand.lightTeal',
      color: 'brand.darkChocolate',
    },
    tertiaryLight: {
      bg: 'brand.lightOrange',
      color: 'brand.darkChocolate',
    },
  },
});

export const VariantCheckbox = defineStyleConfig({
  baseStyle: {
    borderBottom: '3px solid',
    borderColor: 'transparent',
    cursor: 'pointer',
    fontSize: '1rem',
    lineHeight: '8',
    transition: '0.2s',
  },
  variants: {
    primary: {
      _hover: {
        borderColor: 'brand.red',
      },
      _checked: {
        borderColor: 'brand.darkRed',
      },
    },
    secondary: {
      _hover: {
        borderColor: 'brand.teal',
      },
      _checked: {
        borderColor: 'brand.darkTeal',
      },
    },
    tertiary: {
      _hover: {
        borderColor: 'brand.orange',
      },
      _checked: {
        borderColor: 'brand.darkOrange',
      },
    },
  },
});

export const FormImage = defineStyleConfig({
  variants: {
    apartment: {},
    house: {
      filter: 'hue-rotate(310deg)',
    },
    countryside: {
      filter: 'hue-rotate(310deg)',
    },
    vacation: {
      filter: 'hue-rotate(95deg) brightness(0.85)',
      paddingTop: '6rem',
    },
  },
});
