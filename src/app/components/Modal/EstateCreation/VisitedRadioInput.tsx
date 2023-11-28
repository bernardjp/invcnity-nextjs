import React from 'react';
import { Flex, Radio, RadioGroup } from '@chakra-ui/react';
import { ThemeVariant } from '@/style/componentsStyleConfig';

type Props = {
  value: boolean;
  variant: ThemeVariant;
  isDisabled: boolean;
  onChange: (e: string) => void;
};

function VisitedRadioInput(props: Props) {
  const { value, variant, isDisabled, onChange } = props;

  return (
    <Flex h="40px" alignItems="center">
      <RadioGroup
        name="isVisited"
        onChange={(val) => onChange(val)}
        value={String(value)}
        isDisabled={isDisabled}
        gap={6}
        display="flex"
      >
        <Radio value="false" variant={variant}>
          No!
        </Radio>
        <Radio value="true" variant={variant}>
          Yes!
        </Radio>
      </RadioGroup>
    </Flex>
  );
}

export default VisitedRadioInput;
