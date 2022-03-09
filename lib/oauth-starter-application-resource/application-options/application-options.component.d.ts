import { OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NodebootOauth2StarterService, Resource, Option } from '../../nodeboot-oauth2-starter.service';
import * as i0 from "@angular/core";
export declare class ApplicationOptionsComponent implements OnInit {
    dialogRef: MatDialogRef<ApplicationOptionsComponent>;
    private formBuilder;
    private nbService;
    resource: Resource;
    addResourceOptionForm: FormGroup;
    errorMessage: string;
    errorMessageRoles: string;
    options: Option[];
    optionsList: Option[];
    hidePassword: boolean;
    constructor(dialogRef: MatDialogRef<ApplicationOptionsComponent>, formBuilder: FormBuilder, nbService: NodebootOauth2StarterService, resource: Resource);
    ngOnInit(): void;
    isBasicOption(allowed: string): boolean;
    addOptionToList(): void;
    removeFromOptionList(optionToRemove: Option): void;
    closeDialog(): void;
    updateResourceOptions(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ApplicationOptionsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ApplicationOptionsComponent, "lib-application-options", never, {}, {}, never, never>;
}
