import { OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Resource, Role, Permission as Permission, NodebootOauth2StarterService } from '../../nodeboot-oauth2-starter.service';
import * as i0 from "@angular/core";
export declare class PermissionsComponent implements OnInit, OnDestroy {
    dialogRef: MatDialogRef<PermissionsComponent>;
    role: Role;
    private nbService;
    private formBuilder;
    permissionsForm: FormGroup;
    errorMessage: string;
    permissions: Resource[];
    allowedShowList: Permission[];
    allowedObject: Record<string, Permission[]>;
    originalAllowedObject: Record<string, Permission[]>;
    objectKeys: {
        (o: object): string[];
        (o: {}): string[];
    };
    convertToString: {
        (value: any, replacer?: ((this: any, key: string, value: any) => any) | undefined, space?: string | number | undefined): string;
        (value: any, replacer?: (string | number)[] | null | undefined, space?: string | number | undefined): string;
    };
    resourceSubscription: Subscription;
    constructor(dialogRef: MatDialogRef<PermissionsComponent>, role: Role, nbService: NodebootOauth2StarterService, formBuilder: FormBuilder);
    ngOnInit(): void;
    ngOnDestroy(): void;
    selectedChange(selected: boolean, value: string): void;
    closeDialog(): void;
    updatePermissions(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PermissionsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PermissionsComponent, "lib-permissions", never, {}, {}, never, never>;
}
