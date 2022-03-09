import { OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NodebootOauth2StarterService, Resource, Permission } from '../../nodeboot-oauth2-starter.service';
import * as i0 from "@angular/core";
export declare class ApplicationPermissionsComponent implements OnInit {
    dialogRef: MatDialogRef<ApplicationPermissionsComponent>;
    private formBuilder;
    private nbService;
    resource: Resource;
    addResourcePermissionForm: FormGroup;
    errorMessage: string;
    errorMessageRoles: string;
    permissions: Permission[];
    permissionsList: Permission[];
    hidePassword: boolean;
    constructor(dialogRef: MatDialogRef<ApplicationPermissionsComponent>, formBuilder: FormBuilder, nbService: NodebootOauth2StarterService, resource: Resource);
    ngOnInit(): void;
    isBasicPermission(allowed: string): boolean;
    addPermissionToList(): void;
    removeFromPermissionList(permissionToRemove: Permission): void;
    closeDialog(): void;
    updateResourcePermissions(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ApplicationPermissionsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ApplicationPermissionsComponent, "lib-application-permissions", never, {}, {}, never, never>;
}
