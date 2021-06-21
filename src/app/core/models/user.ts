import { Role } from "./role.enum";

export interface User {
    token: string;
    name: string;
    username: string,
    email?: string,
    role?: Role,
    id,
}
