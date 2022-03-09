import * as i0 from '@angular/core';
import { Injectable, Inject, Component, Input, NgModule, ViewChild } from '@angular/core';
import { first, BehaviorSubject, merge, startWith, switchMap, catchError, of, map } from 'rxjs';
import * as i1 from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import * as i1$1 from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import * as i3 from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import * as i8 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i2 from '@angular/forms';
import { Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as i4 from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import * as i10 from '@angular/material/input';
import { MatInputModule } from '@angular/material/input';
import * as i7 from '@angular/material/paginator';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import * as i4$1 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import * as i5$1 from '@angular/material/select';
import { MatSelectModule } from '@angular/material/select';
import * as i5$2 from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import * as i6$1 from '@angular/material/sort';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import * as i4$2 from '@angular/material/progress-spinner';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import * as i3$1 from '@angular/material/list';
import { MatListModule } from '@angular/material/list';
import * as i2$1 from '@angular/material/expansion';
import { MatExpansionModule } from '@angular/material/expansion';
import * as i6$2 from '@angular/material/tooltip';
import { MatTooltipModule } from '@angular/material/tooltip';
import * as i8$1 from '@angular/material/checkbox';
import { MatCheckboxModule } from '@angular/material/checkbox';
import * as i5 from '@angular/material/divider';
import * as i6 from '@angular/material/core';
import * as i7$1 from 'ngx-clipboard';
import { ClipboardModule } from 'ngx-clipboard';

class NodebootOauth2StarterService {
    constructor(http, configuration) {
        this.http = http;
        this.configuration = configuration;
        this.authUserApi = configuration.api + '/auth/user';
        this.authRoleApi = configuration.api + '/auth/role';
        this.authResourceApi = configuration.api + '/auth/resource';
        this.authClientApi = configuration.api + '/auth/client';
        this.authApplicationApi = configuration.api + '/auth/application ';
    }
    getUsers(pageIndex, order) {
        return this.http
            .get(this.authUserApi +
            `?pageIndex=${pageIndex}&&itemsPerPage=20&&order=${order}`)
            .pipe(first());
    }
    createUser(createUserData) {
        return this.http.post(this.authUserApi, createUserData).pipe(first());
    }
    updatePassword(userId, newPassword, oldPassword) {
        return this.http
            .put(`${this.authUserApi}/${userId}/password`, {
            newPassword,
            oldPassword,
        })
            .pipe(first());
    }
    updateUserRoles(userId, roles) {
        return this.http
            .put(`${this.authUserApi}/${userId}/role`, { roles })
            .pipe(first());
    }
    deleteUser(subjectId) {
        return this.http.delete(`${this.authUserApi}/${subjectId}`).pipe(first());
    }
    updateUser(subjectId, updateBody) {
        return this.http
            .put(`${this.authUserApi}/${subjectId}`, updateBody)
            .pipe(first());
    }
    getUserProfile() {
        return this.http
            .get(`${this.authUserApi}/profile/me`)
            .pipe(first());
    }
    getRolesBasic() {
        return this.http
            .get(this.authRoleApi + '?basic=true')
            .pipe(first());
    }
    createRole(identifier, allowedObject) {
        return this.http
            .post(this.authRoleApi, { identifier, allowedObject })
            .pipe(first());
    }
    updateRoleOptions(roleId, newAllowedObject, originalAllowedObject) {
        return this.http
            .put(this.authRoleApi + `/${roleId}/option`, {
            newAllowedObject,
            originalAllowedObject,
        })
            .pipe(first());
    }
    deleteRole(roleId) {
        return this.http.delete(this.authRoleApi + `/${roleId}`).pipe(first());
    }
    getRoles(pageIndex, order) {
        return this.http
            .get(this.authRoleApi +
            `?pageIndex=${pageIndex}&&itemsPerPage=20&&order=${order}`)
            .pipe(first());
    }
    getResourcesBasic() {
        return this.http
            .get(this.authResourceApi + `?basic=true`)
            .pipe(first());
    }
    getResources(pageIndex, order) {
        return this.http
            .get(this.authResourceApi +
            `?pageIndex=${pageIndex}&&itemsPerPage=20&&order=${order}`)
            .pipe(first());
    }
    updateResourceOptions(resourceId, newResourceOptions, originalResourceOptions) {
        return this.http
            .put(this.authResourceApi + `/${resourceId}/option`, {
            newResourceOptions,
            originalResourceOptions,
        })
            .pipe(first());
    }
    deleteResource(resourceId) {
        return this.http.delete(this.authResourceApi + `/${resourceId}`);
    }
    createResource(resourceIdentifier, applications_id) {
        return this.http.post(this.authResourceApi, {
            resourceIdentifier,
            applications_id,
        });
    }
    getClients(pageIndex, order) {
        return this.http
            .get(this.authClientApi +
            `?pageIndex=${pageIndex}&&itemsPerPage=20&&order=${order}`)
            .pipe(first());
    }
    createClient(createClientData, longLive) {
        return this.http
            .post(this.authClientApi + `?longLive=${longLive}`, createClientData)
            .pipe(first());
    }
    deleteClient(subjectId) {
        return this.http.delete(`${this.authClientApi}/${subjectId}`).pipe(first());
    }
    updateClientRoles(clientId, roles) {
        return this.http
            .put(`${this.authClientApi}/${clientId}/role`, { roles })
            .pipe(first());
    }
    updateClient(subjectId, updateBody) {
        return this.http
            .put(`${this.authClientApi}/${subjectId}`, updateBody)
            .pipe(first());
    }
    getApplications() {
        return this.http.get(this.authApplicationApi);
    }
    getSecret(clientId) {
        return this.http
            .get(this.authClientApi + `/${clientId}/secret`)
            .pipe(first());
    }
    generateLongLiveToken(clientId, identifier) {
        return this.http
            .put(this.authClientApi + `/${clientId}/long-live`, {
            identifier,
        })
            .pipe(first());
    }
    removeLongLiveToken(clientId, identifier) {
        return this.http
            .put(this.authClientApi + `/${clientId}/long-live?remove_long_live=true`, {
            identifier,
        })
            .pipe(first());
    }
    modifyRevokeStatus(clientId, revoke) {
        return this.http
            .put(this.authClientApi + `/${clientId}/revoke`, {
            revoke,
        })
            .pipe(first());
    }
    get apiUrl() {
        return this.configuration.api;
    }
}
NodebootOauth2StarterService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NodebootOauth2StarterService, deps: [{ token: i1.HttpClient }, { token: 'configuration' }], target: i0.ɵɵFactoryTarget.Injectable });
NodebootOauth2StarterService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NodebootOauth2StarterService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NodebootOauth2StarterService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: undefined, decorators: [{
                    type: Inject,
                    args: ['configuration']
                }] }]; } });

class NodebootOauth2StarterComponent {
    constructor(nbService) {
        this.nbService = nbService;
        this.testTextT = this.nbService.apiUrl;
    }
    ngOnInit() { }
}
NodebootOauth2StarterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NodebootOauth2StarterComponent, deps: [{ token: NodebootOauth2StarterService }], target: i0.ɵɵFactoryTarget.Component });
NodebootOauth2StarterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NodebootOauth2StarterComponent, selector: "lib-nodeboot-oauth2-starter", inputs: { otherText: "otherText" }, ngImport: i0, template: "", styles: ["p{color:#0ff}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NodebootOauth2StarterComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-nodeboot-oauth2-starter', template: "", styles: ["p{color:#0ff}\n"] }]
        }], ctorParameters: function () { return [{ type: NodebootOauth2StarterService }]; }, propDecorators: { otherText: [{
                type: Input
            }] } });

class DeleteUserComponent {
    constructor(dialogRef, nbService, user) {
        this.dialogRef = dialogRef;
        this.nbService = nbService;
        this.user = user;
    }
    ngOnInit() { }
    delete() {
        this.dialogRef.disableClose = true;
        this.nbService.deleteUser(this.user.subjectId).subscribe({
            error: (err) => {
                this.dialogRef.disableClose = false;
                if (err.error) {
                    this.errorMessage = err.error.message;
                }
                else {
                    this.errorMessage = 'Unknown Error';
                }
            },
            next: () => {
                this.dialogRef.close(true);
            },
        });
    }
    closeDialog() {
        this.dialogRef.close();
    }
}
DeleteUserComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: DeleteUserComponent, deps: [{ token: i1$1.MatDialogRef }, { token: NodebootOauth2StarterService }, { token: MAT_DIALOG_DATA }], target: i0.ɵɵFactoryTarget.Component });
DeleteUserComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: DeleteUserComponent, selector: "lib-delete-user", ngImport: i0, template: "<h2 mat-dialog-title>Delete User {{ user.name }}</h2>\n<div mat-dialog-content>\n  <div class=\"error-display\" *ngIf=\"errorMessage\">\n    <h5>{{ errorMessage }}</h5>\n  </div>\n  <p>Are you sure?</p>\n</div>\n<div align=\"end\" mat-dialog-actions>\n  <button\n    (click)=\"closeDialog()\"\n    type=\"button\"\n    color=\"warn\"\n    mat-stroked-button\n    [disabled]=\"dialogRef.disableClose\"\n  >\n    Cancel</button\n  ><button\n    (click)=\"delete()\"\n    type=\"button\"\n    color=\"primary\"\n    mat-flat-button\n    [disabled]=\"dialogRef.disableClose\"\n  >\n    Delete\n  </button>\n</div>\n", styles: [".error-display{margin:1rem 0;background-color:#ffab1098;padding:.5rem;border-radius:.25rem}.error-display h5{margin:0;font-size:16px}\n"], components: [{ type: i3.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }], directives: [{ type: i1$1.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { type: i1$1.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }, { type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1$1.MatDialogActions, selector: "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: DeleteUserComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-delete-user', template: "<h2 mat-dialog-title>Delete User {{ user.name }}</h2>\n<div mat-dialog-content>\n  <div class=\"error-display\" *ngIf=\"errorMessage\">\n    <h5>{{ errorMessage }}</h5>\n  </div>\n  <p>Are you sure?</p>\n</div>\n<div align=\"end\" mat-dialog-actions>\n  <button\n    (click)=\"closeDialog()\"\n    type=\"button\"\n    color=\"warn\"\n    mat-stroked-button\n    [disabled]=\"dialogRef.disableClose\"\n  >\n    Cancel</button\n  ><button\n    (click)=\"delete()\"\n    type=\"button\"\n    color=\"primary\"\n    mat-flat-button\n    [disabled]=\"dialogRef.disableClose\"\n  >\n    Delete\n  </button>\n</div>\n", styles: [".error-display{margin:1rem 0;background-color:#ffab1098;padding:.5rem;border-radius:.25rem}.error-display h5{margin:0;font-size:16px}\n"] }]
        }], ctorParameters: function () { return [{ type: i1$1.MatDialogRef }, { type: NodebootOauth2StarterService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_DIALOG_DATA]
                }] }]; } });

class UpdateUserComponent {
    constructor(formBuilder, dialogRef, nbService, user) {
        this.formBuilder = formBuilder;
        this.dialogRef = dialogRef;
        this.nbService = nbService;
        this.user = user;
        this.updateUserForm = this.formBuilder.group({
            name: this.formBuilder.control(user.name, Validators.compose([
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(45),
                Validators.pattern(/^[a-zA-Z0-9_\.\-\/\s]+$/),
            ])),
        });
    }
    closeDialog() {
        this.dialogRef.close();
    }
    updateUser(updateUserData) {
        this.dialogRef.disableClose = true;
        this.nbService.updateUser(this.user.subjectId, updateUserData).subscribe({
            error: (err) => {
                this.dialogRef.disableClose = false;
                if (err.error) {
                    this.errorMessage = err.error.message;
                }
                else {
                    this.errorMessage = 'Unknown Error';
                }
            },
            next: () => {
                this.dialogRef.close(true);
            },
        });
    }
    ngOnInit() { }
}
UpdateUserComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: UpdateUserComponent, deps: [{ token: i2.FormBuilder }, { token: i1$1.MatDialogRef }, { token: NodebootOauth2StarterService }, { token: MAT_DIALOG_DATA }], target: i0.ɵɵFactoryTarget.Component });
UpdateUserComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: UpdateUserComponent, selector: "lib-update-user", ngImport: i0, template: "<h2 mat-dialog-title>Update User {{ user.name }}</h2>\n<form\n  [formGroup]=\"updateUserForm\"\n  (ngSubmit)=\"updateUser(updateUserForm.value)\"\n>\n  <div mat-dialog-content>\n    <div class=\"error-display\" *ngIf=\"errorMessage\">\n      <h5>{{ errorMessage }}</h5>\n    </div>\n    <mat-form-field class=\"forms-field\" appearance=\"fill\">\n      <mat-label>Name</mat-label>\n      <input matInput formControlName=\"name\" name=\"name\" required />\n      <mat-hint>Put your name</mat-hint>\n    </mat-form-field>\n  </div>\n  <div align=\"end\" mat-dialog-actions>\n    <button\n      (click)=\"closeDialog()\"\n      type=\"button\"\n      color=\"warn\"\n      mat-stroked-button\n      [disabled]=\"dialogRef.disableClose\"\n    >\n      Cancel</button\n    ><button\n      [disabled]=\"!updateUserForm.valid || dialogRef.disableClose\"\n      color=\"primary\"\n      mat-flat-button\n    >\n      Update\n    </button>\n  </div>\n</form>\n", styles: [".forms-field{width:100%;margin-bottom:1rem}.error-display{margin:1rem 0;background-color:#ffab1098;padding:.5rem;border-radius:.25rem}.error-display h5{margin:0;font-size:16px}.select-role{display:grid;grid-template-columns:auto .15fr;grid-gap:.5rem;gap:.5rem;margin-bottom:1rem}.select-role button{height:59.5px}.roles-list{display:grid;grid-template-columns:auto .1fr;grid-gap:.5rem;gap:.5rem;margin-bottom:1rem}.roles-list .role-title{border-radius:.25rem;background-color:#82c7ff44;padding:1rem}.roles-list .role-title h3{margin:0}\n"], components: [{ type: i4.MatFormField, selector: "mat-form-field", inputs: ["color", "appearance", "hideRequiredMarker", "hintLabel", "floatLabel"], exportAs: ["matFormField"] }, { type: i3.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }], directives: [{ type: i1$1.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { type: i2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i1$1.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }, { type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.MatLabel, selector: "mat-label" }, { type: i10.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i4.MatHint, selector: "mat-hint", inputs: ["align", "id"] }, { type: i1$1.MatDialogActions, selector: "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: UpdateUserComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-update-user', template: "<h2 mat-dialog-title>Update User {{ user.name }}</h2>\n<form\n  [formGroup]=\"updateUserForm\"\n  (ngSubmit)=\"updateUser(updateUserForm.value)\"\n>\n  <div mat-dialog-content>\n    <div class=\"error-display\" *ngIf=\"errorMessage\">\n      <h5>{{ errorMessage }}</h5>\n    </div>\n    <mat-form-field class=\"forms-field\" appearance=\"fill\">\n      <mat-label>Name</mat-label>\n      <input matInput formControlName=\"name\" name=\"name\" required />\n      <mat-hint>Put your name</mat-hint>\n    </mat-form-field>\n  </div>\n  <div align=\"end\" mat-dialog-actions>\n    <button\n      (click)=\"closeDialog()\"\n      type=\"button\"\n      color=\"warn\"\n      mat-stroked-button\n      [disabled]=\"dialogRef.disableClose\"\n    >\n      Cancel</button\n    ><button\n      [disabled]=\"!updateUserForm.valid || dialogRef.disableClose\"\n      color=\"primary\"\n      mat-flat-button\n    >\n      Update\n    </button>\n  </div>\n</form>\n", styles: [".forms-field{width:100%;margin-bottom:1rem}.error-display{margin:1rem 0;background-color:#ffab1098;padding:.5rem;border-radius:.25rem}.error-display h5{margin:0;font-size:16px}.select-role{display:grid;grid-template-columns:auto .15fr;grid-gap:.5rem;gap:.5rem;margin-bottom:1rem}.select-role button{height:59.5px}.roles-list{display:grid;grid-template-columns:auto .1fr;grid-gap:.5rem;gap:.5rem;margin-bottom:1rem}.roles-list .role-title{border-radius:.25rem;background-color:#82c7ff44;padding:1rem}.roles-list .role-title h3{margin:0}\n"] }]
        }], ctorParameters: function () { return [{ type: i2.FormBuilder }, { type: i1$1.MatDialogRef }, { type: NodebootOauth2StarterService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_DIALOG_DATA]
                }] }]; } });

class LibraryMaterials {
}
LibraryMaterials.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: LibraryMaterials, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
LibraryMaterials.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: LibraryMaterials, exports: [MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatSidenavModule,
        MatListModule,
        MatGridListModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTableModule,
        MatSortModule,
        MatMenuModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatListModule,
        MatExpansionModule,
        MatTooltipModule,
        MatCheckboxModule] });
LibraryMaterials.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: LibraryMaterials, imports: [MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatSidenavModule,
        MatListModule,
        MatGridListModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTableModule,
        MatSortModule,
        MatMenuModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatListModule,
        MatExpansionModule,
        MatTooltipModule,
        MatCheckboxModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: LibraryMaterials, decorators: [{
            type: NgModule,
            args: [{
                    exports: [
                        MatToolbarModule,
                        MatIconModule,
                        MatButtonModule,
                        MatSidenavModule,
                        MatListModule,
                        MatGridListModule,
                        MatFormFieldModule,
                        MatInputModule,
                        MatSelectModule,
                        MatTableModule,
                        MatSortModule,
                        MatMenuModule,
                        MatPaginatorModule,
                        MatProgressSpinnerModule,
                        MatDialogModule,
                        MatListModule,
                        MatExpansionModule,
                        MatTooltipModule,
                        MatCheckboxModule,
                    ],
                }]
        }] });

class ViewUserRolesComponent {
    constructor(dialogRef, user) {
        this.dialogRef = dialogRef;
        this.user = user;
        this.userTitle = `${user.name} roles`;
    }
    closeDialog() {
        this.dialogRef.close();
    }
    ngOnInit() { }
}
ViewUserRolesComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ViewUserRolesComponent, deps: [{ token: i1$1.MatDialogRef }, { token: MAT_DIALOG_DATA }], target: i0.ɵɵFactoryTarget.Component });
ViewUserRolesComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: ViewUserRolesComponent, selector: "lib-view-user-roles", ngImport: i0, template: "<h2 class=\"primary-color\" mat-dialog-title>{{ userTitle }}</h2>\n<div mat-dialog-content>\n  <div class=\"accordion-container\">\n    <mat-accordion>\n      <mat-expansion-panel *ngFor=\"let role of user.roles\">\n        <mat-expansion-panel-header>\n          <mat-panel-title> {{ role.identifier }} </mat-panel-title>\n        </mat-expansion-panel-header>\n        <h4>Grouped by application resource</h4>\n        <mat-list>\n          <div *ngFor=\"let option of role.resources\">\n            <div mat-subheader>{{ option.applicationResourceName }}</div>\n            <mat-list-item *ngFor=\"let allowed of option.allowed\">\n              <mat-icon mat-list-icon>vpn_key</mat-icon>\n              <div mat-line>\n                {{ option.applicationResourceName }}:{{ allowed }}\n              </div>\n            </mat-list-item>\n            <mat-divider></mat-divider>\n          </div>\n        </mat-list>\n      </mat-expansion-panel>\n    </mat-accordion>\n  </div>\n</div>\n<div align=\"end\" mat-dialog-actions>\n  <button\n    (click)=\"closeDialog()\"\n    type=\"button\"\n    color=\"primary\"\n    mat-stroked-button\n  >\n    Ok\n  </button>\n</div>\n", styles: [".header{display:flex;align-items:baseline;gap:.5rem;flex-wrap:wrap}.header h1{margin:0;font-size:32px}.header h4{margin:0;color:gray}section{display:grid}section .roles-list{color:#000}section .actions{margin-top:2rem}.profile-container ::ng-deep .mat-list-base .mat-list-item .mat-list-item-content{color:#000}\n"], components: [{ type: i2$1.MatExpansionPanel, selector: "mat-expansion-panel", inputs: ["disabled", "expanded", "hideToggle", "togglePosition"], outputs: ["opened", "closed", "expandedChange", "afterExpand", "afterCollapse"], exportAs: ["matExpansionPanel"] }, { type: i2$1.MatExpansionPanelHeader, selector: "mat-expansion-panel-header", inputs: ["tabIndex", "expandedHeight", "collapsedHeight"] }, { type: i3$1.MatList, selector: "mat-list, mat-action-list", inputs: ["disableRipple", "disabled"], exportAs: ["matList"] }, { type: i3$1.MatListItem, selector: "mat-list-item, a[mat-list-item], button[mat-list-item]", inputs: ["disableRipple", "disabled"], exportAs: ["matListItem"] }, { type: i4$1.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { type: i5.MatDivider, selector: "mat-divider", inputs: ["vertical", "inset"] }, { type: i3.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }], directives: [{ type: i1$1.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { type: i1$1.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }, { type: i2$1.MatAccordion, selector: "mat-accordion", inputs: ["multi", "hideToggle", "displayMode", "togglePosition"], exportAs: ["matAccordion"] }, { type: i8.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2$1.MatExpansionPanelTitle, selector: "mat-panel-title" }, { type: i3$1.MatListSubheaderCssMatStyler, selector: "[mat-subheader], [matSubheader]" }, { type: i3$1.MatListIconCssMatStyler, selector: "[mat-list-icon], [matListIcon]" }, { type: i6.MatLine, selector: "[mat-line], [matLine]" }, { type: i1$1.MatDialogActions, selector: "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ViewUserRolesComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-view-user-roles', template: "<h2 class=\"primary-color\" mat-dialog-title>{{ userTitle }}</h2>\n<div mat-dialog-content>\n  <div class=\"accordion-container\">\n    <mat-accordion>\n      <mat-expansion-panel *ngFor=\"let role of user.roles\">\n        <mat-expansion-panel-header>\n          <mat-panel-title> {{ role.identifier }} </mat-panel-title>\n        </mat-expansion-panel-header>\n        <h4>Grouped by application resource</h4>\n        <mat-list>\n          <div *ngFor=\"let option of role.resources\">\n            <div mat-subheader>{{ option.applicationResourceName }}</div>\n            <mat-list-item *ngFor=\"let allowed of option.allowed\">\n              <mat-icon mat-list-icon>vpn_key</mat-icon>\n              <div mat-line>\n                {{ option.applicationResourceName }}:{{ allowed }}\n              </div>\n            </mat-list-item>\n            <mat-divider></mat-divider>\n          </div>\n        </mat-list>\n      </mat-expansion-panel>\n    </mat-accordion>\n  </div>\n</div>\n<div align=\"end\" mat-dialog-actions>\n  <button\n    (click)=\"closeDialog()\"\n    type=\"button\"\n    color=\"primary\"\n    mat-stroked-button\n  >\n    Ok\n  </button>\n</div>\n", styles: [".header{display:flex;align-items:baseline;gap:.5rem;flex-wrap:wrap}.header h1{margin:0;font-size:32px}.header h4{margin:0;color:gray}section{display:grid}section .roles-list{color:#000}section .actions{margin-top:2rem}.profile-container ::ng-deep .mat-list-base .mat-list-item .mat-list-item-content{color:#000}\n"] }]
        }], ctorParameters: function () { return [{ type: i1$1.MatDialogRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_DIALOG_DATA]
                }] }]; } });

