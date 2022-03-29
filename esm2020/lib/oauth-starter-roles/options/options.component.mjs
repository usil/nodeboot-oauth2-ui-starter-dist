import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/dialog";
import * as i2 from "../../nodeboot-oauth2-starter.service";
import * as i3 from "@angular/forms";
import * as i4 from "@angular/material/form-field";
import * as i5 from "@angular/material/select";
import * as i6 from "@angular/material/core";
import * as i7 from "@angular/material/list";
import * as i8 from "@angular/material/button";
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
OptionsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: OptionsComponent, deps: [{ token: i1.MatDialogRef }, { token: MAT_DIALOG_DATA }, { token: i2.NodebootOauth2StarterService }, { token: i3.FormBuilder }], target: i0.ɵɵFactoryTarget.Component });
OptionsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: OptionsComponent, selector: "lib-options", ngImport: i0, template: "<h2 mat-dialog-title>Role {{ role.identifier }} access options</h2>\n<form [formGroup]=\"optionsForm\" (ngSubmit)=\"updateOptions()\">\n  <div mat-dialog-content>\n    <div class=\"error-display\" *ngIf=\"errorMessage\">\n      <h5>{{ errorMessage }}</h5>\n    </div>\n    <mat-form-field class=\"forms-field\" appearance=\"fill\">\n      <mat-label>Select a resource</mat-label>\n      <mat-select name=\"resource\" formControlName=\"resource\">\n        <mat-option\n          [value]=\"option.applicationResourceName\"\n          *ngFor=\"let option of options\"\n          >{{ option.applicationResourceName }}</mat-option\n        >\n      </mat-select>\n      <mat-hint>Select an application resource</mat-hint>\n    </mat-form-field>\n    <mat-selection-list #allowed formControlName=\"selected\">\n      <mat-list-option\n        [value]=\"convertToString(allowedL)\"\n        [disabled]=\"\n          allowedL.allowed !== '*' &&\n          optionsForm.get('selected')?.value.length === allowedShowList.length\n            ? true\n            : false\n        \"\n        *ngFor=\"let allowedL of allowedShowList\"\n      >\n        {{ allowedL.allowed }}\n      </mat-list-option>\n    </mat-selection-list>\n  </div>\n  <div align=\"end\" mat-dialog-actions>\n    <button\n      (click)=\"closeDialog()\"\n      type=\"button\"\n      color=\"warn\"\n      mat-stroked-button\n      [disabled]=\"dialogRef.disableClose\"\n    >\n      Cancel</button\n    ><button\n      [disabled]=\"!optionsForm.valid || objectKeys(allowedObject).length === 0\"\n      color=\"primary\"\n      mat-flat-button\n    >\n      Update\n    </button>\n  </div>\n</form>\n", styles: [".forms-field{width:100%;margin-bottom:1rem}\n"], components: [{ type: i4.MatFormField, selector: "mat-form-field", inputs: ["color", "appearance", "hideRequiredMarker", "hintLabel", "floatLabel"], exportAs: ["matFormField"] }, { type: i5.MatSelect, selector: "mat-select", inputs: ["disabled", "disableRipple", "tabIndex"], exportAs: ["matSelect"] }, { type: i6.MatOption, selector: "mat-option", exportAs: ["matOption"] }, { type: i7.MatSelectionList, selector: "mat-selection-list", inputs: ["disableRipple", "tabIndex", "color", "compareWith", "disabled", "multiple"], outputs: ["selectionChange"], exportAs: ["matSelectionList"] }, { type: i7.MatListOption, selector: "mat-list-option", inputs: ["disableRipple", "checkboxPosition", "color", "value", "disabled", "selected"], outputs: ["selectedChange"], exportAs: ["matListOption"] }, { type: i8.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }], directives: [{ type: i1.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { type: i3.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i3.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i1.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }, { type: i9.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.MatLabel, selector: "mat-label" }, { type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { type: i9.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4.MatHint, selector: "mat-hint", inputs: ["align", "id"] }, { type: i1.MatDialogActions, selector: "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: OptionsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-options', template: "<h2 mat-dialog-title>Role {{ role.identifier }} access options</h2>\n<form [formGroup]=\"optionsForm\" (ngSubmit)=\"updateOptions()\">\n  <div mat-dialog-content>\n    <div class=\"error-display\" *ngIf=\"errorMessage\">\n      <h5>{{ errorMessage }}</h5>\n    </div>\n    <mat-form-field class=\"forms-field\" appearance=\"fill\">\n      <mat-label>Select a resource</mat-label>\n      <mat-select name=\"resource\" formControlName=\"resource\">\n        <mat-option\n          [value]=\"option.applicationResourceName\"\n          *ngFor=\"let option of options\"\n          >{{ option.applicationResourceName }}</mat-option\n        >\n      </mat-select>\n      <mat-hint>Select an application resource</mat-hint>\n    </mat-form-field>\n    <mat-selection-list #allowed formControlName=\"selected\">\n      <mat-list-option\n        [value]=\"convertToString(allowedL)\"\n        [disabled]=\"\n          allowedL.allowed !== '*' &&\n          optionsForm.get('selected')?.value.length === allowedShowList.length\n            ? true\n            : false\n        \"\n        *ngFor=\"let allowedL of allowedShowList\"\n      >\n        {{ allowedL.allowed }}\n      </mat-list-option>\n    </mat-selection-list>\n  </div>\n  <div align=\"end\" mat-dialog-actions>\n    <button\n      (click)=\"closeDialog()\"\n      type=\"button\"\n      color=\"warn\"\n      mat-stroked-button\n      [disabled]=\"dialogRef.disableClose\"\n    >\n      Cancel</button\n    ><button\n      [disabled]=\"!optionsForm.valid || objectKeys(allowedObject).length === 0\"\n      color=\"primary\"\n      mat-flat-button\n    >\n      Update\n    </button>\n  </div>\n</form>\n", styles: [".forms-field{width:100%;margin-bottom:1rem}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.MatDialogRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_DIALOG_DATA]
                }] }, { type: i2.NodebootOauth2StarterService }, { type: i3.FormBuilder }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9ucy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub2RlYm9vdC1vYXV0aDItc3RhcnRlci9zcmMvbGliL29hdXRoLXN0YXJ0ZXItcm9sZXMvb3B0aW9ucy9vcHRpb25zLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vZGVib290LW9hdXRoMi1zdGFydGVyL3NyYy9saWIvb2F1dGgtc3RhcnRlci1yb2xlcy9vcHRpb25zL29wdGlvbnMuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBRXJFLE9BQU8sRUFBZ0IsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7Ozs7Ozs7Ozs7O0FBY3pFLE1BQU0sT0FBTyxnQkFBZ0I7SUFhM0IsWUFDUyxTQUF5QyxFQUNoQixJQUFVLEVBQ2xDLFNBQXVDLEVBQ3ZDLFdBQXdCO1FBSHpCLGNBQVMsR0FBVCxTQUFTLENBQWdDO1FBQ2hCLFNBQUksR0FBSixJQUFJLENBQU07UUFDbEMsY0FBUyxHQUFULFNBQVMsQ0FBOEI7UUFDdkMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFkbEMsWUFBTyxHQUFlLEVBQUUsQ0FBQztRQUN6QixvQkFBZSxHQUFhLEVBQUUsQ0FBQztRQUMvQixrQkFBYSxHQUE2QixFQUFFLENBQUM7UUFDN0MsMEJBQXFCLEdBQTZCLEVBQUUsQ0FBQztRQUNyRCxlQUFVLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztRQUN6QixvQkFBZSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFXL0IsS0FBSyxNQUFNLE1BQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUN4QyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDekUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxHQUFHO2dCQUMzRCxHQUFHLE1BQU0sQ0FBQyxPQUFPO2FBQ2xCLENBQUM7U0FDSDtRQUVELElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxTQUFTLENBQUM7WUFDM0MsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ2IsSUFBSSxHQUFHLENBQUMsS0FBSyxFQUFFO29CQUNiLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7aUJBQ3ZDO3FCQUFNO29CQUNMLElBQUksQ0FBQyxZQUFZLEdBQUcsZUFBZSxDQUFDO2lCQUNyQztnQkFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUNwQixDQUFDO1lBQ0QsSUFBSSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ1osSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQztZQUNuQyxDQUFDO1NBQ0YsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztZQUN4QyxRQUFRLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQ3RDLFFBQVEsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7U0FDdkMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxXQUFXO2FBQ3pDLEdBQUcsQ0FBQyxVQUFVLENBQUM7WUFDaEIsRUFBRSxZQUFZLENBQUMsU0FBUyxDQUFDO1lBQ3ZCLElBQUksRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUNkLElBQUksQ0FBQyxlQUFlO29CQUNsQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLHVCQUF1QixLQUFLLEtBQUssQ0FBQzt3QkFDM0QsRUFBRSxPQUFPLElBQUksRUFBRSxDQUFDO2dCQUVwQixJQUFJLENBQUMsV0FBVztxQkFDYixHQUFHLENBQUMsVUFBVSxDQUFDO29CQUNoQixFQUFFLFFBQVEsQ0FDUixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxFQUFFLEdBQUcsQ0FDOUQsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQzdCLElBQUksRUFBRSxDQUNSLENBQUM7WUFDTixDQUFDO1NBQ0YsQ0FBaUIsQ0FBQztRQUVyQixJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLFdBQVc7YUFDekMsR0FBRyxDQUFDLFVBQVUsQ0FBQztZQUNoQixFQUFFLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxXQUFxQixFQUFFLEVBQUU7WUFDakQsTUFBTSxvQkFBb0IsR0FDeEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7WUFFcEUsSUFBSSxXQUFXLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxvQkFBb0IsQ0FBQyxNQUFNLEtBQUssQ0FBQztnQkFDL0QsT0FBTztZQUVULElBQUksY0FBc0IsQ0FBQztZQUUzQixJQUFJLG9CQUFvQixDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQ3JDLGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM1QyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxjQUFjLENBQUMsQ0FBQztnQkFDMUMsT0FBTzthQUNSO1lBRUQsSUFBSSxXQUFXLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDNUIsY0FBYyxHQUFHLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6QyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxjQUFjLENBQUMsQ0FBQztnQkFDM0MsT0FBTzthQUNSO1lBRUQsSUFDRSxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEtBQUssR0FBRztnQkFDdkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEtBQUssR0FBRyxFQUMxQztnQkFDQSxjQUFjLEdBQUcsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLGNBQWMsQ0FBQyxDQUFDO2dCQUMzQyxPQUFPO2FBQ1I7WUFFRCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxLQUFLLEdBQUcsRUFBRTtnQkFDOUMsY0FBYyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDO2dCQUMxQyxPQUFPO2FBQ1I7WUFFRCxJQUFJLG9CQUFvQixDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUMsTUFBTSxFQUFFO2dCQUNwRCxLQUFLLE1BQU0sT0FBTyxJQUFJLG9CQUFvQixFQUFFO29CQUMxQyxNQUFNLGNBQWMsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUMxQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssT0FBTyxDQUFDLEVBQUUsQ0FDdkMsQ0FBQztvQkFFRixJQUFJLGNBQWMsS0FBSyxDQUFDLENBQUMsRUFBRTt3QkFDekIsY0FBYyxHQUFHLE9BQU8sQ0FBQzt3QkFDekIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsY0FBYyxDQUFDLENBQUM7d0JBQzNDLE1BQU07cUJBQ1A7aUJBQ0Y7Z0JBRUQsT0FBTzthQUNSO1lBRUQsS0FBSyxNQUFNLEtBQUssSUFBSSxXQUFXLEVBQUU7Z0JBQy9CLE1BQU0sY0FBYyxHQUFHLG9CQUFvQixDQUFDLFNBQVMsQ0FDbkQsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQ3JDLENBQUM7Z0JBRUYsSUFBSSxjQUFjLEtBQUssQ0FBQyxDQUFDLEVBQUU7b0JBQ3pCLGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNuQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxjQUFjLENBQUMsQ0FBQztvQkFDMUMsTUFBTTtpQkFDUDthQUNGO1FBQ0gsQ0FBQyxDQUFpQixDQUFDO0lBQ3ZCLENBQUM7SUFFRCxRQUFRLEtBQVUsQ0FBQztJQUVuQixXQUFXO1FBQ1QsSUFBSSxDQUFDLG9CQUFvQixFQUFFLFdBQVcsRUFBRSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxXQUFXLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBRUQsY0FBYyxDQUFDLFFBQWlCLEVBQUUsS0FBYTtRQUM3QyxJQUNFLEtBQUssQ0FBQyxPQUFPLEtBQUssR0FBRztZQUNyQixRQUFRO1lBQ1IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEVBQUUsS0FBSyxDQUFDLE1BQU07Z0JBQzVDLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUM3QjtZQUNBLElBQUksQ0FBQyxXQUFXO2lCQUNiLEdBQUcsQ0FBQyxVQUFVLENBQUM7Z0JBQ2hCLEVBQUUsUUFBUSxDQUNSLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUM3RCxDQUFDO1lBQ0osSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsRUFBRSxLQUFLLENBQUMsR0FBRztnQkFDNUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7YUFDeEIsQ0FBQztTQUNIO2FBQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUM3QyxNQUFNLGVBQWUsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ2xELGVBQWUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUN4QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFFLEtBQUssQ0FBQztnQkFDekQsZUFBZSxDQUFDO1NBQ25CO2FBQU0sSUFBSSxRQUFRLEVBQUU7WUFDbkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsRUFBRSxLQUFLLENBQUMsR0FDekQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEVBQUUsS0FDbkMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtnQkFDbEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQy9CLENBQUMsQ0FBQyxDQUFDO1NBQ0o7YUFBTTtZQUNMLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEVBQUUsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQ3hELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQzthQUNwRTtpQkFBTTtnQkFDTCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxHQUN6RCxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsRUFBRSxLQUNuQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO29CQUNsQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQy9CLENBQUMsQ0FBQyxDQUFDO2FBQ0o7U0FDRjtJQUNILENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQsYUFBYTtRQUNYLElBQUksQ0FBQyxTQUFTO2FBQ1gsaUJBQWlCLENBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUNaLElBQUksQ0FBQyxhQUFhLEVBQ2xCLElBQUksQ0FBQyxxQkFBcUIsQ0FDM0I7YUFDQSxTQUFTLENBQUM7WUFDVCxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDYixJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7Z0JBQ3BDLElBQUksR0FBRyxDQUFDLEtBQUssRUFBRTtvQkFDYixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO2lCQUN2QztxQkFBTTtvQkFDTCxJQUFJLENBQUMsWUFBWSxHQUFHLGVBQWUsQ0FBQztpQkFDckM7WUFDSCxDQUFDO1lBQ0QsSUFBSSxFQUFFLEdBQUcsRUFBRTtnQkFDVCxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM3QixDQUFDO1NBQ0YsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7NkdBdk1VLGdCQUFnQiw4Q0FlakIsZUFBZTtpR0FmZCxnQkFBZ0IsbURDaEI3QiwrbkRBa0RBOzJGRGxDYSxnQkFBZ0I7a0JBTDVCLFNBQVM7K0JBQ0UsYUFBYTs7MEJBbUJwQixNQUFNOzJCQUFDLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEluamVjdCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUJ1aWxkZXIgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNYXREaWFsb2dSZWYsIE1BVF9ESUFMT0dfREFUQSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIFJlc291cmNlLFxuICBSb2xlLFxuICBPcHRpb24sXG4gIE5vZGVib290T2F1dGgyU3RhcnRlclNlcnZpY2UsXG59IGZyb20gJy4uLy4uL25vZGVib290LW9hdXRoMi1zdGFydGVyLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItb3B0aW9ucycsXG4gIHRlbXBsYXRlVXJsOiAnLi9vcHRpb25zLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vb3B0aW9ucy5jb21wb25lbnQuc2NzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBPcHRpb25zQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBvcHRpb25zRm9ybTogRm9ybUdyb3VwO1xuICBlcnJvck1lc3NhZ2UhOiBzdHJpbmc7XG4gIG9wdGlvbnM6IFJlc291cmNlW10gPSBbXTtcbiAgYWxsb3dlZFNob3dMaXN0OiBPcHRpb25bXSA9IFtdO1xuICBhbGxvd2VkT2JqZWN0OiBSZWNvcmQ8c3RyaW5nLCBPcHRpb25bXT4gPSB7fTtcbiAgb3JpZ2luYWxBbGxvd2VkT2JqZWN0OiBSZWNvcmQ8c3RyaW5nLCBPcHRpb25bXT4gPSB7fTtcbiAgb2JqZWN0S2V5cyA9IE9iamVjdC5rZXlzO1xuICBjb252ZXJ0VG9TdHJpbmcgPSBKU09OLnN0cmluZ2lmeTtcblxuICBzZWxlY3RlZFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICByZXNvdXJjZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxPcHRpb25zQ29tcG9uZW50PixcbiAgICBASW5qZWN0KE1BVF9ESUFMT0dfREFUQSkgcHVibGljIHJvbGU6IFJvbGUsXG4gICAgcHJpdmF0ZSBuYlNlcnZpY2U6IE5vZGVib290T2F1dGgyU3RhcnRlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBmb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXJcbiAgKSB7XG4gICAgZm9yIChjb25zdCBvcHRpb24gb2YgdGhpcy5yb2xlLnJlc291cmNlcykge1xuICAgICAgdGhpcy5hbGxvd2VkT2JqZWN0W29wdGlvbi5hcHBsaWNhdGlvblJlc291cmNlTmFtZV0gPSBbLi4ub3B0aW9uLmFsbG93ZWRdO1xuICAgICAgdGhpcy5vcmlnaW5hbEFsbG93ZWRPYmplY3Rbb3B0aW9uLmFwcGxpY2F0aW9uUmVzb3VyY2VOYW1lXSA9IFtcbiAgICAgICAgLi4ub3B0aW9uLmFsbG93ZWQsXG4gICAgICBdO1xuICAgIH1cblxuICAgIHRoaXMubmJTZXJ2aWNlLmdldFJlc291cmNlc0Jhc2ljKCkuc3Vic2NyaWJlKHtcbiAgICAgIGVycm9yOiAoZXJyKSA9PiB7XG4gICAgICAgIGlmIChlcnIuZXJyb3IpIHtcbiAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IGVyci5lcnJvci5tZXNzYWdlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gJ1Vua25vd24gRXJyb3InO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IFtdO1xuICAgICAgfSxcbiAgICAgIG5leHQ6IChyZXMpID0+IHtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gcmVzLmNvbnRlbnQgfHwgW107XG4gICAgICB9LFxuICAgIH0pO1xuICAgIHRoaXMub3B0aW9uc0Zvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcbiAgICAgIHJlc291cmNlOiB0aGlzLmZvcm1CdWlsZGVyLmNvbnRyb2woJycpLFxuICAgICAgc2VsZWN0ZWQ6IHRoaXMuZm9ybUJ1aWxkZXIuY29udHJvbChbXSksXG4gICAgfSk7XG4gICAgdGhpcy5yZXNvdXJjZVN1YnNjcmlwdGlvbiA9IHRoaXMub3B0aW9uc0Zvcm1cbiAgICAgIC5nZXQoJ3Jlc291cmNlJylcbiAgICAgID8udmFsdWVDaGFuZ2VzLnN1YnNjcmliZSh7XG4gICAgICAgIG5leHQ6ICh2YWx1ZSkgPT4ge1xuICAgICAgICAgIHRoaXMuYWxsb3dlZFNob3dMaXN0ID1cbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5maW5kKChvKSA9PiBvLmFwcGxpY2F0aW9uUmVzb3VyY2VOYW1lID09PSB2YWx1ZSlcbiAgICAgICAgICAgICAgPy5hbGxvd2VkIHx8IFtdO1xuXG4gICAgICAgICAgdGhpcy5vcHRpb25zRm9ybVxuICAgICAgICAgICAgLmdldCgnc2VsZWN0ZWQnKVxuICAgICAgICAgICAgPy5zZXRWYWx1ZShcbiAgICAgICAgICAgICAgdGhpcy5hbGxvd2VkT2JqZWN0W3RoaXMub3B0aW9uc0Zvcm0uZ2V0KCdyZXNvdXJjZScpPy52YWx1ZV0/Lm1hcChcbiAgICAgICAgICAgICAgICAoYXNsKSA9PiBKU09OLnN0cmluZ2lmeShhc2wpXG4gICAgICAgICAgICAgICkgfHwgW11cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICB9KSBhcyBTdWJzY3JpcHRpb247XG5cbiAgICB0aGlzLnNlbGVjdGVkU3Vic2NyaXB0aW9uID0gdGhpcy5vcHRpb25zRm9ybVxuICAgICAgLmdldCgnc2VsZWN0ZWQnKVxuICAgICAgPy52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKCh2YWx1ZUNoYW5nZTogc3RyaW5nW10pID0+IHtcbiAgICAgICAgY29uc3QgY3VycmVudEFsbG93ZWRPYmplY3QgPVxuICAgICAgICAgIHRoaXMuYWxsb3dlZE9iamVjdFt0aGlzLm9wdGlvbnNGb3JtLmdldCgncmVzb3VyY2UnKT8udmFsdWVdIHx8IFtdO1xuXG4gICAgICAgIGlmICh2YWx1ZUNoYW5nZS5sZW5ndGggPT09IDAgJiYgY3VycmVudEFsbG93ZWRPYmplY3QubGVuZ3RoID09PSAwKVxuICAgICAgICAgIHJldHVybjtcblxuICAgICAgICBsZXQgbmV3T3B0aW9uRW50cnk6IE9wdGlvbjtcblxuICAgICAgICBpZiAoY3VycmVudEFsbG93ZWRPYmplY3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgbmV3T3B0aW9uRW50cnkgPSBKU09OLnBhcnNlKHZhbHVlQ2hhbmdlWzBdKTtcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkQ2hhbmdlKHRydWUsIG5ld09wdGlvbkVudHJ5KTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsdWVDaGFuZ2UubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgbmV3T3B0aW9uRW50cnkgPSBjdXJyZW50QWxsb3dlZE9iamVjdFswXTtcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkQ2hhbmdlKGZhbHNlLCBuZXdPcHRpb25FbnRyeSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgIGN1cnJlbnRBbGxvd2VkT2JqZWN0WzBdLmFsbG93ZWQgPT09ICcqJyAmJlxuICAgICAgICAgIEpTT04ucGFyc2UodmFsdWVDaGFuZ2VbMF0pLmFsbG93ZWQgIT09ICcqJ1xuICAgICAgICApIHtcbiAgICAgICAgICBuZXdPcHRpb25FbnRyeSA9IGN1cnJlbnRBbGxvd2VkT2JqZWN0WzBdO1xuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDaGFuZ2UoZmFsc2UsIG5ld09wdGlvbkVudHJ5KTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoSlNPTi5wYXJzZSh2YWx1ZUNoYW5nZVswXSkuYWxsb3dlZCA9PT0gJyonKSB7XG4gICAgICAgICAgbmV3T3B0aW9uRW50cnkgPSBKU09OLnBhcnNlKHZhbHVlQ2hhbmdlWzBdKTtcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkQ2hhbmdlKHRydWUsIG5ld09wdGlvbkVudHJ5KTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY3VycmVudEFsbG93ZWRPYmplY3QubGVuZ3RoID4gdmFsdWVDaGFuZ2UubGVuZ3RoKSB7XG4gICAgICAgICAgZm9yIChjb25zdCBhbGxvd2VkIG9mIGN1cnJlbnRBbGxvd2VkT2JqZWN0KSB7XG4gICAgICAgICAgICBjb25zdCBpbmRleE9mQWxsb3dlZCA9IHZhbHVlQ2hhbmdlLmZpbmRJbmRleChcbiAgICAgICAgICAgICAgKHYpID0+IEpTT04ucGFyc2UodikuaWQgPT09IGFsbG93ZWQuaWRcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGlmIChpbmRleE9mQWxsb3dlZCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgbmV3T3B0aW9uRW50cnkgPSBhbGxvd2VkO1xuICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkQ2hhbmdlKGZhbHNlLCBuZXdPcHRpb25FbnRyeSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoY29uc3QgdmFsdWUgb2YgdmFsdWVDaGFuZ2UpIHtcbiAgICAgICAgICBjb25zdCBpbmRleE9mQWxsb3dlZCA9IGN1cnJlbnRBbGxvd2VkT2JqZWN0LmZpbmRJbmRleChcbiAgICAgICAgICAgIChjKSA9PiBjLmlkID09PSBKU09OLnBhcnNlKHZhbHVlKS5pZFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBpZiAoaW5kZXhPZkFsbG93ZWQgPT09IC0xKSB7XG4gICAgICAgICAgICBuZXdPcHRpb25FbnRyeSA9IEpTT04ucGFyc2UodmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZENoYW5nZSh0cnVlLCBuZXdPcHRpb25FbnRyeSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pIGFzIFN1YnNjcmlwdGlvbjtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge31cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnJlc291cmNlU3Vic2NyaXB0aW9uPy51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuc2VsZWN0ZWRTdWJzY3JpcHRpb24/LnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBzZWxlY3RlZENoYW5nZShzZWxlY3RlZDogYm9vbGVhbiwgdmFsdWU6IE9wdGlvbikge1xuICAgIGlmIChcbiAgICAgIHZhbHVlLmFsbG93ZWQgPT09ICcqJyAmJlxuICAgICAgc2VsZWN0ZWQgJiZcbiAgICAgIHRoaXMub3B0aW9uc0Zvcm0uZ2V0KCdzZWxlY3RlZCcpPy52YWx1ZS5sZW5ndGggIT09XG4gICAgICAgIHRoaXMuYWxsb3dlZFNob3dMaXN0Lmxlbmd0aFxuICAgICkge1xuICAgICAgdGhpcy5vcHRpb25zRm9ybVxuICAgICAgICAuZ2V0KCdzZWxlY3RlZCcpXG4gICAgICAgID8uc2V0VmFsdWUoXG4gICAgICAgICAgdGhpcy5hbGxvd2VkU2hvd0xpc3QubWFwKChhc28pID0+IEpTT04uc3RyaW5naWZ5KGFzbykpIHx8IFtdXG4gICAgICAgICk7XG4gICAgICB0aGlzLmFsbG93ZWRPYmplY3RbdGhpcy5vcHRpb25zRm9ybS5nZXQoJ3Jlc291cmNlJyk/LnZhbHVlXSA9IFtcbiAgICAgICAgdGhpcy5hbGxvd2VkU2hvd0xpc3RbMF0sXG4gICAgICBdO1xuICAgIH0gZWxzZSBpZiAodmFsdWUuYWxsb3dlZCA9PT0gJyonICYmICFzZWxlY3RlZCkge1xuICAgICAgY29uc3QgdGVtcG9yYWxBbGxvd2VkID0gWy4uLnRoaXMuYWxsb3dlZFNob3dMaXN0XTtcbiAgICAgIHRlbXBvcmFsQWxsb3dlZC5zaGlmdCgpO1xuICAgICAgdGhpcy5hbGxvd2VkT2JqZWN0W3RoaXMub3B0aW9uc0Zvcm0uZ2V0KCdyZXNvdXJjZScpPy52YWx1ZV0gPVxuICAgICAgICB0ZW1wb3JhbEFsbG93ZWQ7XG4gICAgfSBlbHNlIGlmIChzZWxlY3RlZCkge1xuICAgICAgdGhpcy5hbGxvd2VkT2JqZWN0W3RoaXMub3B0aW9uc0Zvcm0uZ2V0KCdyZXNvdXJjZScpPy52YWx1ZV0gPSAoXG4gICAgICAgIHRoaXMub3B0aW9uc0Zvcm0uZ2V0KCdzZWxlY3RlZCcpPy52YWx1ZSBhcyBzdHJpbmdbXVxuICAgICAgKS5tYXAoKHN0cmluZ09iaikgPT4ge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShzdHJpbmdPYmopO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnNGb3JtLmdldCgnc2VsZWN0ZWQnKT8udmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmFsbG93ZWRPYmplY3RbdGhpcy5vcHRpb25zRm9ybS5nZXQoJ3Jlc291cmNlJyk/LnZhbHVlXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYWxsb3dlZE9iamVjdFt0aGlzLm9wdGlvbnNGb3JtLmdldCgncmVzb3VyY2UnKT8udmFsdWVdID0gKFxuICAgICAgICAgIHRoaXMub3B0aW9uc0Zvcm0uZ2V0KCdzZWxlY3RlZCcpPy52YWx1ZSBhcyBzdHJpbmdbXVxuICAgICAgICApLm1hcCgoc3RyaW5nT2JqKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2Uoc3RyaW5nT2JqKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY2xvc2VEaWFsb2coKSB7XG4gICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UoKTtcbiAgfVxuXG4gIHVwZGF0ZU9wdGlvbnMoKSB7XG4gICAgdGhpcy5uYlNlcnZpY2VcbiAgICAgIC51cGRhdGVSb2xlT3B0aW9ucyhcbiAgICAgICAgdGhpcy5yb2xlLmlkLFxuICAgICAgICB0aGlzLmFsbG93ZWRPYmplY3QsXG4gICAgICAgIHRoaXMub3JpZ2luYWxBbGxvd2VkT2JqZWN0XG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKHtcbiAgICAgICAgZXJyb3I6IChlcnIpID0+IHtcbiAgICAgICAgICB0aGlzLmRpYWxvZ1JlZi5kaXNhYmxlQ2xvc2UgPSBmYWxzZTtcbiAgICAgICAgICBpZiAoZXJyLmVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IGVyci5lcnJvci5tZXNzYWdlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9ICdVbmtub3duIEVycm9yJztcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG5leHQ6ICgpID0+IHtcbiAgICAgICAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZSh0cnVlKTtcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICB9XG59XG4iLCI8aDIgbWF0LWRpYWxvZy10aXRsZT5Sb2xlIHt7IHJvbGUuaWRlbnRpZmllciB9fSBhY2Nlc3Mgb3B0aW9uczwvaDI+XG48Zm9ybSBbZm9ybUdyb3VwXT1cIm9wdGlvbnNGb3JtXCIgKG5nU3VibWl0KT1cInVwZGF0ZU9wdGlvbnMoKVwiPlxuICA8ZGl2IG1hdC1kaWFsb2ctY29udGVudD5cbiAgICA8ZGl2IGNsYXNzPVwiZXJyb3ItZGlzcGxheVwiICpuZ0lmPVwiZXJyb3JNZXNzYWdlXCI+XG4gICAgICA8aDU+e3sgZXJyb3JNZXNzYWdlIH19PC9oNT5cbiAgICA8L2Rpdj5cbiAgICA8bWF0LWZvcm0tZmllbGQgY2xhc3M9XCJmb3Jtcy1maWVsZFwiIGFwcGVhcmFuY2U9XCJmaWxsXCI+XG4gICAgICA8bWF0LWxhYmVsPlNlbGVjdCBhIHJlc291cmNlPC9tYXQtbGFiZWw+XG4gICAgICA8bWF0LXNlbGVjdCBuYW1lPVwicmVzb3VyY2VcIiBmb3JtQ29udHJvbE5hbWU9XCJyZXNvdXJjZVwiPlxuICAgICAgICA8bWF0LW9wdGlvblxuICAgICAgICAgIFt2YWx1ZV09XCJvcHRpb24uYXBwbGljYXRpb25SZXNvdXJjZU5hbWVcIlxuICAgICAgICAgICpuZ0Zvcj1cImxldCBvcHRpb24gb2Ygb3B0aW9uc1wiXG4gICAgICAgICAgPnt7IG9wdGlvbi5hcHBsaWNhdGlvblJlc291cmNlTmFtZSB9fTwvbWF0LW9wdGlvblxuICAgICAgICA+XG4gICAgICA8L21hdC1zZWxlY3Q+XG4gICAgICA8bWF0LWhpbnQ+U2VsZWN0IGFuIGFwcGxpY2F0aW9uIHJlc291cmNlPC9tYXQtaGludD5cbiAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgIDxtYXQtc2VsZWN0aW9uLWxpc3QgI2FsbG93ZWQgZm9ybUNvbnRyb2xOYW1lPVwic2VsZWN0ZWRcIj5cbiAgICAgIDxtYXQtbGlzdC1vcHRpb25cbiAgICAgICAgW3ZhbHVlXT1cImNvbnZlcnRUb1N0cmluZyhhbGxvd2VkTClcIlxuICAgICAgICBbZGlzYWJsZWRdPVwiXG4gICAgICAgICAgYWxsb3dlZEwuYWxsb3dlZCAhPT0gJyonICYmXG4gICAgICAgICAgb3B0aW9uc0Zvcm0uZ2V0KCdzZWxlY3RlZCcpPy52YWx1ZS5sZW5ndGggPT09IGFsbG93ZWRTaG93TGlzdC5sZW5ndGhcbiAgICAgICAgICAgID8gdHJ1ZVxuICAgICAgICAgICAgOiBmYWxzZVxuICAgICAgICBcIlxuICAgICAgICAqbmdGb3I9XCJsZXQgYWxsb3dlZEwgb2YgYWxsb3dlZFNob3dMaXN0XCJcbiAgICAgID5cbiAgICAgICAge3sgYWxsb3dlZEwuYWxsb3dlZCB9fVxuICAgICAgPC9tYXQtbGlzdC1vcHRpb24+XG4gICAgPC9tYXQtc2VsZWN0aW9uLWxpc3Q+XG4gIDwvZGl2PlxuICA8ZGl2IGFsaWduPVwiZW5kXCIgbWF0LWRpYWxvZy1hY3Rpb25zPlxuICAgIDxidXR0b25cbiAgICAgIChjbGljayk9XCJjbG9zZURpYWxvZygpXCJcbiAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgY29sb3I9XCJ3YXJuXCJcbiAgICAgIG1hdC1zdHJva2VkLWJ1dHRvblxuICAgICAgW2Rpc2FibGVkXT1cImRpYWxvZ1JlZi5kaXNhYmxlQ2xvc2VcIlxuICAgID5cbiAgICAgIENhbmNlbDwvYnV0dG9uXG4gICAgPjxidXR0b25cbiAgICAgIFtkaXNhYmxlZF09XCIhb3B0aW9uc0Zvcm0udmFsaWQgfHwgb2JqZWN0S2V5cyhhbGxvd2VkT2JqZWN0KS5sZW5ndGggPT09IDBcIlxuICAgICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICAgIG1hdC1mbGF0LWJ1dHRvblxuICAgID5cbiAgICAgIFVwZGF0ZVxuICAgIDwvYnV0dG9uPlxuICA8L2Rpdj5cbjwvZm9ybT5cbiJdfQ==