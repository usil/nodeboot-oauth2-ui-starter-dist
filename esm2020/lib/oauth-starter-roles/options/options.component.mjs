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
        for (const option of this.role.parts) {
            this.allowedObject[option.applicationPartName] = [...option.allowed];
            this.originalAllowedObject[option.applicationPartName] = [
                ...option.allowed,
            ];
        }
        this.nbService.getPartsBasic().subscribe({
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
            part: this.formBuilder.control(''),
            selected: this.formBuilder.control([]),
        });
        this.partSubscription = this.optionsForm
            .get('part')
            ?.valueChanges.subscribe({
            next: (value) => {
                this.allowedShowList =
                    this.options.find((o) => o.applicationPartName === value)
                        ?.allowed || [];
                this.optionsForm
                    .get('selected')
                    ?.setValue(this.allowedObject[this.optionsForm.get('part')?.value]?.map((asl) => JSON.stringify(asl)) || []);
            },
        });
    }
    ngOnInit() { }
    ngOnDestroy() {
        this.partSubscription?.unsubscribe();
    }
    selectedChange(selected, value) {
        const parsedValue = JSON.parse(value);
        const currentAllowedObject = this.allowedObject[this.optionsForm.get('part')?.value];
        if (parsedValue.allowed === '*' &&
            selected &&
            this.optionsForm.get('selected')?.value.length !==
                this.allowedShowList.length) {
            this.optionsForm
                .get('selected')
                ?.setValue(this.allowedShowList.map((asl) => JSON.stringify(asl)));
            this.allowedObject[this.optionsForm.get('part')?.value] = [
                this.allowedShowList[0],
            ];
        }
        else if (parsedValue.allowed === '*' && !selected) {
            const temporalAllowed = [...this.allowedShowList];
            temporalAllowed.shift();
            this.allowedObject[this.optionsForm.get('part')?.value] = temporalAllowed;
        }
        else if (selected) {
            if (!(currentAllowedObject && currentAllowedObject[0].allowed === '*')) {
                if (currentAllowedObject &&
                    currentAllowedObject.findIndex((ca) => ca.id === parsedValue.id) ===
                        -1) {
                    currentAllowedObject.push(parsedValue);
                }
                else {
                    this.allowedObject[this.optionsForm.get('part')?.value] = [
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
                delete this.allowedObject[this.optionsForm.get('part')?.value];
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
OptionsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: OptionsComponent, selector: "lib-options", ngImport: i0, template: "<h2 mat-dialog-title>Role {{ role.identifier }} access options</h2>\n<form [formGroup]=\"optionsForm\" (ngSubmit)=\"updateOptions()\">\n  <div mat-dialog-content>\n    <div class=\"error-display\" *ngIf=\"errorMessage\">\n      <h5>{{ errorMessage }}</h5>\n    </div>\n    <mat-form-field class=\"forms-field\" appearance=\"fill\">\n      <mat-label>Select a part</mat-label>\n      <mat-select name=\"part\" formControlName=\"part\">\n        <mat-option\n          [value]=\"option.applicationPartName\"\n          *ngFor=\"let option of options\"\n          >{{ option.applicationPartName }}</mat-option\n        >\n      </mat-select>\n      <mat-hint>Select an application part</mat-hint>\n    </mat-form-field>\n    <mat-selection-list #allowed formControlName=\"selected\">\n      <mat-list-option\n        (selectedChange)=\"selectedChange($event, convertToString(allowedL))\"\n        [value]=\"convertToString(allowedL)\"\n        [disabled]=\"\n          allowedL.allowed !== '*' &&\n          optionsForm.get('selected')?.value.length === allowedShowList.length\n            ? true\n            : false\n        \"\n        *ngFor=\"let allowedL of allowedShowList\"\n      >\n        {{ allowedL.allowed }}\n      </mat-list-option>\n    </mat-selection-list>\n  </div>\n  <div align=\"end\" mat-dialog-actions>\n    <button\n      (click)=\"closeDialog()\"\n      type=\"button\"\n      color=\"warn\"\n      mat-stroked-button\n      [disabled]=\"dialogRef.disableClose\"\n    >\n      Cancel</button\n    ><button\n      [disabled]=\"!optionsForm.valid || objectKeys(allowedObject).length === 0\"\n      color=\"primary\"\n      mat-flat-button\n    >\n      Update\n    </button>\n  </div>\n</form>\n", styles: [".forms-field{width:100%}\n"], components: [{ type: i4.MatFormField, selector: "mat-form-field", inputs: ["color", "appearance", "hideRequiredMarker", "hintLabel", "floatLabel"], exportAs: ["matFormField"] }, { type: i5.MatSelect, selector: "mat-select", inputs: ["disabled", "disableRipple", "tabIndex"], exportAs: ["matSelect"] }, { type: i6.MatOption, selector: "mat-option", exportAs: ["matOption"] }, { type: i7.MatSelectionList, selector: "mat-selection-list", inputs: ["disableRipple", "tabIndex", "color", "compareWith", "disabled", "multiple"], outputs: ["selectionChange"], exportAs: ["matSelectionList"] }, { type: i7.MatListOption, selector: "mat-list-option", inputs: ["disableRipple", "checkboxPosition", "color", "value", "disabled", "selected"], outputs: ["selectedChange"], exportAs: ["matListOption"] }, { type: i8.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }], directives: [{ type: i1.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { type: i3.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i3.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i1.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }, { type: i9.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.MatLabel, selector: "mat-label" }, { type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { type: i9.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4.MatHint, selector: "mat-hint", inputs: ["align", "id"] }, { type: i1.MatDialogActions, selector: "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: OptionsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-options', template: "<h2 mat-dialog-title>Role {{ role.identifier }} access options</h2>\n<form [formGroup]=\"optionsForm\" (ngSubmit)=\"updateOptions()\">\n  <div mat-dialog-content>\n    <div class=\"error-display\" *ngIf=\"errorMessage\">\n      <h5>{{ errorMessage }}</h5>\n    </div>\n    <mat-form-field class=\"forms-field\" appearance=\"fill\">\n      <mat-label>Select a part</mat-label>\n      <mat-select name=\"part\" formControlName=\"part\">\n        <mat-option\n          [value]=\"option.applicationPartName\"\n          *ngFor=\"let option of options\"\n          >{{ option.applicationPartName }}</mat-option\n        >\n      </mat-select>\n      <mat-hint>Select an application part</mat-hint>\n    </mat-form-field>\n    <mat-selection-list #allowed formControlName=\"selected\">\n      <mat-list-option\n        (selectedChange)=\"selectedChange($event, convertToString(allowedL))\"\n        [value]=\"convertToString(allowedL)\"\n        [disabled]=\"\n          allowedL.allowed !== '*' &&\n          optionsForm.get('selected')?.value.length === allowedShowList.length\n            ? true\n            : false\n        \"\n        *ngFor=\"let allowedL of allowedShowList\"\n      >\n        {{ allowedL.allowed }}\n      </mat-list-option>\n    </mat-selection-list>\n  </div>\n  <div align=\"end\" mat-dialog-actions>\n    <button\n      (click)=\"closeDialog()\"\n      type=\"button\"\n      color=\"warn\"\n      mat-stroked-button\n      [disabled]=\"dialogRef.disableClose\"\n    >\n      Cancel</button\n    ><button\n      [disabled]=\"!optionsForm.valid || objectKeys(allowedObject).length === 0\"\n      color=\"primary\"\n      mat-flat-button\n    >\n      Update\n    </button>\n  </div>\n</form>\n", styles: [".forms-field{width:100%}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.MatDialogRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_DIALOG_DATA]
                }] }, { type: i2.NodebootOauth2StarterService }, { type: i3.FormBuilder }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9ucy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub2RlYm9vdC1vYXV0aDItc3RhcnRlci9zcmMvbGliL29hdXRoLXN0YXJ0ZXItcm9sZXMvb3B0aW9ucy9vcHRpb25zLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vZGVib290LW9hdXRoMi1zdGFydGVyL3NyYy9saWIvb2F1dGgtc3RhcnRlci1yb2xlcy9vcHRpb25zL29wdGlvbnMuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBRXJFLE9BQU8sRUFBZ0IsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7Ozs7Ozs7Ozs7O0FBY3pFLE1BQU0sT0FBTyxnQkFBZ0I7SUFXM0IsWUFDUyxTQUF5QyxFQUNoQixJQUFVLEVBQ2xDLFNBQXVDLEVBQ3ZDLFdBQXdCO1FBSHpCLGNBQVMsR0FBVCxTQUFTLENBQWdDO1FBQ2hCLFNBQUksR0FBSixJQUFJLENBQU07UUFDbEMsY0FBUyxHQUFULFNBQVMsQ0FBOEI7UUFDdkMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFabEMsWUFBTyxHQUFXLEVBQUUsQ0FBQztRQUNyQixvQkFBZSxHQUFhLEVBQUUsQ0FBQztRQUMvQixrQkFBYSxHQUE2QixFQUFFLENBQUM7UUFDN0MsMEJBQXFCLEdBQTZCLEVBQUUsQ0FBQztRQUNyRCxlQUFVLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztRQUN6QixvQkFBZSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFTL0IsS0FBSyxNQUFNLE1BQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNwQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMs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SVUsZ0JBQWdCLDhDQWFqQixlQUFlO2lHQWJkLGdCQUFnQixtRENoQjdCLHVyREFtREE7MkZEbkNhLGdCQUFnQjtrQkFMNUIsU0FBUzsrQkFDRSxhQUFhOzswQkFpQnBCLE1BQU07MkJBQUMsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5qZWN0LCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQnVpbGRlciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE1hdERpYWxvZ1JlZiwgTUFUX0RJQUxPR19EQVRBIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgUGFydCxcbiAgUm9sZSxcbiAgT3B0aW9uLFxuICBOb2RlYm9vdE9hdXRoMlN0YXJ0ZXJTZXJ2aWNlLFxufSBmcm9tICcuLi8uLi9ub2RlYm9vdC1vYXV0aDItc3RhcnRlci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGliLW9wdGlvbnMnLFxuICB0ZW1wbGF0ZVVybDogJy4vb3B0aW9ucy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL29wdGlvbnMuY29tcG9uZW50LnNjc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgT3B0aW9uc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgb3B0aW9uc0Zvcm06IEZvcm1Hcm91cDtcbiAgZXJyb3JNZXNzYWdlITogc3RyaW5nO1xuICBvcHRpb25zOiBQYXJ0W10gPSBbXTtcbiAgYWxsb3dlZFNob3dMaXN0OiBPcHRpb25bXSA9IFtdO1xuICBhbGxvd2VkT2JqZWN0OiBSZWNvcmQ8c3RyaW5nLCBPcHRpb25bXT4gPSB7fTtcbiAgb3JpZ2luYWxBbGxvd2VkT2JqZWN0OiBSZWNvcmQ8c3RyaW5nLCBPcHRpb25bXT4gPSB7fTtcbiAgb2JqZWN0S2V5cyA9IE9iamVjdC5rZXlzO1xuICBjb252ZXJ0VG9TdHJpbmcgPSBKU09OLnN0cmluZ2lmeTtcbiAgcGFydFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxPcHRpb25zQ29tcG9uZW50PixcbiAgICBASW5qZWN0KE1BVF9ESUFMT0dfREFUQSkgcHVibGljIHJvbGU6IFJvbGUsXG4gICAgcHJpdmF0ZSBuYlNlcnZpY2U6IE5vZGVib290T2F1dGgyU3RhcnRlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBmb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXJcbiAgKSB7XG4gICAgZm9yIChjb25zdCBvcHRpb24gb2YgdGhpcy5yb2xlLnBhcnRzKSB7XG4gICAgICB0aGlzLmFsbG93ZWRPYmplY3Rbb3B0aW9uLmFwcGxpY2F0aW9uUGFydE5hbWVdID0gWy4uLm9wdGlvbi5hbGxvd2VkXTtcbiAgICAgIHRoaXMub3JpZ2luYWxBbGxvd2VkT2JqZWN0W29wdGlvbi5hcHBsaWNhdGlvblBhcnROYW1lXSA9IFtcbiAgICAgICAgLi4ub3B0aW9uLmFsbG93ZWQsXG4gICAgICBdO1xuICAgIH1cbiAgICB0aGlzLm5iU2VydmljZS5nZXRQYXJ0c0Jhc2ljKCkuc3Vic2NyaWJlKHtcbiAgICAgIGVycm9yOiAoZXJyKSA9PiB7XG4gICAgICAgIGlmIChlcnIuZXJyb3IpIHtcbiAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IGVyci5lcnJvci5tZXNzYWdlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gJ1Vua25vd24gRXJyb3InO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IFtdO1xuICAgICAgfSxcbiAgICAgIG5leHQ6IChyZXMpID0+IHtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gcmVzLmNvbnRlbnQgfHwgW107XG4gICAgICB9LFxuICAgIH0pO1xuICAgIHRoaXMub3B0aW9uc0Zvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcbiAgICAgIHBhcnQ6IHRoaXMuZm9ybUJ1aWxkZXIuY29udHJvbCgnJyksXG4gICAgICBzZWxlY3RlZDogdGhpcy5mb3JtQnVpbGRlci5jb250cm9sKFtdKSxcbiAgICB9KTtcbiAgICB0aGlzLnBhcnRTdWJzY3JpcHRpb24gPSB0aGlzLm9wdGlvbnNGb3JtXG4gICAgICAuZ2V0KCdwYXJ0JylcbiAgICAgID8udmFsdWVDaGFuZ2VzLnN1YnNjcmliZSh7XG4gICAgICAgIG5leHQ6ICh2YWx1ZSkgPT4ge1xuICAgICAgICAgIHRoaXMuYWxsb3dlZFNob3dMaXN0ID1cbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5maW5kKChvKSA9PiBvLmFwcGxpY2F0aW9uUGFydE5hbWUgPT09IHZhbHVlKVxuICAgICAgICAgICAgICA/LmFsbG93ZWQgfHwgW107XG4gICAgICAgICAgdGhpcy5vcHRpb25zRm9ybVxuICAgICAgICAgICAgLmdldCgnc2VsZWN0ZWQnKVxuICAgICAgICAgICAgPy5zZXRWYWx1ZShcbiAgICAgICAgICAgICAgdGhpcy5hbGxvd2VkT2JqZWN0W3RoaXMub3B0aW9uc0Zvcm0uZ2V0KCdwYXJ0Jyk/LnZhbHVlXT8ubWFwKFxuICAgICAgICAgICAgICAgIChhc2wpID0+IEpTT04uc3RyaW5naWZ5KGFzbClcbiAgICAgICAgICAgICAgKSB8fCBbXVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgIH0pIGFzIFN1YnNjcmlwdGlvbjtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge31cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnBhcnRTdWJzY3JpcHRpb24/LnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBzZWxlY3RlZENoYW5nZShzZWxlY3RlZDogYm9vbGVhbiwgdmFsdWU6IHN0cmluZykge1xuICAgIGNvbnN0IHBhcnNlZFZhbHVlID0gSlNPTi5wYXJzZSh2YWx1ZSkgYXMgT3B0aW9uO1xuICAgIGNvbnN0IGN1cnJlbnRBbGxvd2VkT2JqZWN0ID1cbiAgICAgIHRoaXMuYWxsb3dlZE9iamVjdFt0aGlzLm9wdGlvbnNGb3JtLmdldCgncGFydCcpPy52YWx1ZV07XG4gICAgaWYgKFxuICAgICAgcGFyc2VkVmFsdWUuYWxsb3dlZCA9PT0gJyonICYmXG4gICAgICBzZWxlY3RlZCAmJlxuICAgICAgdGhpcy5vcHRpb25zRm9ybS5nZXQoJ3NlbGVjdGVkJyk/LnZhbHVlLmxlbmd0aCAhPT1cbiAgICAgICAgdGhpcy5hbGxvd2VkU2hvd0xpc3QubGVuZ3RoXG4gICAgKSB7XG4gICAgICB0aGlzLm9wdGlvbnNGb3JtXG4gICAgICAgIC5nZXQoJ3NlbGVjdGVkJylcbiAgICAgICAgPy5zZXRWYWx1ZSh0aGlzLmFsbG93ZWRTaG93TGlzdC5tYXAoKGFzbCkgPT4gSlNPTi5zdHJpbmdpZnkoYXNsKSkpO1xuICAgICAgdGhpcy5hbGxvd2VkT2JqZWN0W3RoaXMub3B0aW9uc0Zvcm0uZ2V0KCdwYXJ0Jyk/LnZhbHVlXSA9IFtcbiAgICAgICAgdGhpcy5hbGxvd2VkU2hvd0xpc3RbMF0sXG4gICAgICBdO1xuICAgIH0gZWxzZSBpZiAocGFyc2VkVmFsdWUuYWxsb3dlZCA9PT0gJyonICYmICFzZWxlY3RlZCkge1xuICAgICAgY29uc3QgdGVtcG9yYWxBbGxvd2VkID0gWy4uLnRoaXMuYWxsb3dlZFNob3dMaXN0XTtcbiAgICAgIHRlbXBvcmFsQWxsb3dlZC5zaGlmdCgpO1xuICAgICAgdGhpcy5hbGxvd2VkT2JqZWN0W3RoaXMub3B0aW9uc0Zvcm0uZ2V0KCdwYXJ0Jyk/LnZhbHVlXSA9IHRlbXBvcmFsQWxsb3dlZDtcbiAgICB9IGVsc2UgaWYgKHNlbGVjdGVkKSB7XG4gICAgICBpZiAoIShjdXJyZW50QWxsb3dlZE9iamVjdCAmJiBjdXJyZW50QWxsb3dlZE9iamVjdFswXS5hbGxvd2VkID09PSAnKicpKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBjdXJyZW50QWxsb3dlZE9iamVjdCAmJlxuICAgICAgICAgIGN1cnJlbnRBbGxvd2VkT2JqZWN0LmZpbmRJbmRleCgoY2EpID0+IGNhLmlkID09PSBwYXJzZWRWYWx1ZS5pZCkgPT09XG4gICAgICAgICAgICAtMVxuICAgICAgICApIHtcbiAgICAgICAgICBjdXJyZW50QWxsb3dlZE9iamVjdC5wdXNoKHBhcnNlZFZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmFsbG93ZWRPYmplY3RbdGhpcy5vcHRpb25zRm9ybS5nZXQoJ3BhcnQnKT8udmFsdWVdID0gW1xuICAgICAgICAgICAgcGFyc2VkVmFsdWUsXG4gICAgICAgICAgXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBpbmRleE9mVmFsdWUgPSB0aGlzLm9wdGlvbnNGb3JtXG4gICAgICAgIC5nZXQoJ3NlbGVjdGVkJylcbiAgICAgICAgPy52YWx1ZS5pbmRleE9mKHBhcnNlZFZhbHVlKTtcbiAgICAgIGlmIChjdXJyZW50QWxsb3dlZE9iamVjdCAmJiBpbmRleE9mVmFsdWUgIT09IC0xKSB7XG4gICAgICAgIGN1cnJlbnRBbGxvd2VkT2JqZWN0LnNwbGljZShpbmRleE9mVmFsdWUsIDEpO1xuICAgICAgfVxuICAgICAgaWYgKGN1cnJlbnRBbGxvd2VkT2JqZWN0ICYmIGN1cnJlbnRBbGxvd2VkT2JqZWN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBkZWxldGUgdGhpcy5hbGxvd2VkT2JqZWN0W3RoaXMub3B0aW9uc0Zvcm0uZ2V0KCdwYXJ0Jyk/LnZhbHVlXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjbG9zZURpYWxvZygpIHtcbiAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZSgpO1xuICB9XG5cbiAgdXBkYXRlT3B0aW9ucygpIHtcbiAgICB0aGlzLm5iU2VydmljZVxuICAgICAgLnVwZGF0ZVJvbGVPcHRpb25zKFxuICAgICAgICB0aGlzLnJvbGUuaWQsXG4gICAgICAgIHRoaXMuYWxsb3dlZE9iamVjdCxcbiAgICAgICAgdGhpcy5vcmlnaW5hbEFsbG93ZWRPYmplY3RcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoe1xuICAgICAgICBlcnJvcjogKGVycikgPT4ge1xuICAgICAgICAgIHRoaXMuZGlhbG9nUmVmLmRpc2FibGVDbG9zZSA9IGZhbHNlO1xuICAgICAgICAgIGlmIChlcnIuZXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gZXJyLmVycm9yLm1lc3NhZ2U7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gJ1Vua25vd24gRXJyb3InO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbmV4dDogKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKHRydWUpO1xuICAgICAgICB9LFxuICAgICAgfSk7XG4gIH1cbn1cbiIsIjxoMiBtYXQtZGlhbG9nLXRpdGxlPlJvbGUge3sgcm9sZS5pZGVudGlmaWVyIH19IGFjY2VzcyBvcHRpb25zPC9oMj5cbjxmb3JtIFtmb3JtR3JvdXBdPVwib3B0aW9uc0Zvcm1cIiAobmdTdWJtaXQpPVwidXBkYXRlT3B0aW9ucygpXCI+XG4gIDxkaXYgbWF0LWRpYWxvZy1jb250ZW50PlxuICAgIDxkaXYgY2xhc3M9XCJlcnJvci1kaXNwbGF5XCIgKm5nSWY9XCJlcnJvck1lc3NhZ2VcIj5cbiAgICAgIDxoNT57eyBlcnJvck1lc3NhZ2UgfX08L2g1PlxuICAgIDwvZGl2PlxuICAgIDxtYXQtZm9ybS1maWVsZCBjbGFzcz1cImZvcm1zLWZpZWxkXCIgYXBwZWFyYW5jZT1cImZpbGxcIj5cbiAgICAgIDxtYXQtbGFiZWw+U2VsZWN0IGEgcGFydDwvbWF0LWxhYmVsPlxuICAgICAgPG1hdC1zZWxlY3QgbmFtZT1cInBhcnRcIiBmb3JtQ29udHJvbE5hbWU9XCJwYXJ0XCI+XG4gICAgICAgIDxtYXQtb3B0aW9uXG4gICAgICAgICAgW3ZhbHVlXT1cIm9wdGlvbi5hcHBsaWNhdGlvblBhcnROYW1lXCJcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIG9wdGlvbnNcIlxuICAgICAgICAgID57eyBvcHRpb24uYXBwbGljYXRpb25QYXJ0TmFtZSB9fTwvbWF0LW9wdGlvblxuICAgICAgICA+XG4gICAgICA8L21hdC1zZWxlY3Q+XG4gICAgICA8bWF0LWhpbnQ+U2VsZWN0IGFuIGFwcGxpY2F0aW9uIHBhcnQ8L21hdC1oaW50PlxuICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgPG1hdC1zZWxlY3Rpb24tbGlzdCAjYWxsb3dlZCBmb3JtQ29udHJvbE5hbWU9XCJzZWxlY3RlZFwiPlxuICAgICAgPG1hdC1saXN0LW9wdGlvblxuICAgICAgICAoc2VsZWN0ZWRDaGFuZ2UpPVwic2VsZWN0ZWRDaGFuZ2UoJGV2ZW50LCBjb252ZXJ0VG9TdHJpbmcoYWxsb3dlZEwpKVwiXG4gICAgICAgIFt2YWx1ZV09XCJjb252ZXJ0VG9TdHJpbmcoYWxsb3dlZEwpXCJcbiAgICAgICAgW2Rpc2FibGVkXT1cIlxuICAgICAgICAgIGFsbG93ZWRMLmFsbG93ZWQgIT09ICcqJyAmJlxuICAgICAgICAgIG9wdGlvbnNGb3JtLmdldCgnc2VsZWN0ZWQnKT8udmFsdWUubGVuZ3RoID09PSBhbGxvd2VkU2hvd0xpc3QubGVuZ3RoXG4gICAgICAgICAgICA/IHRydWVcbiAgICAgICAgICAgIDogZmFsc2VcbiAgICAgICAgXCJcbiAgICAgICAgKm5nRm9yPVwibGV0IGFsbG93ZWRMIG9mIGFsbG93ZWRTaG93TGlzdFwiXG4gICAgICA+XG4gICAgICAgIHt7IGFsbG93ZWRMLmFsbG93ZWQgfX1cbiAgICAgIDwvbWF0LWxpc3Qtb3B0aW9uPlxuICAgIDwvbWF0LXNlbGVjdGlvbi1saXN0PlxuICA8L2Rpdj5cbiAgPGRpdiBhbGlnbj1cImVuZFwiIG1hdC1kaWFsb2ctYWN0aW9ucz5cbiAgICA8YnV0dG9uXG4gICAgICAoY2xpY2spPVwiY2xvc2VEaWFsb2coKVwiXG4gICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgIGNvbG9yPVwid2FyblwiXG4gICAgICBtYXQtc3Ryb2tlZC1idXR0b25cbiAgICAgIFtkaXNhYmxlZF09XCJkaWFsb2dSZWYuZGlzYWJsZUNsb3NlXCJcbiAgICA+XG4gICAgICBDYW5jZWw8L2J1dHRvblxuICAgID48YnV0dG9uXG4gICAgICBbZGlzYWJsZWRdPVwiIW9wdGlvbnNGb3JtLnZhbGlkIHx8IG9iamVjdEtleXMoYWxsb3dlZE9iamVjdCkubGVuZ3RoID09PSAwXCJcbiAgICAgIGNvbG9yPVwicHJpbWFyeVwiXG4gICAgICBtYXQtZmxhdC1idXR0b25cbiAgICA+XG4gICAgICBVcGRhdGVcbiAgICA8L2J1dHRvbj5cbiAgPC9kaXY+XG48L2Zvcm0+XG4iXX0=