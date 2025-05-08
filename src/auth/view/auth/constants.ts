import type { SignInSchemaType, SignUpSchemaType } from "src/auth/types/schema";

import { OrganizationType } from "src/types/organization";

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
  organization_type: OrganizationType.SOCCER_SCHOOL,
  organization_name: "",
};

export const ORGANIZATION_TYPE_OPTIONS = [
  { label: "Escola De Futebol", value: OrganizationType.SOCCER_SCHOOL },
  { label: "Quadra De Futebol", value: OrganizationType.FACILITY },
  { label: "Liga/Federação", value: OrganizationType.LEAGUE_FEDERATION },
  { label: "Outros", value: OrganizationType.OTHER },
];
