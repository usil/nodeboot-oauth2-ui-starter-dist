import { OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Part, Role, Option, NodebootOauth2StarterService } from '../../nodeboot-oauth2-starter.service';
import * as i0 from "@angular/core";
export declare class OptionsComponent implements OnInit, OnDestroy {
    dialogRef: MatDialogRef<OptionsComponent>;
    role: Role;
    private nbService;
    private formBuilder;
    optionsForm: FormGroup;
    errorMessage: string;
    options: Part[];
    allowedShowList: Option[];
    allowedObject: Record<string, Option[]>;
    originalAllowedObject: Record<string, Option[]>;
    objectKeys: {
        (o: object): string[];
        (o: {}): string[];
    };
    convertToString: {
        (value: any, replacer?: ((this: any, key: string, value: any) => any) | undefined, space?: string | number | undefined): string;
        (value: any, replacer?: (string | number)[] | null | undefined, space?: string | number | undefined): string;
    };
    partSubscription: Subscription;
    constructor(dialogRef: MatDialogRef<OptionsComponent>, role: Role, nbService: NodebootOauth2StarterService, formBuilder: FormBuilder);
    ngOnInit(): void;
    ngOnDestroy(): void;
    selectedChange(selected: boolean, value: string): void;
    closeDialog(): void;
    updateOptions(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<OptionsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OptionsComponent, "lib-options", never, {}, {}, never, never>;
}
