import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';

export enum FieldType {
  STRING = 'string',
  NUMBER = 'number',
}

type FieldDescription = {
  type: FieldType;
  isRequired: true;
};

export type FormValidation = {
  [key: string]: FieldDescription;
};

const buildFieldSchema = (field: FieldDescription) => {
  let rule;
  switch (field.type) {
    case FieldType.NUMBER:
      rule = yup.number();
    default:
      rule = yup.string();
  }

  if (field.isRequired) {
    rule = rule.required();
  }
  return rule;
};

export const buildFormValidation = (formRules: FormValidation) => {
  const initialValues = {} as { [key: string]: string };
  const formValidationSchema = {} as { [key: string]: yup.StringSchema };

  Object.keys(formRules).forEach((fieldName) => {
    initialValues[fieldName] = '';
    formValidationSchema[fieldName] = buildFieldSchema(formRules[fieldName]);
  });

  return useForm({
    initialValues,
    validationSchema: yup.object(formValidationSchema),
  });
};

export const buildFieldValidation = (fieldName: string) => useField(() => fieldName);
