import { Rol } from './rol';
export class Usuario {
    public username: string;
    public password: string;
    public enabled = true;
    public roles: Rol[];
}
