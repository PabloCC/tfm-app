import { Role } from "./role.enum";

export interface User {
    token: string;
    username: string,
    email?: string,
    role?: Role,
}
