// src/locales/localization-provider.tsx

"use client";

import "dayjs/locale/pt-br";

import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ptBR as ptBRPickers } from "@mui/x-date-pickers/locales";
import { LocalizationProvider as Provider } from "@mui/x-date-pickers/LocalizationProvider";

dayjs.extend(updateLocale);
dayjs.updateLocale("pt-br", {
  weekdaysMin: ["D", "S", "T", "Q", "Q", "S", "S"],
});

export class CustomAdapterDayjs extends AdapterDayjs {}

type Props = {
  children: React.ReactNode;
};

export function LocalizationProvider({ children }: Props) {
  dayjs.locale("pt-br");

  return (
    <Provider
      dateAdapter={CustomAdapterDayjs}
      adapterLocale="pt-br"
      localeText={ptBRPickers.components.MuiLocalizationProvider.defaultProps.localeText}
    >
      {children}
    </Provider>
  );
}
