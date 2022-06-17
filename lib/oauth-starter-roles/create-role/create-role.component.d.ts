import { OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Resource, Option, NodebootOauth2StarterService } from '../../nodeboot-oauth2-starter.service';
import * as i0 from "@angular/core";
export declare class CreateRoleComponent implements OnInit, OnDestroy {
    private formBuilder;
    private nbService;
    dialogRef: MatDialogRef<CreateRoleComponent>;
    createRoleForm: UntypedFormGroup;
    errorMessage: string;
    options: Resource[];
    allowedShowList: Option[];
    allowedObject: Record<string, Option[]>;
    objectKeys: {
        (o: object): string[];
        (o: {}): string[];
    };
    selectedSubscription: Subscription;
    resourceSubscription: Subscription;
    constructor(formBuilder: UntypedFormBuilder, nbService: NodebootOauth2StarterService, dialogRef: MatDialogRef<CreateRoleComponent>);
    ngOnDestroy(): void;
    ngOnInit(): void;
    createRole(roleBody: {
        identifier: string;
        resource: string | undefined;
    }): void;
    selectedChange(selected: boolean, value: Option): void;
    closeDialog(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CreateRoleComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CreateRoleComponent, "lib-create-role", never, {}, {}, never, never, false>;
}
