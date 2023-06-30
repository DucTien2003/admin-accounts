// @ts-ignore
import { isEmpty } from '@/utils';

/**
 *
 * @param fieldName
 * @param type: value allow number => set type = number because type default is string
 * @param trigger
 * @param whitespace
 * @param required
 */
export const requiredRule = (
  fieldName: string = '',
  trigger: string | string[] = 'blur',
  type: string = 'string',
  whitespace: boolean = true,
  required: boolean = true
) => {
  return {
    trigger,
    type,
    whitespace,
    required,
    message: fieldName + ' không được để trống',
  };
};

export const maxLengthRule = (fieldName: string = '', maxNumber: number = 256, trigger: string = 'blur') => {
  return {
    max: maxNumber,
    message: `${fieldName} không được phép vượt quá ${maxNumber} ký tự`,
    trigger,
  };
};

export const minLengthRule = (fieldName: string = '', minNumber: number = 1, trigger: string = 'blur') => {
  return {
    min: minNumber,
    message: `${fieldName} không được phép ít hơn ${minNumber} ký tự`,
    trigger,
  };
};

//https://github.com/yiminghe/async-validator#type
export const requiredTypeRule = (fieldName: string = '', type: string = 'integer', trigger: string = 'blur') => {
  return {
    type,
    message: `${fieldName} không hợp lệ`,
    trigger,
  };
};

export const requiredNumber = (fieldName: string = '', trigger: string = 'blur') => {
  return {
    pattern: /^\d+$/,
    message: `${fieldName} chỉ bao gồm các chữ số`,
    trigger,
  };
};

export const confirmPassword = (password: string = '', valueConfirm: string = '', trigger: string = 'blur') => {
  return {
    validator() {
      if (valueConfirm !== password) {
        return Promise.reject('Mật khẩu nhập lại không chính xác');
      } else {
        return Promise.resolve();
      }
    },
    trigger,
  };
};
