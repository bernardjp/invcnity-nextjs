import { ListType } from '@/firebase/customTypes';
import { InputValidation } from '../../StyledInput';
import { validateType } from '../../ListCreation/utils/validation';

export type EstateFormValidation = {
  estateName: InputValidation;
  location: InputValidation;
  price: InputValidation;
  publicationURL: InputValidation;
  locationURL: InputValidation;
  type: InputValidation;
  isValidated: boolean;
};
export type EstateInfoType = {
  id: string;
  estateName: string;
  location: string;
  price: string;
  publicationURL: string;
  locationURL: string;
  type: ListType;
};

function validateEstateName(estateName: string): InputValidation {
  const ESTATE_REGEX = /^[a-zA-ZÀ-ÿ0-9\\u00f1\\u00d1\s\-]{3,32}$/gm;
  const isValidated = ESTATE_REGEX.test(estateName);

  if (estateName.trim().length === 0) {
    return {
      errorMessage: 'Estate name is required.',
      isValidated: false,
    };
  }

  return {
    errorMessage: isValidated
      ? ''
      : 'The Estate name must range between 3 and 32 characters long. Only alphanumerical characters and scores [-] are allowed',
    isValidated,
  };
}

function validateLocation(location: string): InputValidation {
  const LOCATION_REGEX = /^[a-zA-ZÀ-ÿ0-9\\u00f1\\u00d1\s\-]{3,32}$/gm;
  const isValidated = LOCATION_REGEX.test(location);

  if (location.trim().length === 0) {
    return {
      errorMessage: 'Location is required.',
      isValidated: false,
    };
  }

  return {
    errorMessage: isValidated
      ? ''
      : 'The Location name must range between 3 and 32 characters long. Only alphanumerical characters and scores [-] are allowed',
    isValidated,
  };
}

function validatePrice(price: string): InputValidation {
  const PRICE_REGEX = /^[0-9]{1,7}$/gm;
  const isValidated = PRICE_REGEX.test(price);

  if (price.trim().length === 0) {
    return {
      errorMessage: 'Price is required.',
      isValidated: false,
    };
  }

  return {
    errorMessage: isValidated ? '' : 'Price must range between $1 - $9,999,999',
    isValidated,
  };
}

function validateURL(url: string): InputValidation {
  const URL_REGEX = /^(ftp|http|https):\/\/[^ "]+$/;
  const isValidated = URL_REGEX.test(url);

  if (url.trim().length === 0) {
    return {
      errorMessage: 'URL is required.',
      isValidated: false,
    };
  }

  return {
    errorMessage: isValidated ? '' : 'The URL has an invalid format.',
    isValidated,
  };
}

export function validateEstateForm(
  estateInfo: EstateInfoType
): EstateFormValidation {
  const validation = {
    estateName: validateEstateName(estateInfo.estateName),
    location: validateLocation(estateInfo.location),
    price: validatePrice(estateInfo.price),
    publicationURL: validateURL(estateInfo.publicationURL),
    locationURL: validateURL(estateInfo.locationURL),
    type: validateType(estateInfo.type),
  };

  const isValidated = Object.keys(validation).every(
    (val) => validation[val as keyof typeof validation].isValidated === true
  );

  return { ...validation, isValidated };
}
