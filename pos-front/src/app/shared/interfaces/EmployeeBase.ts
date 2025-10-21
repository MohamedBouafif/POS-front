import { RoleType } from "../enums/roleType"
import { ContractType } from "../enums/contractType"
import { ListResponse } from "./listResponse"
import { Gender } from "../enums/gender";
import { AccountStatus } from "../enums/account_status";
export interface EmployeeBase {
  first_name: string;
  last_name: string;
  email: string;
  roles: RoleType[];
  number: string;
  birth_date?: string | null; 
  address?: string | null;
  cnss_number?: string | null;
  contract_type: ContractType;
  gender: Gender;
  phone_number?: string | null;
}