import { OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Client, NodebootOauth2StarterService } from '../../nodeboot-oauth2-starter.service';
import * as i0 from "@angular/core";
export declare class DeleteClientComponent implements OnInit {
    dialogRef: MatDialogRef<DeleteClientComponent>;
    private nbService;
    client: Client;
    errorMessage: string;
    constructor(dialogRef: MatDialogRef<DeleteClientComponent>, nbService: NodebootOauth2StarterService, client: Client);
    ngOnInit(): void;
    delete(): void;
    closeDialog(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DeleteClientComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DeleteClientComponent, "lib-delete-client", never, {}, {}, never, never, false>;
}
