type InputValidation = {
  errorMessage: string;
  isValidated: boolean;
};

export type ListFormValidation = {
  listName: InputValidation;
  type: InputValidation;
  isValidated: boolean;
};

export type ListType = 'apartment' | 'house' | 'countryside' | 'vacation';
export type ListRoleType = 'owner' | 'editor' | 'reader';
export type ListInfoType = {
  id: string;
  listName: string;
  type: ListType;
  roles: { [x: string]: ListRoleType };
};

function validateListName(listName: string): InputValidation {
  const LISTNAME_REGEX = /^[a-zA-ZÀ-ÿ0-9\\u00f1\\u00d1\s\-]{3,32}$/gm;
  const isValidated = LISTNAME_REGEX.test(listName);

  if (listName.trim().length === 0) {
    return {
      errorMessage: 'VCNITY name is required.',
      isValidated: false,
    };
  }

  return {
    errorMessage: isValidated
      ? ''
      : 'The VCNITY name must range between 3 and 32 characters long. Only alphanumerical characters and scores [-] are allowed',
    isValidated,
  };
}

function validateType(type: string): InputValidation {
  const TYPES = ['apartment', 'house', 'countryside', 'vacation'];
  const isValidated = TYPES.includes(type.toLowerCase());

  return {
    errorMessage: isValidated ? '' : 'Pick a valid type of VCNITY.',
    isValidated,
  };
}

export function validateListForm(
  listName: string,
  type: string
): ListFormValidation {
  const listNameValidation = validateListName(listName);
  const typeValidation = validateType(type);
  const isValidated =
    listNameValidation.isValidated && typeValidation.isValidated;

  return {
    listName: listNameValidation,
    type: typeValidation,
    isValidated,
  };
}
