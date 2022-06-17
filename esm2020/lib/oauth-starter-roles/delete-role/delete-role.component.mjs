import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/dialog";
import * as i2 from "../../nodeboot-oauth2-starter.service";
import * as i3 from "@angular/material/button";
import * as i4 from "@angular/common";
export class DeleteRoleComponent {
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
DeleteRoleComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.2", ngImport: i0, type: DeleteRoleComponent, deps: [{ token: i1.MatDialogRef }, { token: i2.NodebootOauth2StarterService }, { token: MAT_DIALOG_DATA }], target: i0.ɵɵFactoryTarget.Component });
DeleteRoleComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.0.2", type: DeleteRoleComponent, selector: "lib-delete-role", ngImport: i0, template: "<h2 mat-dialog-title>Delete Role {{ role.identifier }}</h2>\n<div mat-dialog-content>\n  <div class=\"error-display\" *ngIf=\"errorMessage\">\n    <h5>{{ errorMessage }}</h5>\n  </div>\n  <p>Are you sure?</p>\n</div>\n<div align=\"end\" mat-dialog-actions>\n  <button\n    (click)=\"closeDialog()\"\n    type=\"button\"\n    color=\"warn\"\n    mat-stroked-button\n    [disabled]=\"dialogRef.disableClose\"\n  >\n    Cancel</button\n  ><button\n    (click)=\"delete()\"\n    type=\"button\"\n    color=\"primary\"\n    mat-flat-button\n    [disabled]=\"dialogRef.disableClose\"\n  >\n    Delete\n  </button>\n</div>\n", styles: [""], dependencies: [{ kind: "component", type: i3.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "directive", type: i1.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { kind: "directive", type: i1.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }, { kind: "directive", type: i1.MatDialogActions, selector: "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]", inputs: ["align"] }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.2", ngImport: i0, type: DeleteRoleComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-delete-role', template: "<h2 mat-dialog-title>Delete Role {{ role.identifier }}</h2>\n<div mat-dialog-content>\n  <div class=\"error-display\" *ngIf=\"errorMessage\">\n    <h5>{{ errorMessage }}</h5>\n  </div>\n  <p>Are you sure?</p>\n</div>\n<div align=\"end\" mat-dialog-actions>\n  <button\n    (click)=\"closeDialog()\"\n    type=\"button\"\n    color=\"warn\"\n    mat-stroked-button\n    [disabled]=\"dialogRef.disableClose\"\n  >\n    Cancel</button\n  ><button\n    (click)=\"delete()\"\n    type=\"button\"\n    color=\"primary\"\n    mat-flat-button\n    [disabled]=\"dialogRef.disableClose\"\n  >\n    Delete\n  </button>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1.MatDialogRef }, { type: i2.NodebootOauth2StarterService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_DIALOG_DATA]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLXJvbGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm9kZWJvb3Qtb2F1dGgyLXN0YXJ0ZXIvc3JjL2xpYi9vYXV0aC1zdGFydGVyLXJvbGVzL2RlbGV0ZS1yb2xlL2RlbGV0ZS1yb2xlLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vZGVib290LW9hdXRoMi1zdGFydGVyL3NyYy9saWIvb2F1dGgtc3RhcnRlci1yb2xlcy9kZWxldGUtcm9sZS9kZWxldGUtcm9sZS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUMxRCxPQUFPLEVBQWdCLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7Ozs7QUFXekUsTUFBTSxPQUFPLG1CQUFtQjtJQUc5QixZQUNTLFNBQTRDLEVBQzNDLFNBQXVDLEVBQ2YsSUFBVTtRQUZuQyxjQUFTLEdBQVQsU0FBUyxDQUFtQztRQUMzQyxjQUFTLEdBQVQsU0FBUyxDQUE4QjtRQUNmLFNBQUksR0FBSixJQUFJLENBQU07SUFDekMsQ0FBQztJQUVKLFFBQVEsS0FBVSxDQUFDO0lBRW5CLE1BQU07UUFDSixJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDbkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFDaEQsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ2IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO2dCQUNwQyxJQUFJLEdBQUcsQ0FBQyxLQUFLLEVBQUU7b0JBQ2IsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztpQkFDdkM7cUJBQU07b0JBQ0wsSUFBSSxDQUFDLFlBQVksR0FBRyxlQUFlLENBQUM7aUJBQ3JDO1lBQ0gsQ0FBQztZQUNELElBQUksRUFBRSxHQUFHLEVBQUU7Z0JBQ1QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0IsQ0FBQztTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN6QixDQUFDOztnSEE5QlUsbUJBQW1CLDBGQU1wQixlQUFlO29HQU5kLG1CQUFtQix1RENaaEMsMm1CQTBCQTsyRkRkYSxtQkFBbUI7a0JBTC9CLFNBQVM7K0JBQ0UsaUJBQWlCOzswQkFVeEIsTUFBTTsyQkFBQyxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbmplY3QsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nUmVmLCBNQVRfRElBTE9HX0RBVEEgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHtcbiAgTm9kZWJvb3RPYXV0aDJTdGFydGVyU2VydmljZSxcbiAgUm9sZSxcbn0gZnJvbSAnLi4vLi4vbm9kZWJvb3Qtb2F1dGgyLXN0YXJ0ZXIuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpYi1kZWxldGUtcm9sZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9kZWxldGUtcm9sZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2RlbGV0ZS1yb2xlLmNvbXBvbmVudC5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIERlbGV0ZVJvbGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBlcnJvck1lc3NhZ2UhOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPERlbGV0ZVJvbGVDb21wb25lbnQ+LFxuICAgIHByaXZhdGUgbmJTZXJ2aWNlOiBOb2RlYm9vdE9hdXRoMlN0YXJ0ZXJTZXJ2aWNlLFxuICAgIEBJbmplY3QoTUFUX0RJQUxPR19EQVRBKSBwdWJsaWMgcm9sZTogUm9sZVxuICApIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7fVxuXG4gIGRlbGV0ZSgpIHtcbiAgICB0aGlzLmRpYWxvZ1JlZi5kaXNhYmxlQ2xvc2UgPSB0cnVlO1xuICAgIHRoaXMubmJTZXJ2aWNlLmRlbGV0ZVJvbGUodGhpcy5yb2xlLmlkKS5zdWJzY3JpYmUoe1xuICAgICAgZXJyb3I6IChlcnIpID0+IHtcbiAgICAgICAgdGhpcy5kaWFsb2dSZWYuZGlzYWJsZUNsb3NlID0gZmFsc2U7XG4gICAgICAgIGlmIChlcnIuZXJyb3IpIHtcbiAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IGVyci5lcnJvci5tZXNzYWdlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gJ1Vua25vd24gRXJyb3InO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbmV4dDogKCkgPT4ge1xuICAgICAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZSh0cnVlKTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICBjbG9zZURpYWxvZygpIHtcbiAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZSgpO1xuICB9XG59XG4iLCI8aDIgbWF0LWRpYWxvZy10aXRsZT5EZWxldGUgUm9sZSB7eyByb2xlLmlkZW50aWZpZXIgfX08L2gyPlxuPGRpdiBtYXQtZGlhbG9nLWNvbnRlbnQ+XG4gIDxkaXYgY2xhc3M9XCJlcnJvci1kaXNwbGF5XCIgKm5nSWY9XCJlcnJvck1lc3NhZ2VcIj5cbiAgICA8aDU+e3sgZXJyb3JNZXNzYWdlIH19PC9oNT5cbiAgPC9kaXY+XG4gIDxwPkFyZSB5b3Ugc3VyZT88L3A+XG48L2Rpdj5cbjxkaXYgYWxpZ249XCJlbmRcIiBtYXQtZGlhbG9nLWFjdGlvbnM+XG4gIDxidXR0b25cbiAgICAoY2xpY2spPVwiY2xvc2VEaWFsb2coKVwiXG4gICAgdHlwZT1cImJ1dHRvblwiXG4gICAgY29sb3I9XCJ3YXJuXCJcbiAgICBtYXQtc3Ryb2tlZC1idXR0b25cbiAgICBbZGlzYWJsZWRdPVwiZGlhbG9nUmVmLmRpc2FibGVDbG9zZVwiXG4gID5cbiAgICBDYW5jZWw8L2J1dHRvblxuICA+PGJ1dHRvblxuICAgIChjbGljayk9XCJkZWxldGUoKVwiXG4gICAgdHlwZT1cImJ1dHRvblwiXG4gICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICBtYXQtZmxhdC1idXR0b25cbiAgICBbZGlzYWJsZWRdPVwiZGlhbG9nUmVmLmRpc2FibGVDbG9zZVwiXG4gID5cbiAgICBEZWxldGVcbiAgPC9idXR0b24+XG48L2Rpdj5cbiJdfQ==