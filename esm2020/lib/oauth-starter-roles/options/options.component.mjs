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
OptionsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: OptionsComponent, deps: [{ token: i1.MatDialogRef }, { token: MAT_DIALOG_DATA }, { token: i2.NodebootOauth2StarterService }, { token: i3.FormBuilder }], target: i0.ɵɵFactoryTarget.Component });
OptionsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: OptionsComponent, selector: "lib-options", ngImport: i0, template: "<h2 mat-dialog-title>Role {{ role.identifier }} access options</h2>\n<form [formGroup]=\"optionsForm\" (ngSubmit)=\"updateOptions()\">\n  <div mat-dialog-content>\n    <div class=\"error-display\" *ngIf=\"errorMessage\">\n      <h5>{{ errorMessage }}</h5>\n    </div>\n    <mat-form-field class=\"forms-field\" appearance=\"fill\">\n      <mat-label>Select a resource</mat-label>\n      <mat-select name=\"resource\" formControlName=\"resource\">\n        <mat-option\n          [value]=\"option.applicationResourceName\"\n          *ngFor=\"let option of options\"\n          >{{ option.applicationResourceName }}</mat-option\n        >\n      </mat-select>\n      <mat-hint>Select an application resource</mat-hint>\n    </mat-form-field>\n    <mat-selection-list #allowed formControlName=\"selected\">\n      <mat-list-option\n        (selectedChange)=\"selectedChange($event, convertToString(allowedL))\"\n        [value]=\"convertToString(allowedL)\"\n        [disabled]=\"\n          allowedL.allowed !== '*' &&\n          optionsForm.get('selected')?.value.length === allowedShowList.length\n            ? true\n            : false\n        \"\n        *ngFor=\"let allowedL of allowedShowList\"\n      >\n        {{ allowedL.allowed }}\n      </mat-list-option>\n    </mat-selection-list>\n  </div>\n  <div align=\"end\" mat-dialog-actions>\n    <button\n      (click)=\"closeDialog()\"\n      type=\"button\"\n      color=\"warn\"\n      mat-stroked-button\n      [disabled]=\"dialogRef.disableClose\"\n    >\n      Cancel</button\n    ><button\n      [disabled]=\"!optionsForm.valid || objectKeys(allowedObject).length === 0\"\n      color=\"primary\"\n      mat-flat-button\n    >\n      Update\n    </button>\n  </div>\n</form>\n", styles: [".forms-field{width:100%;margin-bottom:1rem}\n"], components: [{ type: i4.MatFormField, selector: "mat-form-field", inputs: ["color", "appearance", "hideRequiredMarker", "hintLabel", "floatLabel"], exportAs: ["matFormField"] }, { type: i5.MatSelect, selector: "mat-select", inputs: ["disabled", "disableRipple", "tabIndex"], exportAs: ["matSelect"] }, { type: i6.MatOption, selector: "mat-option", exportAs: ["matOption"] }, { type: i7.MatSelectionList, selector: "mat-selection-list", inputs: ["disableRipple", "tabIndex", "color", "compareWith", "disabled", "multiple"], outputs: ["selectionChange"], exportAs: ["matSelectionList"] }, { type: i7.MatListOption, selector: "mat-list-option", inputs: ["disableRipple", "checkboxPosition", "color", "value", "disabled", "selected"], outputs: ["selectedChange"], exportAs: ["matListOption"] }, { type: i8.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }], directives: [{ type: i1.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { type: i3.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i3.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i3.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i1.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }, { type: i9.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.MatLabel, selector: "mat-label" }, { type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { type: i9.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4.MatHint, selector: "mat-hint", inputs: ["align", "id"] }, { type: i1.MatDialogActions, selector: "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: OptionsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-options', template: "<h2 mat-dialog-title>Role {{ role.identifier }} access options</h2>\n<form [formGroup]=\"optionsForm\" (ngSubmit)=\"updateOptions()\">\n  <div mat-dialog-content>\n    <div class=\"error-display\" *ngIf=\"errorMessage\">\n      <h5>{{ errorMessage }}</h5>\n    </div>\n    <mat-form-field class=\"forms-field\" appearance=\"fill\">\n      <mat-label>Select a resource</mat-label>\n      <mat-select name=\"resource\" formControlName=\"resource\">\n        <mat-option\n          [value]=\"option.applicationResourceName\"\n          *ngFor=\"let option of options\"\n          >{{ option.applicationResourceName }}</mat-option\n        >\n      </mat-select>\n      <mat-hint>Select an application resource</mat-hint>\n    </mat-form-field>\n    <mat-selection-list #allowed formControlName=\"selected\">\n      <mat-list-option\n        (selectedChange)=\"selectedChange($event, convertToString(allowedL))\"\n        [value]=\"convertToString(allowedL)\"\n        [disabled]=\"\n          allowedL.allowed !== '*' &&\n          optionsForm.get('selected')?.value.length === allowedShowList.length\n            ? true\n            : false\n        \"\n        *ngFor=\"let allowedL of allowedShowList\"\n      >\n        {{ allowedL.allowed }}\n      </mat-list-option>\n    </mat-selection-list>\n  </div>\n  <div align=\"end\" mat-dialog-actions>\n    <button\n      (click)=\"closeDialog()\"\n      type=\"button\"\n      color=\"warn\"\n      mat-stroked-button\n      [disabled]=\"dialogRef.disableClose\"\n    >\n      Cancel</button\n    ><button\n      [disabled]=\"!optionsForm.valid || objectKeys(allowedObject).length === 0\"\n      color=\"primary\"\n      mat-flat-button\n    >\n      Update\n    </button>\n  </div>\n</form>\n", styles: [".forms-field{width:100%;margin-bottom:1rem}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.MatDialogRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_DIALOG_DATA]
                }] }, { type: i2.NodebootOauth2StarterService }, { type: i3.FormBuilder }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9ucy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub2RlYm9vdC1vYXV0aDItc3RhcnRlci9zcmMvbGliL29hdXRoLXN0YXJ0ZXItcm9sZXMvb3B0aW9ucy9vcHRpb25zLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vZGVib290LW9hdXRoMi1zdGFydGVyL3NyYy9saWIvb2F1dGgtc3RhcnRlci1yb2xlcy9vcHRpb25zL29wdGlvbnMuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBRXJFLE9BQU8sRUFBZ0IsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7Ozs7Ozs7Ozs7O0FBY3pFLE1BQU0sT0FBTyxnQkFBZ0I7SUFXM0IsWUFDUyxTQUF5QyxFQUNoQixJQUFVLEVBQ2xDLFNBQXVDLEVBQ3ZDLFdBQXdCO1FBSHpCLGNBQVMsR0FBVCxTQUFTLENBQWdDO1FBQ2hCLFNBQUksR0FBSixJQUFJLENBQU07UUFDbEMsY0FBUyxHQUFULFNBQVMsQ0FBOEI7UUFDdkMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFabEMsWUFBTyxHQUFlLEVBQUUsQ0FBQztRQUN6QixvQkFBZSxHQUFhLEVBQUUsQ0FBQztRQUMvQixrQkFBYSxHQUE2QixFQUFFLENBQUM7UUFDN0MsMEJBQXFCLEdBQTZCLEVBQUUsQ0FBQztRQUNyRCxlQUFVLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztRQUN6QixvQkFBZSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFTL0IsS0FBSyxNQUFNLE1BQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUN4QyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxHQUFHLENBQUMs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OzZHQXhJVSxnQkFBZ0IsOENBYWpCLGVBQWU7aUdBYmQsZ0JBQWdCLG1EQ2hCN0IsK3NEQW1EQTsyRkRuQ2EsZ0JBQWdCO2tCQUw1QixTQUFTOytCQUNFLGFBQWE7OzBCQWlCcEIsTUFBTTsyQkFBQyxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbmplY3QsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1CdWlsZGVyIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTWF0RGlhbG9nUmVmLCBNQVRfRElBTE9HX0RBVEEgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBSZXNvdXJjZSxcbiAgUm9sZSxcbiAgT3B0aW9uLFxuICBOb2RlYm9vdE9hdXRoMlN0YXJ0ZXJTZXJ2aWNlLFxufSBmcm9tICcuLi8uLi9ub2RlYm9vdC1vYXV0aDItc3RhcnRlci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGliLW9wdGlvbnMnLFxuICB0ZW1wbGF0ZVVybDogJy4vb3B0aW9ucy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL29wdGlvbnMuY29tcG9uZW50LnNjc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgT3B0aW9uc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgb3B0aW9uc0Zvcm06IEZvcm1Hcm91cDtcbiAgZXJyb3JNZXNzYWdlITogc3RyaW5nO1xuICBvcHRpb25zOiBSZXNvdXJjZVtdID0gW107XG4gIGFsbG93ZWRTaG93TGlzdDogT3B0aW9uW10gPSBbXTtcbiAgYWxsb3dlZE9iamVjdDogUmVjb3JkPHN0cmluZywgT3B0aW9uW10+ID0ge307XG4gIG9yaWdpbmFsQWxsb3dlZE9iamVjdDogUmVjb3JkPHN0cmluZywgT3B0aW9uW10+ID0ge307XG4gIG9iamVjdEtleXMgPSBPYmplY3Qua2V5cztcbiAgY29udmVydFRvU3RyaW5nID0gSlNPTi5zdHJpbmdpZnk7XG4gIHJlc291cmNlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPE9wdGlvbnNDb21wb25lbnQ+LFxuICAgIEBJbmplY3QoTUFUX0RJQUxPR19EQVRBKSBwdWJsaWMgcm9sZTogUm9sZSxcbiAgICBwcml2YXRlIG5iU2VydmljZTogTm9kZWJvb3RPYXV0aDJTdGFydGVyU2VydmljZSxcbiAgICBwcml2YXRlIGZvcm1CdWlsZGVyOiBGb3JtQnVpbGRlclxuICApIHtcbiAgICBmb3IgKGNvbnN0IG9wdGlvbiBvZiB0aGlzLnJvbGUucmVzb3VyY2VzKSB7XG4gICAgICB0aGlzLmFsbG93ZWRPYmplY3Rbb3B0aW9uLmFwcGxpY2F0aW9uUmVzb3VyY2VOYW1lXSA9IFsuLi5vcHRpb24uYWxsb3dlZF07XG4gICAgICB0aGlzLm9yaWdpbmFsQWxsb3dlZE9iamVjdFtvcHRpb24uYXBwbGljYXRpb25SZXNvdXJjZU5hbWVdID0gW1xuICAgICAgICAuLi5vcHRpb24uYWxsb3dlZCxcbiAgICAgIF07XG4gICAgfVxuICAgIHRoaXMubmJTZXJ2aWNlLmdldFJlc291cmNlc0Jhc2ljKCkuc3Vic2NyaWJlKHtcbiAgICAgIGVycm9yOiAoZXJyKSA9PiB7XG4gICAgICAgIGlmIChlcnIuZXJyb3IpIHtcbiAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IGVyci5lcnJvci5tZXNzYWdlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gJ1Vua25vd24gRXJyb3InO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IFtdO1xuICAgICAgfSxcbiAgICAgIG5leHQ6IChyZXMpID0+IHtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gcmVzLmNvbnRlbnQgfHwgW107XG4gICAgICB9LFxuICAgIH0pO1xuICAgIHRoaXMub3B0aW9uc0Zvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcbiAgICAgIHJlc291cmNlOiB0aGlzLmZvcm1CdWlsZGVyLmNvbnRyb2woJycpLFxuICAgICAgc2VsZWN0ZWQ6IHRoaXMuZm9ybUJ1aWxkZXIuY29udHJvbChbXSksXG4gICAgfSk7XG4gICAgdGhpcy5yZXNvdXJjZVN1YnNjcmlwdGlvbiA9IHRoaXMub3B0aW9uc0Zvcm1cbiAgICAgIC5nZXQoJ3Jlc291cmNlJylcbiAgICAgID8udmFsdWVDaGFuZ2VzLnN1YnNjcmliZSh7XG4gICAgICAgIG5leHQ6ICh2YWx1ZSkgPT4ge1xuICAgICAgICAgIHRoaXMuYWxsb3dlZFNob3dMaXN0ID1cbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5maW5kKChvKSA9PiBvLmFwcGxpY2F0aW9uUmVzb3VyY2VOYW1lID09PSB2YWx1ZSlcbiAgICAgICAgICAgICAgPy5hbGxvd2VkIHx8IFtdO1xuICAgICAgICAgIHRoaXMub3B0aW9uc0Zvcm1cbiAgICAgICAgICAgIC5nZXQoJ3NlbGVjdGVkJylcbiAgICAgICAgICAgID8uc2V0VmFsdWUoXG4gICAgICAgICAgICAgIHRoaXMuYWxsb3dlZE9iamVjdFt0aGlzLm9wdGlvbnNGb3JtLmdldCgncmVzb3VyY2UnKT8udmFsdWVdPy5tYXAoXG4gICAgICAgICAgICAgICAgKGFzbCkgPT4gSlNPTi5zdHJpbmdpZnkoYXNsKVxuICAgICAgICAgICAgICApIHx8IFtdXG4gICAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgfSkgYXMgU3Vic2NyaXB0aW9uO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7fVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMucmVzb3VyY2VTdWJzY3JpcHRpb24/LnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBzZWxlY3RlZENoYW5nZShzZWxlY3RlZDogYm9vbGVhbiwgdmFsdWU6IHN0cmluZykge1xuICAgIGNvbnN0IHBhcnNlZFZhbHVlID0gSlNPTi5wYXJzZSh2YWx1ZSkgYXMgT3B0aW9uO1xuICAgIGNvbnN0IGN1cnJlbnRBbGxvd2VkT2JqZWN0ID1cbiAgICAgIHRoaXMuYWxsb3dlZE9iamVjdFt0aGlzLm9wdGlvbnNGb3JtLmdldCgncmVzb3VyY2UnKT8udmFsdWVdO1xuICAgIGlmIChcbiAgICAgIHBhcnNlZFZhbHVlLmFsbG93ZWQgPT09ICcqJyAmJlxuICAgICAgc2VsZWN0ZWQgJiZcbiAgICAgIHRoaXMub3B0aW9uc0Zvcm0uZ2V0KCdzZWxlY3RlZCcpPy52YWx1ZS5sZW5ndGggIT09XG4gICAgICAgIHRoaXMuYWxsb3dlZFNob3dMaXN0Lmxlbmd0aFxuICAgICkge1xuICAgICAgdGhpcy5vcHRpb25zRm9ybVxuICAgICAgICAuZ2V0KCdzZWxlY3RlZCcpXG4gICAgICAgID8uc2V0VmFsdWUodGhpcy5hbGxvd2VkU2hvd0xpc3QubWFwKChhc2wpID0+IEpTT04uc3RyaW5naWZ5KGFzbCkpKTtcbiAgICAgIHRoaXMuYWxsb3dlZE9iamVjdFt0aGlzLm9wdGlvbnNGb3JtLmdldCgncmVzb3VyY2UnKT8udmFsdWVdID0gW1xuICAgICAgICB0aGlzLmFsbG93ZWRTaG93TGlzdFswXSxcbiAgICAgIF07XG4gICAgfSBlbHNlIGlmIChwYXJzZWRWYWx1ZS5hbGxvd2VkID09PSAnKicgJiYgIXNlbGVjdGVkKSB7XG4gICAgICBjb25zdCB0ZW1wb3JhbEFsbG93ZWQgPSBbLi4udGhpcy5hbGxvd2VkU2hvd0xpc3RdO1xuICAgICAgdGVtcG9yYWxBbGxvd2VkLnNoaWZ0KCk7XG4gICAgICB0aGlzLmFsbG93ZWRPYmplY3RbdGhpcy5vcHRpb25zRm9ybS5nZXQoJ3Jlc291cmNlJyk/LnZhbHVlXSA9XG4gICAgICAgIHRlbXBvcmFsQWxsb3dlZDtcbiAgICB9IGVsc2UgaWYgKHNlbGVjdGVkKSB7XG4gICAgICBpZiAoIShjdXJyZW50QWxsb3dlZE9iamVjdCAmJiBjdXJyZW50QWxsb3dlZE9iamVjdFswXS5hbGxvd2VkID09PSAnKicpKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBjdXJyZW50QWxsb3dlZE9iamVjdCAmJlxuICAgICAgICAgIGN1cnJlbnRBbGxvd2VkT2JqZWN0LmZpbmRJbmRleCgoY2EpID0+IGNhLmlkID09PSBwYXJzZWRWYWx1ZS5pZCkgPT09XG4gICAgICAgICAgICAtMVxuICAgICAgICApIHtcbiAgICAgICAgICBjdXJyZW50QWxsb3dlZE9iamVjdC5wdXNoKHBhcnNlZFZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmFsbG93ZWRPYmplY3RbdGhpcy5vcHRpb25zRm9ybS5nZXQoJ3Jlc291cmNlJyk/LnZhbHVlXSA9IFtcbiAgICAgICAgICAgIHBhcnNlZFZhbHVlLFxuICAgICAgICAgIF07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgaW5kZXhPZlZhbHVlID0gdGhpcy5vcHRpb25zRm9ybVxuICAgICAgICAuZ2V0KCdzZWxlY3RlZCcpXG4gICAgICAgID8udmFsdWUuaW5kZXhPZihwYXJzZWRWYWx1ZSk7XG4gICAgICBpZiAoY3VycmVudEFsbG93ZWRPYmplY3QgJiYgaW5kZXhPZlZhbHVlICE9PSAtMSkge1xuICAgICAgICBjdXJyZW50QWxsb3dlZE9iamVjdC5zcGxpY2UoaW5kZXhPZlZhbHVlLCAxKTtcbiAgICAgIH1cbiAgICAgIGlmIChjdXJyZW50QWxsb3dlZE9iamVjdCAmJiBjdXJyZW50QWxsb3dlZE9iamVjdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgZGVsZXRlIHRoaXMuYWxsb3dlZE9iamVjdFt0aGlzLm9wdGlvbnNGb3JtLmdldCgncmVzb3VyY2UnKT8udmFsdWVdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNsb3NlRGlhbG9nKCkge1xuICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKCk7XG4gIH1cblxuICB1cGRhdGVPcHRpb25zKCkge1xuICAgIHRoaXMubmJTZXJ2aWNlXG4gICAgICAudXBkYXRlUm9sZU9wdGlvbnMoXG4gICAgICAgIHRoaXMucm9sZS5pZCxcbiAgICAgICAgdGhpcy5hbGxvd2VkT2JqZWN0LFxuICAgICAgICB0aGlzLm9yaWdpbmFsQWxsb3dlZE9iamVjdFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSh7XG4gICAgICAgIGVycm9yOiAoZXJyKSA9PiB7XG4gICAgICAgICAgdGhpcy5kaWFsb2dSZWYuZGlzYWJsZUNsb3NlID0gZmFsc2U7XG4gICAgICAgICAgaWYgKGVyci5lcnJvcikge1xuICAgICAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSBlcnIuZXJyb3IubWVzc2FnZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSAnVW5rbm93biBFcnJvcic7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBuZXh0OiAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UodHJ1ZSk7XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgfVxufVxuIiwiPGgyIG1hdC1kaWFsb2ctdGl0bGU+Um9sZSB7eyByb2xlLmlkZW50aWZpZXIgfX0gYWNjZXNzIG9wdGlvbnM8L2gyPlxuPGZvcm0gW2Zvcm1Hcm91cF09XCJvcHRpb25zRm9ybVwiIChuZ1N1Ym1pdCk9XCJ1cGRhdGVPcHRpb25zKClcIj5cbiAgPGRpdiBtYXQtZGlhbG9nLWNvbnRlbnQ+XG4gICAgPGRpdiBjbGFzcz1cImVycm9yLWRpc3BsYXlcIiAqbmdJZj1cImVycm9yTWVzc2FnZVwiPlxuICAgICAgPGg1Pnt7IGVycm9yTWVzc2FnZSB9fTwvaDU+XG4gICAgPC9kaXY+XG4gICAgPG1hdC1mb3JtLWZpZWxkIGNsYXNzPVwiZm9ybXMtZmllbGRcIiBhcHBlYXJhbmNlPVwiZmlsbFwiPlxuICAgICAgPG1hdC1sYWJlbD5TZWxlY3QgYSByZXNvdXJjZTwvbWF0LWxhYmVsPlxuICAgICAgPG1hdC1zZWxlY3QgbmFtZT1cInJlc291cmNlXCIgZm9ybUNvbnRyb2xOYW1lPVwicmVzb3VyY2VcIj5cbiAgICAgICAgPG1hdC1vcHRpb25cbiAgICAgICAgICBbdmFsdWVdPVwib3B0aW9uLmFwcGxpY2F0aW9uUmVzb3VyY2VOYW1lXCJcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIG9wdGlvbnNcIlxuICAgICAgICAgID57eyBvcHRpb24uYXBwbGljYXRpb25SZXNvdXJjZU5hbWUgfX08L21hdC1vcHRpb25cbiAgICAgICAgPlxuICAgICAgPC9tYXQtc2VsZWN0PlxuICAgICAgPG1hdC1oaW50PlNlbGVjdCBhbiBhcHBsaWNhdGlvbiByZXNvdXJjZTwvbWF0LWhpbnQ+XG4gICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICA8bWF0LXNlbGVjdGlvbi1saXN0ICNhbGxvd2VkIGZvcm1Db250cm9sTmFtZT1cInNlbGVjdGVkXCI+XG4gICAgICA8bWF0LWxpc3Qtb3B0aW9uXG4gICAgICAgIChzZWxlY3RlZENoYW5nZSk9XCJzZWxlY3RlZENoYW5nZSgkZXZlbnQsIGNvbnZlcnRUb1N0cmluZyhhbGxvd2VkTCkpXCJcbiAgICAgICAgW3ZhbHVlXT1cImNvbnZlcnRUb1N0cmluZyhhbGxvd2VkTClcIlxuICAgICAgICBbZGlzYWJsZWRdPVwiXG4gICAgICAgICAgYWxsb3dlZEwuYWxsb3dlZCAhPT0gJyonICYmXG4gICAgICAgICAgb3B0aW9uc0Zvcm0uZ2V0KCdzZWxlY3RlZCcpPy52YWx1ZS5sZW5ndGggPT09IGFsbG93ZWRTaG93TGlzdC5sZW5ndGhcbiAgICAgICAgICAgID8gdHJ1ZVxuICAgICAgICAgICAgOiBmYWxzZVxuICAgICAgICBcIlxuICAgICAgICAqbmdGb3I9XCJsZXQgYWxsb3dlZEwgb2YgYWxsb3dlZFNob3dMaXN0XCJcbiAgICAgID5cbiAgICAgICAge3sgYWxsb3dlZEwuYWxsb3dlZCB9fVxuICAgICAgPC9tYXQtbGlzdC1vcHRpb24+XG4gICAgPC9tYXQtc2VsZWN0aW9uLWxpc3Q+XG4gIDwvZGl2PlxuICA8ZGl2IGFsaWduPVwiZW5kXCIgbWF0LWRpYWxvZy1hY3Rpb25zPlxuICAgIDxidXR0b25cbiAgICAgIChjbGljayk9XCJjbG9zZURpYWxvZygpXCJcbiAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgY29sb3I9XCJ3YXJuXCJcbiAgICAgIG1hdC1zdHJva2VkLWJ1dHRvblxuICAgICAgW2Rpc2FibGVkXT1cImRpYWxvZ1JlZi5kaXNhYmxlQ2xvc2VcIlxuICAgID5cbiAgICAgIENhbmNlbDwvYnV0dG9uXG4gICAgPjxidXR0b25cbiAgICAgIFtkaXNhYmxlZF09XCIhb3B0aW9uc0Zvcm0udmFsaWQgfHwgb2JqZWN0S2V5cyhhbGxvd2VkT2JqZWN0KS5sZW5ndGggPT09IDBcIlxuICAgICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICAgIG1hdC1mbGF0LWJ1dHRvblxuICAgID5cbiAgICAgIFVwZGF0ZVxuICAgIDwvYnV0dG9uPlxuICA8L2Rpdj5cbjwvZm9ybT5cbiJdfQ==