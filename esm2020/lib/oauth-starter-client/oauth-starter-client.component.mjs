import { ShowSecretComponent } from './show-secret/show-secret.component';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, merge, startWith, switchMap, catchError, of, map, first, } from 'rxjs';
import { AddClientRolesComponent } from './add-client-roles/add-client-roles.component';
import { CreateClientComponent } from './create-client/create-client.component';
import { DeleteClientComponent } from './delete-client/delete-client.component';
import { ShowTokenComponent } from './show-token/show-token.component';
import { UpdateClientComponent } from './update-client/update-client.component';
import { ViewClientRolesComponent } from './view-client-roles/view-client-roles.component';
import { ShowNewTokenComponent } from './show-new-token/show-new-token.component';
import * as i0 from "@angular/core";
import * as i1 from "../nodeboot-oauth2-starter.service";
import * as i2 from "@angular/material/dialog";
import * as i3 from "@angular/material/button";
import * as i4 from "@angular/material/progress-spinner";
import * as i5 from "@angular/material/table";
import * as i6 from "@angular/material/sort";
import * as i7 from "@angular/material/paginator";
import * as i8 from "@angular/common";
export class OauthStarterClientComponent {
    constructor(nbService, dialog) {
        this.nbService = nbService;
        this.dialog = dialog;
        this.displayedColumns = [
            'id',
            'name',
            'identifier',
            'clientSecret',
            'accessToken',
            'roles',
            'edit',
        ];
        this.resultsLength = 0;
        this.isLoadingResults = true;
        this.wholePageLoading = false;
        this.reload = new BehaviorSubject(0);
    }
    ngAfterViewInit() {
        this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
        this.clientDataSubscription = merge(this.sort.sortChange, this.paginator.page, this.reload)
            .pipe(startWith({}), switchMap(() => {
            this.errorMessage = undefined;
            this.isLoadingResults = true;
            return this.nbService.getClients(this.paginator.pageIndex, this.sort.direction).pipe(catchError((err) => {
                if (err.error) {
                    this.errorMessage = err.error.message;
                }
                else {
                    this.errorMessage = 'Unknown Error';
                }
                return of(null);
            }));
        }), map((data) => {
            this.isLoadingResults = false;
            if (data === null) {
                return [];
            }
            this.resultsLength = data.content?.totalItems || 0;
            return data.content?.items || [];
        }))
            .subscribe((data) => {
            this.clients = data;
        });
    }
    ngOnInit() { }
    ngOnDestroy() {
        this.clientDataSubscription?.unsubscribe();
        this.sort.sortChange.complete();
    }
    openShowSecretComponent(client) {
        this.dialog.open(ShowSecretComponent, {
            width: '600px',
            maxHeight: '70vh',
            data: client,
        });
    }
    generateNewLongLiveToken(client) {
        this.nbService
            .generateLongLiveToken(client.id, client.identifier)
            .subscribe({
            error: (err) => {
                if (err.error) {
                    this.errorMessage = err.error.message;
                }
                else {
                    this.errorMessage = 'Unknown Error';
                }
            },
            next: (res) => {
                this.reload.next(this.reload.value + 1);
                this.dialog.open(ShowNewTokenComponent, {
                    width: '600px',
                    maxHeight: '70vh',
                    data: { access_token: res.content.access_token },
                });
            },
        });
    }
    removeLongLiveToken(client) {
        this.wholePageLoading = true;
        this.nbService.removeLongLiveToken(client.id, client.identifier).subscribe({
            error: (err) => {
                if (err.error) {
                    this.errorMessage = err.error.message;
                }
                else {
                    this.errorMessage = 'Unknown Error';
                }
            },
            next: () => {
                this.reload.next(this.reload.value + 1);
            },
            complete: () => {
                this.wholePageLoading = false;
            },
        });
    }
    revokeClient(client) {
        this.wholePageLoading = true;
        this.nbService.modifyRevokeStatus(client.id, true).subscribe({
            error: (err) => {
                if (err.error) {
                    this.errorMessage = err.error.message;
                }
                else {
                    this.errorMessage = 'Unknown Error';
                }
            },
            next: () => {
                this.reload.next(this.reload.value + 1);
            },
            complete: () => {
                this.wholePageLoading = false;
            },
        });
    }
    ratifyClient(client) {
        this.wholePageLoading = true;
        this.nbService.modifyRevokeStatus(client.id, false).subscribe({
            error: (err) => {
                if (err.error) {
                    this.errorMessage = err.error.message;
                }
                else {
                    this.errorMessage = 'Unknown Error';
                }
            },
            next: () => {
                this.reload.next(this.reload.value + 1);
            },
            complete: () => {
                this.wholePageLoading = false;
            },
        });
    }
    openCreateClientDialog() {
        const createClientDialogRef = this.dialog.open(CreateClientComponent, {
            width: '600px',
            maxHeight: '70vh',
        });
        createClientDialogRef
            .afterClosed()
            .pipe(first())
            .subscribe({
            next: (res) => {
                if (res) {
                    this.dialog.open(ShowTokenComponent, {
                        width: '600px',
                        maxHeight: '70vh',
                        data: res,
                    });
                    this.reload.next(this.reload.value + 1);
                }
            },
        });
    }
    openViewRolesDialog(client) {
        this.dialog.open(ViewClientRolesComponent, {
            width: '600px',
            maxHeight: '70vh',
            data: client,
        });
    }
    openUpdateRolesDialog(client) {
        const updateRolesDialogRef = this.dialog.open(AddClientRolesComponent, {
            width: '600px',
            maxHeight: '70vh',
            data: client,
        });
        updateRolesDialogRef
            .afterClosed()
            .pipe(first())
            .subscribe({
            next: (res) => {
                if (res) {
                    this.reload.next(this.reload.value + 1);
                }
            },
        });
    }
    openUpdateClientDialog(client) {
        const updateClientDialogRef = this.dialog.open(UpdateClientComponent, {
            width: '600px',
            maxHeight: '70vh',
            data: client,
        });
        updateClientDialogRef
            .afterClosed()
            .pipe(first())
            .subscribe({
            next: (res) => {
                if (res) {
                    this.reload.next(this.reload.value + 1);
                }
            },
        });
    }
    openDialogDeleteClient(client) {
        const updateRolesDialogRef = this.dialog.open(DeleteClientComponent, {
            width: '600px',
            maxHeight: '70vh',
            data: client,
        });
        updateRolesDialogRef
            .afterClosed()
            .pipe(first())
            .subscribe({
            next: (res) => {
                if (res) {
                    this.reload.next(this.reload.value + 1);
                }
            },
        });
    }
}
OauthStarterClientComponent.??fac = i0.????ngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: OauthStarterClientComponent, deps: [{ token: i1.NodebootOauth2StarterService }, { token: i2.MatDialog }], target: i0.????FactoryTarget.Component });
OauthStarterClientComponent.??cmp = i0.????ngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: OauthStarterClientComponent, selector: "lib-oauth-starter-client", viewQueries: [{ propertyName: "paginator", first: true, predicate: MatPaginator, descendants: true }, { propertyName: "sort", first: true, predicate: MatSort, descendants: true }], ngImport: i0, template: "<div class=\"client-container\">\n  <div class=\"client-head\">\n    <h1 class=\"client-title\">Clients</h1>\n    <span class=\"separator\"></span>\n    <button (click)=\"openCreateClientDialog()\" color=\"accent\" mat-flat-button>\n      Add Client\n    </button>\n  </div>\n  <div class=\"client-body\">\n    <div class=\"container-table mat-elevation-z8\">\n      <div class=\"loading-shade\" *ngIf=\"isLoadingResults\">\n        <mat-spinner *ngIf=\"isLoadingResults\"></mat-spinner>\n      </div>\n\n      <div class=\"example-table-container\">\n        <table\n          mat-table\n          [dataSource]=\"clients\"\n          class=\"client-table\"\n          matSort\n          matSortActive=\"id\"\n          matSortDisableClear\n          matSortDirection=\"asc\"\n        >\n          <ng-container matColumnDef=\"id\">\n            <th mat-sort-header mat-header-cell *matHeaderCellDef>id</th>\n            <td mat-cell *matCellDef=\"let row\">{{ row.id }}</td>\n          </ng-container>\n\n          <ng-container matColumnDef=\"name\">\n            <th mat-header-cell *matHeaderCellDef>Name</th>\n            <td mat-cell *matCellDef=\"let row\">{{ row.name }}</td>\n          </ng-container>\n\n          <ng-container matColumnDef=\"identifier\">\n            <th mat-header-cell *matHeaderCellDef>Identifier</th>\n            <td mat-cell *matCellDef=\"let row\">{{ row.identifier }}</td>\n          </ng-container>\n\n          <ng-container matColumnDef=\"clientSecret\">\n            <th mat-header-cell *matHeaderCellDef>Secret</th>\n            <td class=\"roles-column\" mat-cell *matCellDef=\"let row\">\n              <button (click)=\"openShowSecretComponent(row)\" mat-stroked-button>\n                Secret Key\n              </button>\n            </td>\n          </ng-container>\n\n          <ng-container matColumnDef=\"accessToken\">\n            <th mat-header-cell *matHeaderCellDef>Access Token</th>\n            <td class=\"roles-column\" mat-cell *matCellDef=\"let row\">\n              <button\n                (click)=\"generateNewLongLiveToken(row)\"\n                mat-stroked-button\n                *ngIf=\"!row.hasLongLiveToken\"\n              >\n                Generate Long Live\n              </button>\n              <button\n                *ngIf=\"row.hasLongLiveToken\"\n                color=\"warn\"\n                (click)=\"removeLongLiveToken(row)\"\n                mat-stroked-button\n              >\n                Remove Long Live\n              </button>\n            </td>\n          </ng-container>\n\n          <ng-container matColumnDef=\"roles\">\n            <th mat-header-cell *matHeaderCellDef>Roles</th>\n            <td class=\"roles-column\" mat-cell *matCellDef=\"let row\">\n              <button (click)=\"openViewRolesDialog(row)\" mat-stroked-button>\n                View Roles\n              </button>\n              <button\n                [disabled]=\"row.identifier === 'admin'\"\n                (click)=\"openUpdateRolesDialog(row)\"\n                mat-stroked-button\n              >\n                Update Roles\n              </button>\n            </td>\n          </ng-container>\n\n          <ng-container matColumnDef=\"edit\">\n            <th mat-header-cell *matHeaderCellDef></th>\n            <td class=\"actions-column\" mat-cell *matCellDef=\"let row\">\n              <button\n                *ngIf=\"!row.revoked\"\n                color=\"primary\"\n                [disabled]=\"row.identifier === 'admin'\"\n                mat-stroked-button\n                (click)=\"revokeClient(row)\"\n              >\n                Revoke Client\n              </button>\n              <button\n                *ngIf=\"row.revoked\"\n                color=\"primary\"\n                [disabled]=\"row.identifier === 'admin'\"\n                mat-stroked-button\n                (click)=\"ratifyClient(row)\"\n              >\n                Ratify Client\n              </button>\n              <button\n                color=\"primary\"\n                [disabled]=\"row.identifier === 'admin'\"\n                mat-stroked-button\n                (click)=\"openUpdateClientDialog(row)\"\n              >\n                Edit Client\n              </button>\n              <button\n                color=\"warn\"\n                [disabled]=\"row.identifier === 'admin'\"\n                mat-stroked-button\n                (click)=\"openDialogDeleteClient(row)\"\n              >\n                Delete Client\n              </button>\n            </td>\n          </ng-container>\n\n          <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n          <tr mat-row *matRowDef=\"let row; columns: displayedColumns\"></tr>\n        </table>\n      </div>\n\n      <mat-paginator [length]=\"resultsLength\" [pageSize]=\"20\"></mat-paginator>\n    </div>\n  </div>\n</div>\n<div *ngIf=\"wholePageLoading\" class=\"loading-full\">\n  <mat-spinner></mat-spinner>\n</div>\n", styles: [".client-container .client-head{display:flex;margin-bottom:2rem}.client-container .client-head .separator{flex:1 0}.client-container .client-head .client-title{margin:0;font-size:32px}.client-container table{width:100%;overflow-x:auto}.client-container table th,.client-container table td{min-width:80px}.client-container table .roles-column button:last-child{margin-left:.5rem}.client-container table .actions-column{text-align:end}.client-container table .actions-column button{margin-left:.5rem}.client-container .container-table{position:relative}.client-container .loading-shade{position:absolute;top:0;left:0;bottom:56px;right:0;background:rgba(0,0,0,.15);z-index:1;display:flex;align-items:center;justify-content:center}.loading-full{pointer-events:all;z-index:99999;border:none;margin:0;padding:0;width:100%;height:100%;top:0px;left:0px;cursor:wait;position:fixed;background-color:#0009}\n"], components: [{ type: i3.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { type: i4.MatSpinner, selector: "mat-spinner", inputs: ["color"] }, { type: i5.MatTable, selector: "mat-table, table[mat-table]", exportAs: ["matTable"] }, { type: i6.MatSortHeader, selector: "[mat-sort-header]", inputs: ["disabled", "mat-sort-header", "arrowPosition", "start", "sortActionDescription", "disableClear"], exportAs: ["matSortHeader"] }, { type: i5.MatHeaderRow, selector: "mat-header-row, tr[mat-header-row]", exportAs: ["matHeaderRow"] }, { type: i5.MatRow, selector: "mat-row, tr[mat-row]", exportAs: ["matRow"] }, { type: i7.MatPaginator, selector: "mat-paginator", inputs: ["disabled"], exportAs: ["matPaginator"] }], directives: [{ type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6.MatSort, selector: "[matSort]", inputs: ["matSortDisabled", "matSortActive", "matSortStart", "matSortDirection", "matSortDisableClear"], outputs: ["matSortChange"], exportAs: ["matSort"] }, { type: i5.MatColumnDef, selector: "[matColumnDef]", inputs: ["sticky", "matColumnDef"] }, { type: i5.MatHeaderCellDef, selector: "[matHeaderCellDef]" }, { type: i5.MatHeaderCell, selector: "mat-header-cell, th[mat-header-cell]" }, { type: i5.MatCellDef, selector: "[matCellDef]" }, { type: i5.MatCell, selector: "mat-cell, td[mat-cell]" }, { type: i5.MatHeaderRowDef, selector: "[matHeaderRowDef]", inputs: ["matHeaderRowDef", "matHeaderRowDefSticky"] }, { type: i5.MatRowDef, selector: "[matRowDef]", inputs: ["matRowDefColumns", "matRowDefWhen"] }] });
i0.????ngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: OauthStarterClientComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-oauth-starter-client', template: "<div class=\"client-container\">\n  <div class=\"client-head\">\n    <h1 class=\"client-title\">Clients</h1>\n    <span class=\"separator\"></span>\n    <button (click)=\"openCreateClientDialog()\" color=\"accent\" mat-flat-button>\n      Add Client\n    </button>\n  </div>\n  <div class=\"client-body\">\n    <div class=\"container-table mat-elevation-z8\">\n      <div class=\"loading-shade\" *ngIf=\"isLoadingResults\">\n        <mat-spinner *ngIf=\"isLoadingResults\"></mat-spinner>\n      </div>\n\n      <div class=\"example-table-container\">\n        <table\n          mat-table\n          [dataSource]=\"clients\"\n          class=\"client-table\"\n          matSort\n          matSortActive=\"id\"\n          matSortDisableClear\n          matSortDirection=\"asc\"\n        >\n          <ng-container matColumnDef=\"id\">\n            <th mat-sort-header mat-header-cell *matHeaderCellDef>id</th>\n            <td mat-cell *matCellDef=\"let row\">{{ row.id }}</td>\n          </ng-container>\n\n          <ng-container matColumnDef=\"name\">\n            <th mat-header-cell *matHeaderCellDef>Name</th>\n            <td mat-cell *matCellDef=\"let row\">{{ row.name }}</td>\n          </ng-container>\n\n          <ng-container matColumnDef=\"identifier\">\n            <th mat-header-cell *matHeaderCellDef>Identifier</th>\n            <td mat-cell *matCellDef=\"let row\">{{ row.identifier }}</td>\n          </ng-container>\n\n          <ng-container matColumnDef=\"clientSecret\">\n            <th mat-header-cell *matHeaderCellDef>Secret</th>\n            <td class=\"roles-column\" mat-cell *matCellDef=\"let row\">\n              <button (click)=\"openShowSecretComponent(row)\" mat-stroked-button>\n                Secret Key\n              </button>\n            </td>\n          </ng-container>\n\n          <ng-container matColumnDef=\"accessToken\">\n            <th mat-header-cell *matHeaderCellDef>Access Token</th>\n            <td class=\"roles-column\" mat-cell *matCellDef=\"let row\">\n              <button\n                (click)=\"generateNewLongLiveToken(row)\"\n                mat-stroked-button\n                *ngIf=\"!row.hasLongLiveToken\"\n              >\n                Generate Long Live\n              </button>\n              <button\n                *ngIf=\"row.hasLongLiveToken\"\n                color=\"warn\"\n                (click)=\"removeLongLiveToken(row)\"\n                mat-stroked-button\n              >\n                Remove Long Live\n              </button>\n            </td>\n          </ng-container>\n\n          <ng-container matColumnDef=\"roles\">\n            <th mat-header-cell *matHeaderCellDef>Roles</th>\n            <td class=\"roles-column\" mat-cell *matCellDef=\"let row\">\n              <button (click)=\"openViewRolesDialog(row)\" mat-stroked-button>\n                View Roles\n              </button>\n              <button\n                [disabled]=\"row.identifier === 'admin'\"\n                (click)=\"openUpdateRolesDialog(row)\"\n                mat-stroked-button\n              >\n                Update Roles\n              </button>\n            </td>\n          </ng-container>\n\n          <ng-container matColumnDef=\"edit\">\n            <th mat-header-cell *matHeaderCellDef></th>\n            <td class=\"actions-column\" mat-cell *matCellDef=\"let row\">\n              <button\n                *ngIf=\"!row.revoked\"\n                color=\"primary\"\n                [disabled]=\"row.identifier === 'admin'\"\n                mat-stroked-button\n                (click)=\"revokeClient(row)\"\n              >\n                Revoke Client\n              </button>\n              <button\n                *ngIf=\"row.revoked\"\n                color=\"primary\"\n                [disabled]=\"row.identifier === 'admin'\"\n                mat-stroked-button\n                (click)=\"ratifyClient(row)\"\n              >\n                Ratify Client\n              </button>\n              <button\n                color=\"primary\"\n                [disabled]=\"row.identifier === 'admin'\"\n                mat-stroked-button\n                (click)=\"openUpdateClientDialog(row)\"\n              >\n                Edit Client\n              </button>\n              <button\n                color=\"warn\"\n                [disabled]=\"row.identifier === 'admin'\"\n                mat-stroked-button\n                (click)=\"openDialogDeleteClient(row)\"\n              >\n                Delete Client\n              </button>\n            </td>\n          </ng-container>\n\n          <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n          <tr mat-row *matRowDef=\"let row; columns: displayedColumns\"></tr>\n        </table>\n      </div>\n\n      <mat-paginator [length]=\"resultsLength\" [pageSize]=\"20\"></mat-paginator>\n    </div>\n  </div>\n</div>\n<div *ngIf=\"wholePageLoading\" class=\"loading-full\">\n  <mat-spinner></mat-spinner>\n</div>\n", styles: [".client-container .client-head{display:flex;margin-bottom:2rem}.client-container .client-head .separator{flex:1 0}.client-container .client-head .client-title{margin:0;font-size:32px}.client-container table{width:100%;overflow-x:auto}.client-container table th,.client-container table td{min-width:80px}.client-container table .roles-column button:last-child{margin-left:.5rem}.client-container table .actions-column{text-align:end}.client-container table .actions-column button{margin-left:.5rem}.client-container .container-table{position:relative}.client-container .loading-shade{position:absolute;top:0;left:0;bottom:56px;right:0;background:rgba(0,0,0,.15);z-index:1;display:flex;align-items:center;justify-content:center}.loading-full{pointer-events:all;z-index:99999;border:none;margin:0;padding:0;width:100%;height:100%;top:0px;left:0px;cursor:wait;position:fixed;background-color:#0009}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.NodebootOauth2StarterService }, { type: i2.MatDialog }]; }, propDecorators: { paginator: [{
                type: ViewChild,
                args: [MatPaginator]
            }], sort: [{
                type: ViewChild,
                args: [MatSort]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2F1dGgtc3RhcnRlci1jbGllbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm9kZWJvb3Qtb2F1dGgyLXN0YXJ0ZXIvc3JjL2xpYi9vYXV0aC1zdGFydGVyLWNsaWVudC9vYXV0aC1zdGFydGVyLWNsaWVudC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub2RlYm9vdC1vYXV0aDItc3RhcnRlci9zcmMvbGliL29hdXRoLXN0YXJ0ZXItY2xpZW50L29hdXRoLXN0YXJ0ZXItY2xpZW50LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxTQUFTLEVBQVUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTdELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDakQsT0FBTyxFQUNMLGVBQWUsRUFFZixLQUFLLEVBQ0wsU0FBUyxFQUNULFNBQVMsRUFDVCxVQUFVLEVBQ1YsRUFBRSxFQUNGLEdBQUcsRUFDSCxLQUFLLEdBQ04sTUFBTSxNQUFNLENBQUM7QUFNZCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUN4RixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNoRixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNoRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN2RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNoRixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUMzRixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQzs7Ozs7Ozs7OztBQU9sRixNQUFNLE9BQU8sMkJBQTJCO0lBd0J0QyxZQUNVLFNBQXVDLEVBQ3hDLE1BQWlCO1FBRGhCLGNBQVMsR0FBVCxTQUFTLENBQThCO1FBQ3hDLFdBQU0sR0FBTixNQUFNLENBQVc7UUF2QjFCLHFCQUFnQixHQUFhO1lBQzNCLElBQUk7WUFDSixNQUFNO1lBQ04sWUFBWTtZQUNaLGNBQWM7WUFDZCxhQUFhO1lBQ2IsT0FBTztZQUNQLE1BQU07U0FDUCxDQUFDO1FBRUYsa0JBQWEsR0FBRyxDQUFDLENBQUM7UUFDbEIscUJBQWdCLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLHFCQUFnQixHQUFHLEtBQUssQ0FBQztRQUV6QixXQUFNLEdBQUcsSUFBSSxlQUFlLENBQVMsQ0FBQyxDQUFDLENBQUM7SUFVckMsQ0FBQztJQUVKLGVBQWU7UUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxLQUFLLENBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUNwQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FDWjthQUNFLElBQUksQ0FDSCxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQ2IsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNiLElBQUksQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDO1lBQzlCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7WUFDN0IsT0FBTyxJQUFJLENBQUMsU0FBVSxDQUFDLFVBQVUsQ0FDL0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUNwQixDQUFDLElBQUksQ0FDSixVQUFVLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDakIsSUFBSSxHQUFHLENBQUMsS0FBSyxFQUFFO29CQUNiLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7aUJBQ3ZDO3FCQUFNO29CQUNMLElBQUksQ0FBQyxZQUFZLEdBQUcsZUFBZSxDQUFDO2lCQUNyQztnQkFDRCxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQixDQUFDLENBQUMsQ0FDSCxDQUFDO1FBQ0osQ0FBQyxDQUFDLEVBQ0YsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDWCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO1lBQzlCLElBQUksSUFBSSxLQUFLLElBQUksRUFBRTtnQkFDakIsT0FBTyxFQUFFLENBQUM7YUFDWDtZQUNELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxVQUFVLElBQUksQ0FBQyxDQUFDO1lBQ25ELE9BQU8sSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLElBQUksRUFBRSxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUNIO2FBQ0EsU0FBUyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDbEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDdEIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsUUFBUSxLQUFVLENBQUM7SUFFbkIsV0FBVztRQUNULElBQUksQ0FBQyxzQkFBc0IsRUFBRSxXQUFXLEVBQUUsQ0FBQztRQUMzQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRUQsdUJBQXVCLENBQUMsTUFBYztRQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtZQUNwQyxLQUFLLEVBQUUsT0FBTztZQUNkLFNBQVMsRUFBRSxNQUFNO1lBQ2pCLElBQUksRUFBRSxNQUFNO1NBQ2IsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELHdCQUF3QixDQUFDLE1BQWM7UUFDckMsSUFBSSxDQUFDLFNBQVM7YUFDWCxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUM7YUFDbkQsU0FBUyxDQUFDO1lBQ1QsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ2IsSUFBSSxHQUFHLENBQUMsS0FBSyxFQUFFO29CQUNiLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7aUJBQ3ZDO3FCQUFNO29CQUNMLElBQUksQ0FBQyxZQUFZLEdBQUcsZUFBZSxDQUFDO2lCQUNyQztZQUNILENBQUM7WUFDRCxJQUFJLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDWixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDeEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUU7b0JBQ3RDLEtBQUssRUFBRSxPQUFPO29CQUNkLFNBQVMsRUFBRSxNQUFNO29CQUNqQixJQUFJLEVBQUUsRUFBRSxZQUFZLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUU7aUJBQ2pELENBQUMsQ0FBQztZQUNMLENBQUM7U0FDRixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsbUJBQW1CLENBQUMsTUFBYztRQUNoQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1FBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQ3pFLEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUNiLElBQUksR0FBRyxDQUFDLEtBQUssRUFBRTtvQkFDYixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO2lCQUN2QztxQkFBTTtvQkFDTCxJQUFJLENBQUMsWUFBWSxHQUFHLGVBQWUsQ0FBQztpQkFDckM7WUFDSCxDQUFDO1lBQ0QsSUFBSSxFQUFFLEdBQUcsRUFBRTtnQkFDVCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztZQUMxQyxDQUFDO1lBQ0QsUUFBUSxFQUFFLEdBQUcsRUFBRTtnQkFDYixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO1lBQ2hDLENBQUM7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsWUFBWSxDQUFDLE1BQWM7UUFDekIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztRQUM3QixJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQzNELEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUNiLElBQUksR0FBRyxDQUFDLEtBQUssRUFBRTtvQkFDYixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO2lCQUN2QztxQkFBTTtvQkFDTCxJQUFJLENBQUMsWUFBWSxHQUFHLGVBQWUsQ0FBQztpQkFDckM7WUFDSCxDQUFDO1lBQ0QsSUFBSSxFQUFFLEdBQUcsRUFBRTtnQkFDVCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztZQUMxQyxDQUFDO1lBQ0QsUUFBUSxFQUFFLEdBQUcsRUFBRTtnQkFDYixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO1lBQ2hDLENBQUM7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsWUFBWSxDQUFDLE1BQWM7UUFDekIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztRQUM3QixJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQzVELEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUNiLElBQUksR0FBRyxDQUFDLEtBQUssRUFBRTtvQkFDYixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO2lCQUN2QztxQkFBTTtvQkFDTCxJQUFJLENBQUMsWUFBWSxHQUFHLGVBQWUsQ0FBQztpQkFDckM7WUFDSCxDQUFDO1lBQ0QsSUFBSSxFQUFFLEdBQUcsRUFBRTtnQkFDVCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztZQUMxQyxDQUFDO1lBQ0QsUUFBUSxFQUFFLEdBQUcsRUFBRTtnQkFDYixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO1lBQ2hDLENBQUM7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsc0JBQXNCO1FBQ3BCLE1BQU0scUJBQXFCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUU7WUFDcEUsS0FBSyxFQUFFLE9BQU87WUFDZCxTQUFTLEVBQUUsTUFBTTtTQUNsQixDQUFDLENBQUM7UUFDSCxxQkFBcUI7YUFDbEIsV0FBVyxFQUFFO2FBQ2IsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ2IsU0FBUyxDQUFDO1lBQ1QsSUFBSSxFQUFFLENBQUMsR0FBd0IsRUFBRSxFQUFFO2dCQUNqQyxJQUFJLEdBQUcsRUFBRTtvQkFDUCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRTt3QkFDbkMsS0FBSyxFQUFFLE9BQU87d0JBQ2QsU0FBUyxFQUFFLE1BQU07d0JBQ2pCLElBQUksRUFBRSxHQUFHO3FCQUNWLENBQUMsQ0FBQztvQkFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztpQkFDekM7WUFDSCxDQUFDO1NBQ0YsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELG1CQUFtQixDQUFDLE1BQWM7UUFDaEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsd0JBQXdCLEVBQUU7WUFDekMsS0FBSyxFQUFFLE9BQU87WUFDZCxTQUFTLEVBQUUsTUFBTTtZQUNqQixJQUFJLEVBQUUsTUFBTTtTQUNiLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxxQkFBcUIsQ0FBQyxNQUFjO1FBQ2xDLE1BQU0sb0JBQW9CLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsdUJBQXVCLEVBQUU7WUFDckUsS0FBSyxFQUFFLE9BQU87WUFDZCxTQUFTLEVBQUUsTUFBTTtZQUNqQixJQUFJLEVBQUUsTUFBTTtTQUNiLENBQUMsQ0FBQztRQUVILG9CQUFvQjthQUNqQixXQUFXLEVBQUU7YUFDYixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDYixTQUFTLENBQUM7WUFDVCxJQUFJLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDWixJQUFJLEdBQUcsRUFBRTtvQkFDUCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztpQkFDekM7WUFDSCxDQUFDO1NBQ0YsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELHNCQUFzQixDQUFDLE1BQWM7UUFDbkMsTUFBTSxxQkFBcUIsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtZQUNwRSxLQUFLLEVBQUUsT0FBTztZQUNkLFNBQVMsRUFBRSxNQUFNO1lBQ2pCLElBQUksRUFBRSxNQUFNO1NBQ2IsQ0FBQyxDQUFDO1FBRUgscUJBQXFCO2FBQ2xCLFdBQVcsRUFBRTthQUNiLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUNiLFNBQVMsQ0FBQztZQUNULElBQUksRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUNaLElBQUksR0FBRyxFQUFFO29CQUNQLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO2lCQUN6QztZQUNILENBQUM7U0FDRixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsc0JBQXNCLENBQUMsTUFBYztRQUNuQyxNQUFNLG9CQUFvQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFO1lBQ25FLEtBQUssRUFBRSxPQUFPO1lBQ2QsU0FBUyxFQUFFLE1BQU07WUFDakIsSUFBSSxFQUFFLE1BQU07U0FDYixDQUFDLENBQUM7UUFFSCxvQkFBb0I7YUFDakIsV0FBVyxFQUFFO2FBQ2IsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ2IsU0FBUyxDQUFDO1lBQ1QsSUFBSSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ1osSUFBSSxHQUFHLEVBQUU7b0JBQ1AsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7aUJBQ3pDO1lBQ0gsQ0FBQztTQUNGLENBQUMsQ0FBQztJQUNQLENBQUM7O3dIQXhQVSwyQkFBMkI7NEdBQTNCLDJCQUEyQiwyR0FxQjNCLFlBQVksdUVBQ1osT0FBTyxnREN4RHBCLDQ0SkF5SUE7MkZEdkdhLDJCQUEyQjtrQkFMdkMsU0FBUzsrQkFDRSwwQkFBMEI7MklBeUJYLFNBQVM7c0JBQWpDLFNBQVM7dUJBQUMsWUFBWTtnQkFDSCxJQUFJO3NCQUF2QixTQUFTO3VCQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTaG93U2VjcmV0Q29tcG9uZW50IH0gZnJvbSAnLi9zaG93LXNlY3JldC9zaG93LXNlY3JldC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7IE1hdFBhZ2luYXRvciB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3BhZ2luYXRvcic7XG5pbXBvcnQgeyBNYXRTb3J0IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc29ydCc7XG5pbXBvcnQge1xuICBCZWhhdmlvclN1YmplY3QsXG4gIFN1YnNjcmlwdGlvbixcbiAgbWVyZ2UsXG4gIHN0YXJ0V2l0aCxcbiAgc3dpdGNoTWFwLFxuICBjYXRjaEVycm9yLFxuICBvZixcbiAgbWFwLFxuICBmaXJzdCxcbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBDbGllbnQsXG4gIENsaWVudENyZWF0ZUNvbnRlbnQsXG4gIE5vZGVib290T2F1dGgyU3RhcnRlclNlcnZpY2UsXG59IGZyb20gJy4uL25vZGVib290LW9hdXRoMi1zdGFydGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQWRkQ2xpZW50Um9sZXNDb21wb25lbnQgfSBmcm9tICcuL2FkZC1jbGllbnQtcm9sZXMvYWRkLWNsaWVudC1yb2xlcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ3JlYXRlQ2xpZW50Q29tcG9uZW50IH0gZnJvbSAnLi9jcmVhdGUtY2xpZW50L2NyZWF0ZS1jbGllbnQuY29tcG9uZW50JztcbmltcG9ydCB7IERlbGV0ZUNsaWVudENvbXBvbmVudCB9IGZyb20gJy4vZGVsZXRlLWNsaWVudC9kZWxldGUtY2xpZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTaG93VG9rZW5Db21wb25lbnQgfSBmcm9tICcuL3Nob3ctdG9rZW4vc2hvdy10b2tlbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgVXBkYXRlQ2xpZW50Q29tcG9uZW50IH0gZnJvbSAnLi91cGRhdGUtY2xpZW50L3VwZGF0ZS1jbGllbnQuY29tcG9uZW50JztcbmltcG9ydCB7IFZpZXdDbGllbnRSb2xlc0NvbXBvbmVudCB9IGZyb20gJy4vdmlldy1jbGllbnQtcm9sZXMvdmlldy1jbGllbnQtcm9sZXMuY29tcG9uZW50JztcbmltcG9ydCB7IFNob3dOZXdUb2tlbkNvbXBvbmVudCB9IGZyb20gJy4vc2hvdy1uZXctdG9rZW4vc2hvdy1uZXctdG9rZW4uY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGliLW9hdXRoLXN0YXJ0ZXItY2xpZW50JyxcbiAgdGVtcGxhdGVVcmw6ICcuL29hdXRoLXN0YXJ0ZXItY2xpZW50LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vb2F1dGgtc3RhcnRlci1jbGllbnQuY29tcG9uZW50LnNjc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgT2F1dGhTdGFydGVyQ2xpZW50Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgY2xpZW50cyE6IENsaWVudFtdO1xuICBlcnJvck1lc3NhZ2UhOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIGRpc3BsYXllZENvbHVtbnM6IHN0cmluZ1tdID0gW1xuICAgICdpZCcsXG4gICAgJ25hbWUnLFxuICAgICdpZGVudGlmaWVyJyxcbiAgICAnY2xpZW50U2VjcmV0JyxcbiAgICAnYWNjZXNzVG9rZW4nLFxuICAgICdyb2xlcycsXG4gICAgJ2VkaXQnLFxuICBdO1xuXG4gIHJlc3VsdHNMZW5ndGggPSAwO1xuICBpc0xvYWRpbmdSZXN1bHRzID0gdHJ1ZTtcbiAgd2hvbGVQYWdlTG9hZGluZyA9IGZhbHNlO1xuXG4gIHJlbG9hZCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcblxuICBjbGllbnREYXRhU3Vic2NyaXB0aW9uITogU3Vic2NyaXB0aW9uO1xuXG4gIEBWaWV3Q2hpbGQoTWF0UGFnaW5hdG9yKSBwYWdpbmF0b3IhOiBNYXRQYWdpbmF0b3I7XG4gIEBWaWV3Q2hpbGQoTWF0U29ydCkgc29ydCE6IE1hdFNvcnQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBuYlNlcnZpY2U6IE5vZGVib290T2F1dGgyU3RhcnRlclNlcnZpY2UsXG4gICAgcHVibGljIGRpYWxvZzogTWF0RGlhbG9nXG4gICkge31cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zb3J0LnNvcnRDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+ICh0aGlzLnBhZ2luYXRvci5wYWdlSW5kZXggPSAwKSk7XG4gICAgdGhpcy5jbGllbnREYXRhU3Vic2NyaXB0aW9uID0gbWVyZ2UoXG4gICAgICB0aGlzLnNvcnQuc29ydENoYW5nZSxcbiAgICAgIHRoaXMucGFnaW5hdG9yLnBhZ2UsXG4gICAgICB0aGlzLnJlbG9hZFxuICAgIClcbiAgICAgIC5waXBlKFxuICAgICAgICBzdGFydFdpdGgoe30pLFxuICAgICAgICBzd2l0Y2hNYXAoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gdW5kZWZpbmVkO1xuICAgICAgICAgIHRoaXMuaXNMb2FkaW5nUmVzdWx0cyA9IHRydWU7XG4gICAgICAgICAgcmV0dXJuIHRoaXMubmJTZXJ2aWNlIS5nZXRDbGllbnRzKFxuICAgICAgICAgICAgdGhpcy5wYWdpbmF0b3IucGFnZUluZGV4LFxuICAgICAgICAgICAgdGhpcy5zb3J0LmRpcmVjdGlvblxuICAgICAgICAgICkucGlwZShcbiAgICAgICAgICAgIGNhdGNoRXJyb3IoKGVycikgPT4ge1xuICAgICAgICAgICAgICBpZiAoZXJyLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSBlcnIuZXJyb3IubWVzc2FnZTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9ICdVbmtub3duIEVycm9yJztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gb2YobnVsbCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICk7XG4gICAgICAgIH0pLFxuICAgICAgICBtYXAoKGRhdGEpID0+IHtcbiAgICAgICAgICB0aGlzLmlzTG9hZGluZ1Jlc3VsdHMgPSBmYWxzZTtcbiAgICAgICAgICBpZiAoZGF0YSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnJlc3VsdHNMZW5ndGggPSBkYXRhLmNvbnRlbnQ/LnRvdGFsSXRlbXMgfHwgMDtcbiAgICAgICAgICByZXR1cm4gZGF0YS5jb250ZW50Py5pdGVtcyB8fCBbXTtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKGRhdGEpID0+IHtcbiAgICAgICAgdGhpcy5jbGllbnRzID0gZGF0YTtcbiAgICAgIH0pO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7fVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuY2xpZW50RGF0YVN1YnNjcmlwdGlvbj8udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLnNvcnQuc29ydENoYW5nZS5jb21wbGV0ZSgpO1xuICB9XG5cbiAgb3BlblNob3dTZWNyZXRDb21wb25lbnQoY2xpZW50OiBDbGllbnQpIHtcbiAgICB0aGlzLmRpYWxvZy5vcGVuKFNob3dTZWNyZXRDb21wb25lbnQsIHtcbiAgICAgIHdpZHRoOiAnNjAwcHgnLFxuICAgICAgbWF4SGVpZ2h0OiAnNzB2aCcsXG4gICAgICBkYXRhOiBjbGllbnQsXG4gICAgfSk7XG4gIH1cblxuICBnZW5lcmF0ZU5ld0xvbmdMaXZlVG9rZW4oY2xpZW50OiBDbGllbnQpIHtcbiAgICB0aGlzLm5iU2VydmljZVxuICAgICAgLmdlbmVyYXRlTG9uZ0xpdmVUb2tlbihjbGllbnQuaWQsIGNsaWVudC5pZGVudGlmaWVyKVxuICAgICAgLnN1YnNjcmliZSh7XG4gICAgICAgIGVycm9yOiAoZXJyKSA9PiB7XG4gICAgICAgICAgaWYgKGVyci5lcnJvcikge1xuICAgICAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSBlcnIuZXJyb3IubWVzc2FnZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSAnVW5rbm93biBFcnJvcic7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBuZXh0OiAocmVzKSA9PiB7XG4gICAgICAgICAgdGhpcy5yZWxvYWQubmV4dCh0aGlzLnJlbG9hZC52YWx1ZSArIDEpO1xuICAgICAgICAgIHRoaXMuZGlhbG9nLm9wZW4oU2hvd05ld1Rva2VuQ29tcG9uZW50LCB7XG4gICAgICAgICAgICB3aWR0aDogJzYwMHB4JyxcbiAgICAgICAgICAgIG1heEhlaWdodDogJzcwdmgnLFxuICAgICAgICAgICAgZGF0YTogeyBhY2Nlc3NfdG9rZW46IHJlcy5jb250ZW50LmFjY2Vzc190b2tlbiB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgfSk7XG4gIH1cblxuICByZW1vdmVMb25nTGl2ZVRva2VuKGNsaWVudDogQ2xpZW50KSB7XG4gICAgdGhpcy53aG9sZVBhZ2VMb2FkaW5nID0gdHJ1ZTtcbiAgICB0aGlzLm5iU2VydmljZS5yZW1vdmVMb25nTGl2ZVRva2VuKGNsaWVudC5pZCwgY2xpZW50LmlkZW50aWZpZXIpLnN1YnNjcmliZSh7XG4gICAgICBlcnJvcjogKGVycikgPT4ge1xuICAgICAgICBpZiAoZXJyLmVycm9yKSB7XG4gICAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSBlcnIuZXJyb3IubWVzc2FnZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9ICdVbmtub3duIEVycm9yJztcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG5leHQ6ICgpID0+IHtcbiAgICAgICAgdGhpcy5yZWxvYWQubmV4dCh0aGlzLnJlbG9hZC52YWx1ZSArIDEpO1xuICAgICAgfSxcbiAgICAgIGNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgIHRoaXMud2hvbGVQYWdlTG9hZGluZyA9IGZhbHNlO1xuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIHJldm9rZUNsaWVudChjbGllbnQ6IENsaWVudCkge1xuICAgIHRoaXMud2hvbGVQYWdlTG9hZGluZyA9IHRydWU7XG4gICAgdGhpcy5uYlNlcnZpY2UubW9kaWZ5UmV2b2tlU3RhdHVzKGNsaWVudC5pZCwgdHJ1ZSkuc3Vic2NyaWJlKHtcbiAgICAgIGVycm9yOiAoZXJyKSA9PiB7XG4gICAgICAgIGlmIChlcnIuZXJyb3IpIHtcbiAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IGVyci5lcnJvci5tZXNzYWdlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gJ1Vua25vd24gRXJyb3InO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbmV4dDogKCkgPT4ge1xuICAgICAgICB0aGlzLnJlbG9hZC5uZXh0KHRoaXMucmVsb2FkLnZhbHVlICsgMSk7XG4gICAgICB9LFxuICAgICAgY29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgdGhpcy53aG9sZVBhZ2VMb2FkaW5nID0gZmFsc2U7XG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgcmF0aWZ5Q2xpZW50KGNsaWVudDogQ2xpZW50KSB7XG4gICAgdGhpcy53aG9sZVBhZ2VMb2FkaW5nID0gdHJ1ZTtcbiAgICB0aGlzLm5iU2VydmljZS5tb2RpZnlSZXZva2VTdGF0dXMoY2xpZW50LmlkLCBmYWxzZSkuc3Vic2NyaWJlKHtcbiAgICAgIGVycm9yOiAoZXJyKSA9PiB7XG4gICAgICAgIGlmIChlcnIuZXJyb3IpIHtcbiAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IGVyci5lcnJvci5tZXNzYWdlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gJ1Vua25vd24gRXJyb3InO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbmV4dDogKCkgPT4ge1xuICAgICAgICB0aGlzLnJlbG9hZC5uZXh0KHRoaXMucmVsb2FkLnZhbHVlICsgMSk7XG4gICAgICB9LFxuICAgICAgY29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgdGhpcy53aG9sZVBhZ2VMb2FkaW5nID0gZmFsc2U7XG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgb3BlbkNyZWF0ZUNsaWVudERpYWxvZygpIHtcbiAgICBjb25zdCBjcmVhdGVDbGllbnREaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKENyZWF0ZUNsaWVudENvbXBvbmVudCwge1xuICAgICAgd2lkdGg6ICc2MDBweCcsXG4gICAgICBtYXhIZWlnaHQ6ICc3MHZoJyxcbiAgICB9KTtcbiAgICBjcmVhdGVDbGllbnREaWFsb2dSZWZcbiAgICAgIC5hZnRlckNsb3NlZCgpXG4gICAgICAucGlwZShmaXJzdCgpKVxuICAgICAgLnN1YnNjcmliZSh7XG4gICAgICAgIG5leHQ6IChyZXM6IENsaWVudENyZWF0ZUNvbnRlbnQpID0+IHtcbiAgICAgICAgICBpZiAocmVzKSB7XG4gICAgICAgICAgICB0aGlzLmRpYWxvZy5vcGVuKFNob3dUb2tlbkNvbXBvbmVudCwge1xuICAgICAgICAgICAgICB3aWR0aDogJzYwMHB4JyxcbiAgICAgICAgICAgICAgbWF4SGVpZ2h0OiAnNzB2aCcsXG4gICAgICAgICAgICAgIGRhdGE6IHJlcyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5yZWxvYWQubmV4dCh0aGlzLnJlbG9hZC52YWx1ZSArIDEpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICB9XG5cbiAgb3BlblZpZXdSb2xlc0RpYWxvZyhjbGllbnQ6IENsaWVudCkge1xuICAgIHRoaXMuZGlhbG9nLm9wZW4oVmlld0NsaWVudFJvbGVzQ29tcG9uZW50LCB7XG4gICAgICB3aWR0aDogJzYwMHB4JyxcbiAgICAgIG1heEhlaWdodDogJzcwdmgnLFxuICAgICAgZGF0YTogY2xpZW50LFxuICAgIH0pO1xuICB9XG5cbiAgb3BlblVwZGF0ZVJvbGVzRGlhbG9nKGNsaWVudDogQ2xpZW50KSB7XG4gICAgY29uc3QgdXBkYXRlUm9sZXNEaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKEFkZENsaWVudFJvbGVzQ29tcG9uZW50LCB7XG4gICAgICB3aWR0aDogJzYwMHB4JyxcbiAgICAgIG1heEhlaWdodDogJzcwdmgnLFxuICAgICAgZGF0YTogY2xpZW50LFxuICAgIH0pO1xuXG4gICAgdXBkYXRlUm9sZXNEaWFsb2dSZWZcbiAgICAgIC5hZnRlckNsb3NlZCgpXG4gICAgICAucGlwZShmaXJzdCgpKVxuICAgICAgLnN1YnNjcmliZSh7XG4gICAgICAgIG5leHQ6IChyZXMpID0+IHtcbiAgICAgICAgICBpZiAocmVzKSB7XG4gICAgICAgICAgICB0aGlzLnJlbG9hZC5uZXh0KHRoaXMucmVsb2FkLnZhbHVlICsgMSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgfSk7XG4gIH1cblxuICBvcGVuVXBkYXRlQ2xpZW50RGlhbG9nKGNsaWVudDogQ2xpZW50KSB7XG4gICAgY29uc3QgdXBkYXRlQ2xpZW50RGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihVcGRhdGVDbGllbnRDb21wb25lbnQsIHtcbiAgICAgIHdpZHRoOiAnNjAwcHgnLFxuICAgICAgbWF4SGVpZ2h0OiAnNzB2aCcsXG4gICAgICBkYXRhOiBjbGllbnQsXG4gICAgfSk7XG5cbiAgICB1cGRhdGVDbGllbnREaWFsb2dSZWZcbiAgICAgIC5hZnRlckNsb3NlZCgpXG4gICAgICAucGlwZShmaXJzdCgpKVxuICAgICAgLnN1YnNjcmliZSh7XG4gICAgICAgIG5leHQ6IChyZXMpID0+IHtcbiAgICAgICAgICBpZiAocmVzKSB7XG4gICAgICAgICAgICB0aGlzLnJlbG9hZC5uZXh0KHRoaXMucmVsb2FkLnZhbHVlICsgMSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgfSk7XG4gIH1cblxuICBvcGVuRGlhbG9nRGVsZXRlQ2xpZW50KGNsaWVudDogQ2xpZW50KSB7XG4gICAgY29uc3QgdXBkYXRlUm9sZXNEaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKERlbGV0ZUNsaWVudENvbXBvbmVudCwge1xuICAgICAgd2lkdGg6ICc2MDBweCcsXG4gICAgICBtYXhIZWlnaHQ6ICc3MHZoJyxcbiAgICAgIGRhdGE6IGNsaWVudCxcbiAgICB9KTtcblxuICAgIHVwZGF0ZVJvbGVzRGlhbG9nUmVmXG4gICAgICAuYWZ0ZXJDbG9zZWQoKVxuICAgICAgLnBpcGUoZmlyc3QoKSlcbiAgICAgIC5zdWJzY3JpYmUoe1xuICAgICAgICBuZXh0OiAocmVzKSA9PiB7XG4gICAgICAgICAgaWYgKHJlcykge1xuICAgICAgICAgICAgdGhpcy5yZWxvYWQubmV4dCh0aGlzLnJlbG9hZC52YWx1ZSArIDEpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwiY2xpZW50LWNvbnRhaW5lclwiPlxuICA8ZGl2IGNsYXNzPVwiY2xpZW50LWhlYWRcIj5cbiAgICA8aDEgY2xhc3M9XCJjbGllbnQtdGl0bGVcIj5DbGllbnRzPC9oMT5cbiAgICA8c3BhbiBjbGFzcz1cInNlcGFyYXRvclwiPjwvc3Bhbj5cbiAgICA8YnV0dG9uIChjbGljayk9XCJvcGVuQ3JlYXRlQ2xpZW50RGlhbG9nKClcIiBjb2xvcj1cImFjY2VudFwiIG1hdC1mbGF0LWJ1dHRvbj5cbiAgICAgIEFkZCBDbGllbnRcbiAgICA8L2J1dHRvbj5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJjbGllbnQtYm9keVwiPlxuICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXItdGFibGUgbWF0LWVsZXZhdGlvbi16OFwiPlxuICAgICAgPGRpdiBjbGFzcz1cImxvYWRpbmctc2hhZGVcIiAqbmdJZj1cImlzTG9hZGluZ1Jlc3VsdHNcIj5cbiAgICAgICAgPG1hdC1zcGlubmVyICpuZ0lmPVwiaXNMb2FkaW5nUmVzdWx0c1wiPjwvbWF0LXNwaW5uZXI+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzcz1cImV4YW1wbGUtdGFibGUtY29udGFpbmVyXCI+XG4gICAgICAgIDx0YWJsZVxuICAgICAgICAgIG1hdC10YWJsZVxuICAgICAgICAgIFtkYXRhU291cmNlXT1cImNsaWVudHNcIlxuICAgICAgICAgIGNsYXNzPVwiY2xpZW50LXRhYmxlXCJcbiAgICAgICAgICBtYXRTb3J0XG4gICAgICAgICAgbWF0U29ydEFjdGl2ZT1cImlkXCJcbiAgICAgICAgICBtYXRTb3J0RGlzYWJsZUNsZWFyXG4gICAgICAgICAgbWF0U29ydERpcmVjdGlvbj1cImFzY1wiXG4gICAgICAgID5cbiAgICAgICAgICA8bmctY29udGFpbmVyIG1hdENvbHVtbkRlZj1cImlkXCI+XG4gICAgICAgICAgICA8dGggbWF0LXNvcnQtaGVhZGVyIG1hdC1oZWFkZXItY2VsbCAqbWF0SGVhZGVyQ2VsbERlZj5pZDwvdGg+XG4gICAgICAgICAgICA8dGQgbWF0LWNlbGwgKm1hdENlbGxEZWY9XCJsZXQgcm93XCI+e3sgcm93LmlkIH19PC90ZD5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgICAgIDxuZy1jb250YWluZXIgbWF0Q29sdW1uRGVmPVwibmFtZVwiPlxuICAgICAgICAgICAgPHRoIG1hdC1oZWFkZXItY2VsbCAqbWF0SGVhZGVyQ2VsbERlZj5OYW1lPC90aD5cbiAgICAgICAgICAgIDx0ZCBtYXQtY2VsbCAqbWF0Q2VsbERlZj1cImxldCByb3dcIj57eyByb3cubmFtZSB9fTwvdGQ+XG4gICAgICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgICAgICA8bmctY29udGFpbmVyIG1hdENvbHVtbkRlZj1cImlkZW50aWZpZXJcIj5cbiAgICAgICAgICAgIDx0aCBtYXQtaGVhZGVyLWNlbGwgKm1hdEhlYWRlckNlbGxEZWY+SWRlbnRpZmllcjwvdGg+XG4gICAgICAgICAgICA8dGQgbWF0LWNlbGwgKm1hdENlbGxEZWY9XCJsZXQgcm93XCI+e3sgcm93LmlkZW50aWZpZXIgfX08L3RkPlxuICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICAgICAgPG5nLWNvbnRhaW5lciBtYXRDb2x1bW5EZWY9XCJjbGllbnRTZWNyZXRcIj5cbiAgICAgICAgICAgIDx0aCBtYXQtaGVhZGVyLWNlbGwgKm1hdEhlYWRlckNlbGxEZWY+U2VjcmV0PC90aD5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cInJvbGVzLWNvbHVtblwiIG1hdC1jZWxsICptYXRDZWxsRGVmPVwibGV0IHJvd1wiPlxuICAgICAgICAgICAgICA8YnV0dG9uIChjbGljayk9XCJvcGVuU2hvd1NlY3JldENvbXBvbmVudChyb3cpXCIgbWF0LXN0cm9rZWQtYnV0dG9uPlxuICAgICAgICAgICAgICAgIFNlY3JldCBLZXlcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L3RkPlxuICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICAgICAgPG5nLWNvbnRhaW5lciBtYXRDb2x1bW5EZWY9XCJhY2Nlc3NUb2tlblwiPlxuICAgICAgICAgICAgPHRoIG1hdC1oZWFkZXItY2VsbCAqbWF0SGVhZGVyQ2VsbERlZj5BY2Nlc3MgVG9rZW48L3RoPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwicm9sZXMtY29sdW1uXCIgbWF0LWNlbGwgKm1hdENlbGxEZWY9XCJsZXQgcm93XCI+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAoY2xpY2spPVwiZ2VuZXJhdGVOZXdMb25nTGl2ZVRva2VuKHJvdylcIlxuICAgICAgICAgICAgICAgIG1hdC1zdHJva2VkLWJ1dHRvblxuICAgICAgICAgICAgICAgICpuZ0lmPVwiIXJvdy5oYXNMb25nTGl2ZVRva2VuXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIEdlbmVyYXRlIExvbmcgTGl2ZVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICpuZ0lmPVwicm93Lmhhc0xvbmdMaXZlVG9rZW5cIlxuICAgICAgICAgICAgICAgIGNvbG9yPVwid2FyblwiXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cInJlbW92ZUxvbmdMaXZlVG9rZW4ocm93KVwiXG4gICAgICAgICAgICAgICAgbWF0LXN0cm9rZWQtYnV0dG9uXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICBSZW1vdmUgTG9uZyBMaXZlXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgICAgIDxuZy1jb250YWluZXIgbWF0Q29sdW1uRGVmPVwicm9sZXNcIj5cbiAgICAgICAgICAgIDx0aCBtYXQtaGVhZGVyLWNlbGwgKm1hdEhlYWRlckNlbGxEZWY+Um9sZXM8L3RoPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwicm9sZXMtY29sdW1uXCIgbWF0LWNlbGwgKm1hdENlbGxEZWY9XCJsZXQgcm93XCI+XG4gICAgICAgICAgICAgIDxidXR0b24gKGNsaWNrKT1cIm9wZW5WaWV3Um9sZXNEaWFsb2cocm93KVwiIG1hdC1zdHJva2VkLWJ1dHRvbj5cbiAgICAgICAgICAgICAgICBWaWV3IFJvbGVzXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cInJvdy5pZGVudGlmaWVyID09PSAnYWRtaW4nXCJcbiAgICAgICAgICAgICAgICAoY2xpY2spPVwib3BlblVwZGF0ZVJvbGVzRGlhbG9nKHJvdylcIlxuICAgICAgICAgICAgICAgIG1hdC1zdHJva2VkLWJ1dHRvblxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgVXBkYXRlIFJvbGVzXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgICAgIDxuZy1jb250YWluZXIgbWF0Q29sdW1uRGVmPVwiZWRpdFwiPlxuICAgICAgICAgICAgPHRoIG1hdC1oZWFkZXItY2VsbCAqbWF0SGVhZGVyQ2VsbERlZj48L3RoPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiYWN0aW9ucy1jb2x1bW5cIiBtYXQtY2VsbCAqbWF0Q2VsbERlZj1cImxldCByb3dcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICpuZ0lmPVwiIXJvdy5yZXZva2VkXCJcbiAgICAgICAgICAgICAgICBjb2xvcj1cInByaW1hcnlcIlxuICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJyb3cuaWRlbnRpZmllciA9PT0gJ2FkbWluJ1wiXG4gICAgICAgICAgICAgICAgbWF0LXN0cm9rZWQtYnV0dG9uXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cInJldm9rZUNsaWVudChyb3cpXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIFJldm9rZSBDbGllbnRcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAqbmdJZj1cInJvdy5yZXZva2VkXCJcbiAgICAgICAgICAgICAgICBjb2xvcj1cInByaW1hcnlcIlxuICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJyb3cuaWRlbnRpZmllciA9PT0gJ2FkbWluJ1wiXG4gICAgICAgICAgICAgICAgbWF0LXN0cm9rZWQtYnV0dG9uXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cInJhdGlmeUNsaWVudChyb3cpXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIFJhdGlmeSBDbGllbnRcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBjb2xvcj1cInByaW1hcnlcIlxuICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJyb3cuaWRlbnRpZmllciA9PT0gJ2FkbWluJ1wiXG4gICAgICAgICAgICAgICAgbWF0LXN0cm9rZWQtYnV0dG9uXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9wZW5VcGRhdGVDbGllbnREaWFsb2cocm93KVwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICBFZGl0IENsaWVudFxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIGNvbG9yPVwid2FyblwiXG4gICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cInJvdy5pZGVudGlmaWVyID09PSAnYWRtaW4nXCJcbiAgICAgICAgICAgICAgICBtYXQtc3Ryb2tlZC1idXR0b25cbiAgICAgICAgICAgICAgICAoY2xpY2spPVwib3BlbkRpYWxvZ0RlbGV0ZUNsaWVudChyb3cpXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIERlbGV0ZSBDbGllbnRcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L3RkPlxuICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICAgICAgPHRyIG1hdC1oZWFkZXItcm93ICptYXRIZWFkZXJSb3dEZWY9XCJkaXNwbGF5ZWRDb2x1bW5zXCI+PC90cj5cbiAgICAgICAgICA8dHIgbWF0LXJvdyAqbWF0Um93RGVmPVwibGV0IHJvdzsgY29sdW1uczogZGlzcGxheWVkQ29sdW1uc1wiPjwvdHI+XG4gICAgICAgIDwvdGFibGU+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPG1hdC1wYWdpbmF0b3IgW2xlbmd0aF09XCJyZXN1bHRzTGVuZ3RoXCIgW3BhZ2VTaXplXT1cIjIwXCI+PC9tYXQtcGFnaW5hdG9yPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuPGRpdiAqbmdJZj1cIndob2xlUGFnZUxvYWRpbmdcIiBjbGFzcz1cImxvYWRpbmctZnVsbFwiPlxuICA8bWF0LXNwaW5uZXI+PC9tYXQtc3Bpbm5lcj5cbjwvZGl2PlxuIl19