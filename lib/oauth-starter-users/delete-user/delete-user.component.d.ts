import { OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NodebootOauth2StarterService, User } from '../../nodeboot-oauth2-starter.service';
import * as i0 from "@angular/core";
export declare class DeleteUserComponent implements OnInit {
    dialogRef: MatDialogRef<DeleteUserComponent>;
    private nbService;
    user: User;
    errorMessage: string;
    constructor(dialogRef: MatDialogRef<DeleteUserComponent>, nbService: NodebootOauth2StarterService, user: User);
    ngOnInit(): void;
    delete(): void;
    closeDialog(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DeleteUserComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DeleteUserComponent, "lib-delete-user", never, {}, {}, never, never>;
}
