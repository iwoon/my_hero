export interface RoleResponse {
    roleId: number,
    name: string,
}

export interface LoginResponse {
    token: string;
}

export interface AccountRequest {
    username: string;
    password: string;
    roleId: number;
}