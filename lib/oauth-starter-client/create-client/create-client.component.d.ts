import { OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BasicRole, NodebootOauth2StarterService } from '../../nodeboot-oauth2-starter.service';
import * as i0 from "@angular/core";
export declare class CreateClientComponent implements OnInit {
    dialogRef: MatDialogRef<CreateClientComponent>;
    private formBuilder;
    private nbService;
    createClientForm: FormGroup;
    errorMessage: string;
    errorMessageRoles: string;
    roles: BasicRole[];
    rolesList: BasicRole[];
    hidePassword: boolean;
    constructor(dialogRef: MatDialogRef<CreateClientComponent>, formBuilder: FormBuilder, nbService: NodebootOauth2StarterService);
    ngOnInit(): void;
    addRoleToList(): void;
    removeRoleToList(role: BasicRole): void;
    closeDialog(): void;
    createClient(createClientData: {
        name: string;
        identifier: string;
        role: string | undefined;
        longLive?: boolean;
    }): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CreateClientComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CreateClientComponent, "lib-create-client", never, {}, {}, never, never>;
}
