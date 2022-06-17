import { OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../../nodeboot-oauth2-starter.service';
import * as i0 from "@angular/core";
export declare class ViewUserRolesComponent implements OnInit {
    dialogRef: MatDialogRef<ViewUserRolesComponent>;
    user: User;
    userTitle: string;
    constructor(dialogRef: MatDialogRef<ViewUserRolesComponent>, user: User);
    closeDialog(): void;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ViewUserRolesComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ViewUserRolesComponent, "lib-view-user-roles", never, {}, {}, never, never, false>;
}
