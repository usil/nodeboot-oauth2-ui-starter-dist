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
OauthStarterClientComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: OauthStarterClientComponent, deps: [{ token: i1.NodebootOauth2StarterService }, { token: i2.MatDialog }], target: i0.ɵɵFactoryTarget.Component });
OauthStarterClientComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: OauthStarterClientComponent, selector: "lib-oauth-starter-client", viewQueries: [{ propertyName: "paginator", first: true, predicate: MatPaginator, descendants: true }, { propertyName: "sort", first: true, predicate: MatSort, descendants: true }], ngImport: i0, template: "<div class=\"client-container\">\n  <div class=\"client-head\">\n    <h1 class=\"client-title\">Clients</h1>\n    <span class=\"separator\"></span>\n    <button (click)=\"openCreateClientDialog()\" color=\"accent\" mat-flat-button>\n      Add Client\n    </button>\n  </div>\n  <div class=\"client-body\">\n    <div class=\"container-table mat-elevation-z8\">\n      <div class=\"loading-shade\" *ngIf=\"isLoadingResults\">\n        <mat-spinner *ngIf=\"isLoadingResults\"></mat-spinner>\n      </div>\n\n      <div class=\"example-table-container\">\n        <table\n          mat-table\n          [dataSource]=\"clients\"\n          class=\"client-table\"\n          matSort\n          matSortActive=\"id\"\n          matSortDisableClear\n          matSortDirection=\"asc\"\n        >\n          <ng-container matColumnDef=\"id\">\n            <th mat-sort-header mat-header-cell *matHeaderCellDef>id</th>\n            <td mat-cell *matCellDef=\"let row\">{{ row.id }}</td>\n          </ng-container>\n\n          <ng-container matColumnDef=\"name\">\n            <th mat-header-cell *matHeaderCellDef>Name</th>\n            <td mat-cell *matCellDef=\"let row\">{{ row.name }}</td>\n          </ng-container>\n\n          <ng-container matColumnDef=\"identifier\">\n            <th mat-header-cell *matHeaderCellDef>Identifier</th>\n            <td mat-cell *matCellDef=\"let row\">{{ row.identifier }}</td>\n          </ng-container>\n\n          <ng-container matColumnDef=\"clientSecret\">\n            <th mat-header-cell *matHeaderCellDef>Secret</th>\n            <td class=\"roles-column\" mat-cell *matCellDef=\"let row\">\n              <button (click)=\"openShowSecretComponent(row)\" mat-stroked-button>\n                Secret Key\n              </button>\n            </td>\n          </ng-container>\n\n          <ng-container matColumnDef=\"accessToken\">\n            <th mat-header-cell *matHeaderCellDef>Access Token</th>\n            <td class=\"roles-column\" mat-cell *matCellDef=\"let row\">\n              <button\n                (click)=\"generateNewLongLiveToken(row)\"\n                mat-stroked-button\n                *ngIf=\"!row.hasLongLiveToken\"\n              >\n                Generate Long Live\n              </button>\n              <button\n                *ngIf=\"row.hasLongLiveToken\"\n                color=\"warn\"\n                (click)=\"removeLongLiveToken(row)\"\n                mat-stroked-button\n              >\n                Remove Long Live\n              </button>\n            </td>\n          </ng-container>\n\n          <ng-container matColumnDef=\"roles\">\n            <th mat-header-cell *matHeaderCellDef>Roles</th>\n            <td class=\"roles-column\" mat-cell *matCellDef=\"let row\">\n              <button (click)=\"openViewRolesDialog(row)\" mat-stroked-button>\n                View Roles\n              </button>\n              <button\n                [disabled]=\"row.identifier === 'admin'\"\n                (click)=\"openUpdateRolesDialog(row)\"\n                mat-stroked-button\n              >\n                Update Roles\n              </button>\n            </td>\n          </ng-container>\n\n          <ng-container matColumnDef=\"edit\">\n            <th mat-header-cell *matHeaderCellDef></th>\n            <td class=\"actions-column\" mat-cell *matCellDef=\"let row\">\n              <button\n                *ngIf=\"!row.revoked\"\n                color=\"primary\"\n                [disabled]=\"row.identifier === 'admin'\"\n                mat-stroked-button\n                (click)=\"revokeClient(row)\"\n              >\n                Revoke Client\n              </button>\n              <button\n                *ngIf=\"row.revoked\"\n                color=\"primary\"\n                [disabled]=\"row.identifier === 'admin'\"\n                mat-stroked-button\n                (click)=\"ratifyClient(row)\"\n              >\n                Ratify Client\n              </button>\n              <button\n                color=\"primary\"\n                [disabled]=\"row.identifier === 'admin'\"\n                mat-stroked-button\n                (click)=\"openUpdateClientDialog(row)\"\n              >\n                Edit Client\n              </button>\n              <button\n                color=\"warn\"\n                [disabled]=\"row.identifier === 'admin'\"\n                mat-stroked-button\n                (click)=\"openDialogDeleteClient(row)\"\n              >\n                Delete Client\n              </button>\n            </td>\n          </ng-container>\n\n          <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n          <tr mat-row *matRowDef=\"let row; columns: displayedColumns\"></tr>\n        </table>\n      </div>\n\n      <mat-paginator [length]=\"resultsLength\" [pageSize]=\"20\"></mat-paginator>\n    </div>\n  </div>\n</div>\n<div *ngIf=\"wholePageLoading\" class=\"loading-full\">\n  <mat-spinner></mat-spinner>\n</div>\n", styles: [".client-container .client-head{display:flex;margin-bottom:2rem}.client-container .client-head .separator{flex:1 0}.client-container .client-head .client-title{margin:0;font-size:32px}.client-container table{width:100%;overflow-x:auto}.client-container table th,.client-container table td{min-width:80px}.client-container table .roles-column button:last-child{margin-left:.5rem}.client-container table .actions-column{text-align:end}.client-container table .actions-column button{margin-left:.5rem}.client-container .container-table{position:relative}.client-container .loading-shade{position:absolute;top:0;left:0;bottom:56px;right:0;background:rgba(0,0,0,.15);z-index:1;display:flex;align-items:center;justify-content:center}.loading-full{pointer-events:all;z-index:99999;border:none;margin:0;padding:0;width:100%;height:100%;top:0px;left:0px;cursor:wait;position:fixed;background-color:#0009}\n"], components: [{ type: i3.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { type: i4.MatSpinner, selector: "mat-spinner", inputs: ["color"] }, { type: i5.MatTable, selector: "mat-table, table[mat-table]", exportAs: ["matTable"] }, { type: i6.MatSortHeader, selector: "[mat-sort-header]", inputs: ["disabled", "mat-sort-header", "arrowPosition", "start", "sortActionDescription", "disableClear"], exportAs: ["matSortHeader"] }, { type: i5.MatHeaderRow, selector: "mat-header-row, tr[mat-header-row]", exportAs: ["matHeaderRow"] }, { type: i5.MatRow, selector: "mat-row, tr[mat-row]", exportAs: ["matRow"] }, { type: i7.MatPaginator, selector: "mat-paginator", inputs: ["disabled"], exportAs: ["matPaginator"] }], directives: [{ type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6.MatSort, selector: "[matSort]", inputs: ["matSortDisabled", "matSortActive", "matSortStart", "matSortDirection", "matSortDisableClear"], outputs: ["matSortChange"], exportAs: ["matSort"] }, { type: i5.MatColumnDef, selector: "[matColumnDef]", inputs: ["sticky", "matColumnDef"] }, { type: i5.MatHeaderCellDef, selector: "[matHeaderCellDef]" }, { type: i5.MatHeaderCell, selector: "mat-header-cell, th[mat-header-cell]" }, { type: i5.MatCellDef, selector: "[matCellDef]" }, { type: i5.MatCell, selector: "mat-cell, td[mat-cell]" }, { type: i5.MatHeaderRowDef, selector: "[matHeaderRowDef]", inputs: ["matHeaderRowDef", "matHeaderRowDefSticky"] }, { type: i5.MatRowDef, selector: "[matRowDef]", inputs: ["matRowDefColumns", "matRowDefWhen"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: OauthStarterClientComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-oauth-starter-client', template: "<div class=\"client-container\">\n  <div class=\"client-head\">\n    <h1 class=\"client-title\">Clients</h1>\n    <span class=\"separator\"></span>\n    <button (click)=\"openCreateClientDialog()\" color=\"accent\" mat-flat-button>\n      Add Client\n    </button>\n  </div>\n  <div class=\"client-body\">\n    <div class=\"container-table mat-elevation-z8\">\n      <div class=\"loading-shade\" *ngIf=\"isLoadingResults\">\n        <mat-spinner *ngIf=\"isLoadingResults\"></mat-spinner>\n      </div>\n\n      <div class=\"example-table-container\">\n        <table\n          mat-table\n          [dataSource]=\"clients\"\n          class=\"client-table\"\n          matSort\n          matSortActive=\"id\"\n          matSortDisableClear\n          matSortDirection=\"asc\"\n        >\n          <ng-container matColumnDef=\"id\">\n            <th mat-sort-header mat-header-cell *matHeaderCellDef>id</th>\n            <td mat-cell *matCellDef=\"let row\">{{ row.id }}</td>\n          </ng-container>\n\n          <ng-container matColumnDef=\"name\">\n            <th mat-header-cell *matHeaderCellDef>Name</th>\n            <td mat-cell *matCellDef=\"let row\">{{ row.name }}</td>\n          </ng-container>\n\n          <ng-container matColumnDef=\"identifier\">\n            <th mat-header-cell *matHeaderCellDef>Identifier</th>\n            <td mat-cell *matCellDef=\"let row\">{{ row.identifier }}</td>\n          </ng-container>\n\n          <ng-container matColumnDef=\"clientSecret\">\n            <th mat-header-cell *matHeaderCellDef>Secret</th>\n            <td class=\"roles-column\" mat-cell *matCellDef=\"let row\">\n              <button (click)=\"openShowSecretComponent(row)\" mat-stroked-button>\n                Secret Key\n              </button>\n            </td>\n          </ng-container>\n\n          <ng-container matColumnDef=\"accessToken\">\n            <th mat-header-cell *matHeaderCellDef>Access Token</th>\n            <td class=\"roles-column\" mat-cell *matCellDef=\"let row\">\n              <button\n                (click)=\"generateNewLongLiveToken(row)\"\n                mat-stroked-button\n                *ngIf=\"!row.hasLongLiveToken\"\n              >\n                Generate Long Live\n              </button>\n              <button\n                *ngIf=\"row.hasLongLiveToken\"\n                color=\"warn\"\n                (click)=\"removeLongLiveToken(row)\"\n                mat-stroked-button\n              >\n                Remove Long Live\n              </button>\n            </td>\n          </ng-container>\n\n          <ng-container matColumnDef=\"roles\">\n            <th mat-header-cell *matHeaderCellDef>Roles</th>\n            <td class=\"roles-column\" mat-cell *matCellDef=\"let row\">\n              <button (click)=\"openViewRolesDialog(row)\" mat-stroked-button>\n                View Roles\n              </button>\n              <button\n                [disabled]=\"row.identifier === 'admin'\"\n                (click)=\"openUpdateRolesDialog(row)\"\n                mat-stroked-button\n              >\n                Update Roles\n              </button>\n            </td>\n          </ng-container>\n\n          <ng-container matColumnDef=\"edit\">\n            <th mat-header-cell *matHeaderCellDef></th>\n            <td class=\"actions-column\" mat-cell *matCellDef=\"let row\">\n              <button\n                *ngIf=\"!row.revoked\"\n                color=\"primary\"\n                [disabled]=\"row.identifier === 'admin'\"\n                mat-stroked-button\n                (click)=\"revokeClient(row)\"\n              >\n                Revoke Client\n              </button>\n              <button\n                *ngIf=\"row.revoked\"\n                color=\"primary\"\n                [disabled]=\"row.identifier === 'admin'\"\n                mat-stroked-button\n                (click)=\"ratifyClient(row)\"\n              >\n                Ratify Client\n              </button>\n              <button\n                color=\"primary\"\n                [disabled]=\"row.identifier === 'admin'\"\n                mat-stroked-button\n                (click)=\"openUpdateClientDialog(row)\"\n              >\n                Edit Client\n              </button>\n              <button\n                color=\"warn\"\n                [disabled]=\"row.identifier === 'admin'\"\n                mat-stroked-button\n                (click)=\"openDialogDeleteClient(row)\"\n              >\n                Delete Client\n              </button>\n            </td>\n          </ng-container>\n\n          <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n          <tr mat-row *matRowDef=\"let row; columns: displayedColumns\"></tr>\n        </table>\n      </div>\n\n      <mat-paginator [length]=\"resultsLength\" [pageSize]=\"20\"></mat-paginator>\n    </div>\n  </div>\n</div>\n<div *ngIf=\"wholePageLoading\" class=\"loading-full\">\n  <mat-spinner></mat-spinner>\n</div>\n", styles: [".client-container .client-head{display:flex;margin-bottom:2rem}.client-container .client-head .separator{flex:1 0}.client-container .client-head .client-title{margin:0;font-size:32px}.client-container table{width:100%;overflow-x:auto}.client-container table th,.client-container table td{min-width:80px}.client-container table .roles-column button:last-child{margin-left:.5rem}.client-container table .actions-column{text-align:end}.client-container table .actions-column button{margin-left:.5rem}.client-container .container-table{position:relative}.client-container .loading-shade{position:absolute;top:0;left:0;bottom:56px;right:0;background:rgba(0,0,0,.15);z-index:1;display:flex;align-items:center;justify-content:center}.loading-full{pointer-events:all;z-index:99999;border:none;margin:0;padding:0;width:100%;height:100%;top:0px;left:0px;cursor:wait;position:fixed;background-color:#0009}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.NodebootOauth2StarterService }, { type: i2.MatDialog }]; }, propDecorators: { paginator: [{
                type: ViewChild,
                args: [MatPaginator]
            }], sort: [{
                type: ViewChild,
                args: [MatSort]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2F1dGgtc3RhcnRlci1jbGllbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm9kZWJvb3Qtb2F1dGgyLXN0YXJ0ZXIvc3JjL2xpYi9vYXV0aC1zdGFydGVyLWNsaWVudC9vYXV0aC1zdGFydGVyLWNsaWVudC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub2RlYm9vdC1vYXV0aDItc3RhcnRlci9zcmMvbGliL29hdXRoLXN0YXJ0ZXItY2xpZW50L29hdXRoLXN0YXJ0ZXItY2xpZW50LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxTQUFTLEVBQVUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTdELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDakQsT0FBTyxFQUNMLGVBQWUsRUFFZixLQUFLLEVBQ0wsU0FBUyxFQUNULFNBQVMsRUFDVCxVQUFVLEVBQ1YsRUFBRSxFQUNGLEdBQUcsRUFDSCxLQUFLLEdBQ04sTUFBTSxNQUFNLENBQUM7QUFNZCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUN4RixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNoRixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNoRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN2RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNoRixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUMz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QU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7aUJBQ3pDO1lBQ0gsQ0FBQztTQUNGLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxzQkFBc0IsQ0FBQyxNQUFjO1FBQ25DLE1BQU0sb0JBQW9CLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUU7WUFDbkUsS0FBSyxFQUFFLE9BQU87WUFDZCxTQUFTLEVBQUUsTUFBTTtZQUNqQixJQUFJLEVBQUUsTUFBTTtTQUNiLENBQUMsQ0FBQztRQUVILG9CQUFvQjthQUNqQixXQUFXLEVBQUU7YUFDYixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDYixTQUFTLENBQUM7WUFDVCxJQUFJLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDWixJQUFJLEdBQUcsRUFBRTtvQkFDUCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztpQkFDekM7WUFDSCxDQUFDO1NBQ0YsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7d0hBdlBVLDJCQUEyQjs0R0FBM0IsMkJBQTJCLDJHQXFCM0IsWUFBWSx1RUFDWixPQUFPLGdEQ3hEcEIsNDRKQXlJQTsyRkR2R2EsMkJBQTJCO2tCQUx2QyxTQUFTOytCQUNFLDBCQUEwQjsySUF5QlgsU0FBUztzQkFBakMsU0FBUzt1QkFBQyxZQUFZO2dCQUNILElBQUk7c0JBQXZCLFNBQVM7dUJBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNob3dTZWNyZXRDb21wb25lbnQgfSBmcm9tICcuL3Nob3ctc2VjcmV0L3Nob3ctc2VjcmV0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXREaWFsb2cgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHsgTWF0UGFnaW5hdG9yIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvcGFnaW5hdG9yJztcbmltcG9ydCB7IE1hdFNvcnQgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zb3J0JztcbmltcG9ydCB7XG4gIEJlaGF2aW9yU3ViamVjdCxcbiAgU3Vic2NyaXB0aW9uLFxuICBtZXJnZSxcbiAgc3RhcnRXaXRoLFxuICBzd2l0Y2hNYXAsXG4gIGNhdGNoRXJyb3IsXG4gIG9mLFxuICBtYXAsXG4gIGZpcnN0LFxufSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIENsaWVudCxcbiAgQ2xpZW50Q3JlYXRlQ29udGVudCxcbiAgTm9kZWJvb3RPYXV0aDJTdGFydGVyU2VydmljZSxcbn0gZnJvbSAnLi4vbm9kZWJvb3Qtb2F1dGgyLXN0YXJ0ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBBZGRDbGllbnRSb2xlc0NvbXBvbmVudCB9IGZyb20gJy4vYWRkLWNsaWVudC1yb2xlcy9hZGQtY2xpZW50LXJvbGVzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDcmVhdGVDbGllbnRDb21wb25lbnQgfSBmcm9tICcuL2NyZWF0ZS1jbGllbnQvY3JlYXRlLWNsaWVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVsZXRlQ2xpZW50Q29tcG9uZW50IH0gZnJvbSAnLi9kZWxldGUtY2xpZW50L2RlbGV0ZS1jbGllbnQuY29tcG9uZW50JztcbmltcG9ydCB7IFNob3dUb2tlbkNvbXBvbmVudCB9IGZyb20gJy4vc2hvdy10b2tlbi9zaG93LXRva2VuLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVcGRhdGVDbGllbnRDb21wb25lbnQgfSBmcm9tICcuL3VwZGF0ZS1jbGllbnQvdXBkYXRlLWNsaWVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVmlld0NsaWVudFJvbGVzQ29tcG9uZW50IH0gZnJvbSAnLi92aWV3LWNsaWVudC1yb2xlcy92aWV3LWNsaWVudC1yb2xlcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2hvd05ld1Rva2VuQ29tcG9uZW50IH0gZnJvbSAnLi9zaG93LW5ldy10b2tlbi9zaG93LW5ldy10b2tlbi5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItb2F1dGgtc3RhcnRlci1jbGllbnQnLFxuICB0ZW1wbGF0ZVVybDogJy4vb2F1dGgtc3RhcnRlci1jbGllbnQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9vYXV0aC1zdGFydGVyLWNsaWVudC5jb21wb25lbnQuc2NzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBPYXV0aFN0YXJ0ZXJDbGllbnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBjbGllbnRzITogQ2xpZW50W107XG4gIGVycm9yTWVzc2FnZSE6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgZGlzcGxheWVkQ29sdW1uczogc3RyaW5nW10gPSBbXG4gICAgJ2lkJyxcbiAgICAnbmFtZScsXG4gICAgJ2lkZW50aWZpZXInLFxuICAgICdjbGllbnRTZWNyZXQnLFxuICAgICdhY2Nlc3NUb2tlbicsXG4gICAgJ3JvbGVzJyxcbiAgICAnZWRpdCcsXG4gIF07XG5cbiAgcmVzdWx0c0xlbmd0aCA9IDA7XG4gIGlzTG9hZGluZ1Jlc3VsdHMgPSB0cnVlO1xuICB3aG9sZVBhZ2VMb2FkaW5nID0gZmFsc2U7XG5cbiAgcmVsb2FkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuXG4gIGNsaWVudERhdGFTdWJzY3JpcHRpb24hOiBTdWJzY3JpcHRpb247XG5cbiAgQFZpZXdDaGlsZChNYXRQYWdpbmF0b3IpIHBhZ2luYXRvciE6IE1hdFBhZ2luYXRvcjtcbiAgQFZpZXdDaGlsZChNYXRTb3J0KSBzb3J0ITogTWF0U29ydDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG5iU2VydmljZTogTm9kZWJvb3RPYXV0aDJTdGFydGVyU2VydmljZSxcbiAgICBwdWJsaWMgZGlhbG9nOiBNYXREaWFsb2dcbiAgKSB7fVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnNvcnQuc29ydENoYW5nZS5zdWJzY3JpYmUoKCkgPT4gKHRoaXMucGFnaW5hdG9yLnBhZ2VJbmRleCA9IDApKTtcbiAgICB0aGlzLmNsaWVudERhdGFTdWJzY3JpcHRpb24gPSBtZXJnZShcbiAgICAgIHRoaXMuc29ydC5zb3J0Q2hhbmdlLFxuICAgICAgdGhpcy5wYWdpbmF0b3IucGFnZSxcbiAgICAgIHRoaXMucmVsb2FkXG4gICAgKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHN0YXJ0V2l0aCh7fSksXG4gICAgICAgIHN3aXRjaE1hcCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgdGhpcy5pc0xvYWRpbmdSZXN1bHRzID0gdHJ1ZTtcbiAgICAgICAgICByZXR1cm4gdGhpcy5uYlNlcnZpY2UhLmdldENsaWVudHMoXG4gICAgICAgICAgICB0aGlzLnBhZ2luYXRvci5wYWdlSW5kZXgsXG4gICAgICAgICAgICB0aGlzLnNvcnQuZGlyZWN0aW9uXG4gICAgICAgICAgKS5waXBlKFxuICAgICAgICAgICAgY2F0Y2hFcnJvcigoZXJyKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChlcnIuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IGVyci5lcnJvci5tZXNzYWdlO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gJ1Vua25vd24gRXJyb3InO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBvZihudWxsKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKTtcbiAgICAgICAgfSksXG4gICAgICAgIG1hcCgoZGF0YSkgPT4ge1xuICAgICAgICAgIHRoaXMuaXNMb2FkaW5nUmVzdWx0cyA9IGZhbHNlO1xuICAgICAgICAgIGlmIChkYXRhID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMucmVzdWx0c0xlbmd0aCA9IGRhdGEuY29udGVudD8udG90YWxJdGVtcyB8fCAwO1xuICAgICAgICAgIHJldHVybiBkYXRhLmNvbnRlbnQ/Lml0ZW1zIHx8IFtdO1xuICAgICAgICB9KVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuICAgICAgICB0aGlzLmNsaWVudHMgPSBkYXRhO1xuICAgICAgfSk7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHt9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5jbGllbnREYXRhU3Vic2NyaXB0aW9uPy51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuc29ydC5zb3J0Q2hhbmdlLmNvbXBsZXRlKCk7XG4gIH1cblxuICBvcGVuU2hvd1NlY3JldENvbXBvbmVudChjbGllbnQ6IENsaWVudCkge1xuICAgIHRoaXMuZGlhbG9nLm9wZW4oU2hvd1NlY3JldENvbXBvbmVudCwge1xuICAgICAgd2lkdGg6ICc2MDBweCcsXG4gICAgICBtYXhIZWlnaHQ6ICc3MHZoJyxcbiAgICAgIGRhdGE6IGNsaWVudCxcbiAgICB9KTtcbiAgfVxuXG4gIGdlbmVyYXRlTmV3TG9uZ0xpdmVUb2tlbihjbGllbnQ6IENsaWVudCkge1xuICAgIHRoaXMubmJTZXJ2aWNlXG4gICAgICAuZ2VuZXJhdGVMb25nTGl2ZVRva2VuKGNsaWVudC5pZCwgY2xpZW50LmlkZW50aWZpZXIpXG4gICAgICAuc3Vic2NyaWJlKHtcbiAgICAgICAgZXJyb3I6IChlcnIpID0+IHtcbiAgICAgICAgICBpZiAoZXJyLmVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IGVyci5lcnJvci5tZXNzYWdlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9ICdVbmtub3duIEVycm9yJztcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG5leHQ6IChyZXMpID0+IHtcbiAgICAgICAgICB0aGlzLmRpYWxvZy5vcGVuKFNob3dOZXdUb2tlbkNvbXBvbmVudCwge1xuICAgICAgICAgICAgd2lkdGg6ICc2MDBweCcsXG4gICAgICAgICAgICBtYXhIZWlnaHQ6ICc3MHZoJyxcbiAgICAgICAgICAgIGRhdGE6IHsgYWNjZXNzX3Rva2VuOiByZXMuY29udGVudC5hY2Nlc3NfdG9rZW4gfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlTG9uZ0xpdmVUb2tlbihjbGllbnQ6IENsaWVudCkge1xuICAgIHRoaXMud2hvbGVQYWdlTG9hZGluZyA9IHRydWU7XG4gICAgdGhpcy5uYlNlcnZpY2UucmVtb3ZlTG9uZ0xpdmVUb2tlbihjbGllbnQuaWQsIGNsaWVudC5pZGVudGlmaWVyKS5zdWJzY3JpYmUoe1xuICAgICAgZXJyb3I6IChlcnIpID0+IHtcbiAgICAgICAgaWYgKGVyci5lcnJvcikge1xuICAgICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gZXJyLmVycm9yLm1lc3NhZ2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSAnVW5rbm93biBFcnJvcic7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBuZXh0OiAoKSA9PiB7XG4gICAgICAgIHRoaXMucmVsb2FkLm5leHQodGhpcy5yZWxvYWQudmFsdWUgKyAxKTtcbiAgICAgIH0sXG4gICAgICBjb21wbGV0ZTogKCkgPT4ge1xuICAgICAgICB0aGlzLndob2xlUGFnZUxvYWRpbmcgPSBmYWxzZTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICByZXZva2VDbGllbnQoY2xpZW50OiBDbGllbnQpIHtcbiAgICB0aGlzLndob2xlUGFnZUxvYWRpbmcgPSB0cnVlO1xuICAgIHRoaXMubmJTZXJ2aWNlLm1vZGlmeVJldm9rZVN0YXR1cyhjbGllbnQuaWQsIHRydWUpLnN1YnNjcmliZSh7XG4gICAgICBlcnJvcjogKGVycikgPT4ge1xuICAgICAgICBpZiAoZXJyLmVycm9yKSB7XG4gICAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSBlcnIuZXJyb3IubWVzc2FnZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9ICdVbmtub3duIEVycm9yJztcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG5leHQ6ICgpID0+IHtcbiAgICAgICAgdGhpcy5yZWxvYWQubmV4dCh0aGlzLnJlbG9hZC52YWx1ZSArIDEpO1xuICAgICAgfSxcbiAgICAgIGNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgIHRoaXMud2hvbGVQYWdlTG9hZGluZyA9IGZhbHNlO1xuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIHJhdGlmeUNsaWVudChjbGllbnQ6IENsaWVudCkge1xuICAgIHRoaXMud2hvbGVQYWdlTG9hZGluZyA9IHRydWU7XG4gICAgdGhpcy5uYlNlcnZpY2UubW9kaWZ5UmV2b2tlU3RhdHVzKGNsaWVudC5pZCwgZmFsc2UpLnN1YnNjcmliZSh7XG4gICAgICBlcnJvcjogKGVycikgPT4ge1xuICAgICAgICBpZiAoZXJyLmVycm9yKSB7XG4gICAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSBlcnIuZXJyb3IubWVzc2FnZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9ICdVbmtub3duIEVycm9yJztcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG5leHQ6ICgpID0+IHtcbiAgICAgICAgdGhpcy5yZWxvYWQubmV4dCh0aGlzLnJlbG9hZC52YWx1ZSArIDEpO1xuICAgICAgfSxcbiAgICAgIGNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgIHRoaXMud2hvbGVQYWdlTG9hZGluZyA9IGZhbHNlO1xuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIG9wZW5DcmVhdGVDbGllbnREaWFsb2coKSB7XG4gICAgY29uc3QgY3JlYXRlQ2xpZW50RGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihDcmVhdGVDbGllbnRDb21wb25lbnQsIHtcbiAgICAgIHdpZHRoOiAnNjAwcHgnLFxuICAgICAgbWF4SGVpZ2h0OiAnNzB2aCcsXG4gICAgfSk7XG4gICAgY3JlYXRlQ2xpZW50RGlhbG9nUmVmXG4gICAgICAuYWZ0ZXJDbG9zZWQoKVxuICAgICAgLnBpcGUoZmlyc3QoKSlcbiAgICAgIC5zdWJzY3JpYmUoe1xuICAgICAgICBuZXh0OiAocmVzOiBDbGllbnRDcmVhdGVDb250ZW50KSA9PiB7XG4gICAgICAgICAgaWYgKHJlcykge1xuICAgICAgICAgICAgdGhpcy5kaWFsb2cub3BlbihTaG93VG9rZW5Db21wb25lbnQsIHtcbiAgICAgICAgICAgICAgd2lkdGg6ICc2MDBweCcsXG4gICAgICAgICAgICAgIG1heEhlaWdodDogJzcwdmgnLFxuICAgICAgICAgICAgICBkYXRhOiByZXMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMucmVsb2FkLm5leHQodGhpcy5yZWxvYWQudmFsdWUgKyAxKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgfVxuXG4gIG9wZW5WaWV3Um9sZXNEaWFsb2coY2xpZW50OiBDbGllbnQpIHtcbiAgICB0aGlzLmRpYWxvZy5vcGVuKFZpZXdDbGllbnRSb2xlc0NvbXBvbmVudCwge1xuICAgICAgd2lkdGg6ICc2MDBweCcsXG4gICAgICBtYXhIZWlnaHQ6ICc3MHZoJyxcbiAgICAgIGRhdGE6IGNsaWVudCxcbiAgICB9KTtcbiAgfVxuXG4gIG9wZW5VcGRhdGVSb2xlc0RpYWxvZyhjbGllbnQ6IENsaWVudCkge1xuICAgIGNvbnN0IHVwZGF0ZVJvbGVzRGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihBZGRDbGllbnRSb2xlc0NvbXBvbmVudCwge1xuICAgICAgd2lkdGg6ICc2MDBweCcsXG4gICAgICBtYXhIZWlnaHQ6ICc3MHZoJyxcbiAgICAgIGRhdGE6IGNsaWVudCxcbiAgICB9KTtcblxuICAgIHVwZGF0ZVJvbGVzRGlhbG9nUmVmXG4gICAgICAuYWZ0ZXJDbG9zZWQoKVxuICAgICAgLnBpcGUoZmlyc3QoKSlcbiAgICAgIC5zdWJzY3JpYmUoe1xuICAgICAgICBuZXh0OiAocmVzKSA9PiB7XG4gICAgICAgICAgaWYgKHJlcykge1xuICAgICAgICAgICAgdGhpcy5yZWxvYWQubmV4dCh0aGlzLnJlbG9hZC52YWx1ZSArIDEpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICB9XG5cbiAgb3BlblVwZGF0ZUNsaWVudERpYWxvZyhjbGllbnQ6IENsaWVudCkge1xuICAgIGNvbnN0IHVwZGF0ZUNsaWVudERpYWxvZ1JlZiA9IHRoaXMuZGlhbG9nLm9wZW4oVXBkYXRlQ2xpZW50Q29tcG9uZW50LCB7XG4gICAgICB3aWR0aDogJzYwMHB4JyxcbiAgICAgIG1heEhlaWdodDogJzcwdmgnLFxuICAgICAgZGF0YTogY2xpZW50LFxuICAgIH0pO1xuXG4gICAgdXBkYXRlQ2xpZW50RGlhbG9nUmVmXG4gICAgICAuYWZ0ZXJDbG9zZWQoKVxuICAgICAgLnBpcGUoZmlyc3QoKSlcbiAgICAgIC5zdWJzY3JpYmUoe1xuICAgICAgICBuZXh0OiAocmVzKSA9PiB7XG4gICAgICAgICAgaWYgKHJlcykge1xuICAgICAgICAgICAgdGhpcy5yZWxvYWQubmV4dCh0aGlzLnJlbG9hZC52YWx1ZSArIDEpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICB9XG5cbiAgb3BlbkRpYWxvZ0RlbGV0ZUNsaWVudChjbGllbnQ6IENsaWVudCkge1xuICAgIGNvbnN0IHVwZGF0ZVJvbGVzRGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihEZWxldGVDbGllbnRDb21wb25lbnQsIHtcbiAgICAgIHdpZHRoOiAnNjAwcHgnLFxuICAgICAgbWF4SGVpZ2h0OiAnNzB2aCcsXG4gICAgICBkYXRhOiBjbGllbnQsXG4gICAgfSk7XG5cbiAgICB1cGRhdGVSb2xlc0RpYWxvZ1JlZlxuICAgICAgLmFmdGVyQ2xvc2VkKClcbiAgICAgIC5waXBlKGZpcnN0KCkpXG4gICAgICAuc3Vic2NyaWJlKHtcbiAgICAgICAgbmV4dDogKHJlcykgPT4ge1xuICAgICAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgICAgIHRoaXMucmVsb2FkLm5leHQodGhpcy5yZWxvYWQudmFsdWUgKyAxKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cImNsaWVudC1jb250YWluZXJcIj5cbiAgPGRpdiBjbGFzcz1cImNsaWVudC1oZWFkXCI+XG4gICAgPGgxIGNsYXNzPVwiY2xpZW50LXRpdGxlXCI+Q2xpZW50czwvaDE+XG4gICAgPHNwYW4gY2xhc3M9XCJzZXBhcmF0b3JcIj48L3NwYW4+XG4gICAgPGJ1dHRvbiAoY2xpY2spPVwib3BlbkNyZWF0ZUNsaWVudERpYWxvZygpXCIgY29sb3I9XCJhY2NlbnRcIiBtYXQtZmxhdC1idXR0b24+XG4gICAgICBBZGQgQ2xpZW50XG4gICAgPC9idXR0b24+XG4gIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwiY2xpZW50LWJvZHlcIj5cbiAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyLXRhYmxlIG1hdC1lbGV2YXRpb24tejhcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJsb2FkaW5nLXNoYWRlXCIgKm5nSWY9XCJpc0xvYWRpbmdSZXN1bHRzXCI+XG4gICAgICAgIDxtYXQtc3Bpbm5lciAqbmdJZj1cImlzTG9hZGluZ1Jlc3VsdHNcIj48L21hdC1zcGlubmVyPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJleGFtcGxlLXRhYmxlLWNvbnRhaW5lclwiPlxuICAgICAgICA8dGFibGVcbiAgICAgICAgICBtYXQtdGFibGVcbiAgICAgICAgICBbZGF0YVNvdXJjZV09XCJjbGllbnRzXCJcbiAgICAgICAgICBjbGFzcz1cImNsaWVudC10YWJsZVwiXG4gICAgICAgICAgbWF0U29ydFxuICAgICAgICAgIG1hdFNvcnRBY3RpdmU9XCJpZFwiXG4gICAgICAgICAgbWF0U29ydERpc2FibGVDbGVhclxuICAgICAgICAgIG1hdFNvcnREaXJlY3Rpb249XCJhc2NcIlxuICAgICAgICA+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciBtYXRDb2x1bW5EZWY9XCJpZFwiPlxuICAgICAgICAgICAgPHRoIG1hdC1zb3J0LWhlYWRlciBtYXQtaGVhZGVyLWNlbGwgKm1hdEhlYWRlckNlbGxEZWY+aWQ8L3RoPlxuICAgICAgICAgICAgPHRkIG1hdC1jZWxsICptYXRDZWxsRGVmPVwibGV0IHJvd1wiPnt7IHJvdy5pZCB9fTwvdGQ+XG4gICAgICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgICAgICA8bmctY29udGFpbmVyIG1hdENvbHVtbkRlZj1cIm5hbWVcIj5cbiAgICAgICAgICAgIDx0aCBtYXQtaGVhZGVyLWNlbGwgKm1hdEhlYWRlckNlbGxEZWY+TmFtZTwvdGg+XG4gICAgICAgICAgICA8dGQgbWF0LWNlbGwgKm1hdENlbGxEZWY9XCJsZXQgcm93XCI+e3sgcm93Lm5hbWUgfX08L3RkPlxuICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICAgICAgPG5nLWNvbnRhaW5lciBtYXRDb2x1bW5EZWY9XCJpZGVudGlmaWVyXCI+XG4gICAgICAgICAgICA8dGggbWF0LWhlYWRlci1jZWxsICptYXRIZWFkZXJDZWxsRGVmPklkZW50aWZpZXI8L3RoPlxuICAgICAgICAgICAgPHRkIG1hdC1jZWxsICptYXRDZWxsRGVmPVwibGV0IHJvd1wiPnt7IHJvdy5pZGVudGlmaWVyIH19PC90ZD5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgICAgIDxuZy1jb250YWluZXIgbWF0Q29sdW1uRGVmPVwiY2xpZW50U2VjcmV0XCI+XG4gICAgICAgICAgICA8dGggbWF0LWhlYWRlci1jZWxsICptYXRIZWFkZXJDZWxsRGVmPlNlY3JldDwvdGg+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJyb2xlcy1jb2x1bW5cIiBtYXQtY2VsbCAqbWF0Q2VsbERlZj1cImxldCByb3dcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiAoY2xpY2spPVwib3BlblNob3dTZWNyZXRDb21wb25lbnQocm93KVwiIG1hdC1zdHJva2VkLWJ1dHRvbj5cbiAgICAgICAgICAgICAgICBTZWNyZXQgS2V5XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgICAgIDxuZy1jb250YWluZXIgbWF0Q29sdW1uRGVmPVwiYWNjZXNzVG9rZW5cIj5cbiAgICAgICAgICAgIDx0aCBtYXQtaGVhZGVyLWNlbGwgKm1hdEhlYWRlckNlbGxEZWY+QWNjZXNzIFRva2VuPC90aD5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cInJvbGVzLWNvbHVtblwiIG1hdC1jZWxsICptYXRDZWxsRGVmPVwibGV0IHJvd1wiPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cImdlbmVyYXRlTmV3TG9uZ0xpdmVUb2tlbihyb3cpXCJcbiAgICAgICAgICAgICAgICBtYXQtc3Ryb2tlZC1idXR0b25cbiAgICAgICAgICAgICAgICAqbmdJZj1cIiFyb3cuaGFzTG9uZ0xpdmVUb2tlblwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICBHZW5lcmF0ZSBMb25nIExpdmVcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAqbmdJZj1cInJvdy5oYXNMb25nTGl2ZVRva2VuXCJcbiAgICAgICAgICAgICAgICBjb2xvcj1cIndhcm5cIlxuICAgICAgICAgICAgICAgIChjbGljayk9XCJyZW1vdmVMb25nTGl2ZVRva2VuKHJvdylcIlxuICAgICAgICAgICAgICAgIG1hdC1zdHJva2VkLWJ1dHRvblxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgUmVtb3ZlIExvbmcgTGl2ZVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgICAgICA8bmctY29udGFpbmVyIG1hdENvbHVtbkRlZj1cInJvbGVzXCI+XG4gICAgICAgICAgICA8dGggbWF0LWhlYWRlci1jZWxsICptYXRIZWFkZXJDZWxsRGVmPlJvbGVzPC90aD5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cInJvbGVzLWNvbHVtblwiIG1hdC1jZWxsICptYXRDZWxsRGVmPVwibGV0IHJvd1wiPlxuICAgICAgICAgICAgICA8YnV0dG9uIChjbGljayk9XCJvcGVuVmlld1JvbGVzRGlhbG9nKHJvdylcIiBtYXQtc3Ryb2tlZC1idXR0b24+XG4gICAgICAgICAgICAgICAgVmlldyBSb2xlc1xuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJyb3cuaWRlbnRpZmllciA9PT0gJ2FkbWluJ1wiXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9wZW5VcGRhdGVSb2xlc0RpYWxvZyhyb3cpXCJcbiAgICAgICAgICAgICAgICBtYXQtc3Ryb2tlZC1idXR0b25cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIFVwZGF0ZSBSb2xlc1xuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgICAgICA8bmctY29udGFpbmVyIG1hdENvbHVtbkRlZj1cImVkaXRcIj5cbiAgICAgICAgICAgIDx0aCBtYXQtaGVhZGVyLWNlbGwgKm1hdEhlYWRlckNlbGxEZWY+PC90aD5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImFjdGlvbnMtY29sdW1uXCIgbWF0LWNlbGwgKm1hdENlbGxEZWY9XCJsZXQgcm93XCI+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAqbmdJZj1cIiFyb3cucmV2b2tlZFwiXG4gICAgICAgICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwicm93LmlkZW50aWZpZXIgPT09ICdhZG1pbidcIlxuICAgICAgICAgICAgICAgIG1hdC1zdHJva2VkLWJ1dHRvblxuICAgICAgICAgICAgICAgIChjbGljayk9XCJyZXZva2VDbGllbnQocm93KVwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICBSZXZva2UgQ2xpZW50XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgKm5nSWY9XCJyb3cucmV2b2tlZFwiXG4gICAgICAgICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwicm93LmlkZW50aWZpZXIgPT09ICdhZG1pbidcIlxuICAgICAgICAgICAgICAgIG1hdC1zdHJva2VkLWJ1dHRvblxuICAgICAgICAgICAgICAgIChjbGljayk9XCJyYXRpZnlDbGllbnQocm93KVwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICBSYXRpZnkgQ2xpZW50XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwicm93LmlkZW50aWZpZXIgPT09ICdhZG1pbidcIlxuICAgICAgICAgICAgICAgIG1hdC1zdHJva2VkLWJ1dHRvblxuICAgICAgICAgICAgICAgIChjbGljayk9XCJvcGVuVXBkYXRlQ2xpZW50RGlhbG9nKHJvdylcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgRWRpdCBDbGllbnRcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBjb2xvcj1cIndhcm5cIlxuICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJyb3cuaWRlbnRpZmllciA9PT0gJ2FkbWluJ1wiXG4gICAgICAgICAgICAgICAgbWF0LXN0cm9rZWQtYnV0dG9uXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9wZW5EaWFsb2dEZWxldGVDbGllbnQocm93KVwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICBEZWxldGUgQ2xpZW50XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgICAgIDx0ciBtYXQtaGVhZGVyLXJvdyAqbWF0SGVhZGVyUm93RGVmPVwiZGlzcGxheWVkQ29sdW1uc1wiPjwvdHI+XG4gICAgICAgICAgPHRyIG1hdC1yb3cgKm1hdFJvd0RlZj1cImxldCByb3c7IGNvbHVtbnM6IGRpc3BsYXllZENvbHVtbnNcIj48L3RyPlxuICAgICAgICA8L3RhYmxlPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxtYXQtcGFnaW5hdG9yIFtsZW5ndGhdPVwicmVzdWx0c0xlbmd0aFwiIFtwYWdlU2l6ZV09XCIyMFwiPjwvbWF0LXBhZ2luYXRvcj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5cbjxkaXYgKm5nSWY9XCJ3aG9sZVBhZ2VMb2FkaW5nXCIgY2xhc3M9XCJsb2FkaW5nLWZ1bGxcIj5cbiAgPG1hdC1zcGlubmVyPjwvbWF0LXNwaW5uZXI+XG48L2Rpdj5cbiJdfQ==