import { ListType } from '@/firebase/customTypes';
import {
  createMultiStyleConfigHelpers,
  defineStyleConfig,
} from '@chakra-ui/react';

export type ThemeVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'primaryLight'
  | 'secondaryLight'
  | 'tertiaryLight';
export const listVariant: Record<ListType, ThemeVariant> = {
  apartment: 'tertiary',
  house: 'primary',
  countryside: 'primary',
  vacation: 'secondary',
};

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
    borderColor: 'transparent',
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
  baseStyle: {
    minWidth: '15rem',
  },
  variants: {
    apartment: {},
    house: {
      filter: 'hue-rotate(310deg)',
      minWidth: '20rem',
    },
    countryside: {
      filter: 'hue-rotate(310deg)',
    },
    vacation: {
      filter: 'hue-rotate(95deg) brightness(0.85)',
      paddingTop: '6rem',
      minWidth: '19rem',
    },
  },
});

const menuHelpers = createMultiStyleConfigHelpers(['button', 'list', 'item']);
export const VariantMenu = menuHelpers.defineMultiStyleConfig({
  variants: {
    primary: {
      button: {
        borderColor: 'brand.darkRed',
        color: 'brand.darkRed',
        _hover: {
          bg: 'brand.lightRed',
        },
        _active: {
          bg: 'brand.darkRed',
          color: 'white',
        },
      },
      list: {
        borderColor: 'brand.darkRed',
        boxShadow: '0px 4px 16px -7px #8a0000ad',
      },
      item: {
        _hover: {
          bg: 'brand.lightRed',
        },
        _focus: {
          bg: 'brand.lightRed',
        },
        _active: {
          bg: 'brand.darkRed',
          color: 'white',
        },
      },
    },
    secondary: {
      button: {
        borderColor: 'brand.darkTeal',
        color: 'brand.darkTeal',
        _hover: {
          bg: 'brand.lightTeal',
        },
        _active: {
          bg: 'brand.darkTeal',
          color: 'white',
        },
      },
      list: {
        borderColor: 'brand.darkTeal',
        boxShadow: '0px 4px 16px -7px #006c49c4',
      },
      item: {
        _hover: {
          bg: 'brand.lightTeal',
        },
        _focus: {
          bg: 'brand.lightTeal',
        },
        _active: {
          bg: 'brand.darkTeal',
          color: 'white',
        },
      },
    },
    tertiary: {
      button: {
        borderColor: 'brand.darkOrange',
        color: 'brand.darkOrange',
        _hover: {
          bg: 'brand.lightOrange',
        },
        _active: {
          bg: 'brand.darkOrange',
          color: 'white',
        },
      },
      list: {
        borderColor: 'brand.darkOrange',
        boxShadow: '0px 4px 16px -7px #8e5d00ad',
      },
      item: {
        _hover: {
          bg: 'brand.lightOrange',
        },
        _focus: {
          bg: 'brand.lightOrange',
        },
        _active: {
          bg: 'brand.darkOrange',
          color: 'white',
        },
      },
    },
  },
});
