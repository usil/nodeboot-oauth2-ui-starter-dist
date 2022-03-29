import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../../nodeboot-oauth2-starter.service";
import * as i3 from "@angular/material/dialog";
import * as i4 from "@angular/material/form-field";
import * as i5 from "@angular/material/select";
import * as i6 from "@angular/material/core";
import * as i7 from "@angular/material/list";
import * as i8 from "@angular/material/button";
import * as i9 from "@angular/common";
import * as i10 from "@angular/material/input";
export class CreateRoleComponent {
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
                    ?.setValue(this.allowedObject[value] || []);
            },
        });
        this.selectedSubscription = this.createRoleForm
            .get('selected')
            ?.valueChanges.subscribe((valueChange) => {
            const currentAllowedObject = this.allowedObject[this.createRoleForm.get('resource')?.value] || [];
            if (valueChange.length === 0 && currentAllowedObject.length === 0)
                return;
            let newOptionEntry;
            if (currentAllowedObject.length === 0) {
                newOptionEntry = valueChange[0];
                this.selectedChange(true, newOptionEntry);
                return;
            }
            if (valueChange.length === 0) {
                newOptionEntry = currentAllowedObject[0];
                this.selectedChange(false, newOptionEntry);
                return;
            }
            if (currentAllowedObject[0].allowed === '*' &&
                valueChange[0].allowed !== '*') {
                newOptionEntry = currentAllowedObject[0];
                this.selectedChange(false, newOptionEntry);
                return;
            }
            if (valueChange[0].allowed === '*') {
                newOptionEntry = valueChange[0];
                this.selectedChange(true, newOptionEntry);
                return;
            }
            if (currentAllowedObject.length > valueChange.length) {
                for (const allowed of currentAllowedObject) {
                    const indexOfAllowed = valueChange.findIndex((v) => v.id === allowed.id);
                    if (indexOfAllowed === -1) {
                        newOptionEntry = allowed;
                        this.selectedChange(false, newOptionEntry);
                        break;
                    }
                }
                return;
            }
            for (const value of valueChange) {
                const indexOfAllowed = currentAllowedObject.findIndex((c) => c.id === value.id);
                if (indexOfAllowed === -1) {
                    newOptionEntry = value;
                    this.selectedChange(true, newOptionEntry);
                    break;
                }
            }
        });
    }
    ngOnDestroy() {
        this.resourceSubscription?.unsubscribe();
        this.selectedSubscription?.unsubscribe();
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
        // const currentAllowedObject =
        //   this.allowedObject[this.createRoleForm.get('resource')?.value];
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
            this.allowedObject[this.createRoleForm.get('resource')?.value] =
                this.createRoleForm.get('selected')?.value;
        }
        else {
            if (this.createRoleForm.get('selected')?.value.length === 0) {
                delete this.allowedObject[this.createRoleForm.get('resource')?.value];
            }
            else {
                this.allowedObject[this.createRoleForm.get('resource')?.value] =
                    this.createRoleForm.get('selected')?.value;
            }
        }
    }
    closeDialog() {
        this.dialogRef.close();
    }
}
CreateRoleComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: CreateRoleComponent, deps: [{ token: i1.FormBuilder }, { token: i2.NodebootOauth2StarterService }, { token: i3.MatDialogRef }], target: i0.ɵɵFactoryTarget.Component });
CreateRoleComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: CreateRoleComponent, selector: "lib-create-role", ngImport: i0, template: "<h2 mat-dialog-title>Create Role</h2>\n<form\n  [formGroup]=\"createRoleForm\"\n  (ngSubmit)=\"createRole(createRoleForm.value)\"\n>\n  <div mat-dialog-content>\n    <div class=\"error-display\" *ngIf=\"errorMessage\">\n      <h5>{{ errorMessage }}</h5>\n    </div>\n    <mat-form-field class=\"forms-field\" appearance=\"fill\">\n      <mat-label>Identifier</mat-label>\n      <input\n        matInput\n        placeholder=\"admin01\"\n        formControlName=\"identifier\"\n        name=\"identifier\"\n        required\n      />\n      <mat-hint>A role identifier</mat-hint>\n    </mat-form-field>\n    <mat-form-field class=\"forms-field\" appearance=\"fill\">\n      <mat-label>Select a resource</mat-label>\n      <mat-select name=\"resource\" formControlName=\"resource\">\n        <mat-option\n          [value]=\"option.applicationResourceName\"\n          *ngFor=\"let option of options\"\n          >{{ option.applicationResourceName }}</mat-option\n        >\n      </mat-select>\n      <mat-hint>Select an application resource</mat-hint>\n    </mat-form-field>\n    <mat-selection-list #allowed formControlName=\"selected\">\n      <mat-list-option\n        [value]=\"allowedL\"\n        [disabled]=\"\n          allowedL.allowed !== '*' &&\n          createRoleForm.get('selected')?.value.length ===\n            allowedShowList.length\n            ? true\n            : false\n        \"\n        *ngFor=\"let allowedL of allowedShowList\"\n      >\n        {{ allowedL.allowed }}\n      </mat-list-option>\n    </mat-selection-list>\n  </div>\n  <div align=\"end\" mat-dialog-actions>\n    <button\n      (click)=\"closeDialog()\"\n      type=\"button\"\n      color=\"warn\"\n      mat-stroked-button\n      [disabled]=\"dialogRef.disableClose\"\n    >\n      Cancel</button\n    ><button\n      [disabled]=\"\n        !createRoleForm.valid || objectKeys(allowedObject).length === 0\n      \"\n      color=\"primary\"\n      mat-flat-button\n    >\n      Create\n    </button>\n  </div>\n</form>\n", styles: [".forms-field{width:100%;margin-bottom:1rem}\n"], components: [{ type: i4.MatFormField, selector: "mat-form-field", inputs: ["color", "appearance", "hideRequiredMarker", "hintLabel", "floatLabel"], exportAs: ["matFormField"] }, { type: i5.MatSelect, selector: "mat-select", inputs: ["disabled", "disableRipple", "tabIndex"], exportAs: ["matSelect"] }, { type: i6.MatOption, selector: "mat-option", exportAs: ["matOption"] }, { type: i7.MatSelectionList, selector: "mat-selection-list", inputs: ["disableRipple", "tabIndex", "color", "compareWith", "disabled", "multiple"], outputs: ["selectionChange"], exportAs: ["matSelectionList"] }, { type: i7.MatListOption, selector: "mat-list-option", inputs: ["disableRipple", "checkboxPosition", "color", "value", "disabled", "selected"], outputs: ["selectedChange"], exportAs: ["matListOption"] }, { type: i8.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }], directives: [{ type: i3.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i3.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }, { type: i9.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.MatLabel, selector: "mat-label" }, { type: i10.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { type: i1.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { type: i4.MatHint, selector: "mat-hint", inputs: ["align", "id"] }, { type: i9.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i3.MatDialogActions, selector: "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: CreateRoleComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-create-role', template: "<h2 mat-dialog-title>Create Role</h2>\n<form\n  [formGroup]=\"createRoleForm\"\n  (ngSubmit)=\"createRole(createRoleForm.value)\"\n>\n  <div mat-dialog-content>\n    <div class=\"error-display\" *ngIf=\"errorMessage\">\n      <h5>{{ errorMessage }}</h5>\n    </div>\n    <mat-form-field class=\"forms-field\" appearance=\"fill\">\n      <mat-label>Identifier</mat-label>\n      <input\n        matInput\n        placeholder=\"admin01\"\n        formControlName=\"identifier\"\n        name=\"identifier\"\n        required\n      />\n      <mat-hint>A role identifier</mat-hint>\n    </mat-form-field>\n    <mat-form-field class=\"forms-field\" appearance=\"fill\">\n      <mat-label>Select a resource</mat-label>\n      <mat-select name=\"resource\" formControlName=\"resource\">\n        <mat-option\n          [value]=\"option.applicationResourceName\"\n          *ngFor=\"let option of options\"\n          >{{ option.applicationResourceName }}</mat-option\n        >\n      </mat-select>\n      <mat-hint>Select an application resource</mat-hint>\n    </mat-form-field>\n    <mat-selection-list #allowed formControlName=\"selected\">\n      <mat-list-option\n        [value]=\"allowedL\"\n        [disabled]=\"\n          allowedL.allowed !== '*' &&\n          createRoleForm.get('selected')?.value.length ===\n            allowedShowList.length\n            ? true\n            : false\n        \"\n        *ngFor=\"let allowedL of allowedShowList\"\n      >\n        {{ allowedL.allowed }}\n      </mat-list-option>\n    </mat-selection-list>\n  </div>\n  <div align=\"end\" mat-dialog-actions>\n    <button\n      (click)=\"closeDialog()\"\n      type=\"button\"\n      color=\"warn\"\n      mat-stroked-button\n      [disabled]=\"dialogRef.disableClose\"\n    >\n      Cancel</button\n    ><button\n      [disabled]=\"\n        !createRoleForm.valid || objectKeys(allowedObject).length === 0\n      \"\n      color=\"primary\"\n      mat-flat-button\n    >\n      Create\n    </button>\n  </div>\n</form>\n", styles: [".forms-field{width:100%;margin-bottom:1rem}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.FormBuilder }, { type: i2.NodebootOauth2StarterService }, { type: i3.MatDialogRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXJvbGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm9kZWJvb3Qtb2F1dGgyLXN0YXJ0ZXIvc3JjL2xpYi9vYXV0aC1zdGFydGVyLXJvbGVzL2NyZWF0ZS1yb2xlL2NyZWF0ZS1yb2xlLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vZGVib290LW9hdXRoMi1zdGFydGVyL3NyYy9saWIvb2F1dGgtc3RhcnRlci1yb2xlcy9jcmVhdGUtcm9sZS9jcmVhdGUtcm9sZS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQTBCLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7Ozs7Ozs7QUFjcEUsTUFBTSxPQUFPLG1CQUFtQjtJQVc5QixZQUNVLFdBQXdCLEVBQ3hCLFNBQXVDLEVBQ3hDLFNBQTRDO1FBRjNDLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLGNBQVMsR0FBVCxTQUFTLENBQThCO1FBQ3hDLGNBQVMsR0FBVCxTQUFTLENBQW1DO1FBWHJELFlBQU8sR0FBZSxFQUFFLENBQUM7UUFDekIsb0JBQWUsR0FBYSxFQUFFLENBQUM7UUFDL0Isa0JBQWEsR0FBNkIsRUFBRSxDQUFDO1FBQzdDLGVBQVUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBVXZCLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxTQUFTLENBQUM7WUFDM0MsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ2IsSUFBSSxHQUFHLENBQUMsS0FBSyxFQUFFO29CQUNiLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7aUJBQ3ZDO3FCQUFNO29CQUNMLElBQUksQ0FBQyxZ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QUssQ0FBQzthQUM5QztTQUNGO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3pCLENBQUM7O2dIQXJMVSxtQkFBbUI7b0dBQW5CLG1CQUFtQix1RENmaEMsaStEQW1FQTsyRkRwRGEsbUJBQW1CO2tCQUwvQixTQUFTOytCQUNFLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUJ1aWxkZXIsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNYXREaWFsb2dSZWYgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBSZXNvdXJjZSxcbiAgT3B0aW9uLFxuICBOb2RlYm9vdE9hdXRoMlN0YXJ0ZXJTZXJ2aWNlLFxufSBmcm9tICcuLi8uLi9ub2RlYm9vdC1vYXV0aDItc3RhcnRlci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGliLWNyZWF0ZS1yb2xlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NyZWF0ZS1yb2xlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY3JlYXRlLXJvbGUuY29tcG9uZW50LnNjc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgQ3JlYXRlUm9sZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgY3JlYXRlUm9sZUZvcm06IEZvcm1Hcm91cDtcbiAgZXJyb3JNZXNzYWdlITogc3RyaW5nO1xuICBvcHRpb25zOiBSZXNvdXJjZVtdID0gW107XG4gIGFsbG93ZWRTaG93TGlzdDogT3B0aW9uW10gPSBbXTtcbiAgYWxsb3dlZE9iamVjdDogUmVjb3JkPHN0cmluZywgT3B0aW9uW10+ID0ge307XG4gIG9iamVjdEtleXMgPSBPYmplY3Qua2V5cztcblxuICBzZWxlY3RlZFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICByZXNvdXJjZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyLFxuICAgIHByaXZhdGUgbmJTZXJ2aWNlOiBOb2RlYm9vdE9hdXRoMlN0YXJ0ZXJTZXJ2aWNlLFxuICAgIHB1YmxpYyBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxDcmVhdGVSb2xlQ29tcG9uZW50PlxuICApIHtcbiAgICB0aGlzLm5iU2VydmljZS5nZXRSZXNvdXJjZXNCYXNpYygpLnN1YnNjcmliZSh7XG4gICAgICBlcnJvcjogKGVycikgPT4ge1xuICAgICAgICBpZiAoZXJyLmVycm9yKSB7XG4gICAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSBlcnIuZXJyb3IubWVzc2FnZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9ICdVbmtub3duIEVycm9yJztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9wdGlvbnMgPSBbXTtcbiAgICAgIH0sXG4gICAgICBuZXh0OiAocmVzKSA9PiB7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IHJlcy5jb250ZW50IHx8IFtdO1xuICAgICAgfSxcbiAgICB9KTtcbiAgICB0aGlzLmNyZWF0ZVJvbGVGb3JtID0gdGhpcy5mb3JtQnVpbGRlci5ncm91cCh7XG4gICAgICBpZGVudGlmaWVyOiB0aGlzLmZvcm1CdWlsZGVyLmNvbnRyb2woXG4gICAgICAgICcnLFxuICAgICAgICBWYWxpZGF0b3JzLmNvbXBvc2UoW1xuICAgICAgICAgIFZhbGlkYXRvcnMucmVxdWlyZWQsXG4gICAgICAgICAgVmFsaWRhdG9ycy5wYXR0ZXJuKC9eW2EtekEtWjAtOV9cXC5cXC1cXC9dKyQvKSxcbiAgICAgICAgICBWYWxpZGF0b3JzLm1pbkxlbmd0aCg0KSxcbiAgICAgICAgICBWYWxpZGF0b3JzLm1heExlbmd0aCgyMCksXG4gICAgICAgIF0pXG4gICAgICApLFxuICAgICAgcmVzb3VyY2U6IHRoaXMuZm9ybUJ1aWxkZXIuY29udHJvbCgnJyksXG4gICAgICBzZWxlY3RlZDogdGhpcy5mb3JtQnVpbGRlci5jb250cm9sKCcnKSxcbiAgICB9KTtcbiAgICB0aGlzLnJlc291cmNlU3Vic2NyaXB0aW9uID0gdGhpcy5jcmVhdGVSb2xlRm9ybVxuICAgICAgLmdldCgncmVzb3VyY2UnKVxuICAgICAgPy52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKHtcbiAgICAgICAgbmV4dDogKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICB0aGlzLmFsbG93ZWRTaG93TGlzdCA9XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuZmluZCgobykgPT4gby5hcHBsaWNhdGlvblJlc291cmNlTmFtZSA9PT0gdmFsdWUpXG4gICAgICAgICAgICAgID8uYWxsb3dlZCB8fCBbXTtcbiAgICAgICAgICB0aGlzLmNyZWF0ZVJvbGVGb3JtXG4gICAgICAgICAgICAuZ2V0KCdzZWxlY3RlZCcpXG4gICAgICAgICAgICA/LnNldFZhbHVlKHRoaXMuYWxsb3dlZE9iamVjdFt2YWx1ZV0gfHwgW10pO1xuICAgICAgICB9LFxuICAgICAgfSkgYXMgU3Vic2NyaXB0aW9uO1xuXG4gICAgdGhpcy5zZWxlY3RlZFN1YnNjcmlwdGlvbiA9IHRoaXMuY3JlYXRlUm9sZUZvcm1cbiAgICAgIC5nZXQoJ3NlbGVjdGVkJylcbiAgICAgID8udmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgodmFsdWVDaGFuZ2U6IE9wdGlvbltdKSA9PiB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRBbGxvd2VkT2JqZWN0ID1cbiAgICAgICAgICB0aGlzLmFsbG93ZWRPYmplY3RbdGhpcy5jcmVhdGVSb2xlRm9ybS5nZXQoJ3Jlc291cmNlJyk/LnZhbHVlXSB8fCBbXTtcblxuICAgICAgICBpZiAodmFsdWVDaGFuZ2UubGVuZ3RoID09PSAwICYmIGN1cnJlbnRBbGxvd2VkT2JqZWN0Lmxlbmd0aCA9PT0gMClcbiAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgbGV0IG5ld09wdGlvbkVudHJ5OiBPcHRpb247XG5cbiAgICAgICAgaWYgKGN1cnJlbnRBbGxvd2VkT2JqZWN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIG5ld09wdGlvbkVudHJ5ID0gdmFsdWVDaGFuZ2VbMF07XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZENoYW5nZSh0cnVlLCBuZXdPcHRpb25FbnRyeSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbHVlQ2hhbmdlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIG5ld09wdGlvbkVudHJ5ID0gY3VycmVudEFsbG93ZWRPYmplY3RbMF07XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZENoYW5nZShmYWxzZSwgbmV3T3B0aW9uRW50cnkpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChcbiAgICAgICAgICBjdXJyZW50QWxsb3dlZE9iamVjdFswXS5hbGxvd2VkID09PSAnKicgJiZcbiAgICAgICAgICB2YWx1ZUNoYW5nZVswXS5hbGxvd2VkICE9PSAnKidcbiAgICAgICAgKSB7XG4gICAgICAgICAgbmV3T3B0aW9uRW50cnkgPSBjdXJyZW50QWxsb3dlZE9iamVjdFswXTtcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkQ2hhbmdlKGZhbHNlLCBuZXdPcHRpb25FbnRyeSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbHVlQ2hhbmdlWzBdLmFsbG93ZWQgPT09ICcqJykge1xuICAgICAgICAgIG5ld09wdGlvbkVudHJ5ID0gdmFsdWVDaGFuZ2VbMF07XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZENoYW5nZSh0cnVlLCBuZXdPcHRpb25FbnRyeSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGN1cnJlbnRBbGxvd2VkT2JqZWN0Lmxlbmd0aCA+IHZhbHVlQ2hhbmdlLmxlbmd0aCkge1xuICAgICAgICAgIGZvciAoY29uc3QgYWxsb3dlZCBvZiBjdXJyZW50QWxsb3dlZE9iamVjdCkge1xuICAgICAgICAgICAgY29uc3QgaW5kZXhPZkFsbG93ZWQgPSB2YWx1ZUNoYW5nZS5maW5kSW5kZXgoXG4gICAgICAgICAgICAgICh2KSA9PiB2LmlkID09PSBhbGxvd2VkLmlkXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBpZiAoaW5kZXhPZkFsbG93ZWQgPT09IC0xKSB7XG4gICAgICAgICAgICAgIG5ld09wdGlvbkVudHJ5ID0gYWxsb3dlZDtcbiAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZENoYW5nZShmYWxzZSwgbmV3T3B0aW9uRW50cnkpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGNvbnN0IHZhbHVlIG9mIHZhbHVlQ2hhbmdlKSB7XG4gICAgICAgICAgY29uc3QgaW5kZXhPZkFsbG93ZWQgPSBjdXJyZW50QWxsb3dlZE9iamVjdC5maW5kSW5kZXgoXG4gICAgICAgICAgICAoYykgPT4gYy5pZCA9PT0gdmFsdWUuaWRcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgaWYgKGluZGV4T2ZBbGxvd2VkID09PSAtMSkge1xuICAgICAgICAgICAgbmV3T3B0aW9uRW50cnkgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDaGFuZ2UodHJ1ZSwgbmV3T3B0aW9uRW50cnkpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KSBhcyBTdWJzY3JpcHRpb247XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnJlc291cmNlU3Vic2NyaXB0aW9uPy51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuc2VsZWN0ZWRTdWJzY3JpcHRpb24/LnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHt9XG5cbiAgY3JlYXRlUm9sZShyb2xlQm9keTogeyBpZGVudGlmaWVyOiBzdHJpbmc7IHJlc291cmNlOiBzdHJpbmcgfCB1bmRlZmluZWQgfSkge1xuICAgIHRoaXMubmJTZXJ2aWNlXG4gICAgICAuY3JlYXRlUm9sZShyb2xlQm9keS5pZGVudGlmaWVyLCB0aGlzLmFsbG93ZWRPYmplY3QpXG4gICAgICAuc3Vic2NyaWJlKHtcbiAgICAgICAgZXJyb3I6IChlcnIpID0+IHtcbiAgICAgICAgICB0aGlzLmRpYWxvZ1JlZi5kaXNhYmxlQ2xvc2UgPSBmYWxzZTtcbiAgICAgICAgICBpZiAoZXJyLmVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IGVyci5lcnJvci5tZXNzYWdlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9ICdVbmtub3duIEVycm9yJztcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG5leHQ6ICgpID0+IHtcbiAgICAgICAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZSh0cnVlKTtcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICB9XG5cbiAgc2VsZWN0ZWRDaGFuZ2Uoc2VsZWN0ZWQ6IGJvb2xlYW4sIHZhbHVlOiBPcHRpb24pIHtcbiAgICAvLyBjb25zdCBjdXJyZW50QWxsb3dlZE9iamVjdCA9XG4gICAgLy8gICB0aGlzLmFsbG93ZWRPYmplY3RbdGhpcy5jcmVhdGVSb2xlRm9ybS5nZXQoJ3Jlc291cmNlJyk/LnZhbHVlXTtcbiAgICBpZiAoXG4gICAgICB2YWx1ZS5hbGxvd2VkID09PSAnKicgJiZcbiAgICAgIHNlbGVjdGVkICYmXG4gICAgICB0aGlzLmNyZWF0ZVJvbGVGb3JtLmdldCgnc2VsZWN0ZWQnKT8udmFsdWUubGVuZ3RoICE9PVxuICAgICAgICB0aGlzLmFsbG93ZWRTaG93TGlzdC5sZW5ndGhcbiAgICApIHtcbiAgICAgIHRoaXMuY3JlYXRlUm9sZUZvcm0uZ2V0KCdzZWxlY3RlZCcpPy5zZXRWYWx1ZSh0aGlzLmFsbG93ZWRTaG93TGlzdCk7XG4gICAgICB0aGlzLmFsbG93ZWRPYmplY3RbdGhpcy5jcmVhdGVSb2xlRm9ybS5nZXQoJ3Jlc291cmNlJyk/LnZhbHVlXSA9IFtcbiAgICAgICAgdGhpcy5hbGxvd2VkU2hvd0xpc3RbMF0sXG4gICAgICBdO1xuICAgIH0gZWxzZSBpZiAodmFsdWUuYWxsb3dlZCA9PT0gJyonICYmICFzZWxlY3RlZCkge1xuICAgICAgY29uc3QgdGVtcG9yYWxBbGxvd2VkID0gWy4uLnRoaXMuYWxsb3dlZFNob3dMaXN0XTtcbiAgICAgIHRlbXBvcmFsQWxsb3dlZC5zaGlmdCgpO1xuICAgICAgdGhpcy5hbGxvd2VkT2JqZWN0W3RoaXMuY3JlYXRlUm9sZUZvcm0uZ2V0KCdyZXNvdXJjZScpPy52YWx1ZV0gPVxuICAgICAgICB0ZW1wb3JhbEFsbG93ZWQ7XG4gICAgfSBlbHNlIGlmIChzZWxlY3RlZCkge1xuICAgICAgdGhpcy5hbGxvd2VkT2JqZWN0W3RoaXMuY3JlYXRlUm9sZUZvcm0uZ2V0KCdyZXNvdXJjZScpPy52YWx1ZV0gPVxuICAgICAgICB0aGlzLmNyZWF0ZVJvbGVGb3JtLmdldCgnc2VsZWN0ZWQnKT8udmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLmNyZWF0ZVJvbGVGb3JtLmdldCgnc2VsZWN0ZWQnKT8udmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmFsbG93ZWRPYmplY3RbdGhpcy5jcmVhdGVSb2xlRm9ybS5nZXQoJ3Jlc291cmNlJyk/LnZhbHVlXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYWxsb3dlZE9iamVjdFt0aGlzLmNyZWF0ZVJvbGVGb3JtLmdldCgncmVzb3VyY2UnKT8udmFsdWVdID1cbiAgICAgICAgICB0aGlzLmNyZWF0ZVJvbGVGb3JtLmdldCgnc2VsZWN0ZWQnKT8udmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY2xvc2VEaWFsb2coKSB7XG4gICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UoKTtcbiAgfVxufVxuIiwiPGgyIG1hdC1kaWFsb2ctdGl0bGU+Q3JlYXRlIFJvbGU8L2gyPlxuPGZvcm1cbiAgW2Zvcm1Hcm91cF09XCJjcmVhdGVSb2xlRm9ybVwiXG4gIChuZ1N1Ym1pdCk9XCJjcmVhdGVSb2xlKGNyZWF0ZVJvbGVGb3JtLnZhbHVlKVwiXG4+XG4gIDxkaXYgbWF0LWRpYWxvZy1jb250ZW50PlxuICAgIDxkaXYgY2xhc3M9XCJlcnJvci1kaXNwbGF5XCIgKm5nSWY9XCJlcnJvck1lc3NhZ2VcIj5cbiAgICAgIDxoNT57eyBlcnJvck1lc3NhZ2UgfX08L2g1PlxuICAgIDwvZGl2PlxuICAgIDxtYXQtZm9ybS1maWVsZCBjbGFzcz1cImZvcm1zLWZpZWxkXCIgYXBwZWFyYW5jZT1cImZpbGxcIj5cbiAgICAgIDxtYXQtbGFiZWw+SWRlbnRpZmllcjwvbWF0LWxhYmVsPlxuICAgICAgPGlucHV0XG4gICAgICAgIG1hdElucHV0XG4gICAgICAgIHBsYWNlaG9sZGVyPVwiYWRtaW4wMVwiXG4gICAgICAgIGZvcm1Db250cm9sTmFtZT1cImlkZW50aWZpZXJcIlxuICAgICAgICBuYW1lPVwiaWRlbnRpZmllclwiXG4gICAgICAgIHJlcXVpcmVkXG4gICAgICAvPlxuICAgICAgPG1hdC1oaW50PkEgcm9sZSBpZGVudGlmaWVyPC9tYXQtaGludD5cbiAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgIDxtYXQtZm9ybS1maWVsZCBjbGFzcz1cImZvcm1zLWZpZWxkXCIgYXBwZWFyYW5jZT1cImZpbGxcIj5cbiAgICAgIDxtYXQtbGFiZWw+U2VsZWN0IGEgcmVzb3VyY2U8L21hdC1sYWJlbD5cbiAgICAgIDxtYXQtc2VsZWN0IG5hbWU9XCJyZXNvdXJjZVwiIGZvcm1Db250cm9sTmFtZT1cInJlc291cmNlXCI+XG4gICAgICAgIDxtYXQtb3B0aW9uXG4gICAgICAgICAgW3ZhbHVlXT1cIm9wdGlvbi5hcHBsaWNhdGlvblJlc291cmNlTmFtZVwiXG4gICAgICAgICAgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBvcHRpb25zXCJcbiAgICAgICAgICA+e3sgb3B0aW9uLmFwcGxpY2F0aW9uUmVzb3VyY2VOYW1lIH19PC9tYXQtb3B0aW9uXG4gICAgICAgID5cbiAgICAgIDwvbWF0LXNlbGVjdD5cbiAgICAgIDxtYXQtaGludD5TZWxlY3QgYW4gYXBwbGljYXRpb24gcmVzb3VyY2U8L21hdC1oaW50PlxuICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgPG1hdC1zZWxlY3Rpb24tbGlzdCAjYWxsb3dlZCBmb3JtQ29udHJvbE5hbWU9XCJzZWxlY3RlZFwiPlxuICAgICAgPG1hdC1saXN0LW9wdGlvblxuICAgICAgICBbdmFsdWVdPVwiYWxsb3dlZExcIlxuICAgICAgICBbZGlzYWJsZWRdPVwiXG4gICAgICAgICAgYWxsb3dlZEwuYWxsb3dlZCAhPT0gJyonICYmXG4gICAgICAgICAgY3JlYXRlUm9sZUZvcm0uZ2V0KCdzZWxlY3RlZCcpPy52YWx1ZS5sZW5ndGggPT09XG4gICAgICAgICAgICBhbGxvd2VkU2hvd0xpc3QubGVuZ3RoXG4gICAgICAgICAgICA/IHRydWVcbiAgICAgICAgICAgIDogZmFsc2VcbiAgICAgICAgXCJcbiAgICAgICAgKm5nRm9yPVwibGV0IGFsbG93ZWRMIG9mIGFsbG93ZWRTaG93TGlzdFwiXG4gICAgICA+XG4gICAgICAgIHt7IGFsbG93ZWRMLmFsbG93ZWQgfX1cbiAgICAgIDwvbWF0LWxpc3Qtb3B0aW9uPlxuICAgIDwvbWF0LXNlbGVjdGlvbi1saXN0PlxuICA8L2Rpdj5cbiAgPGRpdiBhbGlnbj1cImVuZFwiIG1hdC1kaWFsb2ctYWN0aW9ucz5cbiAgICA8YnV0dG9uXG4gICAgICAoY2xpY2spPVwiY2xvc2VEaWFsb2coKVwiXG4gICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgIGNvbG9yPVwid2FyblwiXG4gICAgICBtYXQtc3Ryb2tlZC1idXR0b25cbiAgICAgIFtkaXNhYmxlZF09XCJkaWFsb2dSZWYuZGlzYWJsZUNsb3NlXCJcbiAgICA+XG4gICAgICBDYW5jZWw8L2J1dHRvblxuICAgID48YnV0dG9uXG4gICAgICBbZGlzYWJsZWRdPVwiXG4gICAgICAgICFjcmVhdGVSb2xlRm9ybS52YWxpZCB8fCBvYmplY3RLZXlzKGFsbG93ZWRPYmplY3QpLmxlbmd0aCA9PT0gMFxuICAgICAgXCJcbiAgICAgIGNvbG9yPVwicHJpbWFyeVwiXG4gICAgICBtYXQtZmxhdC1idXR0b25cbiAgICA+XG4gICAgICBDcmVhdGVcbiAgICA8L2J1dHRvbj5cbiAgPC9kaXY+XG48L2Zvcm0+XG4iXX0=