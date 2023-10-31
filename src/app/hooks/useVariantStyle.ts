import { useMultiStyleConfig, useStyleConfig } from '@chakra-ui/react';
import { ListType } from '@/firebase/customTypes';
import { listVariant } from '@/style/componentsStyleConfig';

type VariantStyleOptions = {
  defaultVariant: boolean;
};

export function useVariantMultiStyle(
  themeKey: string,
  type: ListType,
  options?: Partial<VariantStyleOptions>
) {
  const variant = listVariant[type];
  const styles = useMultiStyleConfig(themeKey, {
    variant: options?.defaultVariant ? '' : variant,
  });
  return { styles, variant };
}

export function useVariantStyle(
  themeKey: string,
  type: ListType,
  options?: Partial<VariantStyleOptions>
) {
  const variant = listVariant[type];
  const styles = useStyleConfig(themeKey, {
    variant: options?.defaultVariant ? '' : variant,
  });
  return { styles, variant };
}
