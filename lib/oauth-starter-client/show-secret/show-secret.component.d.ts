import { Subscription } from 'rxjs';
import { OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Client, NodebootOauth2StarterService } from '../../nodeboot-oauth2-starter.service';
import * as i0 from "@angular/core";
export declare class ShowSecretComponent implements OnInit, OnDestroy {
    private nbService;
    dialogRef: MatDialogRef<ShowSecretComponent>;
    client: Client;
    hide: boolean;
    clientSecret: string;
    errorMessage: string;
    subscription: Subscription;
    constructor(nbService: NodebootOauth2StarterService, dialogRef: MatDialogRef<ShowSecretComponent>, client: Client);
    ngOnDestroy(): void;
    ngOnInit(): void;
    closeDialog(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ShowSecretComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ShowSecretComponent, "lib-show-secret", never, {}, {}, never, never>;
}
