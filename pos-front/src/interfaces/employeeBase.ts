import { RoleType } from "../enums/roleType"
import { ContractType } from "../enums/contractType"
import { ListResponse } from "./listResponse"
export interface employeeBase{
    first_name: String,
    last_name:String,
    email:String,
    birth_date?: Date
    address?:String,
    cnss_number:String,
    contract_type:ContractType,
    roles:ListResponse<RoleType>,
    phoneNumber?:String

}