class CreateUserComponent {
    constructor(dialogRef, formBuilder, nbService) {
        this.dialogRef = dialogRef;
        this.formBuilder = formBuilder;
        this.nbService = nbService;
        this.roles = [];
        this.rolesList = [];
        this.hidePassword = true;
        this.nbService.getRolesBasic().subscribe({
            error: (err) => {
                if (err.error) {
                    this.errorMessage = err.error.message;
                }
                else {
                    this.errorMessage = 'Unknown Error';
                }
                this.roles = [];
            },
            next: (res) => {
                this.roles = res.content || [];
            },
        });
        this.createUserForm = this.formBuilder.group({
            name: this.formBuilder.control('', Validators.compose([
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(45),
                Validators.pattern(/^[a-zA-Z0-9_\.\-\/\s]+$/),
            ])),
            description: this.formBuilder.control('', Validators.compose([
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(255),
            ])),
            username: this.formBuilder.control('', Validators.compose([
                Validators.required,
                Validators.pattern(/^[a-zA-Z0-9]+$/),
                Validators.minLength(4),
                Validators.maxLength(20),
            ])),
            password: this.formBuilder.control('', Validators.compose([
                Validators.required,
                Validators.pattern(/^[a-zA-Z0-9\d@$!%*#?&]*[A-Z]+[a-zA-Z0-9\d@$!%*#?&]*$/),
                Validators.pattern(/^[a-zA-Z0-9\d@$!%*#?&]*[0-9]+[a-zA-Z0-9\d@$!%*#?&]*$/),
                Validators.pattern(/^[a-zA-Z0-9\d@$!%*#?&]*[a-z]+[a-zA-Z0-9\d@$!%*#?&]*$/),
                Validators.minLength(6),
            ])),
            role: this.formBuilder.control(''),
        });
    }
    ngOnInit() { }
    addRoleToList() {
        const roleValue = this.createUserForm.get('role')?.value;
        if (!roleValue) {
            return;
        }
        const indexOfRole = this.roles.indexOf(roleValue);
        this.roles.splice(indexOfRole, 1);
        this.rolesList.push(roleValue);
        this.createUserForm.get('role')?.setValue('');
    }
    removeRoleToList(role) {
        const roleValue = role;
        const indexOfRole = this.roles.indexOf(roleValue);
        this.rolesList.splice(indexOfRole, 1);
        this.roles.push(roleValue);
    }
    closeDialog() {
        this.dialogRef.close();
    }
    createUser(createUserData) {
        createUserData.role = undefined;
        this.dialogRef.disableClose = true;
        this.nbService
            .createUser({ ...createUserData, roles: this.rolesList })
            .subscribe({
            error: (err) => {
                this.dialogRef.disableClose = false;
                if (err.error) {
                    this.errorMessage = err.error.message;
                }
                else {
                    this.errorMessage = 'Unknown Error';
                }
            },
            next: () => {
                this.dialogRef.close(true);
            },
        });
    }
}
CreateUserComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: CreateUserComponent, deps: [{ token: i1$1.MatDialogRef }, { token: i2.FormBuilder }, { token: NodebootOauth2StarterService }], target: i0.ɵɵFactoryTarget.Component });
CreateUserComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: CreateUserComponent, selector: "lib-create-user", ngImport: i0, template: "<h2 mat-dialog-title>Create User</h2>\n<form\n  [formGroup]=\"createUserForm\"\n  (ngSubmit)=\"createUser(createUserForm.value)\"\n>\n  <div mat-dialog-content>\n    <div class=\"error-display\" *ngIf=\"errorMessage\">\n      <h5>{{ errorMessage }}</h5>\n    </div>\n    <mat-form-field class=\"forms-field\" appearance=\"fill\">\n      <mat-label>Name</mat-label>\n      <input matInput formControlName=\"name\" name=\"name\" required />\n      <mat-hint>Put your name</mat-hint>\n    </mat-form-field>\n    <mat-form-field class=\"forms-field\" appearance=\"fill\">\n      <mat-label>Description</mat-label>\n      <input\n        matInput\n        formControlName=\"description\"\n        name=\"description\"\n        required\n      />\n      <mat-hint>Breve user description</mat-hint>\n    </mat-form-field>\n    <mat-form-field class=\"forms-field\" appearance=\"fill\">\n      <mat-label>Username</mat-label>\n      <input\n        matInput\n        placeholder=\"admin01\"\n        formControlName=\"username\"\n        name=\"username\"\n        required\n      />\n      <mat-hint>Your username</mat-hint>\n    </mat-form-field>\n    <mat-form-field appearance=\"fill\" class=\"forms-field\">\n      <mat-label>Password</mat-label>\n      <input\n        formControlName=\"password\"\n        name=\"password\"\n        matInput\n        [type]=\"hidePassword ? 'password' : 'text'\"\n        required\n      />\n      <button\n        type=\"button\"\n        mat-icon-button\n        matSuffix\n        (click)=\"hidePassword = !hidePassword\"\n        [attr.aria-label]=\"'hidePassword password'\"\n        [attr.aria-pressed]=\"hidePassword\"\n      >\n        <mat-icon>{{\n          hidePassword ? \"visibility_off\" : \"visibility\"\n        }}</mat-icon>\n      </button>\n      <mat-hint>Put your password</mat-hint>\n    </mat-form-field>\n    <div class=\"select-role\">\n      <mat-form-field class=\"forms-field\" appearance=\"fill\">\n        <mat-label>Select A Role</mat-label>\n        <mat-select name=\"role\" formControlName=\"role\">\n          <mat-option [value]=\"role\" *ngFor=\"let role of roles\">{{\n            role.identifier\n          }}</mat-option>\n        </mat-select>\n        <mat-hint>Select a role and add it</mat-hint>\n      </mat-form-field>\n      <button type=\"button\" (click)=\"addRoleToList()\" mat-stroked-button>\n        +\n      </button>\n    </div>\n    <div *ngFor=\"let role of rolesList\" class=\"roles-list\">\n      <div class=\"role-title\">\n        <h3>{{ role.identifier }}</h3>\n      </div>\n      <button\n        (click)=\"removeRoleToList(role)\"\n        color=\"warn\"\n        type=\"button\"\n        mat-stroked-button\n      >\n        -\n      </button>\n    </div>\n  </div>\n  <div align=\"end\" mat-dialog-actions>\n    <button\n      (click)=\"closeDialog()\"\n      type=\"button\"\n      color=\"warn\"\n      mat-stroked-button\n      [disabled]=\"dialogRef.disableClose\"\n    >\n      Cancel</button\n    ><button\n      [disabled]=\"!createUserForm.valid || rolesList.length === 0\"\n      color=\"primary\"\n      mat-flat-button\n    >\n      Create\n    </button>\n  </div>\n</form>\n", styles: [".forms-field{width:100%;margin-bottom:1rem}.error-display{margin:1rem 0;background-color:#ffab1098;padding:.5rem;border-radius:.25rem}.error-display h5{margin:0;font-size:16px}.select-role{display:grid;grid-template-columns:auto .15fr;grid-gap:.5rem;gap:.5rem;margin-bottom:1rem}.select-role button{height:59.5px}.roles-list{display:grid;grid-template-columns:auto .1fr;grid-gap:.5rem;gap:.5rem;margin-bottom:1rem}.roles-list .role-title{border-radius:.25rem;background-color:#82c7ff44;padding:1rem}.roles-list .role-title h3{margin:0}\n"], components: [{ type: i4.MatFormField, selector: "mat-form-field", inputs: ["color", "appearance", "hideRequiredMarker", "hintLabel", "floatLabel"], exportAs: ["matFormField"] }, { type: i3.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { type: i4$1.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { type: i5$1.MatSelect, selector: "mat-select", inputs: ["disabled", "disableRipple", "tabIndex"], exportAs: ["matSelect"] }, { type: i6.MatOption, selector: "mat-option", exportAs: ["matOption"] }], directives: [{ type: i1$1.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { type: i2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i1$1.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }, { type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.MatLabel, selector: "mat-label" }, { type: i10.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i4.MatHint, selector: "mat-hint", inputs: ["align", "id"] }, { type: i4.MatSuffix, selector: "[matSuffix]" }, { type: i8.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1$1.MatDialogActions, selector: "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: CreateUserComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-create-user', template: "<h2 mat-dialog-title>Create User</h2>\n<form\n  [formGroup]=\"createUserForm\"\n  (ngSubmit)=\"createUser(createUserForm.value)\"\n>\n  <div mat-dialog-content>\n    <div class=\"error-display\" *ngIf=\"errorMessage\">\n      <h5>{{ errorMessage }}</h5>\n    </div>\n    <mat-form-field class=\"forms-field\" appearance=\"fill\">\n      <mat-label>Name</mat-label>\n      <input matInput formControlName=\"name\" name=\"name\" required />\n      <mat-hint>Put your name</mat-hint>\n    </mat-form-field>\n    <mat-form-field class=\"forms-field\" appearance=\"fill\">\n      <mat-label>Description</mat-label>\n      <input\n        matInput\n        formControlName=\"description\"\n        name=\"description\"\n        required\n      />\n      <mat-hint>Breve user description</mat-hint>\n    </mat-form-field>\n    <mat-form-field class=\"forms-field\" appearance=\"fill\">\n      <mat-label>Username</mat-label>\n      <input\n        matInput\n        placeholder=\"admin01\"\n        formControlName=\"username\"\n        name=\"username\"\n        required\n      />\n      <mat-hint>Your username</mat-hint>\n    </mat-form-field>\n    <mat-form-field appearance=\"fill\" class=\"forms-field\">\n      <mat-label>Password</mat-label>\n      <input\n        formControlName=\"password\"\n        name=\"password\"\n        matInput\n        [type]=\"hidePassword ? 'password' : 'text'\"\n        required\n      />\n      <button\n        type=\"button\"\n        mat-icon-button\n        matSuffix\n        (click)=\"hidePassword = !hidePassword\"\n        [attr.aria-label]=\"'hidePassword password'\"\n        [attr.aria-pressed]=\"hidePassword\"\n      >\n        <mat-icon>{{\n          hidePassword ? \"visibility_off\" : \"visibility\"\n        }}</mat-icon>\n      </button>\n      <mat-hint>Put your password</mat-hint>\n    </mat-form-field>\n    <div class=\"select-role\">\n      <mat-form-field class=\"forms-field\" appearance=\"fill\">\n        <mat-label>Select A Role</mat-label>\n        <mat-select name=\"role\" formControlName=\"role\">\n          <mat-option [value]=\"role\" *ngFor=\"let role of roles\">{{\n            role.identifier\n          }}</mat-option>\n        </mat-select>\n        <mat-hint>Select a role and add it</mat-hint>\n      </mat-form-field>\n      <button type=\"button\" (click)=\"addRoleToList()\" mat-stroked-button>\n        +\n      </button>\n    </div>\n    <div *ngFor=\"let role of rolesList\" class=\"roles-list\">\n      <div class=\"role-title\">\n        <h3>{{ role.identifier }}</h3>\n      </div>\n      <button\n        (click)=\"removeRoleToList(role)\"\n        color=\"warn\"\n        type=\"button\"\n        mat-stroked-button\n      >\n        -\n      </button>\n    </div>\n  </div>\n  <div align=\"end\" mat-dialog-actions>\n    <button\n      (click)=\"closeDialog()\"\n      type=\"button\"\n      color=\"warn\"\n      mat-stroked-button\n      [disabled]=\"dialogRef.disableClose\"\n    >\n      Cancel</button\n    ><button\n      [disabled]=\"!createUserForm.valid || rolesList.length === 0\"\n      color=\"primary\"\n      mat-flat-button\n    >\n      Create\n    </button>\n  </div>\n</form>\n", styles: [".forms-field{width:100%;margin-bottom:1rem}.error-display{margin:1rem 0;background-color:#ffab1098;padding:.5rem;border-radius:.25rem}.error-display h5{margin:0;font-size:16px}.select-role{display:grid;grid-template-columns:auto .15fr;grid-gap:.5rem;gap:.5rem;margin-bottom:1rem}.select-role button{height:59.5px}.roles-list{display:grid;grid-template-columns:auto .1fr;grid-gap:.5rem;gap:.5rem;margin-bottom:1rem}.roles-list .role-title{border-radius:.25rem;background-color:#82c7ff44;padding:1rem}.roles-list .role-title h3{margin:0}\n"] }]
        }], ctorParameters: function () { return [{ type: i1$1.MatDialogRef }, { type: i2.FormBuilder }, { type: NodebootOauth2StarterService }]; } });

class AddUserRolesComponent {
    constructor(dialogRef, formBuilder, nbService, user) {
        this.dialogRef = dialogRef;
        this.formBuilder = formBuilder;
        this.nbService = nbService;
        this.user = user;
        this.roles = [];
        this.rolesList = [];
        this.nbService.getRolesBasic().subscribe({
            error: (err) => {
                if (err.error) {
                    this.errorMessage = err.error.message;
                }
                else {
                    this.errorMessage = 'Unknown Error';
                }
                this.roles = [];
            },
            next: (res) => {
                const availableRoles = res.content?.flatMap((c) => {
                    const roleExist = user.roles.findIndex((r) => c.id == r.id);
                    if (roleExist === -1) {
                        return c;
                    }
                    this.rolesList.push(c);
                    return [];
                });
                this.roles = availableRoles || [];
            },
        });
        this.addRolesForm = this.formBuilder.group({
            role: this.formBuilder.control(''),
        });
    }
    ngOnInit() { }
    addRoleToList() {
        const roleValue = this.addRolesForm.get('role')?.value;
        if (!roleValue) {
            return;
        }
        const indexOfRole = this.roles.indexOf(roleValue);
        this.roles.splice(indexOfRole, 1);
        this.rolesList.push(roleValue);
        this.addRolesForm.get('role')?.setValue('');
    }
    removeRoleToList(role) {
        const roleValue = role;
        const indexOfRole = this.roles.indexOf(roleValue);
        this.rolesList.splice(indexOfRole, 1);
        this.roles.push(roleValue);
    }
    closeDialog() {
        this.dialogRef.close();
    }
    updateRoles() {
        const rolesListToSend = this.rolesList.flatMap((rl) => {
            const roleExist = this.user.roles.findIndex((r) => rl.id == r.id);
            if (roleExist === -1) {
                return rl;
            }
            return [];
        });
        if (rolesListToSend.length === 0) {
            return this.dialogRef.close(false);
        }
        this.nbService.updateUserRoles(this.user.id, rolesListToSend).subscribe({
            error: (err) => {
                if (err.error) {
                    this.errorMessage = err.error.message;
                }
                else {
                    this.errorMessage = 'Unknown Error';
                }
                this.roles = [];
            },
            next: () => {
                this.dialogRef.close(true);
            },
        });
    }
}
AddUserRolesComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: AddUserRolesComponent, deps: [{ token: i1$1.MatDialogRef }, { token: i2.FormBuilder }, { token: NodebootOauth2StarterService }, { token: MAT_DIALOG_DATA }], target: i0.ɵɵFactoryTarget.Component });
AddUserRolesComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: AddUserRolesComponent, selector: "lib-add-user-roles", ngImport: i0, template: "<h2 mat-dialog-title>Modify roles of {{ user.name }}</h2>\n<form [formGroup]=\"addRolesForm\" (ngSubmit)=\"updateRoles()\">\n  <div mat-dialog-content>\n    <div class=\"error-display\" *ngIf=\"errorMessage\">\n      <h5>{{ errorMessage }}</h5>\n    </div>\n    <div class=\"select-role\">\n      <mat-form-field class=\"forms-field\" appearance=\"fill\">\n        <mat-label>Select A Role</mat-label>\n        <mat-select name=\"role\" formControlName=\"role\">\n          <mat-option [value]=\"role\" *ngFor=\"let role of roles\">{{\n            role.identifier\n          }}</mat-option>\n        </mat-select>\n        <mat-hint>Select a role and add it</mat-hint>\n      </mat-form-field>\n      <button type=\"button\" (click)=\"addRoleToList()\" mat-stroked-button>\n        +\n      </button>\n    </div>\n    <div *ngFor=\"let role of rolesList\" class=\"roles-list\">\n      <div class=\"role-title\">\n        <h3>{{ role.identifier }}</h3>\n      </div>\n      <button\n        (click)=\"removeRoleToList(role)\"\n        color=\"warn\"\n        type=\"button\"\n        mat-stroked-button\n      >\n        -\n      </button>\n    </div>\n  </div>\n  <div align=\"end\" mat-dialog-actions>\n    <button\n      (click)=\"closeDialog()\"\n      type=\"button\"\n      color=\"warn\"\n      mat-stroked-button\n      [disabled]=\"dialogRef.disableClose\"\n    >\n      Cancel</button\n    ><button\n      [disabled]=\"!addRolesForm.valid || rolesList.length === 0\"\n      color=\"primary\"\n      mat-flat-button\n    >\n      Update\n    </button>\n  </div>\n</form>\n", styles: [".forms-field{width:100%;margin-bottom:1rem}.error-display{margin:1rem 0;background-color:#ffab1098;padding:.5rem;border-radius:.25rem}.error-display h5{margin:0;font-size:16px}.select-role{display:grid;grid-template-columns:auto .15fr;grid-gap:.5rem;gap:.5rem;margin-bottom:1rem}.select-role button{height:59.5px}.roles-list{display:grid;grid-template-columns:auto .1fr;grid-gap:.5rem;gap:.5rem;margin-bottom:1rem}.roles-list .role-title{border-radius:.25rem;background-color:#82c7ff44;padding:1rem}.roles-list .role-title h3{margin:0}\n"], components: [{ type: i4.MatFormField, selector: "mat-form-field", inputs: ["color", "appearance", "hideRequiredMarker", "hintLabel", "floatLabel"], exportAs: ["matFormField"] }, { type: i5$1.MatSelect, selector: "mat-select", inputs: ["disabled", "disableRipple", "tabIndex"], exportAs: ["matSelect"] }, { type: i6.MatOption, selector: "mat-option", exportAs: ["matOption"] }, { type: i3.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }], directives: [{ type: i1$1.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { type: i2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i1$1.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }, { type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.MatLabel, selector: "mat-label" }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { type: i8.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4.MatHint, selector: "mat-hint", inputs: ["align", "id"] }, { type: i1$1.MatDialogActions, selector: "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: AddUserRolesComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-add-user-roles', template: "<h2 mat-dialog-title>Modify roles of {{ user.name }}</h2>\n<form [formGroup]=\"addRolesForm\" (ngSubmit)=\"updateRoles()\">\n  <div mat-dialog-content>\n    <div class=\"error-display\" *ngIf=\"errorMessage\">\n      <h5>{{ errorMessage }}</h5>\n    </div>\n    <div class=\"select-role\">\n      <mat-form-field class=\"forms-field\" appearance=\"fill\">\n        <mat-label>Select A Role</mat-label>\n        <mat-select name=\"role\" formControlName=\"role\">\n          <mat-option [value]=\"role\" *ngFor=\"let role of roles\">{{\n            role.identifier\n          }}</mat-option>\n        </mat-select>\n        <mat-hint>Select a role and add it</mat-hint>\n      </mat-form-field>\n      <button type=\"button\" (click)=\"addRoleToList()\" mat-stroked-button>\n        +\n      </button>\n    </div>\n    <div *ngFor=\"let role of rolesList\" class=\"roles-list\">\n      <div class=\"role-title\">\n        <h3>{{ role.identifier }}</h3>\n      </div>\n      <button\n        (click)=\"removeRoleToList(role)\"\n        color=\"warn\"\n        type=\"button\"\n        mat-stroked-button\n      >\n        -\n      </button>\n    </div>\n  </div>\n  <div align=\"end\" mat-dialog-actions>\n    <button\n      (click)=\"closeDialog()\"\n      type=\"button\"\n      color=\"warn\"\n      mat-stroked-button\n      [disabled]=\"dialogRef.disableClose\"\n    >\n      Cancel</button\n    ><button\n      [disabled]=\"!addRolesForm.valid || rolesList.length === 0\"\n      color=\"primary\"\n      mat-flat-button\n    >\n      Update\n    </button>\n  </div>\n</form>\n", styles: [".forms-field{width:100%;margin-bottom:1rem}.error-display{margin:1rem 0;background-color:#ffab1098;padding:.5rem;border-radius:.25rem}.error-display h5{margin:0;font-size:16px}.select-role{display:grid;grid-template-columns:auto .15fr;grid-gap:.5rem;gap:.5rem;margin-bottom:1rem}.select-role button{height:59.5px}.roles-list{display:grid;grid-template-columns:auto .1fr;grid-gap:.5rem;gap:.5rem;margin-bottom:1rem}.roles-list .role-title{border-radius:.25rem;background-color:#82c7ff44;padding:1rem}.roles-list .role-title h3{margin:0}\n"] }]
        }], ctorParameters: function () { return [{ type: i1$1.MatDialogRef }, { type: i2.FormBuilder }, { type: NodebootOauth2StarterService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_DIALOG_DATA]
                }] }]; } });

