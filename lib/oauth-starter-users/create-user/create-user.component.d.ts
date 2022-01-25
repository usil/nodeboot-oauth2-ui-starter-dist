import { OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BasicRole, NodebootOauth2StarterService } from '../../nodeboot-oauth2-starter.service';
import * as i0 from "@angular/core";
export declare class CreateUserComponent implements OnInit {
    dialogRef: MatDialogRef<CreateUserComponent>;
    private formBuilder;
    private nbService;
    createUserForm: FormGroup;
    errorMessage: string;
    errorMessageRoles: string;
    roles: BasicRole[];
    rolesList: BasicRole[];
    hidePassword: boolean;
    constructor(dialogRef: MatDialogRef<CreateUserComponent>, formBuilder: FormBuilder, nbService: NodebootOauth2StarterService);
    ngOnInit(): void;
    addRoleToList(): void;
    removeRoleToList(role: BasicRole): void;
    closeDialog(): void;
    createUser(createUserData: {
        name: string;
        username: string;
        password: string;
        role: string | undefined;
    }): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CreateUserComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CreateUserComponent, "lib-create-user", never, {}, {}, never, never>;
}
