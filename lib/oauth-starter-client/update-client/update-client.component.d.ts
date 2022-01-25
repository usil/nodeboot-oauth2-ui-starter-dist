import { OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Client, ClientUpdateBody, NodebootOauth2StarterService } from '../../nodeboot-oauth2-starter.service';
import * as i0 from "@angular/core";
export declare class UpdateClientComponent implements OnInit {
    private formBuilder;
    dialogRef: MatDialogRef<UpdateClientComponent>;
    private nbService;
    client: Client;
    errorMessage: string;
    updateUserForm: FormGroup;
    constructor(formBuilder: FormBuilder, dialogRef: MatDialogRef<UpdateClientComponent>, nbService: NodebootOauth2StarterService, client: Client);
    closeDialog(): void;
    updateUser(updateClientData: ClientUpdateBody): void;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UpdateClientComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UpdateClientComponent, "lib-update-client", never, {}, {}, never, never>;
}