class OauthStarterUsersComponent {
    constructor(nbService, dialog) {
        this.nbService = nbService;
        this.dialog = dialog;
        this.displayedColumns = ['id', 'name', 'username', 'roles', 'edit'];
        this.resultsLength = 0;
        this.isLoadingResults = true;
        this.reload = new BehaviorSubject(0);
    }
    ngOnDestroy() {
        this.userDataSubscription?.unsubscribe();
        this.sort.sortChange.complete();
    }
    ngAfterViewInit() {
        this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
        this.userDataSubscription = merge(this.sort.sortChange, this.paginator.page, this.reload)
            .pipe(startWith({}), switchMap(() => {
            this.errorMessage = undefined;
            this.isLoadingResults = true;
            return this.nbService.getUsers(this.paginator.pageIndex, this.sort.direction).pipe(catchError((err) => {
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
            this.users = data;
        });
    }
    // ngOnInit(): void {}
    openCreateUserDialog() {
        const createUserDialogRef = this.dialog.open(CreateUserComponent, {
            width: '600px',
            maxHeight: '70vh',
        });
        createUserDialogRef
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
    openViewRolesDialog(user) {
        this.dialog.open(ViewUserRolesComponent, {
            width: '600px',
            maxHeight: '70vh',
            data: user,
        });
    }
    openDialogDeleteUser(user) {
        const updateRolesDialogRef = this.dialog.open(DeleteUserComponent, {
            width: '600px',
            maxHeight: '70vh',
            data: user,
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
    openUpdateRolesDialog(user) {
        const updateRolesDialogRef = this.dialog.open(AddUserRolesComponent, {
            width: '600px',
            maxHeight: '70vh',
            data: user,
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
    openUpdateUserDialog(user) {
        const updateUserDialogRef = this.dialog.open(UpdateUserComponent, {
            width: '600px',
            maxHeight: '70vh',
            data: user,
        });
        updateUserDialogRef
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
OauthStarterUsersComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: OauthStarterUsersComponent, deps: [{ token: NodebootOauth2StarterService }, { token: i1$1.MatDialog }], target: i0.ɵɵFactoryTarget.Component });
OauthStarterUsersComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: OauthStarterUsersComponent, selector: "lib-oauth-starter-users", viewQueries: [{ propertyName: "paginator", first: true, predicate: MatPaginator, descendants: true }, { propertyName: "sort", first: true, predicate: MatSort, descendants: true }], ngImport: i0, template: "<div class=\"user-container\">\n  <div class=\"users-head\">\n    <h1 class=\"user-title\">Users</h1>\n    <span class=\"separator\"></span>\n    <button (click)=\"openCreateUserDialog()\" color=\"accent\" mat-flat-button>\n      Add User\n    </button>\n  </div>\n  <div class=\"user-body\">\n    <div class=\"container-table mat-elevation-z8\">\n      <div class=\"loading-shade\" *ngIf=\"isLoadingResults\">\n        <mat-spinner *ngIf=\"isLoadingResults\"></mat-spinner>\n      </div>\n\n      <div class=\"example-table-container\">\n        <table\n          mat-table\n          [dataSource]=\"users\"\n          class=\"user-table\"\n          matSort\n          matSortActive=\"id\"\n          matSortDisableClear\n          matSortDirection=\"asc\"\n        >\n          <ng-container matColumnDef=\"id\">\n            <th mat-sort-header mat-header-cell *matHeaderCellDef>id</th>\n            <td mat-cell *matCellDef=\"let row\">{{ row.id }}</td>\n          </ng-container>\n\n          <ng-container matColumnDef=\"name\">\n            <th mat-header-cell *matHeaderCellDef>Name</th>\n            <td mat-cell *matCellDef=\"let row\">{{ row.name }}</td>\n          </ng-container>\n\n          <ng-container matColumnDef=\"username\">\n            <th mat-header-cell *matHeaderCellDef>Username</th>\n            <td mat-cell *matCellDef=\"let row\">{{ row.username }}</td>\n          </ng-container>\n\n          <ng-container matColumnDef=\"roles\">\n            <th mat-header-cell *matHeaderCellDef>Roles</th>\n            <td class=\"roles-column\" mat-cell *matCellDef=\"let row\">\n              <button (click)=\"openViewRolesDialog(row)\" mat-stroked-button>\n                View Roles\n              </button>\n              <button\n                [disabled]=\"row.username === 'admin'\"\n                (click)=\"openUpdateRolesDialog(row)\"\n                mat-stroked-button\n              >\n                Update Roles\n              </button>\n            </td>\n          </ng-container>\n\n          <ng-container matColumnDef=\"edit\">\n            <th mat-header-cell *matHeaderCellDef></th>\n            <td class=\"actions-column\" mat-cell *matCellDef=\"let row\">\n              <button\n                color=\"primary\"\n                [disabled]=\"row.username === 'admin'\"\n                mat-stroked-button\n                (click)=\"openUpdateUserDialog(row)\"\n              >\n                Edit User\n              </button>\n              <button\n                color=\"warn\"\n                [disabled]=\"row.username === 'admin'\"\n                mat-stroked-button\n                (click)=\"openDialogDeleteUser(row)\"\n              >\n                Delete User\n              </button>\n            </td>\n          </ng-container>\n\n          <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n          <tr mat-row *matRowDef=\"let row; columns: displayedColumns\"></tr>\n        </table>\n      </div>\n\n      <mat-paginator\n        [length]=\"resultsLength\"\n        [pageSize]=\"20\"\n        aria-label=\"Select page of GitHub search results\"\n      ></mat-paginator>\n    </div>\n  </div>\n</div>\n", styles: [".user-container .users-head{display:flex;margin-bottom:2rem}.user-container .users-head .separator{flex:1 0}.user-container .users-head .user-title{margin:0;font-size:32px}.user-container table{width:100%}.user-container table th,.user-container table td{width:20%}.user-container table .roles-column button:last-child{margin-left:.5rem}.user-container table .actions-column{text-align:end}.user-container table .actions-column button:last-child{margin-left:.5rem}.user-container .container-table{position:relative}.user-container .loading-shade{position:absolute;top:0;left:0;bottom:56px;right:0;background:rgba(0,0,0,.15);z-index:1;display:flex;align-items:center;justify-content:center}\n"], components: [{ type: i3.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { type: i4$2.MatSpinner, selector: "mat-spinner", inputs: ["color"] }, { type: i5$2.MatTable, selector: "mat-table, table[mat-table]", exportAs: ["matTable"] }, { type: i6$1.MatSortHeader, selector: "[mat-sort-header]", inputs: ["disabled", "mat-sort-header", "arrowPosition", "start", "sortActionDescription", "disableClear"], exportAs: ["matSortHeader"] }, { type: i5$2.MatHeaderRow, selector: "mat-header-row, tr[mat-header-row]", exportAs: ["matHeaderRow"] }, { type: i5$2.MatRow, selector: "mat-row, tr[mat-row]", exportAs: ["matRow"] }, { type: i7.MatPaginator, selector: "mat-paginator", inputs: ["disabled"], exportAs: ["matPaginator"] }], directives: [{ type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6$1.MatSort, selector: "[matSort]", inputs: ["matSortDisabled", "matSortActive", "matSortStart", "matSortDirection", "matSortDisableClear"], outputs: ["matSortChange"], exportAs: ["matSort"] }, { type: i5$2.MatColumnDef, selector: "[matColumnDef]", inputs: ["sticky", "matColumnDef"] }, { type: i5$2.MatHeaderCellDef, selector: "[matHeaderCellDef]" }, { type: i5$2.MatHeaderCell, selector: "mat-header-cell, th[mat-header-cell]" }, { type: i5$2.MatCellDef, selector: "[matCellDef]" }, { type: i5$2.MatCell, selector: "mat-cell, td[mat-cell]" }, { type: i5$2.MatHeaderRowDef, selector: "[matHeaderRowDef]", inputs: ["matHeaderRowDef", "matHeaderRowDefSticky"] }, { type: i5$2.MatRowDef, selector: "[matRowDef]", inputs: ["matRowDefColumns", "matRowDefWhen"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: OauthStarterUsersComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-oauth-starter-users', template: "<div class=\"user-container\">\n  <div class=\"users-head\">\n    <h1 class=\"user-title\">Users</h1>\n    <span class=\"separator\"></span>\n    <button (click)=\"openCreateUserDialog()\" color=\"accent\" mat-flat-button>\n      Add User\n    </button>\n  </div>\n  <div class=\"user-body\">\n    <div class=\"container-table mat-elevation-z8\">\n      <div class=\"loading-shade\" *ngIf=\"isLoadingResults\">\n        <mat-spinner *ngIf=\"isLoadingResults\"></mat-spinner>\n      </div>\n\n      <div class=\"example-table-container\">\n        <table\n          mat-table\n          [dataSource]=\"users\"\n          class=\"user-table\"\n          matSort\n          matSortActive=\"id\"\n          matSortDisableClear\n          matSortDirection=\"asc\"\n        >\n          <ng-container matColumnDef=\"id\">\n            <th mat-sort-header mat-header-cell *matHeaderCellDef>id</th>\n            <td mat-cell *matCellDef=\"let row\">{{ row.id }}</td>\n          </ng-container>\n\n          <ng-container matColumnDef=\"name\">\n            <th mat-header-cell *matHeaderCellDef>Name</th>\n            <td mat-cell *matCellDef=\"let row\">{{ row.name }}</td>\n          </ng-container>\n\n          <ng-container matColumnDef=\"username\">\n            <th mat-header-cell *matHeaderCellDef>Username</th>\n            <td mat-cell *matCellDef=\"let row\">{{ row.username }}</td>\n          </ng-container>\n\n          <ng-container matColumnDef=\"roles\">\n            <th mat-header-cell *matHeaderCellDef>Roles</th>\n            <td class=\"roles-column\" mat-cell *matCellDef=\"let row\">\n              <button (click)=\"openViewRolesDialog(row)\" mat-stroked-button>\n                View Roles\n              </button>\n              <button\n                [disabled]=\"row.username === 'admin'\"\n                (click)=\"openUpdateRolesDialog(row)\"\n                mat-stroked-button\n              >\n                Update Roles\n              </button>\n            </td>\n          </ng-container>\n\n          <ng-container matColumnDef=\"edit\">\n            <th mat-header-cell *matHeaderCellDef></th>\n            <td class=\"actions-column\" mat-cell *matCellDef=\"let row\">\n              <button\n                color=\"primary\"\n                [disabled]=\"row.username === 'admin'\"\n                mat-stroked-button\n                (click)=\"openUpdateUserDialog(row)\"\n              >\n                Edit User\n              </button>\n              <button\n                color=\"warn\"\n                [disabled]=\"row.username === 'admin'\"\n                mat-stroked-button\n                (click)=\"openDialogDeleteUser(row)\"\n              >\n                Delete User\n              </button>\n            </td>\n          </ng-container>\n\n          <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n          <tr mat-row *matRowDef=\"let row; columns: displayedColumns\"></tr>\n        </table>\n      </div>\n\n      <mat-paginator\n        [length]=\"resultsLength\"\n        [pageSize]=\"20\"\n        aria-label=\"Select page of GitHub search results\"\n      ></mat-paginator>\n    </div>\n  </div>\n</div>\n", styles: [".user-container .users-head{display:flex;margin-bottom:2rem}.user-container .users-head .separator{flex:1 0}.user-container .users-head .user-title{margin:0;font-size:32px}.user-container table{width:100%}.user-container table th,.user-container table td{width:20%}.user-container table .roles-column button:last-child{margin-left:.5rem}.user-container table .actions-column{text-align:end}.user-container table .actions-column button:last-child{margin-left:.5rem}.user-container .container-table{position:relative}.user-container .loading-shade{position:absolute;top:0;left:0;bottom:56px;right:0;background:rgba(0,0,0,.15);z-index:1;display:flex;align-items:center;justify-content:center}\n"] }]
        }], ctorParameters: function () { return [{ type: NodebootOauth2StarterService }, { type: i1$1.MatDialog }]; }, propDecorators: { paginator: [{
                type: ViewChild,
                args: [MatPaginator]
            }], sort: [{
                type: ViewChild,
                args: [MatSort]
            }] } });

class ChangePasswordComponent {
    constructor(formBuilder, dialogRef, nbService, user) {
        this.formBuilder = formBuilder;
        this.dialogRef = dialogRef;
        this.nbService = nbService;
        this.user = user;
        this.hideNewPassword = true;
        this.hideOldPassword = true;
        this.changePasswordForm = this.formBuilder.group({
            oldPassword: this.formBuilder.control('', Validators.compose([
                Validators.required,
                Validators.pattern(/^[a-zA-Z0-9\d@$!%*#?&]*[A-Z]+[a-zA-Z0-9\d@$!%*#?&]*$/),
                Validators.pattern(/^[a-zA-Z0-9\d@$!%*#?&]*[0-9]+[a-zA-Z0-9\d@$!%*#?&]*$/),
                Validators.pattern(/^[a-zA-Z0-9\d@$!%*#?&]*[a-z]+[a-zA-Z0-9\d@$!%*#?&]*$/),
                Validators.minLength(6),
            ])),
            newPassword: this.formBuilder.control('', Validators.compose([
                Validators.required,
                Validators.pattern(/^[a-zA-Z0-9\d@$!%*#?&]*[A-Z]+[a-zA-Z0-9\d@$!%*#?&]*$/),
                Validators.pattern(/^[a-zA-Z0-9\d@$!%*#?&]*[0-9]+[a-zA-Z0-9\d@$!%*#?&]*$/),
                Validators.pattern(/^[a-zA-Z0-9\d@$!%*#?&]*[a-z]+[a-zA-Z0-9\d@$!%*#?&]*$/),
                Validators.minLength(6),
            ])),
        });
    }
    ngOnInit() { }
    closeDialog() {
        this.dialogRef.close();
    }
    changePassword(updatePasswordData) {
        this.nbService
            .updatePassword(this.user.id, updatePasswordData.newPassword, updatePasswordData.oldPassword)
            .subscribe({
            error: (err) => {
                this.dialogRef.disableClose = false;
                if (err.error) {
                    this.errorMessage = err.error.message;
                }
                else {
                    this.errorMessage = 'Unknown Error';
                }
            },
            next: () => {
                this.dialogRef.close(true);
            },
        });
    }
}
ChangePasswordComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ChangePasswordComponent, deps: [{ token: i2.FormBuilder }, { token: i1$1.MatDialogRef }, { token: NodebootOauth2StarterService }, { token: MAT_DIALOG_DATA }], target: i0.ɵɵFactoryTarget.Component });
ChangePasswordComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: ChangePasswordComponent, selector: "lib-change-password", ngImport: i0, template: "<h2 mat-dialog-title>Change Password</h2>\n<form\n  [formGroup]=\"changePasswordForm\"\n  (ngSubmit)=\"changePassword(changePasswordForm.value)\"\n>\n  <div mat-dialog-content>\n    <div class=\"error-display\" *ngIf=\"errorMessage\">\n      <h5>{{ errorMessage }}</h5>\n    </div>\n    <mat-form-field appearance=\"fill\" class=\"forms-field\">\n      <mat-label>Old Password</mat-label>\n      <input\n        formControlName=\"oldPassword\"\n        name=\"oldPassword\"\n        matInput\n        [type]=\"hideOldPassword ? 'password' : 'text'\"\n        required\n      />\n      <button\n        type=\"button\"\n        mat-icon-button\n        matSuffix\n        (click)=\"hideOldPassword = !hideOldPassword\"\n        [attr.aria-label]=\"'hideOldPassword password'\"\n        [attr.aria-pressed]=\"hideOldPassword\"\n      >\n        <mat-icon>{{\n          hideOldPassword ? \"visibility_off\" : \"visibility\"\n        }}</mat-icon>\n      </button>\n      <mat-hint>Put your current password</mat-hint>\n    </mat-form-field>\n    <mat-form-field appearance=\"fill\" class=\"forms-field\">\n      <mat-label>New Password</mat-label>\n      <input\n        formControlName=\"newPassword\"\n        name=\"newPassword\"\n        matInput\n        [type]=\"hideNewPassword ? 'password' : 'text'\"\n        required\n      />\n      <button\n        type=\"button\"\n        mat-icon-button\n        matSuffix\n        (click)=\"hideNewPassword = !hideNewPassword\"\n        [attr.aria-label]=\"'hideOldPassword password'\"\n        [attr.aria-pressed]=\"hideNewPassword\"\n      >\n        <mat-icon>{{\n          hideNewPassword ? \"visibility_off\" : \"visibility\"\n        }}</mat-icon>\n      </button>\n      <mat-hint>Put your new password</mat-hint>\n    </mat-form-field>\n  </div>\n  <div align=\"end\" mat-dialog-actions>\n    <button\n      (click)=\"closeDialog()\"\n      type=\"button\"\n      color=\"warn\"\n      mat-stroked-button\n      [disabled]=\"dialogRef.disableClose\"\n    >\n      Cancel</button\n    ><button\n      [disabled]=\"!changePasswordForm.valid\"\n      color=\"primary\"\n      mat-flat-button\n    >\n      Update\n    </button>\n  </div>\n</form>\n", styles: [".forms-field{width:100%;margin-bottom:1rem}\n"], components: [{ type: i4.MatFormField, selector: "mat-form-field", inputs: ["color", "appearance", "hideRequiredMarker", "hintLabel", "floatLabel"], exportAs: ["matFormField"] }, { type: i3.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { type: i4$1.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }], directives: [{ type: i1$1.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { type: i2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i1$1.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }, { type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.MatLabel, selector: "mat-label" }, { type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i10.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i4.MatSuffix, selector: "[matSuffix]" }, { type: i4.MatHint, selector: "mat-hint", inputs: ["align", "id"] }, { type: i1$1.MatDialogActions, selector: "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ChangePasswordComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-change-password', template: "<h2 mat-dialog-title>Change Password</h2>\n<form\n  [formGroup]=\"changePasswordForm\"\n  (ngSubmit)=\"changePassword(changePasswordForm.value)\"\n>\n  <div mat-dialog-content>\n    <div class=\"error-display\" *ngIf=\"errorMessage\">\n      <h5>{{ errorMessage }}</h5>\n    </div>\n    <mat-form-field appearance=\"fill\" class=\"forms-field\">\n      <mat-label>Old Password</mat-label>\n      <input\n        formControlName=\"oldPassword\"\n        name=\"oldPassword\"\n        matInput\n        [type]=\"hideOldPassword ? 'password' : 'text'\"\n        required\n      />\n      <button\n        type=\"button\"\n        mat-icon-button\n        matSuffix\n        (click)=\"hideOldPassword = !hideOldPassword\"\n        [attr.aria-label]=\"'hideOldPassword password'\"\n        [attr.aria-pressed]=\"hideOldPassword\"\n      >\n        <mat-icon>{{\n          hideOldPassword ? \"visibility_off\" : \"visibility\"\n        }}</mat-icon>\n      </button>\n      <mat-hint>Put your current password</mat-hint>\n    </mat-form-field>\n    <mat-form-field appearance=\"fill\" class=\"forms-field\">\n      <mat-label>New Password</mat-label>\n      <input\n        formControlName=\"newPassword\"\n        name=\"newPassword\"\n        matInput\n        [type]=\"hideNewPassword ? 'password' : 'text'\"\n        required\n      />\n      <button\n        type=\"button\"\n        mat-icon-button\n        matSuffix\n        (click)=\"hideNewPassword = !hideNewPassword\"\n        [attr.aria-label]=\"'hideOldPassword password'\"\n        [attr.aria-pressed]=\"hideNewPassword\"\n      >\n        <mat-icon>{{\n          hideNewPassword ? \"visibility_off\" : \"visibility\"\n        }}</mat-icon>\n      </button>\n      <mat-hint>Put your new password</mat-hint>\n    </mat-form-field>\n  </div>\n  <div align=\"end\" mat-dialog-actions>\n    <button\n      (click)=\"closeDialog()\"\n      type=\"button\"\n      color=\"warn\"\n      mat-stroked-button\n      [disabled]=\"dialogRef.disableClose\"\n    >\n      Cancel</button\n    ><button\n      [disabled]=\"!changePasswordForm.valid\"\n      color=\"primary\"\n      mat-flat-button\n    >\n      Update\n    </button>\n  </div>\n</form>\n", styles: [".forms-field{width:100%;margin-bottom:1rem}\n"] }]
        }], ctorParameters: function () { return [{ type: i2.FormBuilder }, { type: i1$1.MatDialogRef }, { type: NodebootOauth2StarterService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_DIALOG_DATA]
                }] }]; } });

class OauthStarterUserProfileComponent {
    constructor(nbService, dialog) {
        this.nbService = nbService;
        this.dialog = dialog;
        this.nbService.getUserProfile().subscribe({
            next: (res) => {
                this.user = res.content;
            },
        });
    }
    ngOnInit() { }
    openChangePasswordDialog() {
        this.dialog.open(ChangePasswordComponent, {
            width: '600px',
            maxHeight: '70vh',
            data: this.user,
        });
    }
}
OauthStarterUserProfileComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: OauthStarterUserProfileComponent, deps: [{ token: NodebootOauth2StarterService }, { token: i1$1.MatDialog }], target: i0.ɵɵFactoryTarget.Component });
OauthStarterUserProfileComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: OauthStarterUserProfileComponent, selector: "lib-oauth-starter-user-profile", ngImport: i0, template: "<div>\n  <div class=\"profile-container\" *ngIf=\"user\">\n    <div class=\"header\">\n      <h1>{{ user.name }} Profile</h1>\n      <h4>#{{ user.id }}</h4>\n    </div>\n    <section>\n      <h3>Roles</h3>\n      <mat-accordion>\n        <mat-expansion-panel *ngFor=\"let role of user.roles\">\n          <mat-expansion-panel-header>\n            <mat-panel-title>\n              #{{ role.id }} | Role Name: {{ role.identifier }}\n            </mat-panel-title>\n          </mat-expansion-panel-header>\n          <mat-list role=\"list\">\n            <mat-list-item\n              *ngFor=\"let resource of role.resources\"\n              role=\"listitem\"\n              >{{ resource.applicationResourceName }} | Options:\n              {{ resource.allowed.join(\",\") }}</mat-list-item\n            >\n          </mat-list>\n        </mat-expansion-panel>\n      </mat-accordion>\n      <div class=\"actions\">\n        <button\n          (click)=\"openChangePasswordDialog()\"\n          type=\"button\"\n          mat-flat-button\n          color=\"accent\"\n        >\n          Change Password\n        </button>\n      </div>\n    </section>\n  </div>\n</div>\n", styles: [".header{display:flex;align-items:baseline;gap:.5rem;flex-wrap:wrap}.header h1{margin:0;font-size:32px}.header h4{margin:0;color:gray}section{display:grid}section .roles-list{color:#000}section .actions{margin-top:2rem}.profile-container ::ng-deep .mat-list-base .mat-list-item .mat-list-item-content{color:#000}\n"], components: [{ type: i2$1.MatExpansionPanel, selector: "mat-expansion-panel", inputs: ["disabled", "expanded", "hideToggle", "togglePosition"], outputs: ["opened", "closed", "expandedChange", "afterExpand", "afterCollapse"], exportAs: ["matExpansionPanel"] }, { type: i2$1.MatExpansionPanelHeader, selector: "mat-expansion-panel-header", inputs: ["tabIndex", "expandedHeight", "collapsedHeight"] }, { type: i3$1.MatList, selector: "mat-list, mat-action-list", inputs: ["disableRipple", "disabled"], exportAs: ["matList"] }, { type: i3$1.MatListItem, selector: "mat-list-item, a[mat-list-item], button[mat-list-item]", inputs: ["disableRipple", "disabled"], exportAs: ["matListItem"] }, { type: i3.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }], directives: [{ type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2$1.MatAccordion, selector: "mat-accordion", inputs: ["multi", "hideToggle", "displayMode", "togglePosition"], exportAs: ["matAccordion"] }, { type: i8.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2$1.MatExpansionPanelTitle, selector: "mat-panel-title" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: OauthStarterUserProfileComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-oauth-starter-user-profile', template: "<div>\n  <div class=\"profile-container\" *ngIf=\"user\">\n    <div class=\"header\">\n      <h1>{{ user.name }} Profile</h1>\n      <h4>#{{ user.id }}</h4>\n    </div>\n    <section>\n      <h3>Roles</h3>\n      <mat-accordion>\n        <mat-expansion-panel *ngFor=\"let role of user.roles\">\n          <mat-expansion-panel-header>\n            <mat-panel-title>\n              #{{ role.id }} | Role Name: {{ role.identifier }}\n            </mat-panel-title>\n          </mat-expansion-panel-header>\n          <mat-list role=\"list\">\n            <mat-list-item\n              *ngFor=\"let resource of role.resources\"\n              role=\"listitem\"\n              >{{ resource.applicationResourceName }} | Options:\n              {{ resource.allowed.join(\",\") }}</mat-list-item\n            >\n          </mat-list>\n        </mat-expansion-panel>\n      </mat-accordion>\n      <div class=\"actions\">\n        <button\n          (click)=\"openChangePasswordDialog()\"\n          type=\"button\"\n          mat-flat-button\n          color=\"accent\"\n        >\n          Change Password\n        </button>\n      </div>\n    </section>\n  </div>\n</div>\n", styles: [".header{display:flex;align-items:baseline;gap:.5rem;flex-wrap:wrap}.header h1{margin:0;font-size:32px}.header h4{margin:0;color:gray}section{display:grid}section .roles-list{color:#000}section .actions{margin-top:2rem}.profile-container ::ng-deep .mat-list-base .mat-list-item .mat-list-item-content{color:#000}\n"] }]
        }], ctorParameters: function () { return [{ type: NodebootOauth2StarterService }, { type: i1$1.MatDialog }]; } });

class CreateRoleComponent {
    constructor(formBuilder, nbService, dialogRef) {
        this.formBuilder = formBuilder;
        this.nbService = nbService;
        this.dialogRef = dialogRef;
        this.options = [];
        this.allowedShowList = [];
        this.allowedObject = {};
        this.objectKeys = Object.keys;
        this.nbService.getResourcesBasic().subscribe({
            error: (err) => {
                if (err.error) {
                    this.errorMessage = err.error.message;
                }
                else {
                    this.errorMessage = 'Unknown Error';
                }
                this.options = [];
            },
            next: (res) => {
                this.options = res.content || [];
            },
        });
        this.createRoleForm = this.formBuilder.group({
            identifier: this.formBuilder.control('', Validators.compose([
                Validators.required,
                Validators.pattern(/^[a-zA-Z0-9_\.\-\/]+$/),
                Validators.minLength(4),
                Validators.maxLength(20),
            ])),
            resource: this.formBuilder.control(''),
            selected: this.formBuilder.control(''),
        });
        this.resourceSubscription = this.createRoleForm
            .get('resource')
            ?.valueChanges.subscribe({
            next: (value) => {
                this.allowedShowList =
                    this.options.find((o) => o.applicationResourceName === value)
                        ?.allowed || [];
                this.createRoleForm
                    .get('selected')
                    ?.setValue(this.allowedObject[this.createRoleForm.get('resource')?.value] ||
                    []);
            },
        });
    }
    ngOnDestroy() {
        this.resourceSubscription?.unsubscribe();
    }
    ngOnInit() { }
    createRole(roleBody) {
        this.nbService
            .createRole(roleBody.identifier, this.allowedObject)
            .subscribe({
            error: (err) => {
                this.dialogRef.disableClose = false;
                if (err.error) {
                    this.errorMessage = err.error.message;
                }
                else {
                    this.errorMessage = 'Unknown Error';
                }
            },
            next: () => {
                this.dialogRef.close(true);
            },
        });
    }
    selectedChange(selected, value) {
        const currentAllowedObject = this.allowedObject[this.createRoleForm.get('resource')?.value];
        if (value.allowed === '*' &&
            selected &&
            this.createRoleForm.get('selected')?.value.length !==
                this.allowedShowList.length) {
            this.createRoleForm.get('selected')?.setValue(this.allowedShowList);
            this.allowedObject[this.createRoleForm.get('resource')?.value] = [
                this.allowedShowList[0],
            ];
        }
        else if (value.allowed === '*' && !selected) {
            const temporalAllowed = [...this.allowedShowList];
            temporalAllowed.shift();
            this.allowedObject[this.createRoleForm.get('resource')?.value] =
                temporalAllowed;
        }
        else if (selected) {
            if (!(currentAllowedObject && currentAllowedObject[0].allowed === '*')) {
                if (currentAllowedObject &&
                    currentAllowedObject.findIndex((ca) => ca.id === value.id)) {
                    currentAllowedObject.push(value);
                }
                else {
                    this.allowedObject[this.createRoleForm.get('resource')?.value] = [
                        value,
                    ];
                }
            }
        }
        else {
            const indexOfValue = this.createRoleForm
                .get('selected')
                ?.value.indexOf(value);
            if (currentAllowedObject && indexOfValue !== -1) {
                currentAllowedObject.splice(indexOfValue, 1);
            }
            if (currentAllowedObject && currentAllowedObject.length === 0) {
                delete this.allowedObject[this.createRoleForm.get('resource')?.value];
            }
        }
    }
    closeDialog() {
        this.dialogRef.close();
    }
}
CreateRoleComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: CreateRoleComponent, deps: [{ token: i2.FormBuilder }, { token: NodebootOauth2StarterService }, { token: i1$1.MatDialogRef }], target: i0.ɵɵFactoryTarget.Component });
CreateRoleComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: CreateRoleComponent, selector: "lib-create-role", ngImport: i0, template: "<h2 mat-dialog-title>Create Role</h2>\n<form\n  [formGroup]=\"createRoleForm\"\n  (ngSubmit)=\"createRole(createRoleForm.value)\"\n>\n  <div mat-dialog-content>\n    <div class=\"error-display\" *ngIf=\"errorMessage\">\n      <h5>{{ errorMessage }}</h5>\n    </div>\n    <mat-form-field class=\"forms-field\" appearance=\"fill\">\n      <mat-label>Identifier</mat-label>\n      <input\n        matInput\n        placeholder=\"admin01\"\n        formControlName=\"identifier\"\n        name=\"identifier\"\n        required\n      />\n      <mat-hint>A role identifier</mat-hint>\n    </mat-form-field>\n    <mat-form-field class=\"forms-field\" appearance=\"fill\">\n      <mat-label>Select a resource</mat-label>\n      <mat-select name=\"resource\" formControlName=\"resource\">\n        <mat-option\n          [value]=\"option.applicationResourceName\"\n          *ngFor=\"let option of options\"\n          >{{ option.applicationResourceName }}</mat-option\n        >\n      </mat-select>\n      <mat-hint>Select an application resource</mat-hint>\n    </mat-form-field>\n    <mat-selection-list #allowed formControlName=\"selected\">\n      <mat-list-option\n        (selectedChange)=\"selectedChange($event, allowedL)\"\n        [value]=\"allowedL\"\n        [disabled]=\"\n          allowedL.allowed !== '*' &&\n          createRoleForm.get('selected')?.value.length ===\n            allowedShowList.length\n            ? true\n            : false\n        \"\n        *ngFor=\"let allowedL of allowedShowList\"\n      >\n        {{ allowedL.allowed }}\n      </mat-list-option>\n    </mat-selection-list>\n  </div>\n  <div align=\"end\" mat-dialog-actions>\n    <button\n      (click)=\"closeDialog()\"\n      type=\"button\"\n      color=\"warn\"\n      mat-stroked-button\n      [disabled]=\"dialogRef.disableClose\"\n    >\n      Cancel</button\n    ><button\n      [disabled]=\"\n        !createRoleForm.valid || objectKeys(allowedObject).length === 0\n      \"\n      color=\"primary\"\n      mat-flat-button\n    >\n      Create\n    </button>\n  </div>\n</form>\n", styles: [".forms-field{width:100%}\n"], components: [{ type: i4.MatFormField, selector: "mat-form-field", inputs: ["color", "appearance", "hideRequiredMarker", "hintLabel", "floatLabel"], exportAs: ["matFormField"] }, { type: i5$1.MatSelect, selector: "mat-select", inputs: ["disabled", "disableRipple", "tabIndex"], exportAs: ["matSelect"] }, { type: i6.MatOption, selector: "mat-option", exportAs: ["matOption"] }, { type: i3$1.MatSelectionList, selector: "mat-selection-list", inputs: ["disableRipple", "tabIndex", "color", "compareWith", "disabled", "multiple"], outputs: ["selectionChange"], exportAs: ["matSelectionList"] }, { type: i3$1.MatListOption, selector: "mat-list-option", inputs: ["disableRipple", "checkboxPosition", "color", "value", "disabled", "selected"], outputs: ["selectedChange"], exportAs: ["matListOption"] }, { type: i3.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }], directives: [{ type: i1$1.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { type: i2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i1$1.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }, { type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.MatLabel, selector: "mat-label" }, { type: i10.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i4.MatHint, selector: "mat-hint", inputs: ["align", "id"] }, { type: i8.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1$1.MatDialogActions, selector: "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: CreateRoleComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-create-role', template: "<h2 mat-dialog-title>Create Role</h2>\n<form\n  [formGroup]=\"createRoleForm\"\n  (ngSubmit)=\"createRole(createRoleForm.value)\"\n>\n  <div mat-dialog-content>\n    <div class=\"error-display\" *ngIf=\"errorMessage\">\n      <h5>{{ errorMessage }}</h5>\n    </div>\n    <mat-form-field class=\"forms-field\" appearance=\"fill\">\n      <mat-label>Identifier</mat-label>\n      <input\n        matInput\n        placeholder=\"admin01\"\n        formControlName=\"identifier\"\n        name=\"identifier\"\n        required\n      />\n      <mat-hint>A role identifier</mat-hint>\n    </mat-form-field>\n    <mat-form-field class=\"forms-field\" appearance=\"fill\">\n      <mat-label>Select a resource</mat-label>\n      <mat-select name=\"resource\" formControlName=\"resource\">\n        <mat-option\n          [value]=\"option.applicationResourceName\"\n          *ngFor=\"let option of options\"\n          >{{ option.applicationResourceName }}</mat-option\n        >\n      </mat-select>\n      <mat-hint>Select an application resource</mat-hint>\n    </mat-form-field>\n    <mat-selection-list #allowed formControlName=\"selected\">\n      <mat-list-option\n        (selectedChange)=\"selectedChange($event, allowedL)\"\n        [value]=\"allowedL\"\n        [disabled]=\"\n          allowedL.allowed !== '*' &&\n          createRoleForm.get('selected')?.value.length ===\n            allowedShowList.length\n            ? true\n            : false\n        \"\n        *ngFor=\"let allowedL of allowedShowList\"\n      >\n        {{ allowedL.allowed }}\n      </mat-list-option>\n    </mat-selection-list>\n  </div>\n  <div align=\"end\" mat-dialog-actions>\n    <button\n      (click)=\"closeDialog()\"\n      type=\"button\"\n      color=\"warn\"\n      mat-stroked-button\n      [disabled]=\"dialogRef.disableClose\"\n    >\n      Cancel</button\n    ><button\n      [disabled]=\"\n        !createRoleForm.valid || objectKeys(allowedObject).length === 0\n      \"\n      color=\"primary\"\n      mat-flat-button\n    >\n      Create\n    </button>\n  </div>\n</form>\n", styles: [".forms-field{width:100%}\n"] }]
        }], ctorParameters: function () { return [{ type: i2.FormBuilder }, { type: NodebootOauth2StarterService }, { type: i1$1.MatDialogRef }]; } });

class DeleteRoleComponent {
    constructor(dialogRef, nbService, role) {
        this.dialogRef = dialogRef;
        this.nbService = nbService;
        this.role = role;
    }
    ngOnInit() { }
    delete() {
        this.dialogRef.disableClose = true;
        this.nbService.deleteRole(this.role.id).subscribe({
            error: (err) => {
                this.dialogRef.disableClose = false;
                if (err.error) {
                    this.errorMessage = err.error.message;
                }
                else {
                    this.errorMessage = 'Unknown Error';
                }
            },
            next: () => {
                this.dialogRef.close(true);
            },
        });
    }
    closeDialog() {
        this.dialogRef.close();
    }
}
DeleteRoleComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: DeleteRoleComponent, deps: [{ token: i1$1.MatDialogRef }, { token: NodebootOauth2StarterService }, { token: MAT_DIALOG_DATA }], target: i0.ɵɵFactoryTarget.Component });
DeleteRoleComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: DeleteRoleComponent, selector: "lib-delete-role", ngImport: i0, template: "<h2 mat-dialog-title>Delete Role {{ role.identifier }}</h2>\n<div mat-dialog-content>\n  <div class=\"error-display\" *ngIf=\"errorMessage\">\n    <h5>{{ errorMessage }}</h5>\n  </div>\n  <p>Are you sure?</p>\n</div>\n<div align=\"end\" mat-dialog-actions>\n  <button\n    (click)=\"closeDialog()\"\n    type=\"button\"\n    color=\"warn\"\n    mat-stroked-button\n    [disabled]=\"dialogRef.disableClose\"\n  >\n    Cancel</button\n  ><button\n    (click)=\"delete()\"\n    type=\"button\"\n    color=\"primary\"\n    mat-flat-button\n    [disabled]=\"dialogRef.disableClose\"\n  >\n    Delete\n  </button>\n</div>\n", styles: [""], components: [{ type: i3.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }], directives: [{ type: i1$1.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { type: i1$1.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }, { type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1$1.MatDialogActions, selector: "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: DeleteRoleComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-delete-role', template: "<h2 mat-dialog-title>Delete Role {{ role.identifier }}</h2>\n<div mat-dialog-content>\n  <div class=\"error-display\" *ngIf=\"errorMessage\">\n    <h5>{{ errorMessage }}</h5>\n  </div>\n  <p>Are you sure?</p>\n</div>\n<div align=\"end\" mat-dialog-actions>\n  <button\n    (click)=\"closeDialog()\"\n    type=\"button\"\n    color=\"warn\"\n    mat-stroked-button\n    [disabled]=\"dialogRef.disableClose\"\n  >\n    Cancel</button\n  ><button\n    (click)=\"delete()\"\n    type=\"button\"\n    color=\"primary\"\n    mat-flat-button\n    [disabled]=\"dialogRef.disableClose\"\n  >\n    Delete\n  </button>\n</div>\n", styles: [""] }]
        }], ctorParameters: function () { return [{ type: i1$1.MatDialogRef }, { type: NodebootOauth2StarterService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_DIALOG_DATA]
                }] }]; } });

