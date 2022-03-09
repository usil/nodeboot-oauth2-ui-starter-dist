import { Application, NodebootOauth2StarterService } from '../../nodeboot-oauth2-starter.service';
import { OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import * as i0 from "@angular/core";
export declare class CreateApplicationResourceComponent implements OnInit {
    dialogRef: MatDialogRef<CreateApplicationResourceComponent>;
    private formBuilder;
    private nbService;
    createResourceForm: FormGroup;
    errorMessage: string;
    errorMessageRoles: string;
    applications: Application[];
    hidePassword: boolean;
    loadingResult: boolean;
    constructor(dialogRef: MatDialogRef<CreateApplicationResourceComponent>, formBuilder: FormBuilder, nbService: NodebootOauth2StarterService);
    ngOnInit(): void;
    createResource(createResourceForm: {
        resourceIdentifier: string;
        application: number;
    }): void;
    closeDialog(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CreateApplicationResourceComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CreateApplicationResourceComponent, "lib-create-application-resource", never, {}, {}, never, never>;
}
