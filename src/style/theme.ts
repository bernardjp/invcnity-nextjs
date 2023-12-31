import '@fontsource/roboto-slab/300.css';
import '@fontsource/roboto-slab/400.css';
import '@fontsource/roboto-slab/700.css';
import { extendTheme } from '@chakra-ui/react';
import {
  Button,
  Tooltip,
  CardContainer,
  CardImage,
  CardIcon,
  VariantText,
  VariantCheckbox,
  FormImage,
  VariantMenu,
  VariantRadioInput,
  SnippetContainer,
  EmptyCardContainer,
} from './componentsStyleConfig';

export const theme = extendTheme({
  colors: {
    brand: {
      red: '#FF6D60',
      darkRed: '#ff7161',
      lightRed: '#ffdfd8',
      teal: '#98D8AA',
      darkTeal: '#00b46f',
      lightTeal: '#c5f5e2',
      orange: '#F7D060',
      darkOrange: '#ee9800',
      lightOrange: '#ffecb3',
      yellow: '#ffe9a7',
      chocolate: '#6d5555',
      darkChocolate: '#573f3f',
      lightChocolate: '#b49c9c',
    },
  },
  fonts: {
    body: `'Roboto Slab', serif`,
  },
  styles: {
    global: () => ({
      body: {
        bg: 'beige',
      },
    }),
  },
  components: {
    Button,
    VariantText,
    VariantCheckbox,
    Tooltip,
    CardContainer,
    EmptyCardContainer,
    CardImage,
    CardIcon,
    FormImage,
    VariantMenu,
    SnippetContainer,
    Radio: VariantRadioInput,
  },
});