class OptionsComponent {
    constructor(dialogRef, role, nbService, formBuilder) {
        this.dialogRef = dialogRef;
        this.role = role;
        this.nbService = nbService;
        this.formBuilder = formBuilder;
        this.options = [];
        this.allowedShowList = [];
        this.allowedObject = {};
        this.originalAllowedObject = {};
        this.objectKeys = Object.keys;
        this.convertToString = JSON.stringify;
        for (const option of this.role.resources) {
            this.allowedObject[option.applicationResourceName] = [...option.allowed];
            this.originalAllowedObject[option.applicationResourceName] = [
                ...option.allowed,
            ];
        }
        this.nbService.getResourcesBasic().subscribe({
            error: (err) => {
                if (err.error) {
                    this.errorMessage = err.error.message;
                }
                else {
                    this.errorMessage = 'Unknown Error';
                }
                this.options = [];
            },
            next: (res) => {
                this.options = res.content || [];
            },
        });
        this.optionsForm = this.formBuilder.group({
            resource: this.formBuilder.control(''),
            selected: this.formBuilder.control([]),
        });
        this.resourceSubscription = this.optionsForm
            .get('resource')
            ?.valueChanges.subscribe({
            next: (value) => {
                this.allowedShowList =
                    this.options.find((o) => o.applicationResourceName === value)
                        ?.allowed || [];
                this.optionsForm
                    .get('selected')
                    ?.setValue(this.allowedObject[this.optionsForm.get('resource')?.value]?.map((asl) => JSON.stringify(asl)) || []);
            },
        });
    }
    ngOnInit() { }
    ngOnDestroy() {
        this.resourceSubscription?.unsubscribe();
    }
    selectedChange(selected, value) {
        const parsedValue = JSON.parse(value);
        const currentAllowedObject = this.allowedObject[this.optionsForm.get('resource')?.value];
        if (parsedValue.allowed === '*' &&
            selected &&
            this.optionsForm.get('selected')?.value.length !==
                this.allowedShowList.length) {
            this.optionsForm
                .get('selected')
                ?.setValue(this.allowedShowList.map((asl) => JSON.stringify(asl)));
            this.allowedObject[this.optionsForm.get('resource')?.value] = [
                this.allowedShowList[0],
            ];
        }
        else if (parsedValue.allowed === '*' && !selected) {
            const temporalAllowed = [...this.allowedShowList];
            temporalAllowed.shift();
            this.allowedObject[this.optionsForm.get('resource')?.value] =
                temporalAllowed;
        }
        else if (selected) {
            if (!(currentAllowedObject && currentAllowedObject[0].allowed === '*')) {
                if (currentAllowedObject &&
                    currentAllowedObject.findIndex((ca) => ca.id === parsedValue.id) ===
                        -1) {
                    currentAllowedObject.push(parsedValue);
                }
                else {
                    this.allowedObject[this.optionsForm.get('resource')?.value] = [
                        parsedValue,
                    ];
                }
            }
        }
        else {
            const indexOfValue = this.optionsForm
                .get('selected')
                ?.value.indexOf(parsedValue);
            if (currentAllowedObject && indexOfValue !== -1) {
                currentAllowedObject.splice(indexOfValue, 1);
            }
            if (currentAllowedObject && currentAllowedObject.length === 0) {
                delete this.allowedObject[this.optionsForm.get('resource')?.value];
            }
        }
    }
    closeDialog() {
        this.dialogRef.close();
    }
    updateOptions() {
        this.nbService
            .updateRoleOptions(this.role.id, this.allowedObject, this.originalAllowedObject)
            .subscribe({
            error: (err) => {
                this.dialogRef.disableClose = false;
                if (err.error) {
                    this.errorMessage = err.error.message;
                }
                else {
                    this.errorMessage = 'Unknown Error';
                }
            },
            next: () => {
                this.dialogRef.close(true);
            },
        });
    }
}
OptionsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: OptionsComponent, deps: [{ token: i1$1.MatDialogRef }, { token: MAT_DIALOG_DATA }, { token: NodebootOauth2StarterService }, { token: i2.FormBuilder }], target: i0.ɵɵFactoryTarget.Component });
OptionsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: OptionsComponent, selector: "lib-options", ngImport: i0, template: "<h2 mat-dialog-title>Role {{ role.identifier }} access options</h2>\n<form [formGroup]=\"optionsForm\" (ngSubmit)=\"updateOptions()\">\n  <div mat-dialog-content>\n    <div class=\"error-display\" *ngIf=\"errorMessage\">\n      <h5>{{ errorMessage }}</h5>\n    </div>\n    <mat-form-field class=\"forms-field\" appearance=\"fill\">\n      <mat-label>Select a resource</mat-label>\n      <mat-select name=\"resource\" formControlName=\"resource\">\n        <mat-option\n          [value]=\"option.applicationResourceName\"\n          *ngFor=\"let option of options\"\n          >{{ option.applicationResourceName }}</mat-option\n        >\n      </mat-select>\n      <mat-hint>Select an application resource</mat-hint>\n    </mat-form-field>\n    <mat-selection-list #allowed formControlName=\"selected\">\n      <mat-list-option\n        (selectedChange)=\"selectedChange($event, convertToString(allowedL))\"\n        [value]=\"convertToString(allowedL)\"\n        [disabled]=\"\n          allowedL.allowed !== '*' &&\n          optionsForm.get('selected')?.value.length === allowedShowList.length\n            ? true\n            : false\n        \"\n        *ngFor=\"let allowedL of allowedShowList\"\n      >\n        {{ allowedL.allowed }}\n      </mat-list-option>\n    </mat-selection-list>\n  </div>\n  <div align=\"end\" mat-dialog-actions>\n    <button\n      (click)=\"closeDialog()\"\n      type=\"button\"\n      color=\"warn\"\n      mat-stroked-button\n      [disabled]=\"dialogRef.disableClose\"\n    >\n      Cancel</button\n    ><button\n      [disabled]=\"!optionsForm.valid || objectKeys(allowedObject).length === 0\"\n      color=\"primary\"\n      mat-flat-button\n    >\n      Update\n    </button>\n  </div>\n</form>\n", styles: [".forms-field{width:100%}\n"], components: [{ type: i4.MatFormField, selector: "mat-form-field", inputs: ["color", "appearance", "hideRequiredMarker", "hintLabel", "floatLabel"], exportAs: ["matFormField"] }, { type: i5$1.MatSelect, selector: "mat-select", inputs: ["disabled", "disableRipple", "tabIndex"], exportAs: ["matSelect"] }, { type: i6.MatOption, selector: "mat-option", exportAs: ["matOption"] }, { type: i3$1.MatSelectionList, selector: "mat-selection-list", inputs: ["disableRipple", "tabIndex", "color", "compareWith", "disabled", "multiple"], outputs: ["selectionChange"], exportAs: ["matSelectionList"] }, { type: i3$1.MatListOption, selector: "mat-list-option", inputs: ["disableRipple", "checkboxPosition", "color", "value", "disabled", "selected"], outputs: ["selectedChange"], exportAs: ["matListOption"] }, { type: i3.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }], directives: [{ type: i1$1.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { type: i2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i1$1.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }, { type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.MatLabel, selector: "mat-label" }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { type: i8.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4.MatHint, selector: "mat-hint", inputs: ["align", "id"] }, { type: i1$1.MatDialogActions, selector: "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: OptionsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-options', template: "<h2 mat-dialog-title>Role {{ role.identifier }} access options</h2>\n<form [formGroup]=\"optionsForm\" (ngSubmit)=\"updateOptions()\">\n  <div mat-dialog-content>\n    <div class=\"error-display\" *ngIf=\"errorMessage\">\n      <h5>{{ errorMessage }}</h5>\n    </div>\n    <mat-form-field class=\"forms-field\" appearance=\"fill\">\n      <mat-label>Select a resource</mat-label>\n      <mat-select name=\"resource\" formControlName=\"resource\">\n        <mat-option\n          [value]=\"option.applicationResourceName\"\n          *ngFor=\"let option of options\"\n          >{{ option.applicationResourceName }}</mat-option\n        >\n      </mat-select>\n      <mat-hint>Select an application resource</mat-hint>\n    </mat-form-field>\n    <mat-selection-list #allowed formControlName=\"selected\">\n      <mat-list-option\n        (selectedChange)=\"selectedChange($event, convertToString(allowedL))\"\n        [value]=\"convertToString(allowedL)\"\n        [disabled]=\"\n          allowedL.allowed !== '*' &&\n          optionsForm.get('selected')?.value.length === allowedShowList.length\n            ? true\n            : false\n        \"\n        *ngFor=\"let allowedL of allowedShowList\"\n      >\n        {{ allowedL.allowed }}\n      </mat-list-option>\n    </mat-selection-list>\n  </div>\n  <div align=\"end\" mat-dialog-actions>\n    <button\n      (click)=\"closeDialog()\"\n      type=\"button\"\n      color=\"warn\"\n      mat-stroked-button\n      [disabled]=\"dialogRef.disableClose\"\n    >\n      Cancel</button\n    ><button\n      [disabled]=\"!optionsForm.valid || objectKeys(allowedObject).length === 0\"\n      color=\"primary\"\n      mat-flat-button\n    >\n      Update\n    </button>\n  </div>\n</form>\n", styles: [".forms-field{width:100%}\n"] }]
        }], ctorParameters: function () { return [{ type: i1$1.MatDialogRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_DIALOG_DATA]
                }] }, { type: NodebootOauth2StarterService }, { type: i2.FormBuilder }]; } });

