import en from "./messages/en.json";

type Messages = typeof en;

declare global {
  // Use type safe message keys with `next-intl`
  // IntlMessages is equivalent to Messages
  type IntlMessages = Messages;
}
