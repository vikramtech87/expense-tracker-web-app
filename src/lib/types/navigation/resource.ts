import { Role } from "./role";

export type Resource = {
  label: string;
  url: string;
  allowedRoles: Set<Role>
}

export const isResourceAvaialbale = (resource: Resource, userRole: Role) => resource.allowedRoles.has(userRole);