export enum RoleType{
    ADMIN = "ADMIN",
    InventoryManager = "InventoryManager",
    Superuser = "Superuser",
    Vendor = "Vendor"
}

export const roles = [
    {value : RoleType.ADMIN, label : "Admin"},
    {value : RoleType.InventoryManager, label : "InventoryManager"},
    {value : RoleType.Superuser, label : "Superuser"},
    {value : RoleType.Vendor, label : "Vendor"},
];