class OauthStarterRolesComponent {
    constructor(nbService, dialog) {
        this.nbService = nbService;
        this.dialog = dialog;
        this.displayedColumns = ['id', 'identifier', 'options', 'delete'];
        this.resultsLength = 0;
        this.isLoadingResults = true;
        this.reload = new BehaviorSubject(0);
    }
    ngOnInit() { }
    ngOnDestroy() {
        this.roleDataSubscription?.unsubscribe();
        this.sort.sortChange.complete();
    }
    ngAfterViewInit() {
        this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
        this.roleDataSubscription = merge(this.sort.sortChange, this.paginator.page, this.reload)
            .pipe(startWith({}), switchMap(() => {
            this.errorMessage = undefined;
            this.isLoadingResults = true;
            return this.nbService
                .getRoles(this.paginator.pageIndex, this.sort.direction)
                .pipe(catchError((err) => {
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
            this.roles = data;
        });
    }
    openCreateRoleDialog() {
        const createRoleDialogRef = this.dialog.open(CreateRoleComponent, {
            width: '600px',
            maxHeight: '70vh',
        });
        createRoleDialogRef
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
    openOptionsDialog(role) {
        const optionsRoleDialogRef = this.dialog.open(OptionsComponent, {
            width: '600px',
            maxHeight: '70vh',
            data: role,
        });
        optionsRoleDialogRef
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
    openDeleteRoleDialog(role) {
        const deleteRoleDialogRef = this.dialog.open(DeleteRoleComponent, {
            width: '600px',
            maxHeight: '70vh',
            data: role,
        });
        deleteRoleDialogRef
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
OauthStarterRolesComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: OauthStarterRolesComponent, deps: [{ token: NodebootOauth2StarterService }, { token: i1$1.MatDialog }], target: i0.ɵɵFactoryTarget.Component });
OauthStarterRolesComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: OauthStarterRolesComponent, selector: "lib-oauth-starter-roles", viewQueries: [{ propertyName: "paginator", first: true, predicate: MatPaginator, descendants: true }, { propertyName: "sort", first: true, predicate: MatSort, descendants: true }], ngImport: i0, template: "<div class=\"role-container\">\n  <div class=\"role-head\">\n    <h1 class=\"role-title\">Roles</h1>\n    <span class=\"separator\"></span>\n    <button (click)=\"openCreateRoleDialog()\" color=\"accent\" mat-flat-button>\n      Add Role\n    </button>\n  </div>\n  <div class=\"role-body\">\n    <div class=\"container-table mat-elevation-z8\">\n      <div class=\"loading-shade\" *ngIf=\"isLoadingResults\">\n        <mat-spinner *ngIf=\"isLoadingResults\"></mat-spinner>\n      </div>\n\n      <div class=\"example-table-container\">\n        <table\n          mat-table\n          [dataSource]=\"roles\"\n          class=\"user-table\"\n          matSort\n          matSortActive=\"id\"\n          matSortDisableClear\n          matSortDirection=\"asc\"\n        >\n          <ng-container matColumnDef=\"id\">\n            <th mat-sort-header mat-header-cell *matHeaderCellDef>id</th>\n            <td mat-cell *matCellDef=\"let row\">{{ row.id }}</td>\n          </ng-container>\n\n          <ng-container matColumnDef=\"identifier\">\n            <th mat-header-cell *matHeaderCellDef>Identifier</th>\n            <td mat-cell *matCellDef=\"let row\">{{ row.identifier }}</td>\n          </ng-container>\n\n          <ng-container matColumnDef=\"options\">\n            <th mat-header-cell *matHeaderCellDef>Options</th>\n            <td class=\"roles-column\" mat-cell *matCellDef=\"let row\">\n              <button\n                [disabled]=\"row.identifier === 'admin'\"\n                (click)=\"openOptionsDialog(row)\"\n                mat-stroked-button\n              >\n                Options\n              </button>\n            </td>\n          </ng-container>\n\n          <ng-container matColumnDef=\"delete\">\n            <th mat-header-cell *matHeaderCellDef></th>\n            <td class=\"actions-column\" mat-cell *matCellDef=\"let row\">\n              <button\n                color=\"warn\"\n                [disabled]=\"row.identifier === 'admin'\"\n                mat-stroked-button\n                (click)=\"openDeleteRoleDialog(row)\"\n              >\n                Delete Role\n              </button>\n            </td>\n          </ng-container>\n\n          <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n          <tr mat-row *matRowDef=\"let row; columns: displayedColumns\"></tr>\n        </table>\n      </div>\n\n      <mat-paginator\n        [length]=\"resultsLength\"\n        [pageSize]=\"20\"\n        aria-label=\"Select page of GitHub search results\"\n      ></mat-paginator>\n    </div>\n  </div>\n</div>\n", styles: [".role-container .role-head{display:flex;margin-bottom:2rem}.role-container .role-head .separator{flex:1 0}.role-container .role-head .role-title{margin:0;font-size:32px}.role-container table{width:100%}.role-container table th,.role-container table td{width:20%}.role-container table .roles-column button:last-child{margin-left:.5rem}.role-container table .actions-column{text-align:end}.role-container table .actions-column button:last-child{margin-left:.5rem}.role-container .container-table{position:relative}.role-container .loading-shade{position:absolute;top:0;left:0;bottom:56px;right:0;background:rgba(0,0,0,.15);z-index:1;display:flex;align-items:center;justify-content:center}\n"], components: [{ type: i3.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { type: i4$2.MatSpinner, selector: "mat-spinner", inputs: ["color"] }, { type: i5$2.MatTable, selector: "mat-table, table[mat-table]", exportAs: ["matTable"] }, { type: i6$1.MatSortHeader, selector: "[mat-sort-header]", inputs: ["disabled", "mat-sort-header", "arrowPosition", "start", "sortActionDescription", "disableClear"], exportAs: ["matSortHeader"] }, { type: i5$2.MatHeaderRow, selector: "mat-header-row, tr[mat-header-row]", exportAs: ["matHeaderRow"] }, { type: i5$2.MatRow, selector: "mat-row, tr[mat-row]", exportAs: ["matRow"] }, { type: i7.MatPaginator, selector: "mat-paginator", inputs: ["disabled"], exportAs: ["matPaginator"] }], directives: [{ type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6$1.MatSort, selector: "[matSort]", inputs: ["matSortDisabled", "matSortActive", "matSortStart", "matSortDirection", "matSortDisableClear"], outputs: ["matSortChange"], exportAs: ["matSort"] }, { type: i5$2.MatColumnDef, selector: "[matColumnDef]", inputs: ["sticky", "matColumnDef"] }, { type: i5$2.MatHeaderCellDef, selector: "[matHeaderCellDef]" }, { type: i5$2.MatHeaderCell, selector: "mat-header-cell, th[mat-header-cell]" }, { type: i5$2.MatCellDef, selector: "[matCellDef]" }, { type: i5$2.MatCell, selector: "mat-cell, td[mat-cell]" }, { type: i5$2.MatHeaderRowDef, selector: "[matHeaderRowDef]", inputs: ["matHeaderRowDef", "matHeaderRowDefSticky"] }, { type: i5$2.MatRowDef, selector: "[matRowDef]", inputs: ["matRowDefColumns", "matRowDefWhen"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: OauthStarterRolesComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-oauth-starter-roles', template: "<div class=\"role-container\">\n  <div class=\"role-head\">\n    <h1 class=\"role-title\">Roles</h1>\n    <span class=\"separator\"></span>\n    <button (click)=\"openCreateRoleDialog()\" color=\"accent\" mat-flat-button>\n      Add Role\n    </button>\n  </div>\n  <div class=\"role-body\">\n    <div class=\"container-table mat-elevation-z8\">\n      <div class=\"loading-shade\" *ngIf=\"isLoadingResults\">\n        <mat-spinner *ngIf=\"isLoadingResults\"></mat-spinner>\n      </div>\n\n      <div class=\"example-table-container\">\n        <table\n          mat-table\n          [dataSource]=\"roles\"\n          class=\"user-table\"\n          matSort\n          matSortActive=\"id\"\n          matSortDisableClear\n          matSortDirection=\"asc\"\n        >\n          <ng-container matColumnDef=\"id\">\n            <th mat-sort-header mat-header-cell *matHeaderCellDef>id</th>\n            <td mat-cell *matCellDef=\"let row\">{{ row.id }}</td>\n          </ng-container>\n\n          <ng-container matColumnDef=\"identifier\">\n            <th mat-header-cell *matHeaderCellDef>Identifier</th>\n            <td mat-cell *matCellDef=\"let row\">{{ row.identifier }}</td>\n          </ng-container>\n\n          <ng-container matColumnDef=\"options\">\n            <th mat-header-cell *matHeaderCellDef>Options</th>\n            <td class=\"roles-column\" mat-cell *matCellDef=\"let row\">\n              <button\n                [disabled]=\"row.identifier === 'admin'\"\n                (click)=\"openOptionsDialog(row)\"\n                mat-stroked-button\n              >\n                Options\n              </button>\n            </td>\n          </ng-container>\n\n          <ng-container matColumnDef=\"delete\">\n            <th mat-header-cell *matHeaderCellDef></th>\n            <td class=\"actions-column\" mat-cell *matCellDef=\"let row\">\n              <button\n                color=\"warn\"\n                [disabled]=\"row.identifier === 'admin'\"\n                mat-stroked-button\n                (click)=\"openDeleteRoleDialog(row)\"\n              >\n                Delete Role\n              </button>\n            </td>\n          </ng-container>\n\n          <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n          <tr mat-row *matRowDef=\"let row; columns: displayedColumns\"></tr>\n        </table>\n      </div>\n\n      <mat-paginator\n        [length]=\"resultsLength\"\n        [pageSize]=\"20\"\n        aria-label=\"Select page of GitHub search results\"\n      ></mat-paginator>\n    </div>\n  </div>\n</div>\n", styles: [".role-container .role-head{display:flex;margin-bottom:2rem}.role-container .role-head .separator{flex:1 0}.role-container .role-head .role-title{margin:0;font-size:32px}.role-container table{width:100%}.role-container table th,.role-container table td{width:20%}.role-container table .roles-column button:last-child{margin-left:.5rem}.role-container table .actions-column{text-align:end}.role-container table .actions-column button:last-child{margin-left:.5rem}.role-container .container-table{position:relative}.role-container .loading-shade{position:absolute;top:0;left:0;bottom:56px;right:0;background:rgba(0,0,0,.15);z-index:1;display:flex;align-items:center;justify-content:center}\n"] }]
        }], ctorParameters: function () { return [{ type: NodebootOauth2StarterService }, { type: i1$1.MatDialog }]; }, propDecorators: { paginator: [{
                type: ViewChild,
                args: [MatPaginator]
            }], sort: [{
                type: ViewChild,
                args: [MatSort]
            }] } });

class ShowSecretComponent {
    constructor(nbService, dialogRef, client) {
        this.nbService = nbService;
        this.dialogRef = dialogRef;
        this.client = client;
        this.hide = true;
    }
    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
    ngOnInit() {
        this.dialogRef.disableClose = true;
        this.subscription = this.nbService.getSecret(this.client.id).subscribe({
            error: (err) => {
                this.dialogRef.disableClose = false;
                if (err.error) {
                    this.errorMessage = err.error.message;
                }
                else {
                    this.errorMessage = 'Unknown Error';
                }
            },
            next: (res) => {
                this.dialogRef.disableClose = false;
                this.clientSecret = res.content.clientSecret;
            },
        });
    }
    closeDialog() {
        this.dialogRef.close();
    }
}
ShowSecretComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ShowSecretComponent, deps: [{ token: NodebootOauth2StarterService }, { token: i1$1.MatDialogRef }, { token: MAT_DIALOG_DATA }], target: i0.ɵɵFactoryTarget.Component });
ShowSecretComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: ShowSecretComponent, selector: "lib-show-secret", ngImport: i0, template: "<h2 mat-dialog-title>Client secret for {{ client.name }}</h2>\n<div mat-dialog-content>\n  <div class=\"loading-shade\" *ngIf=\"!clientSecret\">\n    <mat-spinner *ngIf=\"!clientSecret\"></mat-spinner>\n  </div>\n  <mat-form-field *ngIf=\"clientSecret\" class=\"full-width\" appearance=\"fill\">\n    <mat-label>Client secret</mat-label>\n    <input\n      [type]=\"hide ? 'password' : 'text'\"\n      disabled\n      matInput\n      [value]=\"clientSecret\"\n    />\n    <button\n      matTooltip=\"Show secret\"\n      mat-icon-button\n      matSuffix\n      (click)=\"hide = !hide\"\n    >\n      <mat-icon>{{ hide ? \"visibility_off\" : \"visibility\" }}</mat-icon>\n    </button>\n  </mat-form-field>\n</div>\n<div align=\"end\" mat-dialog-actions>\n  <button (click)=\"closeDialog()\" type=\"button\" color=\"warn\" mat-stroked-button>\n    Close\n  </button>\n</div>\n", styles: [".full-width{width:100%}.loading-shade{position:absolute;top:0;left:0;bottom:56px;right:0;background:rgba(0,0,0,.15);z-index:1;display:flex;align-items:center;justify-content:center}\n"], components: [{ type: i4$2.MatSpinner, selector: "mat-spinner", inputs: ["color"] }, { type: i4.MatFormField, selector: "mat-form-field", inputs: ["color", "appearance", "hideRequiredMarker", "hintLabel", "floatLabel"], exportAs: ["matFormField"] }, { type: i3.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { type: i4$1.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }], directives: [{ type: i1$1.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { type: i1$1.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }, { type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.MatLabel, selector: "mat-label" }, { type: i10.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { type: i6$2.MatTooltip, selector: "[matTooltip]", exportAs: ["matTooltip"] }, { type: i4.MatSuffix, selector: "[matSuffix]" }, { type: i1$1.MatDialogActions, selector: "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ShowSecretComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-show-secret', template: "<h2 mat-dialog-title>Client secret for {{ client.name }}</h2>\n<div mat-dialog-content>\n  <div class=\"loading-shade\" *ngIf=\"!clientSecret\">\n    <mat-spinner *ngIf=\"!clientSecret\"></mat-spinner>\n  </div>\n  <mat-form-field *ngIf=\"clientSecret\" class=\"full-width\" appearance=\"fill\">\n    <mat-label>Client secret</mat-label>\n    <input\n      [type]=\"hide ? 'password' : 'text'\"\n      disabled\n      matInput\n      [value]=\"clientSecret\"\n    />\n    <button\n      matTooltip=\"Show secret\"\n      mat-icon-button\n      matSuffix\n      (click)=\"hide = !hide\"\n    >\n      <mat-icon>{{ hide ? \"visibility_off\" : \"visibility\" }}</mat-icon>\n    </button>\n  </mat-form-field>\n</div>\n<div align=\"end\" mat-dialog-actions>\n  <button (click)=\"closeDialog()\" type=\"button\" color=\"warn\" mat-stroked-button>\n    Close\n  </button>\n</div>\n", styles: [".full-width{width:100%}.loading-shade{position:absolute;top:0;left:0;bottom:56px;right:0;background:rgba(0,0,0,.15);z-index:1;display:flex;align-items:center;justify-content:center}\n"] }]
        }], ctorParameters: function () { return [{ type: NodebootOauth2StarterService }, { type: i1$1.MatDialogRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_DIALOG_DATA]
                }] }]; } });

class AddClientRolesComponent {
    constructor(dialogRef, formBuilder, nbService, client) {
        this.dialogRef = dialogRef;
        this.formBuilder = formBuilder;
        this.nbService = nbService;
        this.client = client;
        this.roles = [];
        this.rolesList = [];
        this.nbService.getRolesBasic().subscribe({
            error: (err) => {
                if (err.error) {
                    this.errorMessage = err.error.message;
                }
                else {
                    this.errorMessage = 'Unknown Error';
                }
                this.roles = [];
            },
            next: (res) => {
                const availableRoles = res.content?.flatMap((c) => {
                    const roleExist = client.roles.findIndex((r) => c.id == r.id);
                    if (roleExist === -1) {
                        return c;
                    }
                    this.rolesList.push(c);
                    return [];
                });
                this.roles = availableRoles || [];
            },
        });
        this.addRolesForm = this.formBuilder.group({
            role: this.formBuilder.control(''),
        });
    }
    ngOnInit() { }
    addRoleToList() {
        const roleValue = this.addRolesForm.get('role')?.value;
        if (!roleValue) {
            return;
        }
        const indexOfRole = this.roles.indexOf(roleValue);
        this.roles.splice(indexOfRole, 1);
        this.rolesList.push(roleValue);
        this.addRolesForm.get('role')?.setValue('');
    }
    removeRoleToList(role) {
        const roleValue = role;
        const indexOfRole = this.roles.indexOf(roleValue);
        this.rolesList.splice(indexOfRole, 1);
        this.roles.push(roleValue);
    }
    closeDialog() {
        this.dialogRef.close();
    }
    updateRoles() {
        const rolesListToSend = this.rolesList.flatMap((rl) => {
            const roleExist = this.client.roles.findIndex((r) => rl.id == r.id);
            if (roleExist === -1) {
                return rl;
            }
            return [];
        });
        if (rolesListToSend.length === 0) {
            return this.dialogRef.close(false);
        }
        this.nbService
            .updateClientRoles(this.client.id, rolesListToSend)
            .subscribe({
            error: (err) => {
                if (err.error) {
                    this.errorMessage = err.error.message;
                }
                else {
                    this.errorMessage = 'Unknown Error';
                }
                this.roles = [];
            },
            next: () => {
                this.dialogRef.close(true);
            },
        });
    }
}
AddClientRolesComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: AddClientRolesComponent, deps: [{ token: i1$1.MatDialogRef }, { token: i2.FormBuilder }, { token: NodebootOauth2StarterService }, { token: MAT_DIALOG_DATA }], target: i0.ɵɵFactoryTarget.Component });
AddClientRolesComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: AddClientRolesComponent, selector: "lib-add-client-roles", ngImport: i0, template: "<h2 mat-dialog-title>Modify roles of {{ client.name }}</h2>\n<form [formGroup]=\"addRolesForm\" (ngSubmit)=\"updateRoles()\">\n  <div mat-dialog-content>\n    <div class=\"error-display\" *ngIf=\"errorMessage\">\n      <h5>{{ errorMessage }}</h5>\n    </div>\n    <div class=\"select-role\">\n      <mat-form-field class=\"forms-field\" appearance=\"fill\">\n        <mat-label>Select A Role</mat-label>\n        <mat-select name=\"role\" formControlName=\"role\">\n          <mat-option [value]=\"role\" *ngFor=\"let role of roles\">{{\n            role.identifier\n          }}</mat-option>\n        </mat-select>\n        <mat-hint>Select a role and add it</mat-hint>\n      </mat-form-field>\n      <button type=\"button\" (click)=\"addRoleToList()\" mat-stroked-button>\n        +\n      </button>\n    </div>\n    <div *ngFor=\"let role of rolesList\" class=\"roles-list\">\n      <div class=\"role-title\">\n        <h3>{{ role.identifier }}</h3>\n      </div>\n      <button\n        (click)=\"removeRoleToList(role)\"\n        color=\"warn\"\n        type=\"button\"\n        mat-stroked-button\n      >\n        -\n      </button>\n    </div>\n  </div>\n  <div align=\"end\" mat-dialog-actions>\n    <button\n      (click)=\"closeDialog()\"\n      type=\"button\"\n      color=\"warn\"\n      mat-stroked-button\n      [disabled]=\"dialogRef.disableClose\"\n    >\n      Cancel</button\n    ><button\n      [disabled]=\"!addRolesForm.valid || rolesList.length === 0\"\n      color=\"primary\"\n      mat-flat-button\n    >\n      Update\n    </button>\n  </div>\n</form>\n", styles: [".forms-field{width:100%;margin-bottom:1rem}.error-display{margin:1rem 0;background-color:#ffab1098;padding:.5rem;border-radius:.25rem}.error-display h5{margin:0;font-size:16px}.select-role{display:grid;grid-template-columns:auto .15fr;grid-gap:.5rem;gap:.5rem;margin-bottom:1rem}.select-role button{height:59.5px}.roles-list{display:grid;grid-template-columns:auto .1fr;grid-gap:.5rem;gap:.5rem;margin-bottom:1rem}.roles-list .role-title{border-radius:.25rem;background-color:#82c7ff44;padding:1rem}.roles-list .role-title h3{margin:0}\n"], components: [{ type: i4.MatFormField, selector: "mat-form-field", inputs: ["color", "appearance", "hideRequiredMarker", "hintLabel", "floatLabel"], exportAs: ["matFormField"] }, { type: i5$1.MatSelect, selector: "mat-select", inputs: ["disabled", "disableRipple", "tabIndex"], exportAs: ["matSelect"] }, { type: i6.MatOption, selector: "mat-option", exportAs: ["matOption"] }, { type: i3.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }], directives: [{ type: i1$1.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { type: i2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i1$1.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }, { type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.MatLabel, selector: "mat-label" }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { type: i8.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4.MatHint, selector: "mat-hint", inputs: ["align", "id"] }, { type: i1$1.MatDialogActions, selector: "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: AddClientRolesComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-add-client-roles', template: "<h2 mat-dialog-title>Modify roles of {{ client.name }}</h2>\n<form [formGroup]=\"addRolesForm\" (ngSubmit)=\"updateRoles()\">\n  <div mat-dialog-content>\n    <div class=\"error-display\" *ngIf=\"errorMessage\">\n      <h5>{{ errorMessage }}</h5>\n    </div>\n    <div class=\"select-role\">\n      <mat-form-field class=\"forms-field\" appearance=\"fill\">\n        <mat-label>Select A Role</mat-label>\n        <mat-select name=\"role\" formControlName=\"role\">\n          <mat-option [value]=\"role\" *ngFor=\"let role of roles\">{{\n            role.identifier\n          }}</mat-option>\n        </mat-select>\n        <mat-hint>Select a role and add it</mat-hint>\n      </mat-form-field>\n      <button type=\"button\" (click)=\"addRoleToList()\" mat-stroked-button>\n        +\n      </button>\n    </div>\n    <div *ngFor=\"let role of rolesList\" class=\"roles-list\">\n      <div class=\"role-title\">\n        <h3>{{ role.identifier }}</h3>\n      </div>\n      <button\n        (click)=\"removeRoleToList(role)\"\n        color=\"warn\"\n        type=\"button\"\n        mat-stroked-button\n      >\n        -\n      </button>\n    </div>\n  </div>\n  <div align=\"end\" mat-dialog-actions>\n    <button\n      (click)=\"closeDialog()\"\n      type=\"button\"\n      color=\"warn\"\n      mat-stroked-button\n      [disabled]=\"dialogRef.disableClose\"\n    >\n      Cancel</button\n    ><button\n      [disabled]=\"!addRolesForm.valid || rolesList.length === 0\"\n      color=\"primary\"\n      mat-flat-button\n    >\n      Update\n    </button>\n  </div>\n</form>\n", styles: [".forms-field{width:100%;margin-bottom:1rem}.error-display{margin:1rem 0;background-color:#ffab1098;padding:.5rem;border-radius:.25rem}.error-display h5{margin:0;font-size:16px}.select-role{display:grid;grid-template-columns:auto .15fr;grid-gap:.5rem;gap:.5rem;margin-bottom:1rem}.select-role button{height:59.5px}.roles-list{display:grid;grid-template-columns:auto .1fr;grid-gap:.5rem;gap:.5rem;margin-bottom:1rem}.roles-list .role-title{border-radius:.25rem;background-color:#82c7ff44;padding:1rem}.roles-list .role-title h3{margin:0}\n"] }]
        }], ctorParameters: function () { return [{ type: i1$1.MatDialogRef }, { type: i2.FormBuilder }, { type: NodebootOauth2StarterService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_DIALOG_DATA]
                }] }]; } });

class CreateClientComponent {
    constructor(dialogRef, formBuilder, nbService) {
        this.dialogRef = dialogRef;
        this.formBuilder = formBuilder;
        this.nbService = nbService;
        this.roles = [];
        this.rolesList = [];
        this.hidePassword = true;
        this.nbService.getRolesBasic().subscribe({
            error: (err) => {
                if (err.error) {
                    this.errorMessage = err.error.message;
                }
                else {
                    this.errorMessage = 'Unknown Error';
                }
                this.roles = [];
            },
            next: (res) => {
                this.roles = res.content || [];
            },
        });
        this.createClientForm = this.formBuilder.group({
            name: this.formBuilder.control('', Validators.compose([
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(45),
                Validators.pattern(/^[a-zA-Z0-9_\.\-\/\s]+$/),
            ])),
            description: this.formBuilder.control('', Validators.compose([
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(255),
            ])),
            identifier: this.formBuilder.control('', Validators.compose([
                Validators.required,
                Validators.pattern(/^[a-zA-Z0-9_\.\-\/]+$/),
                Validators.minLength(4),
                Validators.maxLength(20),
            ])),
            role: this.formBuilder.control(''),
            longLive: this.formBuilder.control(false),
        });
    }
    ngOnInit() { }
    addRoleToList() {
        const roleValue = this.createClientForm.get('role')?.value;
        if (!roleValue) {
            return;
        }
        const indexOfRole = this.roles.indexOf(roleValue);
        this.roles.splice(indexOfRole, 1);
        this.rolesList.push(roleValue);
        this.createClientForm.get('role')?.setValue('');
    }
    removeRoleToList(role) {
        const roleValue = role;
        const indexOfRole = this.roles.indexOf(roleValue);
        this.rolesList.splice(indexOfRole, 1);
        this.roles.push(roleValue);
    }
    closeDialog() {
        this.dialogRef.close();
    }
    createClient(createClientData) {
        const longLive = createClientData.longLive || false;
        createClientData.role = undefined;
        createClientData.longLive = undefined;
        this.dialogRef.disableClose = true;
        this.nbService
            .createClient({ ...createClientData, roles: this.rolesList }, longLive)
            .subscribe({
            error: (err) => {
                this.dialogRef.disableClose = false;
                if (err.error) {
                    this.errorMessage = err.error.message;
                }
                else {
                    this.errorMessage = 'Unknown Error';
                }
            },
            next: (res) => {
                this.dialogRef.close(res.content);
            },
        });
    }
}
CreateClientComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: CreateClientComponent, deps: [{ token: i1$1.MatDialogRef }, { token: i2.FormBuilder }, { token: NodebootOauth2StarterService }], target: i0.ɵɵFactoryTarget.Component });
CreateClientComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: CreateClientComponent, selector: "lib-create-client", ngImport: i0, template: "<h2 mat-dialog-title>Create Client</h2>\n<form\n  [formGroup]=\"createClientForm\"\n  (ngSubmit)=\"createClient(createClientForm.value)\"\n>\n  <div mat-dialog-content>\n    <div class=\"error-display\" *ngIf=\"errorMessage\">\n      <h5>{{ errorMessage }}</h5>\n    </div>\n    <mat-form-field class=\"forms-field\" appearance=\"fill\">\n      <mat-label>Name</mat-label>\n      <input matInput formControlName=\"name\" name=\"name\" required />\n      <mat-hint>Put the client name</mat-hint>\n    </mat-form-field>\n    <mat-form-field class=\"forms-field\" appearance=\"fill\">\n      <mat-label>Description</mat-label>\n      <textarea\n        matInput\n        formControlName=\"description\"\n        name=\"description\"\n        required\n      ></textarea>\n      <mat-hint>Breve user description</mat-hint>\n    </mat-form-field>\n    <mat-form-field class=\"forms-field\" appearance=\"fill\">\n      <mat-label>Identifier</mat-label>\n      <input\n        matInput\n        placeholder=\"admin01\"\n        formControlName=\"identifier\"\n        name=\"identifier\"\n        required\n      />\n      <mat-hint>Client unique identifier</mat-hint>\n    </mat-form-field>\n    <div class=\"select-role\">\n      <mat-form-field class=\"forms-field\" appearance=\"fill\">\n        <mat-label>Select A Role</mat-label>\n        <mat-select name=\"role\" formControlName=\"role\">\n          <mat-option [value]=\"role\" *ngFor=\"let role of roles\">{{\n            role.identifier\n          }}</mat-option>\n        </mat-select>\n        <mat-hint>Select a role and add it</mat-hint>\n      </mat-form-field>\n      <button type=\"button\" (click)=\"addRoleToList()\" mat-stroked-button>\n        +\n      </button>\n    </div>\n    <div *ngFor=\"let role of rolesList\" class=\"roles-list\">\n      <div class=\"role-title\">\n        <h3>{{ role.identifier }}</h3>\n      </div>\n      <button\n        (click)=\"removeRoleToList(role)\"\n        color=\"warn\"\n        type=\"button\"\n        mat-stroked-button\n      >\n        -\n      </button>\n    </div>\n    <div class=\"check-container\">\n      <h4>Create with a long live token:</h4>\n      <p>\n        <mat-checkbox formControlName=\"longLive\">Long Live Token</mat-checkbox>\n      </p>\n    </div>\n  </div>\n  <div align=\"end\" mat-dialog-actions>\n    <button\n      (click)=\"closeDialog()\"\n      type=\"button\"\n      color=\"warn\"\n      mat-stroked-button\n      [disabled]=\"dialogRef.disableClose\"\n    >\n      Cancel</button\n    ><button\n      [disabled]=\"!createClientForm.valid || rolesList.length === 0\"\n      color=\"primary\"\n      mat-flat-button\n    >\n      Create\n    </button>\n  </div>\n</form>\n", styles: [".forms-field{width:100%;margin-bottom:1rem}.error-display{margin:1rem 0;background-color:#ffab1098;padding:.5rem;border-radius:.25rem}.error-display h5{margin:0;font-size:16px}.select-role{display:grid;grid-template-columns:auto .15fr;grid-gap:.5rem;gap:.5rem;margin-bottom:1rem}.select-role button{height:59.5px}.roles-list{display:grid;grid-template-columns:auto .1fr;grid-gap:.5rem;gap:.5rem;margin-bottom:1rem}.roles-list .role-title{border-radius:.25rem;background-color:#82c7ff44;padding:1rem}.roles-list .role-title h3{margin:0}\n"], components: [{ type: i4.MatFormField, selector: "mat-form-field", inputs: ["color", "appearance", "hideRequiredMarker", "hintLabel", "floatLabel"], exportAs: ["matFormField"] }, { type: i5$1.MatSelect, selector: "mat-select", inputs: ["disabled", "disableRipple", "tabIndex"], exportAs: ["matSelect"] }, { type: i6.MatOption, selector: "mat-option", exportAs: ["matOption"] }, { type: i3.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { type: i8$1.MatCheckbox, selector: "mat-checkbox", inputs: ["disableRipple", "color", "tabIndex", "aria-label", "aria-labelledby", "aria-describedby", "id", "required", "labelPosition", "name", "value", "checked", "disabled", "indeterminate"], outputs: ["change", "indeterminateChange"], exportAs: ["matCheckbox"] }], directives: [{ type: i1$1.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { type: i2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i1$1.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }, { type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.MatLabel, selector: "mat-label" }, { type: i10.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i4.MatHint, selector: "mat-hint", inputs: ["align", "id"] }, { type: i8.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1$1.MatDialogActions, selector: "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: CreateClientComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-create-client', template: "<h2 mat-dialog-title>Create Client</h2>\n<form\n  [formGroup]=\"createClientForm\"\n  (ngSubmit)=\"createClient(createClientForm.value)\"\n>\n  <div mat-dialog-content>\n    <div class=\"error-display\" *ngIf=\"errorMessage\">\n      <h5>{{ errorMessage }}</h5>\n    </div>\n    <mat-form-field class=\"forms-field\" appearance=\"fill\">\n      <mat-label>Name</mat-label>\n      <input matInput formControlName=\"name\" name=\"name\" required />\n      <mat-hint>Put the client name</mat-hint>\n    </mat-form-field>\n    <mat-form-field class=\"forms-field\" appearance=\"fill\">\n      <mat-label>Description</mat-label>\n      <textarea\n        matInput\n        formControlName=\"description\"\n        name=\"description\"\n        required\n      ></textarea>\n      <mat-hint>Breve user description</mat-hint>\n    </mat-form-field>\n    <mat-form-field class=\"forms-field\" appearance=\"fill\">\n      <mat-label>Identifier</mat-label>\n      <input\n        matInput\n        placeholder=\"admin01\"\n        formControlName=\"identifier\"\n        name=\"identifier\"\n        required\n      />\n      <mat-hint>Client unique identifier</mat-hint>\n    </mat-form-field>\n    <div class=\"select-role\">\n      <mat-form-field class=\"forms-field\" appearance=\"fill\">\n        <mat-label>Select A Role</mat-label>\n        <mat-select name=\"role\" formControlName=\"role\">\n          <mat-option [value]=\"role\" *ngFor=\"let role of roles\">{{\n            role.identifier\n          }}</mat-option>\n        </mat-select>\n        <mat-hint>Select a role and add it</mat-hint>\n      </mat-form-field>\n      <button type=\"button\" (click)=\"addRoleToList()\" mat-stroked-button>\n        +\n      </button>\n    </div>\n    <div *ngFor=\"let role of rolesList\" class=\"roles-list\">\n      <div class=\"role-title\">\n        <h3>{{ role.identifier }}</h3>\n      </div>\n      <button\n        (click)=\"removeRoleToList(role)\"\n        color=\"warn\"\n        type=\"button\"\n        mat-stroked-button\n      >\n        -\n      </button>\n    </div>\n    <div class=\"check-container\">\n      <h4>Create with a long live token:</h4>\n      <p>\n        <mat-checkbox formControlName=\"longLive\">Long Live Token</mat-checkbox>\n      </p>\n    </div>\n  </div>\n  <div align=\"end\" mat-dialog-actions>\n    <button\n      (click)=\"closeDialog()\"\n      type=\"button\"\n      color=\"warn\"\n      mat-stroked-button\n      [disabled]=\"dialogRef.disableClose\"\n    >\n      Cancel</button\n    ><button\n      [disabled]=\"!createClientForm.valid || rolesList.length === 0\"\n      color=\"primary\"\n      mat-flat-button\n    >\n      Create\n    </button>\n  </div>\n</form>\n", styles: [".forms-field{width:100%;margin-bottom:1rem}.error-display{margin:1rem 0;background-color:#ffab1098;padding:.5rem;border-radius:.25rem}.error-display h5{margin:0;font-size:16px}.select-role{display:grid;grid-template-columns:auto .15fr;grid-gap:.5rem;gap:.5rem;margin-bottom:1rem}.select-role button{height:59.5px}.roles-list{display:grid;grid-template-columns:auto .1fr;grid-gap:.5rem;gap:.5rem;margin-bottom:1rem}.roles-list .role-title{border-radius:.25rem;background-color:#82c7ff44;padding:1rem}.roles-list .role-title h3{margin:0}\n"] }]
        }], ctorParameters: function () { return [{ type: i1$1.MatDialogRef }, { type: i2.FormBuilder }, { type: NodebootOauth2StarterService }]; } });

