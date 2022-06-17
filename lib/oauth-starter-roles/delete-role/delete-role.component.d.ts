import { OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NodebootOauth2StarterService, Role } from '../../nodeboot-oauth2-starter.service';
import * as i0 from "@angular/core";
export declare class DeleteRoleComponent implements OnInit {
    dialogRef: MatDialogRef<DeleteRoleComponent>;
    private nbService;
    role: Role;
    errorMessage: string;
    constructor(dialogRef: MatDialogRef<DeleteRoleComponent>, nbService: NodebootOauth2StarterService, role: Role);
    ngOnInit(): void;
    delete(): void;
    closeDialog(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DeleteRoleComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DeleteRoleComponent, "lib-delete-role", never, {}, {}, never, never, false>;
}
