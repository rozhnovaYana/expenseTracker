export const checkStringIsNotEmpty = (s: string) => s?.trim()?.length > 0;

export const checkStringIsPrice = (s: string) =>
  checkStringIsNotEmpty(s) && s?.trim()?.match(/^\d{0,8}(\.\d{1,4})?$/g);

export const checkStringIsDate = (s: string) =>
  checkStringIsNotEmpty(s) && s?.trim()?.match(/^\d{4}(\-\d{1,2}){2}?$/g);
