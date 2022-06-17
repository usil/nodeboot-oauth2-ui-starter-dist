import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/dialog";
import * as i2 from "../../nodeboot-oauth2-starter.service";
import * as i3 from "@angular/forms";
import * as i4 from "@angular/material/button";
import * as i5 from "@angular/material/list";
import * as i6 from "@angular/material/form-field";
import * as i7 from "@angular/material/select";
import * as i8 from "@angular/material/core";
import * as i9 from "@angular/common";
export class OptionsComponent {
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
        this.selectedSubscription = this.optionsForm
            .get('selected')
            ?.valueChanges.subscribe((valueChange) => {
            const currentAllowedObject = this.allowedObject[this.optionsForm.get('resource')?.value] || [];
            if (valueChange.length === 0 && currentAllowedObject.length === 0)
                return;
            let newOptionEntry;
            if (currentAllowedObject.length === 0) {
                newOptionEntry = JSON.parse(valueChange[0]);
                this.selectedChange(true, newOptionEntry);
                return;
            }
            if (valueChange.length === 0) {
                newOptionEntry = currentAllowedObject[0];
                this.selectedChange(false, newOptionEntry);
                return;
            }
            if (currentAllowedObject[0].allowed === '*' &&
                JSON.parse(valueChange[0]).allowed !== '*') {
                newOptionEntry = currentAllowedObject[0];
                this.selectedChange(false, newOptionEntry);
                return;
            }
            if (JSON.parse(valueChange[0]).allowed === '*') {
                newOptionEntry = JSON.parse(valueChange[0]);
                this.selectedChange(true, newOptionEntry);
                return;
            }
            if (currentAllowedObject.length > valueChange.length) {
                for (const allowed of currentAllowedObject) {
                    const indexOfAllowed = valueChange.findIndex((v) => JSON.parse(v).id === allowed.id);
                    if (indexOfAllowed === -1) {
                        newOptionEntry = allowed;
                        this.selectedChange(false, newOptionEntry);
                        break;
                    }
                }
                return;
            }
            for (const value of valueChange) {
                const indexOfAllowed = currentAllowedObject.findIndex((c) => c.id === JSON.parse(value).id);
                if (indexOfAllowed === -1) {
                    newOptionEntry = JSON.parse(value);
                    this.selectedChange(true, newOptionEntry);
                    break;
                }
            }
        });
    }
    ngOnInit() { }
    ngOnDestroy() {
        this.resourceSubscription?.unsubscribe();
        this.selectedSubscription?.unsubscribe();
    }
    selectedChange(selected, value) {
        if (value.allowed === '*' &&
            selected &&
            this.optionsForm.get('selected')?.value.length !==
                this.allowedShowList.length) {
            this.optionsForm
                .get('selected')
                ?.setValue(this.allowedShowList.map((aso) => JSON.stringify(aso)) || []);
            this.allowedObject[this.optionsForm.get('resource')?.value] = [
                this.allowedShowList[0],
            ];
        }
        else if (value.allowed === '*' && !selected) {
            const temporalAllowed = [...this.allowedShowList];
            temporalAllowed.shift();
            this.allowedObject[this.optionsForm.get('resource')?.value] =
                temporalAllowed;
        }
        else if (selected) {
            this.allowedObject[this.optionsForm.get('resource')?.value] = this.optionsForm.get('selected')?.value.map((stringObj) => {
                return JSON.parse(stringObj);
            });
        }
        else {
            if (this.optionsForm.get('selected')?.value.length === 0) {
                delete this.allowedObject[this.optionsForm.get('resource')?.value];
            }
            else {
                this.allowedObject[this.optionsForm.get('resource')?.value] = this.optionsForm.get('selected')?.value.map((stringObj) => {
                    return JSON.parse(stringObj);
                });
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
OptionsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.2", ngImport: i0, type: OptionsComponent, deps: [{ token: i1.MatDialogRef }, { token: MAT_DIALOG_DATA }, { token: i2.NodebootOauth2StarterService }, { token: i3.UntypedFormBuilder }], target: i0.ɵɵFactoryTarget.Component });
OptionsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.0.2", type: OptionsComponent, selector: "lib-options", ngImport: i0, template: "<h2 mat-dialog-title>Role {{ role.identifier }} access options</h2>\n<form [formGroup]=\"optionsForm\" (ngSubmit)=\"updateOptions()\">\n  <div mat-dialog-content>\n    <div class=\"error-display\" *ngIf=\"errorMessage\">\n      <h5>{{ errorMessage }}</h5>\n    </div>\n    <mat-form-field class=\"forms-field\" appearance=\"fill\">\n      <mat-label>Select a resource</mat-label>\n      <mat-select name=\"resource\" formControlName=\"resource\">\n        <mat-option\n          [value]=\"option.applicationResourceName\"\n          *ngFor=\"let option of options\"\n          >{{ option.applicationResourceName }}</mat-option\n        >\n      </mat-select>\n      <mat-hint>Select an application resource</mat-hint>\n    </mat-form-field>\n    <mat-selection-list #allowed formControlName=\"selected\">\n      <mat-list-option\n        [value]=\"convertToString(allowedL)\"\n        [disabled]=\"\n          allowedL.allowed !== '*' &&\n          optionsForm.get('selected')?.value.length === allowedShowList.length\n            ? true\n            : false\n        \"\n        *ngFor=\"let allowedL of allowedShowList\"\n      >\n        {{ allowedL.allowed }}\n      </mat-list-option>\n    </mat-selection-list>\n  </div>\n  <div align=\"end\" mat-dialog-actions>\n    <button\n      (click)=\"closeDialog()\"\n      type=\"button\"\n      color=\"warn\"\n      mat-stroked-button\n      [disabled]=\"dialogRef.disableClose\"\n    >\n      Cancel</button\n    ><button\n      [disabled]=\"!optionsForm.valid || objectKeys(allowedObject).length === 0\"\n      color=\"primary\"\n      mat-flat-button\n    >\n      Update\n    </button>\n  </div>\n</form>\n", styles: [".forms-field{width:100%;margin-bottom:1rem}\n"], dependencies: [{ kind: "component", type: i4.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "component", type: i5.MatSelectionList, selector: "mat-selection-list", inputs: ["disableRipple", "color", "compareWith", "disabled", "multiple"], outputs: ["selectionChange"], exportAs: ["matSelectionList"] }, { kind: "component", type: i5.MatListOption, selector: "mat-list-option", inputs: ["disableRipple", "checkboxPosition", "color", "value", "disabled", "selected"], outputs: ["selectedChange"], exportAs: ["matListOption"] }, { kind: "component", type: i6.MatFormField, selector: "mat-form-field", inputs: ["color", "appearance", "hideRequiredMarker", "hintLabel", "floatLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i6.MatHint, selector: "mat-hint", inputs: ["align", "id"] }, { kind: "directive", type: i6.MatLabel, selector: "mat-label" }, { kind: "component", type: i7.MatSelect, selector: "mat-select", inputs: ["disabled", "disableRipple", "tabIndex"], exportAs: ["matSelect"] }, { kind: "component", type: i8.MatOption, selector: "mat-option", exportAs: ["matOption"] }, { kind: "directive", type: i1.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { kind: "directive", type: i1.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }, { kind: "directive", type: i1.MatDialogActions, selector: "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]", inputs: ["align"] }, { kind: "directive", type: i3.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i3.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i3.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "directive", type: i9.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i9.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.2", ngImport: i0, type: OptionsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-options', template: "<h2 mat-dialog-title>Role {{ role.identifier }} access options</h2>\n<form [formGroup]=\"optionsForm\" (ngSubmit)=\"updateOptions()\">\n  <div mat-dialog-content>\n    <div class=\"error-display\" *ngIf=\"errorMessage\">\n      <h5>{{ errorMessage }}</h5>\n    </div>\n    <mat-form-field class=\"forms-field\" appearance=\"fill\">\n      <mat-label>Select a resource</mat-label>\n      <mat-select name=\"resource\" formControlName=\"resource\">\n        <mat-option\n          [value]=\"option.applicationResourceName\"\n          *ngFor=\"let option of options\"\n          >{{ option.applicationResourceName }}</mat-option\n        >\n      </mat-select>\n      <mat-hint>Select an application resource</mat-hint>\n    </mat-form-field>\n    <mat-selection-list #allowed formControlName=\"selected\">\n      <mat-list-option\n        [value]=\"convertToString(allowedL)\"\n        [disabled]=\"\n          allowedL.allowed !== '*' &&\n          optionsForm.get('selected')?.value.length === allowedShowList.length\n            ? true\n            : false\n        \"\n        *ngFor=\"let allowedL of allowedShowList\"\n      >\n        {{ allowedL.allowed }}\n      </mat-list-option>\n    </mat-selection-list>\n  </div>\n  <div align=\"end\" mat-dialog-actions>\n    <button\n      (click)=\"closeDialog()\"\n      type=\"button\"\n      color=\"warn\"\n      mat-stroked-button\n      [disabled]=\"dialogRef.disableClose\"\n    >\n      Cancel</button\n    ><button\n      [disabled]=\"!optionsForm.valid || objectKeys(allowedObject).length === 0\"\n      color=\"primary\"\n      mat-flat-button\n    >\n      Update\n    </button>\n  </div>\n</form>\n", styles: [".forms-field{width:100%;margin-bottom:1rem}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.MatDialogRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_DIALOG_DATA]
                }] }, { type: i2.NodebootOauth2StarterService }, { type: i3.UntypedFormBuilder }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9ucy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub2RlYm9vdC1vYXV0aDItc3RhcnRlci9zcmMvbGliL29hdXRoLXN0YXJ0ZXItcm9sZXMvb3B0aW9ucy9vcHRpb25zLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vZGVib290LW9hdXRoMi1zdGFydGVyL3NyYy9saWIvb2F1dGgtc3RhcnRlci1yb2xlcy9vcHRpb25zL29wdGlvbnMuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBRXJFLE9BQU8sRUFBZ0IsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7Ozs7Ozs7Ozs7O0FBY3pFLE1BQU0sT0FBTyxnQkFBZ0I7SUFhM0IsWUFDUyxTQUF5QyxFQUNoQixJQUFVLEVBQ2xDLFNBQXVDLEVBQ3ZDLFdBQStCO1FBSGhDLGNBQVMsR0FBVCxTQUFTLENBQWdDO1FBQ2hCLFNBQUksR0FBSixJQUFJLENBQU07UUFDbEMsY0FBUyxHQUFULFNBQVMsQ0FBOEI7UUFDdkMsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO1FBZHpDLFlBQU8sR0FBZSxFQUFFLENBQUM7UUFDekIsb0JBQWUsR0FBYSxFQUFFLENBQUM7UUFDL0Isa0JBQWEsR0FBNkIsRUFBRSxDQUFDO1FBQzdDLDBCQUFxQixHQUE2QixFQUFFLENBQUM7UUFDckQsZUFBVSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDekIsb0JBQWUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBVy9CLEtBQUssTUFBTSxNQUFNLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDeEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsdUJBQXVCLENBQUMsR0FBRyxDQUFD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cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbmplY3QsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBVbnR5cGVkRm9ybUdyb3VwLCBVbnR5cGVkRm9ybUJ1aWxkZXIgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNYXREaWFsb2dSZWYsIE1BVF9ESUFMT0dfREFUQSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIFJlc291cmNlLFxuICBSb2xlLFxuICBPcHRpb24sXG4gIE5vZGVib290T2F1dGgyU3RhcnRlclNlcnZpY2UsXG59IGZyb20gJy4uLy4uL25vZGVib290LW9hdXRoMi1zdGFydGVyLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItb3B0aW9ucycsXG4gIHRlbXBsYXRlVXJsOiAnLi9vcHRpb25zLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vb3B0aW9ucy5jb21wb25lbnQuc2NzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBPcHRpb25zQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBvcHRpb25zRm9ybTogVW50eXBlZEZvcm1Hcm91cDtcbiAgZXJyb3JNZXNzYWdlITogc3RyaW5nO1xuICBvcHRpb25zOiBSZXNvdXJjZVtdID0gW107XG4gIGFsbG93ZWRTaG93TGlzdDogT3B0aW9uW10gPSBbXTtcbiAgYWxsb3dlZE9iamVjdDogUmVjb3JkPHN0cmluZywgT3B0aW9uW10+ID0ge307XG4gIG9yaWdpbmFsQWxsb3dlZE9iamVjdDogUmVjb3JkPHN0cmluZywgT3B0aW9uW10+ID0ge307XG4gIG9iamVjdEtleXMgPSBPYmplY3Qua2V5cztcbiAgY29udmVydFRvU3RyaW5nID0gSlNPTi5zdHJpbmdpZnk7XG5cbiAgc2VsZWN0ZWRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcmVzb3VyY2VTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8T3B0aW9uc0NvbXBvbmVudD4sXG4gICAgQEluamVjdChNQVRfRElBTE9HX0RBVEEpIHB1YmxpYyByb2xlOiBSb2xlLFxuICAgIHByaXZhdGUgbmJTZXJ2aWNlOiBOb2RlYm9vdE9hdXRoMlN0YXJ0ZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgZm9ybUJ1aWxkZXI6IFVudHlwZWRGb3JtQnVpbGRlclxuICApIHtcbiAgICBmb3IgKGNvbnN0IG9wdGlvbiBvZiB0aGlzLnJvbGUucmVzb3VyY2VzKSB7XG4gICAgICB0aGlzLmFsbG93ZWRPYmplY3Rbb3B0aW9uLmFwcGxpY2F0aW9uUmVzb3VyY2VOYW1lXSA9IFsuLi5vcHRpb24uYWxsb3dlZF07XG4gICAgICB0aGlzLm9yaWdpbmFsQWxsb3dlZE9iamVjdFtvcHRpb24uYXBwbGljYXRpb25SZXNvdXJjZU5hbWVdID0gW1xuICAgICAgICAuLi5vcHRpb24uYWxsb3dlZCxcbiAgICAgIF07XG4gICAgfVxuXG4gICAgdGhpcy5uYlNlcnZpY2UuZ2V0UmVzb3VyY2VzQmFzaWMoKS5zdWJzY3JpYmUoe1xuICAgICAgZXJyb3I6IChlcnIpID0+IHtcbiAgICAgICAgaWYgKGVyci5lcnJvcikge1xuICAgICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gZXJyLmVycm9yLm1lc3NhZ2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSAnVW5rbm93biBFcnJvcic7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vcHRpb25zID0gW107XG4gICAgICB9LFxuICAgICAgbmV4dDogKHJlcykgPT4ge1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSByZXMuY29udGVudCB8fCBbXTtcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgdGhpcy5vcHRpb25zRm9ybSA9IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe1xuICAgICAgcmVzb3VyY2U6IHRoaXMuZm9ybUJ1aWxkZXIuY29udHJvbCgnJyksXG4gICAgICBzZWxlY3RlZDogdGhpcy5mb3JtQnVpbGRlci5jb250cm9sKFtdKSxcbiAgICB9KTtcbiAgICB0aGlzLnJlc291cmNlU3Vic2NyaXB0aW9uID0gdGhpcy5vcHRpb25zRm9ybVxuICAgICAgLmdldCgncmVzb3VyY2UnKVxuICAgICAgPy52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKHtcbiAgICAgICAgbmV4dDogKHZhbHVlKSA9PiB7XG4gICAgICAgICAgdGhpcy5hbGxvd2VkU2hvd0xpc3QgPVxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmZpbmQoKG8pID0+IG8uYXBwbGljYXRpb25SZXNvdXJjZU5hbWUgPT09IHZhbHVlKVxuICAgICAgICAgICAgICA/LmFsbG93ZWQgfHwgW107XG5cbiAgICAgICAgICB0aGlzLm9wdGlvbnNGb3JtXG4gICAgICAgICAgICAuZ2V0KCdzZWxlY3RlZCcpXG4gICAgICAgICAgICA/LnNldFZhbHVlKFxuICAgICAgICAgICAgICB0aGlzLmFsbG93ZWRPYmplY3RbdGhpcy5vcHRpb25zRm9ybS5nZXQoJ3Jlc291cmNlJyk/LnZhbHVlXT8ubWFwKFxuICAgICAgICAgICAgICAgIChhc2wpID0+IEpTT04uc3RyaW5naWZ5KGFzbClcbiAgICAgICAgICAgICAgKSB8fCBbXVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgIH0pIGFzIFN1YnNjcmlwdGlvbjtcblxuICAgIHRoaXMuc2VsZWN0ZWRTdWJzY3JpcHRpb24gPSB0aGlzLm9wdGlvbnNGb3JtXG4gICAgICAuZ2V0KCdzZWxlY3RlZCcpXG4gICAgICA/LnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKHZhbHVlQ2hhbmdlOiBzdHJpbmdbXSkgPT4ge1xuICAgICAgICBjb25zdCBjdXJyZW50QWxsb3dlZE9iamVjdCA9XG4gICAgICAgICAgdGhpcy5hbGxvd2VkT2JqZWN0W3RoaXMub3B0aW9uc0Zvcm0uZ2V0KCdyZXNvdXJjZScpPy52YWx1ZV0gfHwgW107XG5cbiAgICAgICAgaWYgKHZhbHVlQ2hhbmdlLmxlbmd0aCA9PT0gMCAmJiBjdXJyZW50QWxsb3dlZE9iamVjdC5sZW5ndGggPT09IDApXG4gICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIGxldCBuZXdPcHRpb25FbnRyeTogT3B0aW9uO1xuXG4gICAgICAgIGlmIChjdXJyZW50QWxsb3dlZE9iamVjdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBuZXdPcHRpb25FbnRyeSA9IEpTT04ucGFyc2UodmFsdWVDaGFuZ2VbMF0pO1xuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDaGFuZ2UodHJ1ZSwgbmV3T3B0aW9uRW50cnkpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWx1ZUNoYW5nZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBuZXdPcHRpb25FbnRyeSA9IGN1cnJlbnRBbGxvd2VkT2JqZWN0WzBdO1xuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDaGFuZ2UoZmFsc2UsIG5ld09wdGlvbkVudHJ5KTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXG4gICAgICAgICAgY3VycmVudEFsbG93ZWRPYmplY3RbMF0uYWxsb3dlZCA9PT0gJyonICYmXG4gICAgICAgICAgSlNPTi5wYXJzZSh2YWx1ZUNoYW5nZVswXSkuYWxsb3dlZCAhPT0gJyonXG4gICAgICAgICkge1xuICAgICAgICAgIG5ld09wdGlvbkVudHJ5ID0gY3VycmVudEFsbG93ZWRPYmplY3RbMF07XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZENoYW5nZShmYWxzZSwgbmV3T3B0aW9uRW50cnkpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChKU09OLnBhcnNlKHZhbHVlQ2hhbmdlWzBdKS5hbGxvd2VkID09PSAnKicpIHtcbiAgICAgICAgICBuZXdPcHRpb25FbnRyeSA9IEpTT04ucGFyc2UodmFsdWVDaGFuZ2VbMF0pO1xuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDaGFuZ2UodHJ1ZSwgbmV3T3B0aW9uRW50cnkpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjdXJyZW50QWxsb3dlZE9iamVjdC5sZW5ndGggPiB2YWx1ZUNoYW5nZS5sZW5ndGgpIHtcbiAgICAgICAgICBmb3IgKGNvbnN0IGFsbG93ZWQgb2YgY3VycmVudEFsbG93ZWRPYmplY3QpIHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4T2ZBbGxvd2VkID0gdmFsdWVDaGFuZ2UuZmluZEluZGV4KFxuICAgICAgICAgICAgICAodikgPT4gSlNPTi5wYXJzZSh2KS5pZCA9PT0gYWxsb3dlZC5pZFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgaWYgKGluZGV4T2ZBbGxvd2VkID09PSAtMSkge1xuICAgICAgICAgICAgICBuZXdPcHRpb25FbnRyeSA9IGFsbG93ZWQ7XG4gICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDaGFuZ2UoZmFsc2UsIG5ld09wdGlvbkVudHJ5KTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChjb25zdCB2YWx1ZSBvZiB2YWx1ZUNoYW5nZSkge1xuICAgICAgICAgIGNvbnN0IGluZGV4T2ZBbGxvd2VkID0gY3VycmVudEFsbG93ZWRPYmplY3QuZmluZEluZGV4KFxuICAgICAgICAgICAgKGMpID0+IGMuaWQgPT09IEpTT04ucGFyc2UodmFsdWUpLmlkXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGlmIChpbmRleE9mQWxsb3dlZCA9PT0gLTEpIHtcbiAgICAgICAgICAgIG5ld09wdGlvbkVudHJ5ID0gSlNPTi5wYXJzZSh2YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkQ2hhbmdlKHRydWUsIG5ld09wdGlvbkVudHJ5KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSkgYXMgU3Vic2NyaXB0aW9uO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7fVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMucmVzb3VyY2VTdWJzY3JpcHRpb24/LnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5zZWxlY3RlZFN1YnNjcmlwdGlvbj8udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHNlbGVjdGVkQ2hhbmdlKHNlbGVjdGVkOiBib29sZWFuLCB2YWx1ZTogT3B0aW9uKSB7XG4gICAgaWYgKFxuICAgICAgdmFsdWUuYWxsb3dlZCA9PT0gJyonICYmXG4gICAgICBzZWxlY3RlZCAmJlxuICAgICAgdGhpcy5vcHRpb25zRm9ybS5nZXQoJ3NlbGVjdGVkJyk/LnZhbHVlLmxlbmd0aCAhPT1cbiAgICAgICAgdGhpcy5hbGxvd2VkU2hvd0xpc3QubGVuZ3RoXG4gICAgKSB7XG4gICAgICB0aGlzLm9wdGlvbnNGb3JtXG4gICAgICAgIC5nZXQoJ3NlbGVjdGVkJylcbiAgICAgICAgPy5zZXRWYWx1ZShcbiAgICAgICAgICB0aGlzLmFsbG93ZWRTaG93TGlzdC5tYXAoKGFzbykgPT4gSlNPTi5zdHJpbmdpZnkoYXNvKSkgfHwgW11cbiAgICAgICAgKTtcbiAgICAgIHRoaXMuYWxsb3dlZE9iamVjdFt0aGlzLm9wdGlvbnNGb3JtLmdldCgncmVzb3VyY2UnKT8udmFsdWVdID0gW1xuICAgICAgICB0aGlzLmFsbG93ZWRTaG93TGlzdFswXSxcbiAgICAgIF07XG4gICAgfSBlbHNlIGlmICh2YWx1ZS5hbGxvd2VkID09PSAnKicgJiYgIXNlbGVjdGVkKSB7XG4gICAgICBjb25zdCB0ZW1wb3JhbEFsbG93ZWQgPSBbLi4udGhpcy5hbGxvd2VkU2hvd0xpc3RdO1xuICAgICAgdGVtcG9yYWxBbGxvd2VkLnNoaWZ0KCk7XG4gICAgICB0aGlzLmFsbG93ZWRPYmplY3RbdGhpcy5vcHRpb25zRm9ybS5nZXQoJ3Jlc291cmNlJyk/LnZhbHVlXSA9XG4gICAgICAgIHRlbXBvcmFsQWxsb3dlZDtcbiAgICB9IGVsc2UgaWYgKHNlbGVjdGVkKSB7XG4gICAgICB0aGlzLmFsbG93ZWRPYmplY3RbdGhpcy5vcHRpb25zRm9ybS5nZXQoJ3Jlc291cmNlJyk/LnZhbHVlXSA9IChcbiAgICAgICAgdGhpcy5vcHRpb25zRm9ybS5nZXQoJ3NlbGVjdGVkJyk/LnZhbHVlIGFzIHN0cmluZ1tdXG4gICAgICApLm1hcCgoc3RyaW5nT2JqKSA9PiB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKHN0cmluZ09iaik7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMub3B0aW9uc0Zvcm0uZ2V0KCdzZWxlY3RlZCcpPy52YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgZGVsZXRlIHRoaXMuYWxsb3dlZE9iamVjdFt0aGlzLm9wdGlvbnNGb3JtLmdldCgncmVzb3VyY2UnKT8udmFsdWVdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hbGxvd2VkT2JqZWN0W3RoaXMub3B0aW9uc0Zvcm0uZ2V0KCdyZXNvdXJjZScpPy52YWx1ZV0gPSAoXG4gICAgICAgICAgdGhpcy5vcHRpb25zRm9ybS5nZXQoJ3NlbGVjdGVkJyk/LnZhbHVlIGFzIHN0cmluZ1tdXG4gICAgICAgICkubWFwKChzdHJpbmdPYmopID0+IHtcbiAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShzdHJpbmdPYmopO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjbG9zZURpYWxvZygpIHtcbiAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZSgpO1xuICB9XG5cbiAgdXBkYXRlT3B0aW9ucygpIHtcbiAgICB0aGlzLm5iU2VydmljZVxuICAgICAgLnVwZGF0ZVJvbGVPcHRpb25zKFxuICAgICAgICB0aGlzLnJvbGUuaWQsXG4gICAgICAgIHRoaXMuYWxsb3dlZE9iamVjdCxcbiAgICAgICAgdGhpcy5vcmlnaW5hbEFsbG93ZWRPYmplY3RcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoe1xuICAgICAgICBlcnJvcjogKGVycikgPT4ge1xuICAgICAgICAgIHRoaXMuZGlhbG9nUmVmLmRpc2FibGVDbG9zZSA9IGZhbHNlO1xuICAgICAgICAgIGlmIChlcnIuZXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gZXJyLmVycm9yLm1lc3NhZ2U7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gJ1Vua25vd24gRXJyb3InO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbmV4dDogKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKHRydWUpO1xuICAgICAgICB9LFxuICAgICAgfSk7XG4gIH1cbn1cbiIsIjxoMiBtYXQtZGlhbG9nLXRpdGxlPlJvbGUge3sgcm9sZS5pZGVudGlmaWVyIH19IGFjY2VzcyBvcHRpb25zPC9oMj5cbjxmb3JtIFtmb3JtR3JvdXBdPVwib3B0aW9uc0Zvcm1cIiAobmdTdWJtaXQpPVwidXBkYXRlT3B0aW9ucygpXCI+XG4gIDxkaXYgbWF0LWRpYWxvZy1jb250ZW50PlxuICAgIDxkaXYgY2xhc3M9XCJlcnJvci1kaXNwbGF5XCIgKm5nSWY9XCJlcnJvck1lc3NhZ2VcIj5cbiAgICAgIDxoNT57eyBlcnJvck1lc3NhZ2UgfX08L2g1PlxuICAgIDwvZGl2PlxuICAgIDxtYXQtZm9ybS1maWVsZCBjbGFzcz1cImZvcm1zLWZpZWxkXCIgYXBwZWFyYW5jZT1cImZpbGxcIj5cbiAgICAgIDxtYXQtbGFiZWw+U2VsZWN0IGEgcmVzb3VyY2U8L21hdC1sYWJlbD5cbiAgICAgIDxtYXQtc2VsZWN0IG5hbWU9XCJyZXNvdXJjZVwiIGZvcm1Db250cm9sTmFtZT1cInJlc291cmNlXCI+XG4gICAgICAgIDxtYXQtb3B0aW9uXG4gICAgICAgICAgW3ZhbHVlXT1cIm9wdGlvbi5hcHBsaWNhdGlvblJlc291cmNlTmFtZVwiXG4gICAgICAgICAgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBvcHRpb25zXCJcbiAgICAgICAgICA+e3sgb3B0aW9uLmFwcGxpY2F0aW9uUmVzb3VyY2VOYW1lIH19PC9tYXQtb3B0aW9uXG4gICAgICAgID5cbiAgICAgIDwvbWF0LXNlbGVjdD5cbiAgICAgIDxtYXQtaGludD5TZWxlY3QgYW4gYXBwbGljYXRpb24gcmVzb3VyY2U8L21hdC1oaW50PlxuICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgPG1hdC1zZWxlY3Rpb24tbGlzdCAjYWxsb3dlZCBmb3JtQ29udHJvbE5hbWU9XCJzZWxlY3RlZFwiPlxuICAgICAgPG1hdC1saXN0LW9wdGlvblxuICAgICAgICBbdmFsdWVdPVwiY29udmVydFRvU3RyaW5nKGFsbG93ZWRMKVwiXG4gICAgICAgIFtkaXNhYmxlZF09XCJcbiAgICAgICAgICBhbGxvd2VkTC5hbGxvd2VkICE9PSAnKicgJiZcbiAgICAgICAgICBvcHRpb25zRm9ybS5nZXQoJ3NlbGVjdGVkJyk/LnZhbHVlLmxlbmd0aCA9PT0gYWxsb3dlZFNob3dMaXN0Lmxlbmd0aFxuICAgICAgICAgICAgPyB0cnVlXG4gICAgICAgICAgICA6IGZhbHNlXG4gICAgICAgIFwiXG4gICAgICAgICpuZ0Zvcj1cImxldCBhbGxvd2VkTCBvZiBhbGxvd2VkU2hvd0xpc3RcIlxuICAgICAgPlxuICAgICAgICB7eyBhbGxvd2VkTC5hbGxvd2VkIH19XG4gICAgICA8L21hdC1saXN0LW9wdGlvbj5cbiAgICA8L21hdC1zZWxlY3Rpb24tbGlzdD5cbiAgPC9kaXY+XG4gIDxkaXYgYWxpZ249XCJlbmRcIiBtYXQtZGlhbG9nLWFjdGlvbnM+XG4gICAgPGJ1dHRvblxuICAgICAgKGNsaWNrKT1cImNsb3NlRGlhbG9nKClcIlxuICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICBjb2xvcj1cIndhcm5cIlxuICAgICAgbWF0LXN0cm9rZWQtYnV0dG9uXG4gICAgICBbZGlzYWJsZWRdPVwiZGlhbG9nUmVmLmRpc2FibGVDbG9zZVwiXG4gICAgPlxuICAgICAgQ2FuY2VsPC9idXR0b25cbiAgICA+PGJ1dHRvblxuICAgICAgW2Rpc2FibGVkXT1cIiFvcHRpb25zRm9ybS52YWxpZCB8fCBvYmplY3RLZXlzKGFsbG93ZWRPYmplY3QpLmxlbmd0aCA9PT0gMFwiXG4gICAgICBjb2xvcj1cInByaW1hcnlcIlxuICAgICAgbWF0LWZsYXQtYnV0dG9uXG4gICAgPlxuICAgICAgVXBkYXRlXG4gICAgPC9idXR0b24+XG4gIDwvZGl2PlxuPC9mb3JtPlxuIl19