class DeleteClientComponent {
    constructor(dialogRef, nbService, client) {
        this.dialogRef = dialogRef;
        this.nbService = nbService;
        this.client = client;
    }
    ngOnInit() { }
    delete() {
        this.dialogRef.disableClose = true;
        this.nbService.deleteClient(this.client.subjectId).subscribe({
            error: (err) => {
                this.dialogRef.disableClose = false;
                if (err.error) {
                    this.errorMessage = err.error.message;
                }
                else {
                    this.errorMessage = 'Unknown Error';
                }
            },
            next: () => {
                this.dialogRef.close(true);
            },
        });
    }
    closeDialog() {
        this.dialogRef.close();
    }
}
DeleteClientComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: DeleteClientComponent, deps: [{ token: i1$1.MatDialogRef }, { token: NodebootOauth2StarterService }, { token: MAT_DIALOG_DATA }], target: i0.ɵɵFactoryTarget.Component });
DeleteClientComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: DeleteClientComponent, selector: "lib-delete-client", ngImport: i0, template: "<h2 mat-dialog-title>Delete Client {{ client.name }}</h2>\n<div mat-dialog-content>\n  <div class=\"error-display\" *ngIf=\"errorMessage\">\n    <h5>{{ errorMessage }}</h5>\n  </div>\n  <p>Are you sure?</p>\n</div>\n<div align=\"end\" mat-dialog-actions>\n  <button\n    (click)=\"closeDialog()\"\n    type=\"button\"\n    color=\"warn\"\n    mat-stroked-button\n    [disabled]=\"dialogRef.disableClose\"\n  >\n    Cancel</button\n  ><button\n    (click)=\"delete()\"\n    type=\"button\"\n    color=\"primary\"\n    mat-flat-button\n    [disabled]=\"dialogRef.disableClose\"\n  >\n    Delete\n  </button>\n</div>\n", styles: [""], components: [{ type: i3.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }], directives: [{ type: i1$1.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { type: i1$1.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }, { type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1$1.MatDialogActions, selector: "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: DeleteClientComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-delete-client', template: "<h2 mat-dialog-title>Delete Client {{ client.name }}</h2>\n<div mat-dialog-content>\n  <div class=\"error-display\" *ngIf=\"errorMessage\">\n    <h5>{{ errorMessage }}</h5>\n  </div>\n  <p>Are you sure?</p>\n</div>\n<div align=\"end\" mat-dialog-actions>\n  <button\n    (click)=\"closeDialog()\"\n    type=\"button\"\n    color=\"warn\"\n    mat-stroked-button\n    [disabled]=\"dialogRef.disableClose\"\n  >\n    Cancel</button\n  ><button\n    (click)=\"delete()\"\n    type=\"button\"\n    color=\"primary\"\n    mat-flat-button\n    [disabled]=\"dialogRef.disableClose\"\n  >\n    Delete\n  </button>\n</div>\n", styles: [""] }]
        }], ctorParameters: function () { return [{ type: i1$1.MatDialogRef }, { type: NodebootOauth2StarterService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_DIALOG_DATA]
                }] }]; } });

class ShowTokenComponent {
    constructor(dialogRef, clientResult) {
        this.dialogRef = dialogRef;
        this.clientResult = clientResult;
    }
    ngOnInit() { }
    closeDialog() {
        this.dialogRef.close();
    }
}
ShowTokenComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ShowTokenComponent, deps: [{ token: i1$1.MatDialogRef }, { token: MAT_DIALOG_DATA }], target: i0.ɵɵFactoryTarget.Component });
ShowTokenComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: ShowTokenComponent, selector: "lib-show-token", ngImport: i0, template: "<h2 mat-dialog-title>Created client data</h2>\n<div mat-dialog-content>\n  <mat-form-field class=\"full-width\" appearance=\"fill\">\n    <mat-label>Client Id</mat-label>\n    <input disabled matInput [value]=\"clientResult.clientId\" />\n  </mat-form-field>\n  <mat-form-field class=\"full-width\" appearance=\"fill\">\n    <mat-label>Client secret</mat-label>\n    <input disabled matInput [value]=\"clientResult.clientSecret\" />\n    <button\n      matTooltip=\"Copy secret\"\n      mat-icon-button\n      matSuffix\n      ngxClipboard\n      [cbContent]=\"clientResult.clientSecret\"\n      [attr.aria-label]=\"'Copy Token'\"\n    >\n      <mat-icon matSuffix>file_copy</mat-icon>\n    </button>\n  </mat-form-field>\n  <mat-form-field\n    *ngIf=\"!(clientResult.access_token === '')\"\n    class=\"full-width\"\n    appearance=\"fill\"\n  >\n    <mat-label>Access Token</mat-label>\n    <input disabled matInput [value]=\"clientResult.access_token\" />\n    <button\n      matTooltip=\"Copy token\"\n      mat-icon-button\n      matSuffix\n      ngxClipboard\n      [cbContent]=\"clientResult.access_token\"\n      [attr.aria-label]=\"'Copy Token'\"\n    >\n      <mat-icon matSuffix>file_copy</mat-icon>\n    </button>\n  </mat-form-field>\n</div>\n<div align=\"end\" mat-dialog-actions>\n  <button (click)=\"closeDialog()\" type=\"button\" color=\"warn\" mat-stroked-button>\n    Ok\n  </button>\n</div>\n", styles: [".full-width{width:100%}\n"], components: [{ type: i4.MatFormField, selector: "mat-form-field", inputs: ["color", "appearance", "hideRequiredMarker", "hintLabel", "floatLabel"], exportAs: ["matFormField"] }, { type: i3.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { type: i4$1.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }], directives: [{ type: i1$1.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { type: i1$1.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }, { type: i4.MatLabel, selector: "mat-label" }, { type: i10.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { type: i6$2.MatTooltip, selector: "[matTooltip]", exportAs: ["matTooltip"] }, { type: i4.MatSuffix, selector: "[matSuffix]" }, { type: i7$1.ClipboardDirective, selector: "[ngxClipboard]", inputs: ["ngxClipboard", "container", "cbContent", "cbSuccessMsg"], outputs: ["cbOnSuccess", "cbOnError"] }, { type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1$1.MatDialogActions, selector: "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ShowTokenComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-show-token', template: "<h2 mat-dialog-title>Created client data</h2>\n<div mat-dialog-content>\n  <mat-form-field class=\"full-width\" appearance=\"fill\">\n    <mat-label>Client Id</mat-label>\n    <input disabled matInput [value]=\"clientResult.clientId\" />\n  </mat-form-field>\n  <mat-form-field class=\"full-width\" appearance=\"fill\">\n    <mat-label>Client secret</mat-label>\n    <input disabled matInput [value]=\"clientResult.clientSecret\" />\n    <button\n      matTooltip=\"Copy secret\"\n      mat-icon-button\n      matSuffix\n      ngxClipboard\n      [cbContent]=\"clientResult.clientSecret\"\n      [attr.aria-label]=\"'Copy Token'\"\n    >\n      <mat-icon matSuffix>file_copy</mat-icon>\n    </button>\n  </mat-form-field>\n  <mat-form-field\n    *ngIf=\"!(clientResult.access_token === '')\"\n    class=\"full-width\"\n    appearance=\"fill\"\n  >\n    <mat-label>Access Token</mat-label>\n    <input disabled matInput [value]=\"clientResult.access_token\" />\n    <button\n      matTooltip=\"Copy token\"\n      mat-icon-button\n      matSuffix\n      ngxClipboard\n      [cbContent]=\"clientResult.access_token\"\n      [attr.aria-label]=\"'Copy Token'\"\n    >\n      <mat-icon matSuffix>file_copy</mat-icon>\n    </button>\n  </mat-form-field>\n</div>\n<div align=\"end\" mat-dialog-actions>\n  <button (click)=\"closeDialog()\" type=\"button\" color=\"warn\" mat-stroked-button>\n    Ok\n  </button>\n</div>\n", styles: [".full-width{width:100%}\n"] }]
        }], ctorParameters: function () { return [{ type: i1$1.MatDialogRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_DIALOG_DATA]
                }] }]; } });

class UpdateClientComponent {
    constructor(formBuilder, dialogRef, nbService, client) {
        this.formBuilder = formBuilder;
        this.dialogRef = dialogRef;
        this.nbService = nbService;
        this.client = client;
        this.updateUserForm = this.formBuilder.group({
            name: this.formBuilder.control(client.name, Validators.compose([
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(45),
                Validators.pattern(/^[a-zA-Z0-9_\.\-\/\s]+$/),
            ])),
        });
    }
    closeDialog() {
        this.dialogRef.close();
    }
    updateUser(updateClientData) {
        this.dialogRef.disableClose = true;
        this.nbService
            .updateClient(this.client.subjectId, updateClientData)
            .subscribe({
            error: (err) => {
                this.dialogRef.disableClose = false;
                if (err.error) {
                    this.errorMessage = err.error.message;
                }
                else {
                    this.errorMessage = 'Unknown Error';
                }
            },
            next: () => {
                this.dialogRef.close(true);
            },
        });
    }
    ngOnInit() { }
}
UpdateClientComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: UpdateClientComponent, deps: [{ token: i2.FormBuilder }, { token: i1$1.MatDialogRef }, { token: NodebootOauth2StarterService }, { token: MAT_DIALOG_DATA }], target: i0.ɵɵFactoryTarget.Component });
UpdateClientComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: UpdateClientComponent, selector: "lib-update-client", ngImport: i0, template: "<h2 mat-dialog-title>Update Client {{ client.name }}</h2>\n<form\n  [formGroup]=\"updateUserForm\"\n  (ngSubmit)=\"updateUser(updateUserForm.value)\"\n>\n  <div mat-dialog-content>\n    <div class=\"error-display\" *ngIf=\"errorMessage\">\n      <h5>{{ errorMessage }}</h5>\n    </div>\n    <mat-form-field class=\"forms-field\" appearance=\"fill\">\n      <mat-label>Name</mat-label>\n      <input matInput formControlName=\"name\" name=\"name\" required />\n      <mat-hint>Put your name</mat-hint>\n    </mat-form-field>\n  </div>\n  <div align=\"end\" mat-dialog-actions>\n    <button\n      (click)=\"closeDialog()\"\n      type=\"button\"\n      color=\"warn\"\n      mat-stroked-button\n      [disabled]=\"dialogRef.disableClose\"\n    >\n      Cancel</button\n    ><button\n      [disabled]=\"!updateUserForm.valid || dialogRef.disableClose\"\n      color=\"primary\"\n      mat-flat-button\n    >\n      Update\n    </button>\n  </div>\n</form>\n", styles: [".forms-field{width:100%;margin-bottom:1rem}.error-display{margin:1rem 0;background-color:#ffab1098;padding:.5rem;border-radius:.25rem}.error-display h5{margin:0;font-size:16px}.select-role{display:grid;grid-template-columns:auto .15fr;grid-gap:.5rem;gap:.5rem;margin-bottom:1rem}.select-role button{height:59.5px}.roles-list{display:grid;grid-template-columns:auto .1fr;grid-gap:.5rem;gap:.5rem;margin-bottom:1rem}.roles-list .role-title{border-radius:.25rem;background-color:#82c7ff44;padding:1rem}.roles-list .role-title h3{margin:0}\n"], components: [{ type: i4.MatFormField, selector: "mat-form-field", inputs: ["color", "appearance", "hideRequiredMarker", "hintLabel", "floatLabel"], exportAs: ["matFormField"] }, { type: i3.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }], directives: [{ type: i1$1.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { type: i2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i1$1.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }, { type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.MatLabel, selector: "mat-label" }, { type: i10.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i4.MatHint, selector: "mat-hint", inputs: ["align", "id"] }, { type: i1$1.MatDialogActions, selector: "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: UpdateClientComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-update-client', template: "<h2 mat-dialog-title>Update Client {{ client.name }}</h2>\n<form\n  [formGroup]=\"updateUserForm\"\n  (ngSubmit)=\"updateUser(updateUserForm.value)\"\n>\n  <div mat-dialog-content>\n    <div class=\"error-display\" *ngIf=\"errorMessage\">\n      <h5>{{ errorMessage }}</h5>\n    </div>\n    <mat-form-field class=\"forms-field\" appearance=\"fill\">\n      <mat-label>Name</mat-label>\n      <input matInput formControlName=\"name\" name=\"name\" required />\n      <mat-hint>Put your name</mat-hint>\n    </mat-form-field>\n  </div>\n  <div align=\"end\" mat-dialog-actions>\n    <button\n      (click)=\"closeDialog()\"\n      type=\"button\"\n      color=\"warn\"\n      mat-stroked-button\n      [disabled]=\"dialogRef.disableClose\"\n    >\n      Cancel</button\n    ><button\n      [disabled]=\"!updateUserForm.valid || dialogRef.disableClose\"\n      color=\"primary\"\n      mat-flat-button\n    >\n      Update\n    </button>\n  </div>\n</form>\n", styles: [".forms-field{width:100%;margin-bottom:1rem}.error-display{margin:1rem 0;background-color:#ffab1098;padding:.5rem;border-radius:.25rem}.error-display h5{margin:0;font-size:16px}.select-role{display:grid;grid-template-columns:auto .15fr;grid-gap:.5rem;gap:.5rem;margin-bottom:1rem}.select-role button{height:59.5px}.roles-list{display:grid;grid-template-columns:auto .1fr;grid-gap:.5rem;gap:.5rem;margin-bottom:1rem}.roles-list .role-title{border-radius:.25rem;background-color:#82c7ff44;padding:1rem}.roles-list .role-title h3{margin:0}\n"] }]
        }], ctorParameters: function () { return [{ type: i2.FormBuilder }, { type: i1$1.MatDialogRef }, { type: NodebootOauth2StarterService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_DIALOG_DATA]
                }] }]; } });

class ViewClientRolesComponent {
    constructor(dialogRef, client) {
        this.dialogRef = dialogRef;
        this.client = client;
        this.userTitle = `${client.name} roles`;
    }
    ngOnInit() { }
    closeDialog() {
        this.dialogRef.close();
    }
}
ViewClientRolesComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ViewClientRolesComponent, deps: [{ token: i1$1.MatDialogRef }, { token: MAT_DIALOG_DATA }], target: i0.ɵɵFactoryTarget.Component });
ViewClientRolesComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: ViewClientRolesComponent, selector: "lib-view-client-roles", ngImport: i0, template: "<h2 class=\"primary-color\" mat-dialog-title>{{ userTitle }}</h2>\n<div mat-dialog-content>\n  <div class=\"accordion-container\">\n    <mat-accordion>\n      <mat-expansion-panel *ngFor=\"let role of client.roles\">\n        <mat-expansion-panel-header>\n          <mat-panel-title> {{ role.identifier }} </mat-panel-title>\n        </mat-expansion-panel-header>\n        <h4>Grouped by application resource</h4>\n        <mat-list>\n          <div *ngFor=\"let option of role.resources\">\n            <div mat-subheader>{{ option.applicationResourceName }}</div>\n            <mat-list-item *ngFor=\"let allowed of option.allowed\">\n              <mat-icon mat-list-icon>vpn_key</mat-icon>\n              <div mat-line>\n                {{ option.applicationResourceName }}:{{ allowed }}\n              </div>\n            </mat-list-item>\n            <mat-divider></mat-divider>\n          </div>\n        </mat-list>\n      </mat-expansion-panel>\n    </mat-accordion>\n  </div>\n</div>\n<div align=\"end\" mat-dialog-actions>\n  <button\n    (click)=\"closeDialog()\"\n    type=\"button\"\n    color=\"primary\"\n    mat-stroked-button\n  >\n    Ok\n  </button>\n</div>\n", styles: [""], components: [{ type: i2$1.MatExpansionPanel, selector: "mat-expansion-panel", inputs: ["disabled", "expanded", "hideToggle", "togglePosition"], outputs: ["opened", "closed", "expandedChange", "afterExpand", "afterCollapse"], exportAs: ["matExpansionPanel"] }, { type: i2$1.MatExpansionPanelHeader, selector: "mat-expansion-panel-header", inputs: ["tabIndex", "expandedHeight", "collapsedHeight"] }, { type: i3$1.MatList, selector: "mat-list, mat-action-list", inputs: ["disableRipple", "disabled"], exportAs: ["matList"] }, { type: i3$1.MatListItem, selector: "mat-list-item, a[mat-list-item], button[mat-list-item]", inputs: ["disableRipple", "disabled"], exportAs: ["matListItem"] }, { type: i4$1.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { type: i5.MatDivider, selector: "mat-divider", inputs: ["vertical", "inset"] }, { type: i3.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }], directives: [{ type: i1$1.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { type: i1$1.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }, { type: i2$1.MatAccordion, selector: "mat-accordion", inputs: ["multi", "hideToggle", "displayMode", "togglePosition"], exportAs: ["matAccordion"] }, { type: i8.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2$1.MatExpansionPanelTitle, selector: "mat-panel-title" }, { type: i3$1.MatListSubheaderCssMatStyler, selector: "[mat-subheader], [matSubheader]" }, { type: i3$1.MatListIconCssMatStyler, selector: "[mat-list-icon], [matListIcon]" }, { type: i6.MatLine, selector: "[mat-line], [matLine]" }, { type: i1$1.MatDialogActions, selector: "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ViewClientRolesComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-view-client-roles', template: "<h2 class=\"primary-color\" mat-dialog-title>{{ userTitle }}</h2>\n<div mat-dialog-content>\n  <div class=\"accordion-container\">\n    <mat-accordion>\n      <mat-expansion-panel *ngFor=\"let role of client.roles\">\n        <mat-expansion-panel-header>\n          <mat-panel-title> {{ role.identifier }} </mat-panel-title>\n        </mat-expansion-panel-header>\n        <h4>Grouped by application resource</h4>\n        <mat-list>\n          <div *ngFor=\"let option of role.resources\">\n            <div mat-subheader>{{ option.applicationResourceName }}</div>\n            <mat-list-item *ngFor=\"let allowed of option.allowed\">\n              <mat-icon mat-list-icon>vpn_key</mat-icon>\n              <div mat-line>\n                {{ option.applicationResourceName }}:{{ allowed }}\n              </div>\n            </mat-list-item>\n            <mat-divider></mat-divider>\n          </div>\n        </mat-list>\n      </mat-expansion-panel>\n    </mat-accordion>\n  </div>\n</div>\n<div align=\"end\" mat-dialog-actions>\n  <button\n    (click)=\"closeDialog()\"\n    type=\"button\"\n    color=\"primary\"\n    mat-stroked-button\n  >\n    Ok\n  </button>\n</div>\n", styles: [""] }]
        }], ctorParameters: function () { return [{ type: i1$1.MatDialogRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_DIALOG_DATA]
                }] }]; } });

