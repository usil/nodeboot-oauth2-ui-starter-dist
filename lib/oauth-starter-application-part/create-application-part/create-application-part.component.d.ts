import { Application, NodebootOauth2StarterService } from './../../nodeboot-oauth2-starter.service';
import { OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import * as i0 from "@angular/core";
export declare class CreateApplicationPartComponent implements OnInit {
    dialogRef: MatDialogRef<CreateApplicationPartComponent>;
    private formBuilder;
    private nbService;
    createPartForm: FormGroup;
    errorMessage: string;
    errorMessageRoles: string;
    applications: Application[];
    hidePassword: boolean;
    loadingResult: boolean;
    constructor(dialogRef: MatDialogRef<CreateApplicationPartComponent>, formBuilder: FormBuilder, nbService: NodebootOauth2StarterService);
    ngOnInit(): void;
    createPart(createPartForm: {
        partIdentifier: string;
        application: number;
    }): void;
    closeDialog(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CreateApplicationPartComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CreateApplicationPartComponent, "lib-create-application-part", never, {}, {}, never, never>;
}
