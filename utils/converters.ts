/**
 * Converts any kind of valid Philippine Phone Number
 * to a phone number that starts with **09**
 *
 * e.g:
 * +639123456912 -> 09123456912
 * 639123456912 -> 09123456912
 *
 * @param initialPhoneNumber
 * @returns
 */
export const generalizePhoneNumber = (initialPhoneNumber: string) => {
  const phoneNumberRegexReplace = RegExp("^(\\+63|0)");
  return "0" + initialPhoneNumber.replace(phoneNumberRegexReplace, "");
};
