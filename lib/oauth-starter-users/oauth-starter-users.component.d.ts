import { NodebootOauth2StarterService, User } from './../nodeboot-oauth2-starter.service';
import { AfterViewInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export declare class OauthStarterUsersComponent implements OnDestroy, AfterViewInit {
    private nbService;
    dialog: MatDialog;
    users: User[];
    errorMessage: string | undefined;
    displayedColumns: string[];
    resultsLength: number;
    isLoadingResults: boolean;
    reload: BehaviorSubject<number>;
    userDataSubscription: Subscription;
    paginator: MatPaginator;
    sort: MatSort;
    constructor(nbService: NodebootOauth2StarterService, dialog: MatDialog);
    ngOnDestroy(): void;
    ngAfterViewInit(): void;
    openCreateUserDialog(): void;
    openViewRolesDialog(user: User): void;
    openDialogDeleteUser(user: User): void;
    openUpdateRolesDialog(user: User): void;
    openUpdateUserDialog(user: User): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<OauthStarterUsersComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OauthStarterUsersComponent, "lib-oauth-starter-users", never, {}, {}, never, never>;
}
