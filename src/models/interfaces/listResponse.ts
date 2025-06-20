// ay 7aja tji mil backend fi lista n7otha lina
import { BaseOut } from "./baseOut";

export interface ListResponse <T> extends BaseOut {
    list: T[]
}