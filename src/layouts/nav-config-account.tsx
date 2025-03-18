import { Iconify } from "src/components/iconify";

import type { AccountDrawerProps } from "./components/account-drawer";

// ----------------------------------------------------------------------

export const _account: AccountDrawerProps["data"] = [
  {
    label: "Configurações da conta",
    href: "#",
    icon: <Iconify icon="solar:settings-bold-duotone" />,
  },
];