class ShowNewTokenComponent {
    constructor(dialogRef, security) {
        this.dialogRef = dialogRef;
        this.security = security;
        this.hide = true;
    }
    ngOnInit() { }
    closeDialog() {
        this.dialogRef.close();
    }
}
ShowNewTokenComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ShowNewTokenComponent, deps: [{ token: i1$1.MatDialogRef }, { token: MAT_DIALOG_DATA }], target: i0.ɵɵFactoryTarget.Component });
ShowNewTokenComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: ShowNewTokenComponent, selector: "lib-show-new-token", ngImport: i0, template: "<h2 mat-dialog-title>Client Access Token</h2>\n<div mat-dialog-content>\n  <mat-form-field class=\"full-width\" appearance=\"fill\">\n    <mat-label>Access Token</mat-label>\n    <input disabled matInput [value]=\"security.access_token\" />\n    <button\n      matTooltip=\"Copy token\"\n      mat-icon-button\n      matSuffix\n      ngxClipboard\n      [cbContent]=\"security.access_token\"\n      [attr.aria-label]=\"'Copy Token'\"\n    >\n      <mat-icon matSuffix>file_copy</mat-icon>\n    </button>\n  </mat-form-field>\n</div>\n<div align=\"end\" mat-dialog-actions>\n  <button (click)=\"closeDialog()\" type=\"button\" color=\"warn\" mat-stroked-button>\n    Close\n  </button>\n</div>\n", styles: [".full-width{width:100%}\n"], components: [{ type: i4.MatFormField, selector: "mat-form-field", inputs: ["color", "appearance", "hideRequiredMarker", "hintLabel", "floatLabel"], exportAs: ["matFormField"] }, { type: i3.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { type: i4$1.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }], directives: [{ type: i1$1.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { type: i1$1.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }, { type: i4.MatLabel, selector: "mat-label" }, { type: i10.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { type: i6$2.MatTooltip, selector: "[matTooltip]", exportAs: ["matTooltip"] }, { type: i4.MatSuffix, selector: "[matSuffix]" }, { type: i7$1.ClipboardDirective, selector: "[ngxClipboard]", inputs: ["ngxClipboard", "container", "cbContent", "cbSuccessMsg"], outputs: ["cbOnSuccess", "cbOnError"] }, { type: i1$1.MatDialogActions, selector: "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ShowNewTokenComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-show-new-token', template: "<h2 mat-dialog-title>Client Access Token</h2>\n<div mat-dialog-content>\n  <mat-form-field class=\"full-width\" appearance=\"fill\">\n    <mat-label>Access Token</mat-label>\n    <input disabled matInput [value]=\"security.access_token\" />\n    <button\n      matTooltip=\"Copy token\"\n      mat-icon-button\n      matSuffix\n      ngxClipboard\n      [cbContent]=\"security.access_token\"\n      [attr.aria-label]=\"'Copy Token'\"\n    >\n      <mat-icon matSuffix>file_copy</mat-icon>\n    </button>\n  </mat-form-field>\n</div>\n<div align=\"end\" mat-dialog-actions>\n  <button (click)=\"closeDialog()\" type=\"button\" color=\"warn\" mat-stroked-button>\n    Close\n  </button>\n</div>\n", styles: [".full-width{width:100%}\n"] }]
        }], ctorParameters: function () { return [{ type: i1$1.MatDialogRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_DIALOG_DATA]
                }] }]; } });

class OauthStarterClientComponent {
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
OauthStarterClientComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: OauthStarterClientComponent, deps: [{ token: NodebootOauth2StarterService }, { token: i1$1.MatDialog }], target: i0.ɵɵFactoryTarget.Component });
OauthStarterClientComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: OauthStarterClientComponent, selector: "lib-oauth-starter-client", viewQueries: [{ propertyName: "paginator", first: true, predicate: MatPaginator, descendants: true }, { propertyName: "sort", first: true, predicate: MatSort, descendants: true }], ngImport: i0, template: "<div class=\"client-container\">\n  <div class=\"client-head\">\n    <h1 class=\"client-title\">Clients</h1>\n    <span class=\"separator\"></span>\n    <button (click)=\"openCreateClientDialog()\" color=\"accent\" mat-flat-button>\n      Add Client\n    </button>\n  </div>\n  <div class=\"client-body\">\n    <div class=\"container-table mat-elevation-z8\">\n      <div class=\"loading-shade\" *ngIf=\"isLoadingResults\">\n        <mat-spinner *ngIf=\"isLoadingResults\"></mat-spinner>\n      </div>\n\n      <div class=\"example-table-container\">\n        <table\n          mat-table\n          [dataSource]=\"clients\"\n          class=\"client-table\"\n          matSort\n          matSortActive=\"id\"\n          matSortDisableClear\n          matSortDirection=\"asc\"\n        >\n          <ng-container matColumnDef=\"id\">\n            <th mat-sort-header mat-header-cell *matHeaderCellDef>id</th>\n            <td mat-cell *matCellDef=\"let row\">{{ row.id }}</td>\n          </ng-container>\n\n          <ng-container matColumnDef=\"name\">\n            <th mat-header-cell *matHeaderCellDef>Name</th>\n            <td mat-cell *matCellDef=\"let row\">{{ row.name }}</td>\n          </ng-container>\n\n          <ng-container matColumnDef=\"identifier\">\n            <th mat-header-cell *matHeaderCellDef>Identifier</th>\n            <td mat-cell *matCellDef=\"let row\">{{ row.identifier }}</td>\n          </ng-container>\n\n          <ng-container matColumnDef=\"clientSecret\">\n            <th mat-header-cell *matHeaderCellDef>Secret</th>\n            <td class=\"roles-column\" mat-cell *matCellDef=\"let row\">\n              <button (click)=\"openShowSecretComponent(row)\" mat-stroked-button>\n                Secret Key\n              </button>\n            </td>\n          </ng-container>\n\n          <ng-container matColumnDef=\"accessToken\">\n            <th mat-header-cell *matHeaderCellDef>Access Token</th>\n            <td class=\"roles-column\" mat-cell *matCellDef=\"let row\">\n              <button\n                (click)=\"generateNewLongLiveToken(row)\"\n                mat-stroked-button\n                *ngIf=\"!row.hasLongLiveToken\"\n              >\n                Generate Long Live\n              </button>\n              <button\n                *ngIf=\"row.hasLongLiveToken\"\n                color=\"warn\"\n                (click)=\"removeLongLiveToken(row)\"\n                mat-stroked-button\n              >\n                Remove Long Live\n              </button>\n            </td>\n          </ng-container>\n\n          <ng-container matColumnDef=\"roles\">\n            <th mat-header-cell *matHeaderCellDef>Roles</th>\n            <td class=\"roles-column\" mat-cell *matCellDef=\"let row\">\n              <button (click)=\"openViewRolesDialog(row)\" mat-stroked-button>\n                View Roles\n              </button>\n              <button\n                [disabled]=\"row.identifier === 'admin'\"\n                (click)=\"openUpdateRolesDialog(row)\"\n                mat-stroked-button\n              >\n                Update Roles\n              </button>\n            </td>\n          </ng-container>\n\n          <ng-container matColumnDef=\"edit\">\n            <th mat-header-cell *matHeaderCellDef></th>\n            <td class=\"actions-column\" mat-cell *matCellDef=\"let row\">\n              <button\n                *ngIf=\"!row.revoked\"\n                color=\"primary\"\n                [disabled]=\"row.identifier === 'admin'\"\n                mat-stroked-button\n                (click)=\"revokeClient(row)\"\n              >\n                Revoke Client\n              </button>\n              <button\n                *ngIf=\"row.revoked\"\n                color=\"primary\"\n                [disabled]=\"row.identifier === 'admin'\"\n                mat-stroked-button\n                (click)=\"ratifyClient(row)\"\n              >\n                Ratify Client\n              </button>\n              <button\n                color=\"primary\"\n                [disabled]=\"row.identifier === 'admin'\"\n                mat-stroked-button\n                (click)=\"openUpdateClientDialog(row)\"\n              >\n                Edit Client\n              </button>\n              <button\n                color=\"warn\"\n                [disabled]=\"row.identifier === 'admin'\"\n                mat-stroked-button\n                (click)=\"openDialogDeleteClient(row)\"\n              >\n                Delete Client\n              </button>\n            </td>\n          </ng-container>\n\n          <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n          <tr mat-row *matRowDef=\"let row; columns: displayedColumns\"></tr>\n        </table>\n      </div>\n\n      <mat-paginator [length]=\"resultsLength\" [pageSize]=\"20\"></mat-paginator>\n    </div>\n  </div>\n</div>\n<div *ngIf=\"wholePageLoading\" class=\"loading-full\">\n  <mat-spinner></mat-spinner>\n</div>\n", styles: [".client-container .client-head{display:flex;margin-bottom:2rem}.client-container .client-head .separator{flex:1 0}.client-container .client-head .client-title{margin:0;font-size:32px}.client-container table{width:100%;overflow-x:auto}.client-container table th,.client-container table td{min-width:80px}.client-container table .roles-column button:last-child{margin-left:.5rem}.client-container table .actions-column{text-align:end}.client-container table .actions-column button{margin-left:.5rem}.client-container .container-table{position:relative}.client-container .loading-shade{position:absolute;top:0;left:0;bottom:56px;right:0;background:rgba(0,0,0,.15);z-index:1;display:flex;align-items:center;justify-content:center}.loading-full{pointer-events:all;z-index:99999;border:none;margin:0;padding:0;width:100%;height:100%;top:0px;left:0px;cursor:wait;position:fixed;background-color:#0009}\n"], components: [{ type: i3.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { type: i4$2.MatSpinner, selector: "mat-spinner", inputs: ["color"] }, { type: i5$2.MatTable, selector: "mat-table, table[mat-table]", exportAs: ["matTable"] }, { type: i6$1.MatSortHeader, selector: "[mat-sort-header]", inputs: ["disabled", "mat-sort-header", "arrowPosition", "start", "sortActionDescription", "disableClear"], exportAs: ["matSortHeader"] }, { type: i5$2.MatHeaderRow, selector: "mat-header-row, tr[mat-header-row]", exportAs: ["matHeaderRow"] }, { type: i5$2.MatRow, selector: "mat-row, tr[mat-row]", exportAs: ["matRow"] }, { type: i7.MatPaginator, selector: "mat-paginator", inputs: ["disabled"], exportAs: ["matPaginator"] }], directives: [{ type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6$1.MatSort, selector: "[matSort]", inputs: ["matSortDisabled", "matSortActive", "matSortStart", "matSortDirection", "matSortDisableClear"], outputs: ["matSortChange"], exportAs: ["matSort"] }, { type: i5$2.MatColumnDef, selector: "[matColumnDef]", inputs: ["sticky", "matColumnDef"] }, { type: i5$2.MatHeaderCellDef, selector: "[matHeaderCellDef]" }, { type: i5$2.MatHeaderCell, selector: "mat-header-cell, th[mat-header-cell]" }, { type: i5$2.MatCellDef, selector: "[matCellDef]" }, { type: i5$2.MatCell, selector: "mat-cell, td[mat-cell]" }, { type: i5$2.MatHeaderRowDef, selector: "[matHeaderRowDef]", inputs: ["matHeaderRowDef", "matHeaderRowDefSticky"] }, { type: i5$2.MatRowDef, selector: "[matRowDef]", inputs: ["matRowDefColumns", "matRowDefWhen"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: OauthStarterClientComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-oauth-starter-client', template: "<div class=\"client-container\">\n  <div class=\"client-head\">\n    <h1 class=\"client-title\">Clients</h1>\n    <span class=\"separator\"></span>\n    <button (click)=\"openCreateClientDialog()\" color=\"accent\" mat-flat-button>\n      Add Client\n    </button>\n  </div>\n  <div class=\"client-body\">\n    <div class=\"container-table mat-elevation-z8\">\n      <div class=\"loading-shade\" *ngIf=\"isLoadingResults\">\n        <mat-spinner *ngIf=\"isLoadingResults\"></mat-spinner>\n      </div>\n\n      <div class=\"example-table-container\">\n        <table\n          mat-table\n          [dataSource]=\"clients\"\n          class=\"client-table\"\n          matSort\n          matSortActive=\"id\"\n          matSortDisableClear\n          matSortDirection=\"asc\"\n        >\n          <ng-container matColumnDef=\"id\">\n            <th mat-sort-header mat-header-cell *matHeaderCellDef>id</th>\n            <td mat-cell *matCellDef=\"let row\">{{ row.id }}</td>\n          </ng-container>\n\n          <ng-container matColumnDef=\"name\">\n            <th mat-header-cell *matHeaderCellDef>Name</th>\n            <td mat-cell *matCellDef=\"let row\">{{ row.name }}</td>\n          </ng-container>\n\n          <ng-container matColumnDef=\"identifier\">\n            <th mat-header-cell *matHeaderCellDef>Identifier</th>\n            <td mat-cell *matCellDef=\"let row\">{{ row.identifier }}</td>\n          </ng-container>\n\n          <ng-container matColumnDef=\"clientSecret\">\n            <th mat-header-cell *matHeaderCellDef>Secret</th>\n            <td class=\"roles-column\" mat-cell *matCellDef=\"let row\">\n              <button (click)=\"openShowSecretComponent(row)\" mat-stroked-button>\n                Secret Key\n              </button>\n            </td>\n          </ng-container>\n\n          <ng-container matColumnDef=\"accessToken\">\n            <th mat-header-cell *matHeaderCellDef>Access Token</th>\n            <td class=\"roles-column\" mat-cell *matCellDef=\"let row\">\n              <button\n                (click)=\"generateNewLongLiveToken(row)\"\n                mat-stroked-button\n                *ngIf=\"!row.hasLongLiveToken\"\n              >\n                Generate Long Live\n              </button>\n              <button\n                *ngIf=\"row.hasLongLiveToken\"\n                color=\"warn\"\n                (click)=\"removeLongLiveToken(row)\"\n                mat-stroked-button\n              >\n                Remove Long Live\n              </button>\n            </td>\n          </ng-container>\n\n          <ng-container matColumnDef=\"roles\">\n            <th mat-header-cell *matHeaderCellDef>Roles</th>\n            <td class=\"roles-column\" mat-cell *matCellDef=\"let row\">\n              <button (click)=\"openViewRolesDialog(row)\" mat-stroked-button>\n                View Roles\n              </button>\n              <button\n                [disabled]=\"row.identifier === 'admin'\"\n                (click)=\"openUpdateRolesDialog(row)\"\n                mat-stroked-button\n              >\n                Update Roles\n              </button>\n            </td>\n          </ng-container>\n\n          <ng-container matColumnDef=\"edit\">\n            <th mat-header-cell *matHeaderCellDef></th>\n            <td class=\"actions-column\" mat-cell *matCellDef=\"let row\">\n              <button\n                *ngIf=\"!row.revoked\"\n                color=\"primary\"\n                [disabled]=\"row.identifier === 'admin'\"\n                mat-stroked-button\n                (click)=\"revokeClient(row)\"\n              >\n                Revoke Client\n              </button>\n              <button\n                *ngIf=\"row.revoked\"\n                color=\"primary\"\n                [disabled]=\"row.identifier === 'admin'\"\n                mat-stroked-button\n                (click)=\"ratifyClient(row)\"\n              >\n                Ratify Client\n              </button>\n              <button\n                color=\"primary\"\n                [disabled]=\"row.identifier === 'admin'\"\n                mat-stroked-button\n                (click)=\"openUpdateClientDialog(row)\"\n              >\n                Edit Client\n              </button>\n              <button\n                color=\"warn\"\n                [disabled]=\"row.identifier === 'admin'\"\n                mat-stroked-button\n                (click)=\"openDialogDeleteClient(row)\"\n              >\n                Delete Client\n              </button>\n            </td>\n          </ng-container>\n\n          <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n          <tr mat-row *matRowDef=\"let row; columns: displayedColumns\"></tr>\n        </table>\n      </div>\n\n      <mat-paginator [length]=\"resultsLength\" [pageSize]=\"20\"></mat-paginator>\n    </div>\n  </div>\n</div>\n<div *ngIf=\"wholePageLoading\" class=\"loading-full\">\n  <mat-spinner></mat-spinner>\n</div>\n", styles: [".client-container .client-head{display:flex;margin-bottom:2rem}.client-container .client-head .separator{flex:1 0}.client-container .client-head .client-title{margin:0;font-size:32px}.client-container table{width:100%;overflow-x:auto}.client-container table th,.client-container table td{min-width:80px}.client-container table .roles-column button:last-child{margin-left:.5rem}.client-container table .actions-column{text-align:end}.client-container table .actions-column button{margin-left:.5rem}.client-container .container-table{position:relative}.client-container .loading-shade{position:absolute;top:0;left:0;bottom:56px;right:0;background:rgba(0,0,0,.15);z-index:1;display:flex;align-items:center;justify-content:center}.loading-full{pointer-events:all;z-index:99999;border:none;margin:0;padding:0;width:100%;height:100%;top:0px;left:0px;cursor:wait;position:fixed;background-color:#0009}\n"] }]
        }], ctorParameters: function () { return [{ type: NodebootOauth2StarterService }, { type: i1$1.MatDialog }]; }, propDecorators: { paginator: [{
                type: ViewChild,
                args: [MatPaginator]
            }], sort: [{
                type: ViewChild,
                args: [MatSort]
            }] } });

class ApplicationOptionsComponent {
    constructor(dialogRef, formBuilder, nbService, resource) {
        this.dialogRef = dialogRef;
        this.formBuilder = formBuilder;
        this.nbService = nbService;
        this.resource = resource;
        this.options = [];
        this.optionsList = [];
        this.hidePassword = true;
        this.optionsList = [...resource.allowed];
        this.addResourceOptionForm = this.formBuilder.group({
            name: this.formBuilder.control('', Validators.compose([
                Validators.pattern(/^[a-zA-Z0-9_\.\-\/\s]+$/),
                Validators.minLength(1),
                Validators.maxLength(40),
            ])),
        });
    }
    ngOnInit() { }
    isBasicOption(allowed) {
        const basicOptions = ['*', 'create', 'select', 'update', 'delete'];
        const indexOfAllowed = basicOptions.indexOf(allowed);
        if (indexOfAllowed === -1)
            return false;
        return true;
    }
    addOptionToList() {
        const currentNameValue = this.addResourceOptionForm.get('name')?.value || '';
        if (currentNameValue === '')
            return;
        const indexOfCurrent = this.optionsList.findIndex((option) => option.allowed.toLowerCase() === currentNameValue.toLowerCase());
        if (indexOfCurrent === -1 &&
            this.addResourceOptionForm.get('name')?.valid) {
            this.optionsList.push({
                id: 0,
                allowed: this.addResourceOptionForm.get('name')?.value,
            });
            this.addResourceOptionForm.get('name')?.reset();
        }
    }
    removeFromOptionList(optionToRemove) {
        const indexToRemove = this.optionsList.findIndex((option) => option.allowed.toLowerCase() === optionToRemove.allowed.toLowerCase());
        this.optionsList.splice(indexToRemove, 1);
    }
    closeDialog() {
        this.dialogRef.close();
    }
    updateResourceOptions() {
        this.nbService
            .updateResourceOptions(this.resource.id, this.optionsList, this.resource.allowed)
            .subscribe({
            error: (err) => {
                this.dialogRef.disableClose = false;
                if (err.error) {
                    this.errorMessage = err.error.message;
                }
                else {
                    this.errorMessage = 'Unknown Error';
                }
            },
            next: () => {
                this.dialogRef.close(true);
            },
        });
    }
}
ApplicationOptionsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ApplicationOptionsComponent, deps: [{ token: i1$1.MatDialogRef }, { token: i2.FormBuilder }, { token: NodebootOauth2StarterService }, { token: MAT_DIALOG_DATA }], target: i0.ɵɵFactoryTarget.Component });
ApplicationOptionsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: ApplicationOptionsComponent, selector: "lib-application-options", ngImport: i0, template: "<h2 mat-dialog-title>Resource options</h2>\n<form [formGroup]=\"addResourceOptionForm\" (ngSubmit)=\"updateResourceOptions()\">\n  <div mat-dialog-content>\n    <div class=\"error-display\" *ngIf=\"errorMessage\">\n      <h5>{{ errorMessage }}</h5>\n    </div>\n    <div class=\"select-role\">\n      <mat-form-field class=\"forms-field\" appearance=\"fill\">\n        <mat-label>New Option</mat-label>\n        <input matInput formControlName=\"name\" name=\"name\" />\n        <mat-hint>Resource option</mat-hint>\n      </mat-form-field>\n      <button\n        [disabled]=\"!addResourceOptionForm.valid\"\n        type=\"button\"\n        (click)=\"addOptionToList()\"\n        mat-stroked-button\n      >\n        +\n      </button>\n    </div>\n    <div class=\"options-list-container\">\n      <div *ngFor=\"let option of optionsList\" class=\"roles-list\">\n        <div class=\"role-title\">\n          <h3>{{ option.allowed }}</h3>\n        </div>\n        <button\n          [disabled]=\"isBasicOption(option.allowed)\"\n          (click)=\"removeFromOptionList(option)\"\n          color=\"warn\"\n          type=\"button\"\n          mat-stroked-button\n        >\n          -\n        </button>\n      </div>\n    </div>\n  </div>\n\n  <div align=\"end\" mat-dialog-actions>\n    <button\n      (click)=\"closeDialog()\"\n      type=\"button\"\n      color=\"warn\"\n      mat-stroked-button\n      [disabled]=\"dialogRef.disableClose\"\n    >\n      Cancel</button\n    ><button\n      [disabled]=\"!addResourceOptionForm.valid || optionsList.length === 0\"\n      color=\"primary\"\n      mat-flat-button\n    >\n      Update\n    </button>\n  </div>\n</form>\n", styles: [".forms-field{width:100%;margin-bottom:1rem}.error-display{margin:1rem 0;background-color:#ffab1098;padding:.5rem;border-radius:.25rem}.error-display h5{margin:0;font-size:16px}.select-role{display:grid;grid-template-columns:auto .15fr;grid-gap:.5rem;gap:.5rem;margin-bottom:1rem}.select-role button{height:59.5px}.roles-list{display:grid;grid-template-columns:auto .1fr;grid-gap:.5rem;gap:.5rem;margin-bottom:1rem}.roles-list .role-title{border-radius:.25rem;background-color:#82c7ff44;padding:1rem}.roles-list .role-title h3{margin:0}.options-list-container{max-height:400px}\n"], components: [{ type: i4.MatFormField, selector: "mat-form-field", inputs: ["color", "appearance", "hideRequiredMarker", "hintLabel", "floatLabel"], exportAs: ["matFormField"] }, { type: i3.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }], directives: [{ type: i1$1.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { type: i2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i1$1.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }, { type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.MatLabel, selector: "mat-label" }, { type: i10.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { type: i4.MatHint, selector: "mat-hint", inputs: ["align", "id"] }, { type: i8.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1$1.MatDialogActions, selector: "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ApplicationOptionsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-application-options', template: "<h2 mat-dialog-title>Resource options</h2>\n<form [formGroup]=\"addResourceOptionForm\" (ngSubmit)=\"updateResourceOptions()\">\n  <div mat-dialog-content>\n    <div class=\"error-display\" *ngIf=\"errorMessage\">\n      <h5>{{ errorMessage }}</h5>\n    </div>\n    <div class=\"select-role\">\n      <mat-form-field class=\"forms-field\" appearance=\"fill\">\n        <mat-label>New Option</mat-label>\n        <input matInput formControlName=\"name\" name=\"name\" />\n        <mat-hint>Resource option</mat-hint>\n      </mat-form-field>\n      <button\n        [disabled]=\"!addResourceOptionForm.valid\"\n        type=\"button\"\n        (click)=\"addOptionToList()\"\n        mat-stroked-button\n      >\n        +\n      </button>\n    </div>\n    <div class=\"options-list-container\">\n      <div *ngFor=\"let option of optionsList\" class=\"roles-list\">\n        <div class=\"role-title\">\n          <h3>{{ option.allowed }}</h3>\n        </div>\n        <button\n          [disabled]=\"isBasicOption(option.allowed)\"\n          (click)=\"removeFromOptionList(option)\"\n          color=\"warn\"\n          type=\"button\"\n          mat-stroked-button\n        >\n          -\n        </button>\n      </div>\n    </div>\n  </div>\n\n  <div align=\"end\" mat-dialog-actions>\n    <button\n      (click)=\"closeDialog()\"\n      type=\"button\"\n      color=\"warn\"\n      mat-stroked-button\n      [disabled]=\"dialogRef.disableClose\"\n    >\n      Cancel</button\n    ><button\n      [disabled]=\"!addResourceOptionForm.valid || optionsList.length === 0\"\n      color=\"primary\"\n      mat-flat-button\n    >\n      Update\n    </button>\n  </div>\n</form>\n", styles: [".forms-field{width:100%;margin-bottom:1rem}.error-display{margin:1rem 0;background-color:#ffab1098;padding:.5rem;border-radius:.25rem}.error-display h5{margin:0;font-size:16px}.select-role{display:grid;grid-template-columns:auto .15fr;grid-gap:.5rem;gap:.5rem;margin-bottom:1rem}.select-role button{height:59.5px}.roles-list{display:grid;grid-template-columns:auto .1fr;grid-gap:.5rem;gap:.5rem;margin-bottom:1rem}.roles-list .role-title{border-radius:.25rem;background-color:#82c7ff44;padding:1rem}.roles-list .role-title h3{margin:0}.options-list-container{max-height:400px}\n"] }]
        }], ctorParameters: function () { return [{ type: i1$1.MatDialogRef }, { type: i2.FormBuilder }, { type: NodebootOauth2StarterService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_DIALOG_DATA]
                }] }]; } });

