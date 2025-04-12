import { OrganizationType } from "src/types/organization";

import type { SignInSchemaType, SignUpSchemaType } from "./form-data";

export const defaultValues: SignInSchemaType = {
  email: "",
  password: "",
};

export const signUpdefaultValues: SignUpSchemaType = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  password: "",
  hasOrganization: false,
  organizationType: OrganizationType.SOCCER_SCHOOL,
  organizationName: "",
};

export const ORGANIZATION_TYPE_OPTIONS = [
  { label: "Escola de futebol", value: OrganizationType.SOCCER_SCHOOL },
  { label: "Quadra de futebol", value: OrganizationType.FACILITY },
  { label: "Liga/Federação", value: OrganizationType.LEAGUE_FEDERATION },
  { label: "Outros", value: OrganizationType.OTHER },
];
