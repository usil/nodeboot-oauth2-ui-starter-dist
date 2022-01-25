import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/dialog";
import * as i2 from "@angular/forms";
import * as i3 from "../../nodeboot-oauth2-starter.service";
import * as i4 from "@angular/material/form-field";
import * as i5 from "@angular/material/select";
import * as i6 from "@angular/material/core";
import * as i7 from "@angular/material/button";
import * as i8 from "@angular/common";
import * as i9 from "@angular/material/input";
export class CreateClientComponent {
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
            identifier: this.formBuilder.control('', Validators.compose([
                Validators.required,
                Validators.pattern(/^[a-zA-Z0-9_\.\-\/]+$/),
                Validators.minLength(4),
                Validators.maxLength(20),
            ])),
            role: this.formBuilder.control(''),
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
        createClientData.role = undefined;
        this.dialogRef.disableClose = true;
        this.nbService
            .createClient({ ...createClientData, roles: this.rolesList })
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
CreateClientComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: CreateClientComponent, deps: [{ token: i1.MatDialogRef }, { token: i2.FormBuilder }, { token: i3.NodebootOauth2StarterService }], target: i0.ɵɵFactoryTarget.Component });
CreateClientComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: CreateClientComponent, selector: "lib-create-client", ngImport: i0, template: "<h2 mat-dialog-title>Create Client</h2>\n<form\n  [formGroup]=\"createClientForm\"\n  (ngSubmit)=\"createClient(createClientForm.value)\"\n>\n  <div mat-dialog-content>\n    <div class=\"error-display\" *ngIf=\"errorMessage\">\n      <h5>{{ errorMessage }}</h5>\n    </div>\n    <mat-form-field class=\"forms-field\" appearance=\"fill\">\n      <mat-label>Name</mat-label>\n      <input matInput formControlName=\"name\" name=\"name\" required />\n      <mat-hint>Put the client name</mat-hint>\n    </mat-form-field>\n    <mat-form-field class=\"forms-field\" appearance=\"fill\">\n      <mat-label>Identifier</mat-label>\n      <input\n        matInput\n        placeholder=\"admin01\"\n        formControlName=\"identifier\"\n        name=\"identifier\"\n        required\n      />\n      <mat-hint>Client unique identifier</mat-hint>\n    </mat-form-field>\n    <div class=\"select-role\">\n      <mat-form-field class=\"forms-field\" appearance=\"fill\">\n        <mat-label>Select A Role</mat-label>\n        <mat-select name=\"role\" formControlName=\"role\">\n          <mat-option [value]=\"role\" *ngFor=\"let role of roles\">{{\n            role.identifier\n          }}</mat-option>\n        </mat-select>\n        <mat-hint>Select a role and add it</mat-hint>\n      </mat-form-field>\n      <button type=\"button\" (click)=\"addRoleToList()\" mat-stroked-button>\n        +\n      </button>\n    </div>\n    <div *ngFor=\"let role of rolesList\" class=\"roles-list\">\n      <div class=\"role-title\">\n        <h3>{{ role.identifier }}</h3>\n      </div>\n      <button\n        (click)=\"removeRoleToList(role)\"\n        color=\"warn\"\n        type=\"button\"\n        mat-stroked-button\n      >\n        -\n      </button>\n    </div>\n  </div>\n  <div align=\"end\" mat-dialog-actions>\n    <button\n      (click)=\"closeDialog()\"\n      type=\"button\"\n      color=\"warn\"\n      mat-stroked-button\n      [disabled]=\"dialogRef.disableClose\"\n    >\n      Cancel</button\n    ><button\n      [disabled]=\"!createClientForm.valid || rolesList.length === 0\"\n      color=\"primary\"\n      mat-flat-button\n    >\n      Create\n    </button>\n  </div>\n</form>\n", styles: [".forms-field{width:100%;margin-bottom:1rem}.error-display{margin:1rem 0;background-color:#ffab1098;padding:.5rem;border-radius:.25rem}.error-display h5{margin:0;font-size:16px}.select-role{display:grid;grid-template-columns:auto .15fr;grid-gap:.5rem;gap:.5rem;margin-bottom:1rem}.select-role button{height:59.5px}.roles-list{display:grid;grid-template-columns:auto .1fr;grid-gap:.5rem;gap:.5rem;margin-bottom:1rem}.roles-list .role-title{border-radius:.25rem;background-color:#82c7ff44;padding:1rem}.roles-list .role-title h3{margin:0}\n"], components: [{ type: i4.MatFormField, selector: "mat-form-field", inputs: ["color", "appearance", "hideRequiredMarker", "hintLabel", "floatLabel"], exportAs: ["matFormField"] }, { type: i5.MatSelect, selector: "mat-select", inputs: ["disabled", "disableRipple", "tabIndex"], exportAs: ["matSelect"] }, { type: i6.MatOption, selector: "mat-option", exportAs: ["matOption"] }, { type: i7.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }], directives: [{ type: i1.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { type: i2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i1.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }, { type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.MatLabel, selector: "mat-label" }, { type: i9.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { type: i2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i4.MatHint, selector: "mat-hint", inputs: ["align", "id"] }, { type: i8.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1.MatDialogActions, selector: "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: CreateClientComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-create-client', template: "<h2 mat-dialog-title>Create Client</h2>\n<form\n  [formGroup]=\"createClientForm\"\n  (ngSubmit)=\"createClient(createClientForm.value)\"\n>\n  <div mat-dialog-content>\n    <div class=\"error-display\" *ngIf=\"errorMessage\">\n      <h5>{{ errorMessage }}</h5>\n    </div>\n    <mat-form-field class=\"forms-field\" appearance=\"fill\">\n      <mat-label>Name</mat-label>\n      <input matInput formControlName=\"name\" name=\"name\" required />\n      <mat-hint>Put the client name</mat-hint>\n    </mat-form-field>\n    <mat-form-field class=\"forms-field\" appearance=\"fill\">\n      <mat-label>Identifier</mat-label>\n      <input\n        matInput\n        placeholder=\"admin01\"\n        formControlName=\"identifier\"\n        name=\"identifier\"\n        required\n      />\n      <mat-hint>Client unique identifier</mat-hint>\n    </mat-form-field>\n    <div class=\"select-role\">\n      <mat-form-field class=\"forms-field\" appearance=\"fill\">\n        <mat-label>Select A Role</mat-label>\n        <mat-select name=\"role\" formControlName=\"role\">\n          <mat-option [value]=\"role\" *ngFor=\"let role of roles\">{{\n            role.identifier\n          }}</mat-option>\n        </mat-select>\n        <mat-hint>Select a role and add it</mat-hint>\n      </mat-form-field>\n      <button type=\"button\" (click)=\"addRoleToList()\" mat-stroked-button>\n        +\n      </button>\n    </div>\n    <div *ngFor=\"let role of rolesList\" class=\"roles-list\">\n      <div class=\"role-title\">\n        <h3>{{ role.identifier }}</h3>\n      </div>\n      <button\n        (click)=\"removeRoleToList(role)\"\n        color=\"warn\"\n        type=\"button\"\n        mat-stroked-button\n      >\n        -\n      </button>\n    </div>\n  </div>\n  <div align=\"end\" mat-dialog-actions>\n    <button\n      (click)=\"closeDialog()\"\n      type=\"button\"\n      color=\"warn\"\n      mat-stroked-button\n      [disabled]=\"dialogRef.disableClose\"\n    >\n      Cancel</button\n    ><button\n      [disabled]=\"!createClientForm.valid || rolesList.length === 0\"\n      color=\"primary\"\n      mat-flat-button\n    >\n      Create\n    </button>\n  </div>\n</form>\n", styles: [".forms-field{width:100%;margin-bottom:1rem}.error-display{margin:1rem 0;background-color:#ffab1098;padding:.5rem;border-radius:.25rem}.error-display h5{margin:0;font-size:16px}.select-role{display:grid;grid-template-columns:auto .15fr;grid-gap:.5rem;gap:.5rem;margin-bottom:1rem}.select-role button{height:59.5px}.roles-list{display:grid;grid-template-columns:auto .1fr;grid-gap:.5rem;gap:.5rem;margin-bottom:1rem}.roles-list .role-title{border-radius:.25rem;background-color:#82c7ff44;padding:1rem}.roles-list .role-title h3{margin:0}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.MatDialogRef }, { type: i2.FormBuilder }, { type: i3.NodebootOauth2StarterService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWNsaWVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub2RlYm9vdC1vYXV0aDItc3RhcnRlci9zcmMvbGliL29hdXRoLXN0YXJ0ZXItY2xpZW50L2NyZWF0ZS1jbGllbnQvY3JlYXRlLWNsaWVudC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub2RlYm9vdC1vYXV0aDItc3RhcnRlci9zcmMvbGliL29hdXRoLXN0YXJ0ZXItY2xpZW50L2NyZWF0ZS1jbGllbnQvY3JlYXRlLWNsaWVudC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ2xELE9BQU8sRUFBMEIsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7Ozs7O0FBWXBFLE1BQU0sT0FBTyxxQkFBcUI7SUFRaEMsWUFDUyxTQUE4QyxFQUM3QyxXQUF3QixFQUN4QixTQUF1QztRQUZ4QyxjQUFTLEdBQVQsU0FBUyxDQUFxQztRQUM3QyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixjQUFTLEdBQVQsU0FBUyxDQUE4QjtRQVBqRCxVQUFLLEdBQWdCLEVBQUUsQ0FBQztRQUN4QixjQUFTLEdBQWdCLEVBQUUsQ0FBQztRQUM1QixpQkFBWSxHQUFHLElBQUksQ0FBQztRQU9sQixJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBRSxDQUFDLFNBQVMsQ0FBQztZQUN2QyxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDYixJQUFJLEdBQUcsQ0FBQyxLQUFLLEVBQUU7b0JBQ2IsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztpQkFDdkM7cUJBQU07b0JBQ0wsSUFBSSxDQUFDLFlBQVksR0FBRyxlQUFlLENBQUM7aUJBQ3JDO2dC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QkFDYixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO2lCQUN2QztxQkFBTTtvQkFDTCxJQUFJLENBQUMsWUFBWSxHQUFHLGVBQWUsQ0FBQztpQkFDckM7WUFDSCxDQUFDO1lBQ0QsSUFBSSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ1osSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3BDLENBQUM7U0FDRixDQUFDLENBQUM7SUFDUCxDQUFDOztrSEEvRlUscUJBQXFCO3NHQUFyQixxQkFBcUIseURDYmxDLDhvRUF1RUE7MkZEMURhLHFCQUFxQjtrQkFMakMsU0FBUzsrQkFDRSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQnVpbGRlciwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE1hdERpYWxvZ1JlZiB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQge1xuICBCYXNpY1JvbGUsXG4gIE5vZGVib290T2F1dGgyU3RhcnRlclNlcnZpY2UsXG59IGZyb20gJy4uLy4uL25vZGVib290LW9hdXRoMi1zdGFydGVyLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItY3JlYXRlLWNsaWVudCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9jcmVhdGUtY2xpZW50LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY3JlYXRlLWNsaWVudC5jb21wb25lbnQuc2NzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBDcmVhdGVDbGllbnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBjcmVhdGVDbGllbnRGb3JtOiBGb3JtR3JvdXA7XG4gIGVycm9yTWVzc2FnZSE6IHN0cmluZztcbiAgZXJyb3JNZXNzYWdlUm9sZXMhOiBzdHJpbmc7XG4gIHJvbGVzOiBCYXNpY1JvbGVbXSA9IFtdO1xuICByb2xlc0xpc3Q6IEJhc2ljUm9sZVtdID0gW107XG4gIGhpZGVQYXNzd29yZCA9IHRydWU7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPENyZWF0ZUNsaWVudENvbXBvbmVudD4sXG4gICAgcHJpdmF0ZSBmb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXIsXG4gICAgcHJpdmF0ZSBuYlNlcnZpY2U6IE5vZGVib290T2F1dGgyU3RhcnRlclNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5uYlNlcnZpY2UuZ2V0Um9sZXNCYXNpYygpLnN1YnNjcmliZSh7XG4gICAgICBlcnJvcjogKGVycikgPT4ge1xuICAgICAgICBpZiAoZXJyLmVycm9yKSB7XG4gICAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSBlcnIuZXJyb3IubWVzc2FnZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9ICdVbmtub3duIEVycm9yJztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJvbGVzID0gW107XG4gICAgICB9LFxuICAgICAgbmV4dDogKHJlcykgPT4ge1xuICAgICAgICB0aGlzLnJvbGVzID0gcmVzLmNvbnRlbnQgfHwgW107XG4gICAgICB9LFxuICAgIH0pO1xuICAgIHRoaXMuY3JlYXRlQ2xpZW50Rm9ybSA9IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe1xuICAgICAgbmFtZTogdGhpcy5mb3JtQnVpbGRlci5jb250cm9sKFxuICAgICAgICAnJyxcbiAgICAgICAgVmFsaWRhdG9ycy5jb21wb3NlKFtcbiAgICAgICAgICBWYWxpZGF0b3JzLnJlcXVpcmVkLFxuICAgICAgICAgIFZhbGlkYXRvcnMubWluTGVuZ3RoKDQpLFxuICAgICAgICAgIFZhbGlkYXRvcnMubWF4TGVuZ3RoKDQ1KSxcbiAgICAgICAgICBWYWxpZGF0b3JzLnBhdHRlcm4oL15bYS16QS1aMC05X1xcLlxcLVxcL1xcc10rJC8pLFxuICAgICAgICBdKVxuICAgICAgKSxcbiAgICAgIGlkZW50aWZpZXI6IHRoaXMuZm9ybUJ1aWxkZXIuY29udHJvbChcbiAgICAgICAgJycsXG4gICAgICAgIFZhbGlkYXRvcnMuY29tcG9zZShbXG4gICAgICAgICAgVmFsaWRhdG9ycy5yZXF1aXJlZCxcbiAgICAgICAgICBWYWxpZGF0b3JzLnBhdHRlcm4oL15bYS16QS1aMC05X1xcLlxcLVxcL10rJC8pLFxuICAgICAgICAgIFZhbGlkYXRvcnMubWluTGVuZ3RoKDQpLFxuICAgICAgICAgIFZhbGlkYXRvcnMubWF4TGVuZ3RoKDIwKSxcbiAgICAgICAgXSlcbiAgICAgICksXG4gICAgICByb2xlOiB0aGlzLmZvcm1CdWlsZGVyLmNvbnRyb2woJycpLFxuICAgIH0pO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7fVxuXG4gIGFkZFJvbGVUb0xpc3QoKSB7XG4gICAgY29uc3Qgcm9sZVZhbHVlID0gdGhpcy5jcmVhdGVDbGllbnRGb3JtLmdldCgncm9sZScpPy52YWx1ZTtcbiAgICBpZiAoIXJvbGVWYWx1ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBpbmRleE9mUm9sZSA9IHRoaXMucm9sZXMuaW5kZXhPZihyb2xlVmFsdWUpO1xuICAgIHRoaXMucm9sZXMuc3BsaWNlKGluZGV4T2ZSb2xlLCAxKTtcbiAgICB0aGlzLnJvbGVzTGlzdC5wdXNoKHJvbGVWYWx1ZSk7XG4gICAgdGhpcy5jcmVhdGVDbGllbnRGb3JtLmdldCgncm9sZScpPy5zZXRWYWx1ZSgnJyk7XG4gIH1cblxuICByZW1vdmVSb2xlVG9MaXN0KHJvbGU6IEJhc2ljUm9sZSkge1xuICAgIGNvbnN0IHJvbGVWYWx1ZSA9IHJvbGU7XG4gICAgY29uc3QgaW5kZXhPZlJvbGUgPSB0aGlzLnJvbGVzLmluZGV4T2Yocm9sZVZhbHVlKTtcbiAgICB0aGlzLnJvbGVzTGlzdC5zcGxpY2UoaW5kZXhPZlJvbGUsIDEpO1xuICAgIHRoaXMucm9sZXMucHVzaChyb2xlVmFsdWUpO1xuICB9XG5cbiAgY2xvc2VEaWFsb2coKSB7XG4gICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UoKTtcbiAgfVxuXG4gIGNyZWF0ZUNsaWVudChjcmVhdGVDbGllbnREYXRhOiB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGlkZW50aWZpZXI6IHN0cmluZztcbiAgICByb2xlOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIH0pIHtcbiAgICBjcmVhdGVDbGllbnREYXRhLnJvbGUgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5kaWFsb2dSZWYuZGlzYWJsZUNsb3NlID0gdHJ1ZTtcbiAgICB0aGlzLm5iU2VydmljZVxuICAgICAgLmNyZWF0ZUNsaWVudCh7IC4uLmNyZWF0ZUNsaWVudERhdGEsIHJvbGVzOiB0aGlzLnJvbGVzTGlzdCB9KVxuICAgICAgLnN1YnNjcmliZSh7XG4gICAgICAgIGVycm9yOiAoZXJyKSA9PiB7XG4gICAgICAgICAgdGhpcy5kaWFsb2dSZWYuZGlzYWJsZUNsb3NlID0gZmFsc2U7XG4gICAgICAgICAgaWYgKGVyci5lcnJvcikge1xuICAgICAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSBlcnIuZXJyb3IubWVzc2FnZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSAnVW5rbm93biBFcnJvcic7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBuZXh0OiAocmVzKSA9PiB7XG4gICAgICAgICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UocmVzLmNvbnRlbnQpO1xuICAgICAgICB9LFxuICAgICAgfSk7XG4gIH1cbn1cbiIsIjxoMiBtYXQtZGlhbG9nLXRpdGxlPkNyZWF0ZSBDbGllbnQ8L2gyPlxuPGZvcm1cbiAgW2Zvcm1Hcm91cF09XCJjcmVhdGVDbGllbnRGb3JtXCJcbiAgKG5nU3VibWl0KT1cImNyZWF0ZUNsaWVudChjcmVhdGVDbGllbnRGb3JtLnZhbHVlKVwiXG4+XG4gIDxkaXYgbWF0LWRpYWxvZy1jb250ZW50PlxuICAgIDxkaXYgY2xhc3M9XCJlcnJvci1kaXNwbGF5XCIgKm5nSWY9XCJlcnJvck1lc3NhZ2VcIj5cbiAgICAgIDxoNT57eyBlcnJvck1lc3NhZ2UgfX08L2g1PlxuICAgIDwvZGl2PlxuICAgIDxtYXQtZm9ybS1maWVsZCBjbGFzcz1cImZvcm1zLWZpZWxkXCIgYXBwZWFyYW5jZT1cImZpbGxcIj5cbiAgICAgIDxtYXQtbGFiZWw+TmFtZTwvbWF0LWxhYmVsPlxuICAgICAgPGlucHV0IG1hdElucHV0IGZvcm1Db250cm9sTmFtZT1cIm5hbWVcIiBuYW1lPVwibmFtZVwiIHJlcXVpcmVkIC8+XG4gICAgICA8bWF0LWhpbnQ+UHV0IHRoZSBjbGllbnQgbmFtZTwvbWF0LWhpbnQ+XG4gICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICA8bWF0LWZvcm0tZmllbGQgY2xhc3M9XCJmb3Jtcy1maWVsZFwiIGFwcGVhcmFuY2U9XCJmaWxsXCI+XG4gICAgICA8bWF0LWxhYmVsPklkZW50aWZpZXI8L21hdC1sYWJlbD5cbiAgICAgIDxpbnB1dFxuICAgICAgICBtYXRJbnB1dFxuICAgICAgICBwbGFjZWhvbGRlcj1cImFkbWluMDFcIlxuICAgICAgICBmb3JtQ29udHJvbE5hbWU9XCJpZGVudGlmaWVyXCJcbiAgICAgICAgbmFtZT1cImlkZW50aWZpZXJcIlxuICAgICAgICByZXF1aXJlZFxuICAgICAgLz5cbiAgICAgIDxtYXQtaGludD5DbGllbnQgdW5pcXVlIGlkZW50aWZpZXI8L21hdC1oaW50PlxuICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgPGRpdiBjbGFzcz1cInNlbGVjdC1yb2xlXCI+XG4gICAgICA8bWF0LWZvcm0tZmllbGQgY2xhc3M9XCJmb3Jtcy1maWVsZFwiIGFwcGVhcmFuY2U9XCJmaWxsXCI+XG4gICAgICAgIDxtYXQtbGFiZWw+U2VsZWN0IEEgUm9sZTwvbWF0LWxhYmVsPlxuICAgICAgICA8bWF0LXNlbGVjdCBuYW1lPVwicm9sZVwiIGZvcm1Db250cm9sTmFtZT1cInJvbGVcIj5cbiAgICAgICAgICA8bWF0LW9wdGlvbiBbdmFsdWVdPVwicm9sZVwiICpuZ0Zvcj1cImxldCByb2xlIG9mIHJvbGVzXCI+e3tcbiAgICAgICAgICAgIHJvbGUuaWRlbnRpZmllclxuICAgICAgICAgIH19PC9tYXQtb3B0aW9uPlxuICAgICAgICA8L21hdC1zZWxlY3Q+XG4gICAgICAgIDxtYXQtaGludD5TZWxlY3QgYSByb2xlIGFuZCBhZGQgaXQ8L21hdC1oaW50PlxuICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJhZGRSb2xlVG9MaXN0KClcIiBtYXQtc3Ryb2tlZC1idXR0b24+XG4gICAgICAgICtcbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgKm5nRm9yPVwibGV0IHJvbGUgb2Ygcm9sZXNMaXN0XCIgY2xhc3M9XCJyb2xlcy1saXN0XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwicm9sZS10aXRsZVwiPlxuICAgICAgICA8aDM+e3sgcm9sZS5pZGVudGlmaWVyIH19PC9oMz5cbiAgICAgIDwvZGl2PlxuICAgICAgPGJ1dHRvblxuICAgICAgICAoY2xpY2spPVwicmVtb3ZlUm9sZVRvTGlzdChyb2xlKVwiXG4gICAgICAgIGNvbG9yPVwid2FyblwiXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICBtYXQtc3Ryb2tlZC1idXR0b25cbiAgICAgID5cbiAgICAgICAgLVxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuICA8ZGl2IGFsaWduPVwiZW5kXCIgbWF0LWRpYWxvZy1hY3Rpb25zPlxuICAgIDxidXR0b25cbiAgICAgIChjbGljayk9XCJjbG9zZURpYWxvZygpXCJcbiAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgY29sb3I9XCJ3YXJuXCJcbiAgICAgIG1hdC1zdHJva2VkLWJ1dHRvblxuICAgICAgW2Rpc2FibGVkXT1cImRpYWxvZ1JlZi5kaXNhYmxlQ2xvc2VcIlxuICAgID5cbiAgICAgIENhbmNlbDwvYnV0dG9uXG4gICAgPjxidXR0b25cbiAgICAgIFtkaXNhYmxlZF09XCIhY3JlYXRlQ2xpZW50Rm9ybS52YWxpZCB8fCByb2xlc0xpc3QubGVuZ3RoID09PSAwXCJcbiAgICAgIGNvbG9yPVwicHJpbWFyeVwiXG4gICAgICBtYXQtZmxhdC1idXR0b25cbiAgICA+XG4gICAgICBDcmVhdGVcbiAgICA8L2J1dHRvbj5cbiAgPC9kaXY+XG48L2Zvcm0+XG4iXX0=