class CreateApplicationResourceComponent {
    constructor(dialogRef, formBuilder, nbService) {
        this.dialogRef = dialogRef;
        this.formBuilder = formBuilder;
        this.nbService = nbService;
        this.applications = [];
        this.hidePassword = true;
        this.loadingResult = false;
        this.nbService.getApplications().subscribe({
            error: (err) => {
                if (err.error) {
                    this.errorMessage = err.error.message;
                }
                else {
                    this.errorMessage = 'Unknown Error';
                }
                this.applications = [];
            },
            next: (res) => {
                this.applications = res.content || [];
            },
        });
        this.createResourceForm = this.formBuilder.group({
            resourceIdentifier: this.formBuilder.control('', Validators.compose([
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(45),
                Validators.pattern(/^[a-zA-Z0-9_\.\-\/]+$/),
            ])),
            application: this.formBuilder.control('', Validators.compose([Validators.required, Validators.min(1)])),
        });
    }
    ngOnInit() { }
    createResource(createResourceForm) {
        this.loadingResult = true;
        this.nbService
            .createResource(createResourceForm.resourceIdentifier, createResourceForm.application)
            .subscribe({
            error: (err) => {
                this.dialogRef.disableClose = false;
                if (err.error) {
                    this.errorMessage = err.error.message;
                }
                else {
                    this.errorMessage = 'Unknown Error';
                }
            },
            next: () => {
                this.dialogRef.close(true);
            },
            complete: () => {
                this.loadingResult = false;
            },
        });
    }
    closeDialog() {
        this.dialogRef.close();
    }
}
CreateApplicationResourceComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: CreateApplicationResourceComponent, deps: [{ token: i1$1.MatDialogRef }, { token: i2.FormBuilder }, { token: NodebootOauth2StarterService }], target: i0.ɵɵFactoryTarget.Component });
CreateApplicationResourceComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: CreateApplicationResourceComponent, selector: "lib-create-application-resource", ngImport: i0, template: "<h2 mat-dialog-title>Create Application Resource</h2>\n<form\n  [formGroup]=\"createResourceForm\"\n  (ngSubmit)=\"createResource(createResourceForm.value)\"\n>\n  <div mat-dialog-content>\n    <div class=\"error-display\" *ngIf=\"errorMessage\">\n      <h5>{{ errorMessage }}</h5>\n    </div>\n    <mat-form-field class=\"forms-field\" appearance=\"fill\">\n      <mat-label>Identifier</mat-label>\n      <input\n        matInput\n        formControlName=\"resourceIdentifier\"\n        name=\"resourceIdentifier\"\n        required\n      />\n      <mat-hint>The resource name</mat-hint>\n    </mat-form-field>\n    <mat-form-field class=\"forms-field\" appearance=\"fill\">\n      <mat-label>Select A Application</mat-label>\n      <mat-select name=\"application\" formControlName=\"application\">\n        <mat-option\n          [value]=\"application.id\"\n          *ngFor=\"let application of applications\"\n          >{{ application.identifier }}</mat-option\n        >\n      </mat-select>\n      <mat-hint>Select an application</mat-hint>\n    </mat-form-field>\n  </div>\n  <div align=\"end\" mat-dialog-actions>\n    <button\n      (click)=\"closeDialog()\"\n      type=\"button\"\n      color=\"warn\"\n      mat-stroked-button\n      [disabled]=\"dialogRef.disableClose\"\n    >\n      Cancel</button\n    ><button\n      [disabled]=\"!createResourceForm.valid || loadingResult\"\n      color=\"primary\"\n      mat-flat-button\n    >\n      Create\n    </button>\n  </div>\n</form>\n", styles: [".forms-field{width:100%}\n"], components: [{ type: i4.MatFormField, selector: "mat-form-field", inputs: ["color", "appearance", "hideRequiredMarker", "hintLabel", "floatLabel"], exportAs: ["matFormField"] }, { type: i5$1.MatSelect, selector: "mat-select", inputs: ["disabled", "disableRipple", "tabIndex"], exportAs: ["matSelect"] }, { type: i6.MatOption, selector: "mat-option", exportAs: ["matOption"] }, { type: i3.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }], directives: [{ type: i1$1.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { type: i2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i1$1.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }, { type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.MatLabel, selector: "mat-label" }, { type: i10.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i4.MatHint, selector: "mat-hint", inputs: ["align", "id"] }, { type: i8.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1$1.MatDialogActions, selector: "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: CreateApplicationResourceComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-create-application-resource', template: "<h2 mat-dialog-title>Create Application Resource</h2>\n<form\n  [formGroup]=\"createResourceForm\"\n  (ngSubmit)=\"createResource(createResourceForm.value)\"\n>\n  <div mat-dialog-content>\n    <div class=\"error-display\" *ngIf=\"errorMessage\">\n      <h5>{{ errorMessage }}</h5>\n    </div>\n    <mat-form-field class=\"forms-field\" appearance=\"fill\">\n      <mat-label>Identifier</mat-label>\n      <input\n        matInput\n        formControlName=\"resourceIdentifier\"\n        name=\"resourceIdentifier\"\n        required\n      />\n      <mat-hint>The resource name</mat-hint>\n    </mat-form-field>\n    <mat-form-field class=\"forms-field\" appearance=\"fill\">\n      <mat-label>Select A Application</mat-label>\n      <mat-select name=\"application\" formControlName=\"application\">\n        <mat-option\n          [value]=\"application.id\"\n          *ngFor=\"let application of applications\"\n          >{{ application.identifier }}</mat-option\n        >\n      </mat-select>\n      <mat-hint>Select an application</mat-hint>\n    </mat-form-field>\n  </div>\n  <div align=\"end\" mat-dialog-actions>\n    <button\n      (click)=\"closeDialog()\"\n      type=\"button\"\n      color=\"warn\"\n      mat-stroked-button\n      [disabled]=\"dialogRef.disableClose\"\n    >\n      Cancel</button\n    ><button\n      [disabled]=\"!createResourceForm.valid || loadingResult\"\n      color=\"primary\"\n      mat-flat-button\n    >\n      Create\n    </button>\n  </div>\n</form>\n", styles: [".forms-field{width:100%}\n"] }]
        }], ctorParameters: function () { return [{ type: i1$1.MatDialogRef }, { type: i2.FormBuilder }, { type: NodebootOauth2StarterService }]; } });

class DeleteApplicationResourceComponent {
    constructor(dialogRef, nbService, resource) {
        this.dialogRef = dialogRef;
        this.nbService = nbService;
        this.resource = resource;
        this.loadingResult = false;
    }
    ngOnInit() { }
    delete() {
        this.loadingResult = true;
        this.dialogRef.disableClose = true;
        this.nbService.deleteResource(this.resource.id).subscribe({
            error: (err) => {
                this.dialogRef.disableClose = false;
                if (err.error) {
                    this.errorMessage = err.error.message;
                }
                else {
                    this.errorMessage = 'Unknown Error';
                }
            },
            next: () => {
                this.dialogRef.close(true);
            },
            complete: () => {
                this.loadingResult = false;
            },
        });
    }
    closeDialog() {
        this.dialogRef.close();
    }
}
DeleteApplicationResourceComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: DeleteApplicationResourceComponent, deps: [{ token: i1$1.MatDialogRef }, { token: NodebootOauth2StarterService }, { token: MAT_DIALOG_DATA }], target: i0.ɵɵFactoryTarget.Component });
DeleteApplicationResourceComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: DeleteApplicationResourceComponent, selector: "lib-delete-application-resource", ngImport: i0, template: "<h2 mat-dialog-title>Delete Resource {{ resource.applicationResourceName }}</h2>\n<div mat-dialog-content>\n  <div class=\"error-display\" *ngIf=\"errorMessage\">\n    <h5>{{ errorMessage }}</h5>\n  </div>\n  <p>Are you sure?</p>\n</div>\n<div align=\"end\" mat-dialog-actions>\n  <button\n    (click)=\"closeDialog()\"\n    type=\"button\"\n    color=\"warn\"\n    mat-stroked-button\n    [disabled]=\"dialogRef.disableClose\"\n  >\n    Cancel</button\n  ><button\n    (click)=\"delete()\"\n    type=\"button\"\n    color=\"primary\"\n    mat-flat-button\n    [disabled]=\"dialogRef.disableClose\"\n  >\n    Delete\n  </button>\n</div>\n", styles: [""], components: [{ type: i3.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }], directives: [{ type: i1$1.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { type: i1$1.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }, { type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1$1.MatDialogActions, selector: "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: DeleteApplicationResourceComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-delete-application-resource', template: "<h2 mat-dialog-title>Delete Resource {{ resource.applicationResourceName }}</h2>\n<div mat-dialog-content>\n  <div class=\"error-display\" *ngIf=\"errorMessage\">\n    <h5>{{ errorMessage }}</h5>\n  </div>\n  <p>Are you sure?</p>\n</div>\n<div align=\"end\" mat-dialog-actions>\n  <button\n    (click)=\"closeDialog()\"\n    type=\"button\"\n    color=\"warn\"\n    mat-stroked-button\n    [disabled]=\"dialogRef.disableClose\"\n  >\n    Cancel</button\n  ><button\n    (click)=\"delete()\"\n    type=\"button\"\n    color=\"primary\"\n    mat-flat-button\n    [disabled]=\"dialogRef.disableClose\"\n  >\n    Delete\n  </button>\n</div>\n", styles: [""] }]
        }], ctorParameters: function () { return [{ type: i1$1.MatDialogRef }, { type: NodebootOauth2StarterService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_DIALOG_DATA]
                }] }]; } });

class OauthStarterApplicationResourceComponent {
    constructor(nbService, dialog) {
        this.nbService = nbService;
        this.dialog = dialog;
        this.displayedColumns = [
            'id',
            'applicationResourceName',
            'options',
            'delete',
        ];
        this.masterResources = [
            'OAUTH2_global',
            'OAUTH2_user',
            'OAUTH2_client',
            'OAUTH2_application',
            'OAUTH2_role',
            'OAUTH2_option',
        ];
        this.resultsLength = 0;
        this.isLoadingResults = true;
        this.reload = new BehaviorSubject(0);
    }
    ngOnDestroy() {
        this.userDataSubscription?.unsubscribe();
        this.sort.sortChange.complete();
    }
    ngAfterViewInit() {
        this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
        this.userDataSubscription = merge(this.sort.sortChange, this.paginator.page, this.reload)
            .pipe(startWith({}), switchMap(() => {
            this.errorMessage = undefined;
            this.isLoadingResults = true;
            return this.nbService.getResources(this.paginator.pageIndex, this.sort.direction).pipe(catchError((err) => {
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
            this.resources = data;
        });
    }
    ngOnInit() { }
    openCreateAppResourceDialog() {
        const createResourceOptionsDialogRef = this.dialog.open(CreateApplicationResourceComponent, {
            width: '600px',
            maxHeight: '70vh',
        });
        createResourceOptionsDialogRef
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
    openDeleteResourceDialog(resource) {
        const deleteResourceOptionsDialogRef = this.dialog.open(DeleteApplicationResourceComponent, {
            width: '600px',
            maxHeight: '70vh',
            data: resource,
        });
        deleteResourceOptionsDialogRef
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
    openOptionsDialog(resource) {
        const updateResourceOptionsDialogRef = this.dialog.open(ApplicationOptionsComponent, {
            width: '600px',
            maxHeight: '70vh',
            data: resource,
        });
        updateResourceOptionsDialogRef
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
OauthStarterApplicationResourceComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: OauthStarterApplicationResourceComponent, deps: [{ token: NodebootOauth2StarterService }, { token: i1$1.MatDialog }], target: i0.ɵɵFactoryTarget.Component });
OauthStarterApplicationResourceComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: OauthStarterApplicationResourceComponent, selector: "lib-oauth-starter-application-resource", viewQueries: [{ propertyName: "paginator", first: true, predicate: MatPaginator, descendants: true }, { propertyName: "sort", first: true, predicate: MatSort, descendants: true }], ngImport: i0, template: "<div class=\"role-container\">\n  <div class=\"role-head\">\n    <h1 class=\"role-title\">Applications Resources</h1>\n    <span class=\"separator\"></span>\n    <button\n      (click)=\"openCreateAppResourceDialog()\"\n      color=\"accent\"\n      mat-flat-button\n    >\n      Add Resource\n    </button>\n  </div>\n  <div class=\"role-body\">\n    <div class=\"container-table mat-elevation-z8\">\n      <div class=\"loading-shade\" *ngIf=\"isLoadingResults\">\n        <mat-spinner *ngIf=\"isLoadingResults\"></mat-spinner>\n      </div>\n      <div class=\"example-table-container\">\n        <table\n          mat-table\n          [dataSource]=\"resources\"\n          class=\"user-table\"\n          matSort\n          matSortActive=\"id\"\n          matSortDisableClear\n          matSortDirection=\"asc\"\n        >\n          <ng-container matColumnDef=\"id\">\n            <th mat-sort-header mat-header-cell *matHeaderCellDef>id</th>\n            <td mat-cell *matCellDef=\"let row\">{{ row.id }}</td>\n          </ng-container>\n\n          <ng-container matColumnDef=\"applicationResourceName\">\n            <th mat-header-cell *matHeaderCellDef>Name</th>\n            <td mat-cell *matCellDef=\"let row\">\n              {{ row.applicationResourceName }}\n            </td>\n          </ng-container>\n\n          <ng-container matColumnDef=\"options\">\n            <th mat-header-cell *matHeaderCellDef>Resource Options</th>\n            <td class=\"roles-column\" mat-cell *matCellDef=\"let row\">\n              <button\n                [disabled]=\"\n                  masterResources.indexOf(row.applicationResourceName) !== -1\n                \"\n                (click)=\"openOptionsDialog(row)\"\n                mat-stroked-button\n              >\n                Options\n              </button>\n            </td>\n          </ng-container>\n\n          <ng-container matColumnDef=\"delete\">\n            <th mat-header-cell *matHeaderCellDef></th>\n            <td class=\"actions-column\" mat-cell *matCellDef=\"let row\">\n              <button\n                color=\"warn\"\n                [disabled]=\"\n                  masterResources.indexOf(row.applicationResourceName) !== -1\n                \"\n                mat-stroked-button\n                (click)=\"openDeleteResourceDialog(row)\"\n              >\n                Delete Resource\n              </button>\n            </td>\n          </ng-container>\n\n          <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n          <tr mat-row *matRowDef=\"let row; columns: displayedColumns\"></tr>\n        </table>\n      </div>\n\n      <mat-paginator\n        [length]=\"resultsLength\"\n        [pageSize]=\"20\"\n        aria-label=\"Select page of GitHub search results\"\n      ></mat-paginator>\n    </div>\n  </div>\n</div>\n", styles: [".role-container .role-head{display:flex;margin-bottom:2rem}.role-container .role-head .separator{flex:1 0}.role-container .role-head .role-title{margin:0;font-size:32px}.role-container table{width:100%}.role-container table th,.role-container table td{width:20%}.role-container table .roles-column button:last-child{margin-left:.5rem}.role-container table .actions-column{text-align:end}.role-container table .actions-column button:last-child{margin-left:.5rem}.role-container .container-table{position:relative}.role-container .loading-shade{position:absolute;top:0;left:0;bottom:56px;right:0;background:rgba(0,0,0,.15);z-index:1;display:flex;align-items:center;justify-content:center}\n"], components: [{ type: i3.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { type: i4$2.MatSpinner, selector: "mat-spinner", inputs: ["color"] }, { type: i5$2.MatTable, selector: "mat-table, table[mat-table]", exportAs: ["matTable"] }, { type: i6$1.MatSortHeader, selector: "[mat-sort-header]", inputs: ["disabled", "mat-sort-header", "arrowPosition", "start", "sortActionDescription", "disableClear"], exportAs: ["matSortHeader"] }, { type: i5$2.MatHeaderRow, selector: "mat-header-row, tr[mat-header-row]", exportAs: ["matHeaderRow"] }, { type: i5$2.MatRow, selector: "mat-row, tr[mat-row]", exportAs: ["matRow"] }, { type: i7.MatPaginator, selector: "mat-paginator", inputs: ["disabled"], exportAs: ["matPaginator"] }], directives: [{ type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6$1.MatSort, selector: "[matSort]", inputs: ["matSortDisabled", "matSortActive", "matSortStart", "matSortDirection", "matSortDisableClear"], outputs: ["matSortChange"], exportAs: ["matSort"] }, { type: i5$2.MatColumnDef, selector: "[matColumnDef]", inputs: ["sticky", "matColumnDef"] }, { type: i5$2.MatHeaderCellDef, selector: "[matHeaderCellDef]" }, { type: i5$2.MatHeaderCell, selector: "mat-header-cell, th[mat-header-cell]" }, { type: i5$2.MatCellDef, selector: "[matCellDef]" }, { type: i5$2.MatCell, selector: "mat-cell, td[mat-cell]" }, { type: i5$2.MatHeaderRowDef, selector: "[matHeaderRowDef]", inputs: ["matHeaderRowDef", "matHeaderRowDefSticky"] }, { type: i5$2.MatRowDef, selector: "[matRowDef]", inputs: ["matRowDefColumns", "matRowDefWhen"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: OauthStarterApplicationResourceComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-oauth-starter-application-resource', template: "<div class=\"role-container\">\n  <div class=\"role-head\">\n    <h1 class=\"role-title\">Applications Resources</h1>\n    <span class=\"separator\"></span>\n    <button\n      (click)=\"openCreateAppResourceDialog()\"\n      color=\"accent\"\n      mat-flat-button\n    >\n      Add Resource\n    </button>\n  </div>\n  <div class=\"role-body\">\n    <div class=\"container-table mat-elevation-z8\">\n      <div class=\"loading-shade\" *ngIf=\"isLoadingResults\">\n        <mat-spinner *ngIf=\"isLoadingResults\"></mat-spinner>\n      </div>\n      <div class=\"example-table-container\">\n        <table\n          mat-table\n          [dataSource]=\"resources\"\n          class=\"user-table\"\n          matSort\n          matSortActive=\"id\"\n          matSortDisableClear\n          matSortDirection=\"asc\"\n        >\n          <ng-container matColumnDef=\"id\">\n            <th mat-sort-header mat-header-cell *matHeaderCellDef>id</th>\n            <td mat-cell *matCellDef=\"let row\">{{ row.id }}</td>\n          </ng-container>\n\n          <ng-container matColumnDef=\"applicationResourceName\">\n            <th mat-header-cell *matHeaderCellDef>Name</th>\n            <td mat-cell *matCellDef=\"let row\">\n              {{ row.applicationResourceName }}\n            </td>\n          </ng-container>\n\n          <ng-container matColumnDef=\"options\">\n            <th mat-header-cell *matHeaderCellDef>Resource Options</th>\n            <td class=\"roles-column\" mat-cell *matCellDef=\"let row\">\n              <button\n                [disabled]=\"\n                  masterResources.indexOf(row.applicationResourceName) !== -1\n                \"\n                (click)=\"openOptionsDialog(row)\"\n                mat-stroked-button\n              >\n                Options\n              </button>\n            </td>\n          </ng-container>\n\n          <ng-container matColumnDef=\"delete\">\n            <th mat-header-cell *matHeaderCellDef></th>\n            <td class=\"actions-column\" mat-cell *matCellDef=\"let row\">\n              <button\n                color=\"warn\"\n                [disabled]=\"\n                  masterResources.indexOf(row.applicationResourceName) !== -1\n                \"\n                mat-stroked-button\n                (click)=\"openDeleteResourceDialog(row)\"\n              >\n                Delete Resource\n              </button>\n            </td>\n          </ng-container>\n\n          <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n          <tr mat-row *matRowDef=\"let row; columns: displayedColumns\"></tr>\n        </table>\n      </div>\n\n      <mat-paginator\n        [length]=\"resultsLength\"\n        [pageSize]=\"20\"\n        aria-label=\"Select page of GitHub search results\"\n      ></mat-paginator>\n    </div>\n  </div>\n</div>\n", styles: [".role-container .role-head{display:flex;margin-bottom:2rem}.role-container .role-head .separator{flex:1 0}.role-container .role-head .role-title{margin:0;font-size:32px}.role-container table{width:100%}.role-container table th,.role-container table td{width:20%}.role-container table .roles-column button:last-child{margin-left:.5rem}.role-container table .actions-column{text-align:end}.role-container table .actions-column button:last-child{margin-left:.5rem}.role-container .container-table{position:relative}.role-container .loading-shade{position:absolute;top:0;left:0;bottom:56px;right:0;background:rgba(0,0,0,.15);z-index:1;display:flex;align-items:center;justify-content:center}\n"] }]
        }], ctorParameters: function () { return [{ type: NodebootOauth2StarterService }, { type: i1$1.MatDialog }]; }, propDecorators: { paginator: [{
                type: ViewChild,
                args: [MatPaginator]
            }], sort: [{
                type: ViewChild,
                args: [MatSort]
            }] } });

class RevokeTokenComponent {
    constructor() { }
    ngOnInit() {
    }
}
RevokeTokenComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: RevokeTokenComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
RevokeTokenComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: RevokeTokenComponent, selector: "lib-revoke-token", ngImport: i0, template: "<p>revoke-token works!</p>\n", styles: [""] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: RevokeTokenComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-revoke-token', template: "<p>revoke-token works!</p>\n", styles: [""] }]
        }], ctorParameters: function () { return []; } });

class NodebootOauth2StarterModule {
}
NodebootOauth2StarterModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NodebootOauth2StarterModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NodebootOauth2StarterModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NodebootOauth2StarterModule, declarations: [NodebootOauth2StarterComponent,
        OauthStarterUsersComponent,
        OauthStarterUserProfileComponent,
        ViewUserRolesComponent,
        CreateUserComponent,
        UpdateUserComponent,
        DeleteUserComponent,
        AddUserRolesComponent,
        OauthStarterRolesComponent,
        DeleteRoleComponent,
        OptionsComponent,
        CreateRoleComponent,
        OauthStarterClientComponent,
        DeleteClientComponent,
        UpdateClientComponent,
        AddClientRolesComponent,
        ViewClientRolesComponent,
        ShowTokenComponent,
        CreateClientComponent,
        ChangePasswordComponent,
        OauthStarterApplicationResourceComponent,
        DeleteApplicationResourceComponent,
        ApplicationOptionsComponent,
        CreateApplicationResourceComponent,
        ShowNewTokenComponent,
        ShowSecretComponent,
        RevokeTokenComponent], imports: [LibraryMaterials,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        ClipboardModule], exports: [NodebootOauth2StarterComponent,
        OauthStarterUsersComponent,
        OauthStarterUserProfileComponent,
        OauthStarterRolesComponent,
        OauthStarterClientComponent,
        OauthStarterApplicationResourceComponent] });
NodebootOauth2StarterModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NodebootOauth2StarterModule, imports: [[
            LibraryMaterials,
            HttpClientModule,
            FormsModule,
            ReactiveFormsModule,
            CommonModule,
            ClipboardModule,
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NodebootOauth2StarterModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        NodebootOauth2StarterComponent,
                        OauthStarterUsersComponent,
                        OauthStarterUserProfileComponent,
                        ViewUserRolesComponent,
                        CreateUserComponent,
                        UpdateUserComponent,
                        DeleteUserComponent,
                        AddUserRolesComponent,
                        OauthStarterRolesComponent,
                        DeleteRoleComponent,
                        OptionsComponent,
                        CreateRoleComponent,
                        OauthStarterClientComponent,
                        DeleteClientComponent,
                        UpdateClientComponent,
                        AddClientRolesComponent,
                        ViewClientRolesComponent,
                        ShowTokenComponent,
                        CreateClientComponent,
                        ChangePasswordComponent,
                        OauthStarterApplicationResourceComponent,
                        DeleteApplicationResourceComponent,
                        ApplicationOptionsComponent,
                        CreateApplicationResourceComponent,
                        ShowNewTokenComponent,
                        ShowSecretComponent,
                        RevokeTokenComponent,
                    ],
                    imports: [
                        LibraryMaterials,
                        HttpClientModule,
                        FormsModule,
                        ReactiveFormsModule,
                        CommonModule,
                        ClipboardModule,
                    ],
                    exports: [
                        NodebootOauth2StarterComponent,
                        OauthStarterUsersComponent,
                        OauthStarterUserProfileComponent,
                        OauthStarterRolesComponent,
                        OauthStarterClientComponent,
                        OauthStarterApplicationResourceComponent,
                    ],
                }]
        }] });

/*
 * Public API Surface of nodeboot-oauth2-starter
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NodebootOauth2StarterComponent, NodebootOauth2StarterModule, NodebootOauth2StarterService, OauthStarterApplicationResourceComponent, OauthStarterClientComponent, OauthStarterRolesComponent, OauthStarterUserProfileComponent, OauthStarterUsersComponent };
//# sourceMappingURL=nodeboot-oauth2-starter-ui.mjs.map
