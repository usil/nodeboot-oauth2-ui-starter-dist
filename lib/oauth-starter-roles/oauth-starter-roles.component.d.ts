import { OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, Subscription } from 'rxjs';
import { BasicRole, NodebootOauth2StarterService, Role } from '../nodeboot-oauth2-starter.service';
import * as i0 from "@angular/core";
export declare class OauthStarterRolesComponent implements OnInit {
    private nbService;
    dialog: MatDialog;
    roles: BasicRole[];
    errorMessage: string | undefined;
    displayedColumns: string[];
    resultsLength: number;
    isLoadingResults: boolean;
    reload: BehaviorSubject<number>;
    roleDataSubscription: Subscription;
    paginator: MatPaginator;
    sort: MatSort;
    constructor(nbService: NodebootOauth2StarterService, dialog: MatDialog);
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngAfterViewInit(): void;
    openCreateRoleDialog(): void;
    openOptionsDialog(role: Role): void;
    openDeleteRoleDialog(role: Role): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<OauthStarterRolesComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OauthStarterRolesComponent, "lib-oauth-starter-roles", never, {}, {}, never, never>;
}
