export interface IUser {
    id: string;
    role_id?: string | null;
    email: string;
    phone?: string | null;
    first_name?: string | null;
    last_name?: string | null;
    username?: string | null;
    password?: string | null;
    created_at?: Date | null;
    updated_at?: Date | null;

}