import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/dialog";
import * as i2 from "../../nodeboot-oauth2-starter.service";
import * as i3 from "@angular/material/button";
import * as i4 from "@angular/common";
export class DeleteClientComponent {
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
DeleteClientComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.2", ngImport: i0, type: DeleteClientComponent, deps: [{ token: i1.MatDialogRef }, { token: i2.NodebootOauth2StarterService }, { token: MAT_DIALOG_DATA }], target: i0.ɵɵFactoryTarget.Component });
DeleteClientComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.0.2", type: DeleteClientComponent, selector: "lib-delete-client", ngImport: i0, template: "<h2 mat-dialog-title>Delete Client {{ client.name }}</h2>\n<div mat-dialog-content>\n  <div class=\"error-display\" *ngIf=\"errorMessage\">\n    <h5>{{ errorMessage }}</h5>\n  </div>\n  <p>Are you sure?</p>\n</div>\n<div align=\"end\" mat-dialog-actions>\n  <button\n    (click)=\"closeDialog()\"\n    type=\"button\"\n    color=\"warn\"\n    mat-stroked-button\n    [disabled]=\"dialogRef.disableClose\"\n  >\n    Cancel</button\n  ><button\n    (click)=\"delete()\"\n    type=\"button\"\n    color=\"primary\"\n    mat-flat-button\n    [disabled]=\"dialogRef.disableClose\"\n  >\n    Delete\n  </button>\n</div>\n", styles: [""], dependencies: [{ kind: "component", type: i3.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "directive", type: i1.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { kind: "directive", type: i1.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }, { kind: "directive", type: i1.MatDialogActions, selector: "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]", inputs: ["align"] }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.2", ngImport: i0, type: DeleteClientComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-delete-client', template: "<h2 mat-dialog-title>Delete Client {{ client.name }}</h2>\n<div mat-dialog-content>\n  <div class=\"error-display\" *ngIf=\"errorMessage\">\n    <h5>{{ errorMessage }}</h5>\n  </div>\n  <p>Are you sure?</p>\n</div>\n<div align=\"end\" mat-dialog-actions>\n  <button\n    (click)=\"closeDialog()\"\n    type=\"button\"\n    color=\"warn\"\n    mat-stroked-button\n    [disabled]=\"dialogRef.disableClose\"\n  >\n    Cancel</button\n  ><button\n    (click)=\"delete()\"\n    type=\"button\"\n    color=\"primary\"\n    mat-flat-button\n    [disabled]=\"dialogRef.disableClose\"\n  >\n    Delete\n  </button>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1.MatDialogRef }, { type: i2.NodebootOauth2StarterService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_DIALOG_DATA]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLWNsaWVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub2RlYm9vdC1vYXV0aDItc3RhcnRlci9zcmMvbGliL29hdXRoLXN0YXJ0ZXItY2xpZW50L2RlbGV0ZS1jbGllbnQvZGVsZXRlLWNsaWVudC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub2RlYm9vdC1vYXV0aDItc3RhcnRlci9zcmMvbGliL29hdXRoLXN0YXJ0ZXItY2xpZW50L2RlbGV0ZS1jbGllbnQvZGVsZXRlLWNsaWVudC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUMxRCxPQUFPLEVBQWdCLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7Ozs7QUFXekUsTUFBTSxPQUFPLHFCQUFxQjtJQUdoQyxZQUNTLFNBQThDLEVBQzdDLFNBQXVDLEVBQ2YsTUFBYztRQUZ2QyxjQUFTLEdBQVQsU0FBUyxDQUFxQztRQUM3QyxjQUFTLEdBQVQsU0FBUyxDQUE4QjtRQUNmLFdBQU0sR0FBTixNQUFNLENBQVE7SUFDN0MsQ0FBQztJQUVKLFFBQVEsS0FBVSxDQUFDO0lBRW5CLE1BQU07UUFDSixJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDbkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFDM0QsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ2IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO2dCQUNwQyxJQUFJLEdBQUcsQ0FBQyxLQUFLLEVBQUU7b0JBQ2IsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztpQkFDdkM7cUJBQU07b0JBQ0wsSUFBSSxDQUFDLFlBQVksR0FBRyxlQUFlLENBQUM7aUJBQ3JDO1lBQ0gsQ0FBQztZQUNELElBQUksRUFBRSxHQUFHLEVBQUU7Z0JBQ1QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0IsQ0FBQztTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN6QixDQUFDOztrSEE5QlUscUJBQXFCLDBGQU10QixlQUFlO3NHQU5kLHFCQUFxQix5RENabEMseW1CQTBCQTsyRkRkYSxxQkFBcUI7a0JBTGpDLFNBQVM7K0JBQ0UsbUJBQW1COzswQkFVMUIsTUFBTTsyQkFBQyxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbmplY3QsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nUmVmLCBNQVRfRElBTE9HX0RBVEEgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHtcbiAgQ2xpZW50LFxuICBOb2RlYm9vdE9hdXRoMlN0YXJ0ZXJTZXJ2aWNlLFxufSBmcm9tICcuLi8uLi9ub2RlYm9vdC1vYXV0aDItc3RhcnRlci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGliLWRlbGV0ZS1jbGllbnQnLFxuICB0ZW1wbGF0ZVVybDogJy4vZGVsZXRlLWNsaWVudC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2RlbGV0ZS1jbGllbnQuY29tcG9uZW50LnNjc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgRGVsZXRlQ2xpZW50Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgZXJyb3JNZXNzYWdlITogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxEZWxldGVDbGllbnRDb21wb25lbnQ+LFxuICAgIHByaXZhdGUgbmJTZXJ2aWNlOiBOb2RlYm9vdE9hdXRoMlN0YXJ0ZXJTZXJ2aWNlLFxuICAgIEBJbmplY3QoTUFUX0RJQUxPR19EQVRBKSBwdWJsaWMgY2xpZW50OiBDbGllbnRcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge31cblxuICBkZWxldGUoKSB7XG4gICAgdGhpcy5kaWFsb2dSZWYuZGlzYWJsZUNsb3NlID0gdHJ1ZTtcbiAgICB0aGlzLm5iU2VydmljZS5kZWxldGVDbGllbnQodGhpcy5jbGllbnQuc3ViamVjdElkKS5zdWJzY3JpYmUoe1xuICAgICAgZXJyb3I6IChlcnIpID0+IHtcbiAgICAgICAgdGhpcy5kaWFsb2dSZWYuZGlzYWJsZUNsb3NlID0gZmFsc2U7XG4gICAgICAgIGlmIChlcnIuZXJyb3IpIHtcbiAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IGVyci5lcnJvci5tZXNzYWdlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gJ1Vua25vd24gRXJyb3InO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbmV4dDogKCkgPT4ge1xuICAgICAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZSh0cnVlKTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICBjbG9zZURpYWxvZygpIHtcbiAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZSgpO1xuICB9XG59XG4iLCI8aDIgbWF0LWRpYWxvZy10aXRsZT5EZWxldGUgQ2xpZW50IHt7IGNsaWVudC5uYW1lIH19PC9oMj5cbjxkaXYgbWF0LWRpYWxvZy1jb250ZW50PlxuICA8ZGl2IGNsYXNzPVwiZXJyb3ItZGlzcGxheVwiICpuZ0lmPVwiZXJyb3JNZXNzYWdlXCI+XG4gICAgPGg1Pnt7IGVycm9yTWVzc2FnZSB9fTwvaDU+XG4gIDwvZGl2PlxuICA8cD5BcmUgeW91IHN1cmU/PC9wPlxuPC9kaXY+XG48ZGl2IGFsaWduPVwiZW5kXCIgbWF0LWRpYWxvZy1hY3Rpb25zPlxuICA8YnV0dG9uXG4gICAgKGNsaWNrKT1cImNsb3NlRGlhbG9nKClcIlxuICAgIHR5cGU9XCJidXR0b25cIlxuICAgIGNvbG9yPVwid2FyblwiXG4gICAgbWF0LXN0cm9rZWQtYnV0dG9uXG4gICAgW2Rpc2FibGVkXT1cImRpYWxvZ1JlZi5kaXNhYmxlQ2xvc2VcIlxuICA+XG4gICAgQ2FuY2VsPC9idXR0b25cbiAgPjxidXR0b25cbiAgICAoY2xpY2spPVwiZGVsZXRlKClcIlxuICAgIHR5cGU9XCJidXR0b25cIlxuICAgIGNvbG9yPVwicHJpbWFyeVwiXG4gICAgbWF0LWZsYXQtYnV0dG9uXG4gICAgW2Rpc2FibGVkXT1cImRpYWxvZ1JlZi5kaXNhYmxlQ2xvc2VcIlxuICA+XG4gICAgRGVsZXRlXG4gIDwvYnV0dG9uPlxuPC9kaXY+XG4iXX0=