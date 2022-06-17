import { OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BasicRole, NodebootOauth2StarterService } from '../../nodeboot-oauth2-starter.service';
import * as i0 from "@angular/core";
export declare class CreateClientComponent implements OnInit {
    dialogRef: MatDialogRef<CreateClientComponent>;
    private formBuilder;
    private nbService;
    createClientForm: UntypedFormGroup;
    errorMessage: string;
    errorMessageRoles: string;
    roles: BasicRole[];
    rolesList: BasicRole[];
    hidePassword: boolean;
    constructor(dialogRef: MatDialogRef<CreateClientComponent>, formBuilder: UntypedFormBuilder, nbService: NodebootOauth2StarterService);
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
    static ɵcmp: i0.ɵɵComponentDeclaration<CreateClientComponent, "lib-create-client", never, {}, {}, never, never, false>;
}
