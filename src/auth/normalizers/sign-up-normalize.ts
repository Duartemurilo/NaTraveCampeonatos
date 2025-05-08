import type { SignUpSchemaType } from "src/auth/types/schema";

export function normalizeSignUpData(data: SignUpSchemaType): SignUpSchemaType {
  const names = data.firstName.trim().split(" ");

  const firstName = names[0];
  const lastName = names.length > 1 ? names.slice(1).join(" ") : "";

  return {
    ...data,
    firstName,
    lastName,
    organization_type: data.hasOrganization ? data.organization_type : "",
    organization_name: data.hasOrganization ? data.organization_name : "",
  };
}
