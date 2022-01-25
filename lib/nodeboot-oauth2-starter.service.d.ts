import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class NodebootOauth2StarterService {
    private http;
    configuration: {
        api: string;
    };
    authUserApi: string;
    authRoleApi: string;
    authPartApi: string;
    authClientApi: string;
    authApplicationApi: string;
    constructor(http: HttpClient, configuration: {
        api: string;
    });
    getUsers(pageIndex: number, order: string): Observable<UserPaginationResult>;
    createUser(createUserData: {
        name: string;
        username: string;
        password: string;
        roles: BasicRole[];
    }): Observable<Object>;
    updatePassword(userId: number, newPassword: string, oldPassword: string): Observable<Object>;
    updateUserRoles(userId: number, roles: BasicRole[]): Observable<Object>;
    deleteUser(subjectId: number): Observable<Object>;
    updateUser(subjectId: number, updateBody: UserUpdateBody): Observable<Object>;
    getUserProfile(): Observable<UserProfileResult>;
    getRolesBasic(): Observable<RoleResult>;
    createRole(identifier: string, allowedObject: Record<string, Option[]>): Observable<Object>;
    updateRoleOptions(roleId: number, newAllowedObject: Record<string, Option[]>, originalAllowedObject: Record<string, Option[]>): Observable<Object>;
    deleteRole(roleId: number): Observable<Object>;
    getRoles(pageIndex: number, order: string): Observable<RolePaginationResult>;
    getPartsBasic(): Observable<OptionResult>;
    getParts(pageIndex: number, order: string): Observable<PartPaginationResult>;
    updatePartOptions(partId: number, newPartOptions: Option[], originalPartOptions: Option[]): Observable<Object>;
    deletePart(partId: number): Observable<Object>;
    createPart(partIdentifier: string, applications_id: number): Observable<Object>;
    getClients(pageIndex: number, order: string): Observable<ClientPaginationResult>;
    createClient(createClientData: {
        name: string;
        identifier: string;
        roles: BasicRole[];
    }): Observable<ClientCreateResult>;
    deleteClient(subjectId: number): Observable<Object>;
    updateClientRoles(clientId: number, roles: BasicRole[]): Observable<Object>;
    updateClient(subjectId: number, updateBody: ClientUpdateBody): Observable<Object>;
    getApplications(): Observable<ApplicationResult>;
    get apiUrl(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<NodebootOauth2StarterService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NodebootOauth2StarterService>;
}
interface ApplicationResult {
    message: string;
    code: number;
    content?: Application[];
}
export interface Application {
    id: number;
    identifier: string;
}
export interface ClientUpdateBody {
    name: string;
}
export interface Client {
    id: number;
    subjectId: number;
    name: string;
    identifier: string;
    roles: Role[];
}
interface ClientCreateResult {
    message: string;
    code: number;
    content?: ClientCreateContent;
}
export interface ClientCreateContent {
    access_token: string;
}
interface ClientPaginationResult {
    message: string;
    code: number;
    content?: ClientPaginationContent;
}
interface ClientPaginationContent {
    items: Client[];
    pageIndex: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
}
interface OptionResult {
    message: string;
    code: number;
    content?: Part[];
}
interface PartPaginationResult {
    message: string;
    code: number;
    content?: PartPaginationContent;
}
interface PartPaginationContent {
    items: Part[];
    pageIndex: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
}
export interface UserUpdateBody {
    name: string;
}
interface UserPaginationResult {
    message: string;
    code: number;
    content?: PaginationUserContent;
}
interface UserProfileResult {
    message: string;
    code: number;
    content?: User;
}
interface PaginationUserContent {
    items: User[];
    pageIndex: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
}
export interface User {
    id: number;
    subjectId: number;
    name: string;
    username: string;
    roles: RoleUser[];
}
export interface RoleUser {
    id: number;
    identifier: string;
    parts: BasicPart[];
}
export interface BasicPart {
    id: number;
    applicationPartName: string;
    allowed: string[];
}
export interface BasicRole {
    id: number;
    identifier: string;
}
interface RolePaginationResult {
    message: string;
    code: number;
    content?: RolePaginationContent;
}
interface RolePaginationContent {
    items: Role[];
    pageIndex: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
}
export interface Role {
    id: number;
    identifier: string;
    parts: Part[];
}
export interface Part {
    id: number;
    applicationPartName: string;
    allowed: Option[];
}
interface RoleResult {
    message: string;
    code: number;
    content?: BasicRole[];
}
export interface BasicRole {
    id: number;
    identifier: string;
}
export interface Option {
    allowed: string;
    id: number;
}
export {};
