import { OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BasicRole, NodebootOauth2StarterService, User } from '../../nodeboot-oauth2-starter.service';
import * as i0 from "@angular/core";
export declare class AddUserRolesComponent implements OnInit {
    dialogRef: MatDialogRef<AddUserRolesComponent>;
    private formBuilder;
    private nbService;
    user: User;
    addRolesForm: UntypedFormGroup;
    errorMessage: string;
    errorMessageRoles: string;
    roles: BasicRole[];
    rolesList: BasicRole[];
    constructor(dialogRef: MatDialogRef<AddUserRolesComponent>, formBuilder: UntypedFormBuilder, nbService: NodebootOauth2StarterService, user: User);
    ngOnInit(): void;
    addRoleToList(): void;
    removeRoleToList(role: BasicRole): void;
    closeDialog(): void;
    updateRoles(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AddUserRolesComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AddUserRolesComponent, "lib-add-user-roles", never, {}, {}, never, never, false>;
}
