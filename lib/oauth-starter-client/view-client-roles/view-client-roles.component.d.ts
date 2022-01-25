import { OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Client } from '../../nodeboot-oauth2-starter.service';
import * as i0 from "@angular/core";
export declare class ViewClientRolesComponent implements OnInit {
    dialogRef: MatDialogRef<ViewClientRolesComponent>;
    client: Client;
    userTitle: string;
    constructor(dialogRef: MatDialogRef<ViewClientRolesComponent>, client: Client);
    ngOnInit(): void;
    closeDialog(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ViewClientRolesComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ViewClientRolesComponent, "lib-view-client-roles", never, {}, {}, never, never>;
}
