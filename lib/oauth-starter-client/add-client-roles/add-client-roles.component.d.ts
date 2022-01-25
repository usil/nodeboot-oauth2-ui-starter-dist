import { NodebootOauth2StarterService } from './../../nodeboot-oauth2-starter.service';
import { OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BasicRole, Client } from '../../nodeboot-oauth2-starter.service';
import * as i0 from "@angular/core";
export declare class AddClientRolesComponent implements OnInit {
    dialogRef: MatDialogRef<AddClientRolesComponent>;
    private formBuilder;
    private nbService;
    client: Client;
    addRolesForm: FormGroup;
    errorMessage: string;
    errorMessageRoles: string;
    roles: BasicRole[];
    rolesList: BasicRole[];
    constructor(dialogRef: MatDialogRef<AddClientRolesComponent>, formBuilder: FormBuilder, nbService: NodebootOauth2StarterService, client: Client);
    ngOnInit(): void;
    addRoleToList(): void;
    removeRoleToList(role: BasicRole): void;
    closeDialog(): void;
    updateRoles(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AddClientRolesComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AddClientRolesComponent, "lib-add-client-roles", never, {}, {}, never, never>;
}
