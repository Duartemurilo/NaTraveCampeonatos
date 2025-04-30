import type { ICheckOrganizationUserPhoneResponse } from "@natrave/auth-service-types";

import { useDebounce } from "src/hooks/use-debounce";

import { useGet } from "./request/use-get";

export function useCheckPhoneNumber(phone: string | null) {
  const debouncedPhone = useDebounce(phone, 500);

  const isValidPhone = debouncedPhone && debouncedPhone.replace(/\D/g, "").length >= 13;
  const encodedPhone = isValidPhone ? encodeURIComponent(debouncedPhone) : "";
  const endpoint = isValidPhone ? `/auth/organization-user/check-phone?phone=${encodedPhone}` : "";

  return useGet<ICheckOrganizationUserPhoneResponse>({
    key: ["check-phone", debouncedPhone],
    endpoint,
    isPaused: !isValidPhone,
  });
}
