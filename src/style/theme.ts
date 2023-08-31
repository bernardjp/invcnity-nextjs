import '@fontsource/roboto-slab/300.css';
import '@fontsource/roboto-slab/400.css';
import '@fontsource/roboto-slab/700.css';
import { extendTheme } from '@chakra-ui/react';
import {
  Button,
  Tooltip,
  CardImage,
  CardIcon,
  VariantText,
} from './componentsStyleConfig';

export const theme = extendTheme({
  colors: {
    brand: {
      red: '#FF6D60',
      darkRed: '#ff7161',
      orange: '#F7D060',
      darkOrange: '#ffb22b',
      yellow: '#ffe9a7',
      teal: '#98D8AA',
      darkTeal: '#00b46f',
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
    Tooltip,
    CardImage,
    CardIcon,
  },
});
