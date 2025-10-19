import { RoleType } from "../enums/roleType"
import { ContractType } from "../enums/contractType"
import { ListResponse } from "./listResponse"
import { Gender } from "../enums/gender";
import { AccountStatus } from "../enums/account_status";
export interface employeeBase {
  first_name: string;
  last_name: string;
  number:number;
  email: string;
  birth_date?: Date;
  address?: string;
  gender:Gender
  cnss_number: string;
  contract_type: ContractType;
  roles: RoleType[];
  phoneNumber?: string;
  account_status:AccountStatus;
}