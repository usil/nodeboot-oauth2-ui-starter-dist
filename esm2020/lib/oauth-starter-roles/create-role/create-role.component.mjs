import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../../nodeboot-oauth2-starter.service";
import * as i3 from "@angular/material/dialog";
import * as i4 from "@angular/material/button";
import * as i5 from "@angular/material/list";
import * as i6 from "@angular/material/form-field";
import * as i7 from "@angular/material/input";
import * as i8 from "@angular/material/select";
import * as i9 from "@angular/material/core";
import * as i10 from "@angular/common";
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
CreateRoleComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.2", ngImport: i0, type: CreateRoleComponent, deps: [{ token: i1.UntypedFormBuilder }, { token: i2.NodebootOauth2StarterService }, { token: i3.MatDialogRef }], target: i0.ɵɵFactoryTarget.Component });
CreateRoleComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.0.2", type: CreateRoleComponent, selector: "lib-create-role", ngImport: i0, template: "<h2 mat-dialog-title>Create Role</h2>\n<form\n  [formGroup]=\"createRoleForm\"\n  (ngSubmit)=\"createRole(createRoleForm.value)\"\n>\n  <div mat-dialog-content>\n    <div class=\"error-display\" *ngIf=\"errorMessage\">\n      <h5>{{ errorMessage }}</h5>\n    </div>\n    <mat-form-field class=\"forms-field\" appearance=\"fill\">\n      <mat-label>Identifier</mat-label>\n      <input\n        matInput\n        placeholder=\"admin01\"\n        formControlName=\"identifier\"\n        name=\"identifier\"\n        required\n      />\n      <mat-hint>A role identifier</mat-hint>\n    </mat-form-field>\n    <mat-form-field class=\"forms-field\" appearance=\"fill\">\n      <mat-label>Select a resource</mat-label>\n      <mat-select name=\"resource\" formControlName=\"resource\">\n        <mat-option\n          [value]=\"option.applicationResourceName\"\n          *ngFor=\"let option of options\"\n          >{{ option.applicationResourceName }}</mat-option\n        >\n      </mat-select>\n      <mat-hint>Select an application resource</mat-hint>\n    </mat-form-field>\n    <mat-selection-list #allowed formControlName=\"selected\">\n      <mat-list-option\n        [value]=\"allowedL\"\n        [disabled]=\"\n          allowedL.allowed !== '*' &&\n          createRoleForm.get('selected')?.value.length ===\n            allowedShowList.length\n            ? true\n            : false\n        \"\n        *ngFor=\"let allowedL of allowedShowList\"\n      >\n        {{ allowedL.allowed }}\n      </mat-list-option>\n    </mat-selection-list>\n  </div>\n  <div align=\"end\" mat-dialog-actions>\n    <button\n      (click)=\"closeDialog()\"\n      type=\"button\"\n      color=\"warn\"\n      mat-stroked-button\n      [disabled]=\"dialogRef.disableClose\"\n    >\n      Cancel</button\n    ><button\n      [disabled]=\"\n        !createRoleForm.valid || objectKeys(allowedObject).length === 0\n      \"\n      color=\"primary\"\n      mat-flat-button\n    >\n      Create\n    </button>\n  </div>\n</form>\n", styles: [".forms-field{width:100%;margin-bottom:1rem}\n"], dependencies: [{ kind: "component", type: i4.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "component", type: i5.MatSelectionList, selector: "mat-selection-list", inputs: ["disableRipple", "color", "compareWith", "disabled", "multiple"], outputs: ["selectionChange"], exportAs: ["matSelectionList"] }, { kind: "component", type: i5.MatListOption, selector: "mat-list-option", inputs: ["disableRipple", "checkboxPosition", "color", "value", "disabled", "selected"], outputs: ["selectedChange"], exportAs: ["matListOption"] }, { kind: "component", type: i6.MatFormField, selector: "mat-form-field", inputs: ["color", "appearance", "hideRequiredMarker", "hintLabel", "floatLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i6.MatHint, selector: "mat-hint", inputs: ["align", "id"] }, { kind: "directive", type: i6.MatLabel, selector: "mat-label" }, { kind: "directive", type: i7.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { kind: "component", type: i8.MatSelect, selector: "mat-select", inputs: ["disabled", "disableRipple", "tabIndex"], exportAs: ["matSelect"] }, { kind: "component", type: i9.MatOption, selector: "mat-option", exportAs: ["matOption"] }, { kind: "directive", type: i3.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { kind: "directive", type: i3.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }, { kind: "directive", type: i3.MatDialogActions, selector: "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]", inputs: ["align"] }, { kind: "directive", type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "directive", type: i10.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i10.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.2", ngImport: i0, type: CreateRoleComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-create-role', template: "<h2 mat-dialog-title>Create Role</h2>\n<form\n  [formGroup]=\"createRoleForm\"\n  (ngSubmit)=\"createRole(createRoleForm.value)\"\n>\n  <div mat-dialog-content>\n    <div class=\"error-display\" *ngIf=\"errorMessage\">\n      <h5>{{ errorMessage }}</h5>\n    </div>\n    <mat-form-field class=\"forms-field\" appearance=\"fill\">\n      <mat-label>Identifier</mat-label>\n      <input\n        matInput\n        placeholder=\"admin01\"\n        formControlName=\"identifier\"\n        name=\"identifier\"\n        required\n      />\n      <mat-hint>A role identifier</mat-hint>\n    </mat-form-field>\n    <mat-form-field class=\"forms-field\" appearance=\"fill\">\n      <mat-label>Select a resource</mat-label>\n      <mat-select name=\"resource\" formControlName=\"resource\">\n        <mat-option\n          [value]=\"option.applicationResourceName\"\n          *ngFor=\"let option of options\"\n          >{{ option.applicationResourceName }}</mat-option\n        >\n      </mat-select>\n      <mat-hint>Select an application resource</mat-hint>\n    </mat-form-field>\n    <mat-selection-list #allowed formControlName=\"selected\">\n      <mat-list-option\n        [value]=\"allowedL\"\n        [disabled]=\"\n          allowedL.allowed !== '*' &&\n          createRoleForm.get('selected')?.value.length ===\n            allowedShowList.length\n            ? true\n            : false\n        \"\n        *ngFor=\"let allowedL of allowedShowList\"\n      >\n        {{ allowedL.allowed }}\n      </mat-list-option>\n    </mat-selection-list>\n  </div>\n  <div align=\"end\" mat-dialog-actions>\n    <button\n      (click)=\"closeDialog()\"\n      type=\"button\"\n      color=\"warn\"\n      mat-stroked-button\n      [disabled]=\"dialogRef.disableClose\"\n    >\n      Cancel</button\n    ><button\n      [disabled]=\"\n        !createRoleForm.valid || objectKeys(allowedObject).length === 0\n      \"\n      color=\"primary\"\n      mat-flat-button\n    >\n      Create\n    </button>\n  </div>\n</form>\n", styles: [".forms-field{width:100%;margin-bottom:1rem}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.UntypedFormBuilder }, { type: i2.NodebootOauth2StarterService }, { type: i3.MatDialogRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXJvbGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm9kZWJvb3Qtb2F1dGgyLXN0YXJ0ZXIvc3JjL2xpYi9vYXV0aC1zdGFydGVyLXJvbGVzL2NyZWF0ZS1yb2xlL2NyZWF0ZS1yb2xlLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vZGVib290LW9hdXRoMi1zdGFydGVyL3NyYy9saWIvb2F1dGgtc3RhcnRlci1yb2xlcy9jcmVhdGUtcm9sZS9jcmVhdGUtcm9sZS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQXdDLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7Ozs7Ozs7QUFjbEYsTUFBTSxPQUFPLG1CQUFtQjtJQVc5QixZQUNVLFdBQStCLEVBQy9CLFNBQXVDLEVBQ3hDLFNBQTRDO1FBRjNDLGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtRQUMvQixjQUFTLEdBQVQsU0FBUyxDQUE4QjtRQUN4QyxjQUFTLEdBQVQsU0FBUyxDQUFtQztRQVhyRCxZQUFPLEdBQWUsRUFBRSxDQUFDO1FBQ3pCLG9CQUFlLEdBQWEsRUFBRSxDQUFDO1FBQy9CLGtCQUFhLEdBQTZCLEVBQUUsQ0FBQztRQUM3QyxlQUFVLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztRQVV2QixJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLENBQUMsU0FBUyxDQUFDO1lBQzNDLEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUNiLElBQUksR0FBRyxDQUFDLEtBQUssRUFBRTtvQkFDYixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO2lCQUN2QztxQkFBTTtvQkFDTCxJQUFJLENBQUMs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QUFLLENBQUM7YUFDOUM7U0FDRjtJQUNILENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN6QixDQUFDOztnSEFyTFUsbUJBQW1CO29HQUFuQixtQkFBbUIsdURDZmhDLGkrREFtRUE7MkZEcERhLG1CQUFtQjtrQkFML0IsU0FBUzsrQkFDRSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBVbnR5cGVkRm9ybUdyb3VwLCBVbnR5cGVkRm9ybUJ1aWxkZXIsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNYXREaWFsb2dSZWYgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBSZXNvdXJjZSxcbiAgT3B0aW9uLFxuICBOb2RlYm9vdE9hdXRoMlN0YXJ0ZXJTZXJ2aWNlLFxufSBmcm9tICcuLi8uLi9ub2RlYm9vdC1vYXV0aDItc3RhcnRlci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGliLWNyZWF0ZS1yb2xlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NyZWF0ZS1yb2xlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY3JlYXRlLXJvbGUuY29tcG9uZW50LnNjc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgQ3JlYXRlUm9sZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgY3JlYXRlUm9sZUZvcm06IFVudHlwZWRGb3JtR3JvdXA7XG4gIGVycm9yTWVzc2FnZSE6IHN0cmluZztcbiAgb3B0aW9uczogUmVzb3VyY2VbXSA9IFtdO1xuICBhbGxvd2VkU2hvd0xpc3Q6IE9wdGlvbltdID0gW107XG4gIGFsbG93ZWRPYmplY3Q6IFJlY29yZDxzdHJpbmcsIE9wdGlvbltdPiA9IHt9O1xuICBvYmplY3RLZXlzID0gT2JqZWN0LmtleXM7XG5cbiAgc2VsZWN0ZWRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcmVzb3VyY2VTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGZvcm1CdWlsZGVyOiBVbnR5cGVkRm9ybUJ1aWxkZXIsXG4gICAgcHJpdmF0ZSBuYlNlcnZpY2U6IE5vZGVib290T2F1dGgyU3RhcnRlclNlcnZpY2UsXG4gICAgcHVibGljIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPENyZWF0ZVJvbGVDb21wb25lbnQ+XG4gICkge1xuICAgIHRoaXMubmJTZXJ2aWNlLmdldFJlc291cmNlc0Jhc2ljKCkuc3Vic2NyaWJlKHtcbiAgICAgIGVycm9yOiAoZXJyKSA9PiB7XG4gICAgICAgIGlmIChlcnIuZXJyb3IpIHtcbiAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IGVyci5lcnJvci5tZXNzYWdlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gJ1Vua25vd24gRXJyb3InO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IFtdO1xuICAgICAgfSxcbiAgICAgIG5leHQ6IChyZXMpID0+IHtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gcmVzLmNvbnRlbnQgfHwgW107XG4gICAgICB9LFxuICAgIH0pO1xuICAgIHRoaXMuY3JlYXRlUm9sZUZvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcbiAgICAgIGlkZW50aWZpZXI6IHRoaXMuZm9ybUJ1aWxkZXIuY29udHJvbChcbiAgICAgICAgJycsXG4gICAgICAgIFZhbGlkYXRvcnMuY29tcG9zZShbXG4gICAgICAgICAgVmFsaWRhdG9ycy5yZXF1aXJlZCxcbiAgICAgICAgICBWYWxpZGF0b3JzLnBhdHRlcm4oL15bYS16QS1aMC05X1xcLlxcLVxcL10rJC8pLFxuICAgICAgICAgIFZhbGlkYXRvcnMubWluTGVuZ3RoKDQpLFxuICAgICAgICAgIFZhbGlkYXRvcnMubWF4TGVuZ3RoKDIwKSxcbiAgICAgICAgXSlcbiAgICAgICksXG4gICAgICByZXNvdXJjZTogdGhpcy5mb3JtQnVpbGRlci5jb250cm9sKCcnKSxcbiAgICAgIHNlbGVjdGVkOiB0aGlzLmZvcm1CdWlsZGVyLmNvbnRyb2woJycpLFxuICAgIH0pO1xuICAgIHRoaXMucmVzb3VyY2VTdWJzY3JpcHRpb24gPSB0aGlzLmNyZWF0ZVJvbGVGb3JtXG4gICAgICAuZ2V0KCdyZXNvdXJjZScpXG4gICAgICA/LnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoe1xuICAgICAgICBuZXh0OiAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgICAgICAgIHRoaXMuYWxsb3dlZFNob3dMaXN0ID1cbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5maW5kKChvKSA9PiBvLmFwcGxpY2F0aW9uUmVzb3VyY2VOYW1lID09PSB2YWx1ZSlcbiAgICAgICAgICAgICAgPy5hbGxvd2VkIHx8IFtdO1xuICAgICAgICAgIHRoaXMuY3JlYXRlUm9sZUZvcm1cbiAgICAgICAgICAgIC5nZXQoJ3NlbGVjdGVkJylcbiAgICAgICAgICAgID8uc2V0VmFsdWUodGhpcy5hbGxvd2VkT2JqZWN0W3ZhbHVlXSB8fCBbXSk7XG4gICAgICAgIH0sXG4gICAgICB9KSBhcyBTdWJzY3JpcHRpb247XG5cbiAgICB0aGlzLnNlbGVjdGVkU3Vic2NyaXB0aW9uID0gdGhpcy5jcmVhdGVSb2xlRm9ybVxuICAgICAgLmdldCgnc2VsZWN0ZWQnKVxuICAgICAgPy52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKCh2YWx1ZUNoYW5nZTogT3B0aW9uW10pID0+IHtcbiAgICAgICAgY29uc3QgY3VycmVudEFsbG93ZWRPYmplY3QgPVxuICAgICAgICAgIHRoaXMuYWxsb3dlZE9iamVjdFt0aGlzLmNyZWF0ZVJvbGVGb3JtLmdldCgncmVzb3VyY2UnKT8udmFsdWVdIHx8IFtdO1xuXG4gICAgICAgIGlmICh2YWx1ZUNoYW5nZS5sZW5ndGggPT09IDAgJiYgY3VycmVudEFsbG93ZWRPYmplY3QubGVuZ3RoID09PSAwKVxuICAgICAgICAgIHJldHVybjtcblxuICAgICAgICBsZXQgbmV3T3B0aW9uRW50cnk6IE9wdGlvbjtcblxuICAgICAgICBpZiAoY3VycmVudEFsbG93ZWRPYmplY3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgbmV3T3B0aW9uRW50cnkgPSB2YWx1ZUNoYW5nZVswXTtcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkQ2hhbmdlKHRydWUsIG5ld09wdGlvbkVudHJ5KTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsdWVDaGFuZ2UubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgbmV3T3B0aW9uRW50cnkgPSBjdXJyZW50QWxsb3dlZE9iamVjdFswXTtcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkQ2hhbmdlKGZhbHNlLCBuZXdPcHRpb25FbnRyeSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgIGN1cnJlbnRBbGxvd2VkT2JqZWN0WzBdLmFsbG93ZWQgPT09ICcqJyAmJlxuICAgICAgICAgIHZhbHVlQ2hhbmdlWzBdLmFsbG93ZWQgIT09ICcqJ1xuICAgICAgICApIHtcbiAgICAgICAgICBuZXdPcHRpb25FbnRyeSA9IGN1cnJlbnRBbGxvd2VkT2JqZWN0WzBdO1xuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDaGFuZ2UoZmFsc2UsIG5ld09wdGlvbkVudHJ5KTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsdWVDaGFuZ2VbMF0uYWxsb3dlZCA9PT0gJyonKSB7XG4gICAgICAgICAgbmV3T3B0aW9uRW50cnkgPSB2YWx1ZUNoYW5nZVswXTtcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkQ2hhbmdlKHRydWUsIG5ld09wdGlvbkVudHJ5KTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY3VycmVudEFsbG93ZWRPYmplY3QubGVuZ3RoID4gdmFsdWVDaGFuZ2UubGVuZ3RoKSB7XG4gICAgICAgICAgZm9yIChjb25zdCBhbGxvd2VkIG9mIGN1cnJlbnRBbGxvd2VkT2JqZWN0KSB7XG4gICAgICAgICAgICBjb25zdCBpbmRleE9mQWxsb3dlZCA9IHZhbHVlQ2hhbmdlLmZpbmRJbmRleChcbiAgICAgICAgICAgICAgKHYpID0+IHYuaWQgPT09IGFsbG93ZWQuaWRcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGlmIChpbmRleE9mQWxsb3dlZCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgbmV3T3B0aW9uRW50cnkgPSBhbGxvd2VkO1xuICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkQ2hhbmdlKGZhbHNlLCBuZXdPcHRpb25FbnRyeSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoY29uc3QgdmFsdWUgb2YgdmFsdWVDaGFuZ2UpIHtcbiAgICAgICAgICBjb25zdCBpbmRleE9mQWxsb3dlZCA9IGN1cnJlbnRBbGxvd2VkT2JqZWN0LmZpbmRJbmRleChcbiAgICAgICAgICAgIChjKSA9PiBjLmlkID09PSB2YWx1ZS5pZFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBpZiAoaW5kZXhPZkFsbG93ZWQgPT09IC0xKSB7XG4gICAgICAgICAgICBuZXdPcHRpb25FbnRyeSA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZENoYW5nZSh0cnVlLCBuZXdPcHRpb25FbnRyeSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pIGFzIFN1YnNjcmlwdGlvbjtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMucmVzb3VyY2VTdWJzY3JpcHRpb24/LnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5zZWxlY3RlZFN1YnNjcmlwdGlvbj8udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge31cblxuICBjcmVhdGVSb2xlKHJvbGVCb2R5OiB7IGlkZW50aWZpZXI6IHN0cmluZzsgcmVzb3VyY2U6IHN0cmluZyB8IHVuZGVmaW5lZCB9KSB7XG4gICAgdGhpcy5uYlNlcnZpY2VcbiAgICAgIC5jcmVhdGVSb2xlKHJvbGVCb2R5LmlkZW50aWZpZXIsIHRoaXMuYWxsb3dlZE9iamVjdClcbiAgICAgIC5zdWJzY3JpYmUoe1xuICAgICAgICBlcnJvcjogKGVycikgPT4ge1xuICAgICAgICAgIHRoaXMuZGlhbG9nUmVmLmRpc2FibGVDbG9zZSA9IGZhbHNlO1xuICAgICAgICAgIGlmIChlcnIuZXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gZXJyLmVycm9yLm1lc3NhZ2U7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gJ1Vua25vd24gRXJyb3InO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbmV4dDogKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKHRydWUpO1xuICAgICAgICB9LFxuICAgICAgfSk7XG4gIH1cblxuICBzZWxlY3RlZENoYW5nZShzZWxlY3RlZDogYm9vbGVhbiwgdmFsdWU6IE9wdGlvbikge1xuICAgIC8vIGNvbnN0IGN1cnJlbnRBbGxvd2VkT2JqZWN0ID1cbiAgICAvLyAgIHRoaXMuYWxsb3dlZE9iamVjdFt0aGlzLmNyZWF0ZVJvbGVGb3JtLmdldCgncmVzb3VyY2UnKT8udmFsdWVdO1xuICAgIGlmIChcbiAgICAgIHZhbHVlLmFsbG93ZWQgPT09ICcqJyAmJlxuICAgICAgc2VsZWN0ZWQgJiZcbiAgICAgIHRoaXMuY3JlYXRlUm9sZUZvcm0uZ2V0KCdzZWxlY3RlZCcpPy52YWx1ZS5sZW5ndGggIT09XG4gICAgICAgIHRoaXMuYWxsb3dlZFNob3dMaXN0Lmxlbmd0aFxuICAgICkge1xuICAgICAgdGhpcy5jcmVhdGVSb2xlRm9ybS5nZXQoJ3NlbGVjdGVkJyk/LnNldFZhbHVlKHRoaXMuYWxsb3dlZFNob3dMaXN0KTtcbiAgICAgIHRoaXMuYWxsb3dlZE9iamVjdFt0aGlzLmNyZWF0ZVJvbGVGb3JtLmdldCgncmVzb3VyY2UnKT8udmFsdWVdID0gW1xuICAgICAgICB0aGlzLmFsbG93ZWRTaG93TGlzdFswXSxcbiAgICAgIF07XG4gICAgfSBlbHNlIGlmICh2YWx1ZS5hbGxvd2VkID09PSAnKicgJiYgIXNlbGVjdGVkKSB7XG4gICAgICBjb25zdCB0ZW1wb3JhbEFsbG93ZWQgPSBbLi4udGhpcy5hbGxvd2VkU2hvd0xpc3RdO1xuICAgICAgdGVtcG9yYWxBbGxvd2VkLnNoaWZ0KCk7XG4gICAgICB0aGlzLmFsbG93ZWRPYmplY3RbdGhpcy5jcmVhdGVSb2xlRm9ybS5nZXQoJ3Jlc291cmNlJyk/LnZhbHVlXSA9XG4gICAgICAgIHRlbXBvcmFsQWxsb3dlZDtcbiAgICB9IGVsc2UgaWYgKHNlbGVjdGVkKSB7XG4gICAgICB0aGlzLmFsbG93ZWRPYmplY3RbdGhpcy5jcmVhdGVSb2xlRm9ybS5nZXQoJ3Jlc291cmNlJyk/LnZhbHVlXSA9XG4gICAgICAgIHRoaXMuY3JlYXRlUm9sZUZvcm0uZ2V0KCdzZWxlY3RlZCcpPy52YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuY3JlYXRlUm9sZUZvcm0uZ2V0KCdzZWxlY3RlZCcpPy52YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgZGVsZXRlIHRoaXMuYWxsb3dlZE9iamVjdFt0aGlzLmNyZWF0ZVJvbGVGb3JtLmdldCgncmVzb3VyY2UnKT8udmFsdWVdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hbGxvd2VkT2JqZWN0W3RoaXMuY3JlYXRlUm9sZUZvcm0uZ2V0KCdyZXNvdXJjZScpPy52YWx1ZV0gPVxuICAgICAgICAgIHRoaXMuY3JlYXRlUm9sZUZvcm0uZ2V0KCdzZWxlY3RlZCcpPy52YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjbG9zZURpYWxvZygpIHtcbiAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZSgpO1xuICB9XG59XG4iLCI8aDIgbWF0LWRpYWxvZy10aXRsZT5DcmVhdGUgUm9sZTwvaDI+XG48Zm9ybVxuICBbZm9ybUdyb3VwXT1cImNyZWF0ZVJvbGVGb3JtXCJcbiAgKG5nU3VibWl0KT1cImNyZWF0ZVJvbGUoY3JlYXRlUm9sZUZvcm0udmFsdWUpXCJcbj5cbiAgPGRpdiBtYXQtZGlhbG9nLWNvbnRlbnQ+XG4gICAgPGRpdiBjbGFzcz1cImVycm9yLWRpc3BsYXlcIiAqbmdJZj1cImVycm9yTWVzc2FnZVwiPlxuICAgICAgPGg1Pnt7IGVycm9yTWVzc2FnZSB9fTwvaDU+XG4gICAgPC9kaXY+XG4gICAgPG1hdC1mb3JtLWZpZWxkIGNsYXNzPVwiZm9ybXMtZmllbGRcIiBhcHBlYXJhbmNlPVwiZmlsbFwiPlxuICAgICAgPG1hdC1sYWJlbD5JZGVudGlmaWVyPC9tYXQtbGFiZWw+XG4gICAgICA8aW5wdXRcbiAgICAgICAgbWF0SW5wdXRcbiAgICAgICAgcGxhY2Vob2xkZXI9XCJhZG1pbjAxXCJcbiAgICAgICAgZm9ybUNvbnRyb2xOYW1lPVwiaWRlbnRpZmllclwiXG4gICAgICAgIG5hbWU9XCJpZGVudGlmaWVyXCJcbiAgICAgICAgcmVxdWlyZWRcbiAgICAgIC8+XG4gICAgICA8bWF0LWhpbnQ+QSByb2xlIGlkZW50aWZpZXI8L21hdC1oaW50PlxuICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgPG1hdC1mb3JtLWZpZWxkIGNsYXNzPVwiZm9ybXMtZmllbGRcIiBhcHBlYXJhbmNlPVwiZmlsbFwiPlxuICAgICAgPG1hdC1sYWJlbD5TZWxlY3QgYSByZXNvdXJjZTwvbWF0LWxhYmVsPlxuICAgICAgPG1hdC1zZWxlY3QgbmFtZT1cInJlc291cmNlXCIgZm9ybUNvbnRyb2xOYW1lPVwicmVzb3VyY2VcIj5cbiAgICAgICAgPG1hdC1vcHRpb25cbiAgICAgICAgICBbdmFsdWVdPVwib3B0aW9uLmFwcGxpY2F0aW9uUmVzb3VyY2VOYW1lXCJcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIG9wdGlvbnNcIlxuICAgICAgICAgID57eyBvcHRpb24uYXBwbGljYXRpb25SZXNvdXJjZU5hbWUgfX08L21hdC1vcHRpb25cbiAgICAgICAgPlxuICAgICAgPC9tYXQtc2VsZWN0PlxuICAgICAgPG1hdC1oaW50PlNlbGVjdCBhbiBhcHBsaWNhdGlvbiByZXNvdXJjZTwvbWF0LWhpbnQ+XG4gICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICA8bWF0LXNlbGVjdGlvbi1saXN0ICNhbGxvd2VkIGZvcm1Db250cm9sTmFtZT1cInNlbGVjdGVkXCI+XG4gICAgICA8bWF0LWxpc3Qtb3B0aW9uXG4gICAgICAgIFt2YWx1ZV09XCJhbGxvd2VkTFwiXG4gICAgICAgIFtkaXNhYmxlZF09XCJcbiAgICAgICAgICBhbGxvd2VkTC5hbGxvd2VkICE9PSAnKicgJiZcbiAgICAgICAgICBjcmVhdGVSb2xlRm9ybS5nZXQoJ3NlbGVjdGVkJyk/LnZhbHVlLmxlbmd0aCA9PT1cbiAgICAgICAgICAgIGFsbG93ZWRTaG93TGlzdC5sZW5ndGhcbiAgICAgICAgICAgID8gdHJ1ZVxuICAgICAgICAgICAgOiBmYWxzZVxuICAgICAgICBcIlxuICAgICAgICAqbmdGb3I9XCJsZXQgYWxsb3dlZEwgb2YgYWxsb3dlZFNob3dMaXN0XCJcbiAgICAgID5cbiAgICAgICAge3sgYWxsb3dlZEwuYWxsb3dlZCB9fVxuICAgICAgPC9tYXQtbGlzdC1vcHRpb24+XG4gICAgPC9tYXQtc2VsZWN0aW9uLWxpc3Q+XG4gIDwvZGl2PlxuICA8ZGl2IGFsaWduPVwiZW5kXCIgbWF0LWRpYWxvZy1hY3Rpb25zPlxuICAgIDxidXR0b25cbiAgICAgIChjbGljayk9XCJjbG9zZURpYWxvZygpXCJcbiAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgY29sb3I9XCJ3YXJuXCJcbiAgICAgIG1hdC1zdHJva2VkLWJ1dHRvblxuICAgICAgW2Rpc2FibGVkXT1cImRpYWxvZ1JlZi5kaXNhYmxlQ2xvc2VcIlxuICAgID5cbiAgICAgIENhbmNlbDwvYnV0dG9uXG4gICAgPjxidXR0b25cbiAgICAgIFtkaXNhYmxlZF09XCJcbiAgICAgICAgIWNyZWF0ZVJvbGVGb3JtLnZhbGlkIHx8IG9iamVjdEtleXMoYWxsb3dlZE9iamVjdCkubGVuZ3RoID09PSAwXG4gICAgICBcIlxuICAgICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICAgIG1hdC1mbGF0LWJ1dHRvblxuICAgID5cbiAgICAgIENyZWF0ZVxuICAgIDwvYnV0dG9uPlxuICA8L2Rpdj5cbjwvZm9ybT5cbiJdfQ==