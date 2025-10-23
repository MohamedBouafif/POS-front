import { EmployeeBase } from "./EmployeeBase";

export interface EmployeeCreate extends EmployeeBase {
  password?: string | null;
  confirm_password?: string | null;
}