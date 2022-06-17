import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/dialog";
import * as i2 from "../../nodeboot-oauth2-starter.service";
import * as i3 from "@angular/material/button";
import * as i4 from "@angular/common";
export class DeleteApplicationResourceComponent {
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
DeleteApplicationResourceComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.2", ngImport: i0, type: DeleteApplicationResourceComponent, deps: [{ token: i1.MatDialogRef }, { token: i2.NodebootOauth2StarterService }, { token: MAT_DIALOG_DATA }], target: i0.ɵɵFactoryTarget.Component });
DeleteApplicationResourceComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.0.2", type: DeleteApplicationResourceComponent, selector: "lib-delete-application-resource", ngImport: i0, template: "<h2 mat-dialog-title>Delete Resource {{ resource.applicationResourceName }}</h2>\n<div mat-dialog-content>\n  <div class=\"error-display\" *ngIf=\"errorMessage\">\n    <h5>{{ errorMessage }}</h5>\n  </div>\n  <p>Are you sure?</p>\n</div>\n<div align=\"end\" mat-dialog-actions>\n  <button\n    (click)=\"closeDialog()\"\n    type=\"button\"\n    color=\"warn\"\n    mat-stroked-button\n    [disabled]=\"dialogRef.disableClose\"\n  >\n    Cancel</button\n  ><button\n    (click)=\"delete()\"\n    type=\"button\"\n    color=\"primary\"\n    mat-flat-button\n    [disabled]=\"dialogRef.disableClose\"\n  >\n    Delete\n  </button>\n</div>\n", styles: [""], dependencies: [{ kind: "component", type: i3.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "directive", type: i1.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { kind: "directive", type: i1.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }, { kind: "directive", type: i1.MatDialogActions, selector: "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]", inputs: ["align"] }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.2", ngImport: i0, type: DeleteApplicationResourceComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-delete-application-resource', template: "<h2 mat-dialog-title>Delete Resource {{ resource.applicationResourceName }}</h2>\n<div mat-dialog-content>\n  <div class=\"error-display\" *ngIf=\"errorMessage\">\n    <h5>{{ errorMessage }}</h5>\n  </div>\n  <p>Are you sure?</p>\n</div>\n<div align=\"end\" mat-dialog-actions>\n  <button\n    (click)=\"closeDialog()\"\n    type=\"button\"\n    color=\"warn\"\n    mat-stroked-button\n    [disabled]=\"dialogRef.disableClose\"\n  >\n    Cancel</button\n  ><button\n    (click)=\"delete()\"\n    type=\"button\"\n    color=\"primary\"\n    mat-flat-button\n    [disabled]=\"dialogRef.disableClose\"\n  >\n    Delete\n  </button>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1.MatDialogRef }, { type: i2.NodebootOauth2StarterService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_DIALOG_DATA]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLWFwcGxpY2F0aW9uLXJlc291cmNlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vZGVib290LW9hdXRoMi1zdGFydGVyL3NyYy9saWIvb2F1dGgtc3RhcnRlci1hcHBsaWNhdGlvbi1yZXNvdXJjZS9kZWxldGUtYXBwbGljYXRpb24tcmVzb3VyY2UvZGVsZXRlLWFwcGxpY2F0aW9uLXJlc291cmNlLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vZGVib290LW9hdXRoMi1zdGFydGVyL3NyYy9saWIvb2F1dGgtc3RhcnRlci1hcHBsaWNhdGlvbi1yZXNvdXJjZS9kZWxldGUtYXBwbGljYXRpb24tcmVzb3VyY2UvZGVsZXRlLWFwcGxpY2F0aW9uLXJlc291cmNlLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQzFELE9BQU8sRUFBZ0IsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7Ozs7OztBQVd6RSxNQUFNLE9BQU8sa0NBQWtDO0lBSTdDLFlBQ1MsU0FBMkQsRUFDMUQsU0FBdUMsRUFDZixRQUFrQjtRQUYzQyxjQUFTLEdBQVQsU0FBUyxDQUFrRDtRQUMxRCxjQUFTLEdBQVQsU0FBUyxDQUE4QjtRQUNmLGFBQVEsR0FBUixRQUFRLENBQVU7UUFMcEQsa0JBQWEsR0FBRyxLQUFLLENBQUM7SUFNbkIsQ0FBQztJQUVKLFFBQVEsS0FBVSxDQUFDO0lBRW5CLE1BQU07UUFDSixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUMxQixJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDbkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFDeEQsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ2IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO2dCQUNwQyxJQUFJLEdBQUcsQ0FBQyxLQUFLLEVBQUU7b0JBQ2IsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztpQkFDdkM7cUJBQU07b0JBQ0wsSUFBSSxDQUFDLFlBQVksR0FBRyxlQUFlLENBQUM7aUJBQ3JDO1lBQ0gsQ0FBQztZQUNELElBQUksRUFBRSxHQUFHLEVBQUU7Z0JBQ1QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0IsQ0FBQztZQUNELFFBQVEsRUFBRSxHQUFHLEVBQUU7Z0JBQ2IsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7WUFDN0IsQ0FBQztTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN6QixDQUFDOzsrSEFuQ1Usa0NBQWtDLDBGQU9uQyxlQUFlO21IQVBkLGtDQUFrQyx1RUNaL0MsZ29CQTBCQTsyRkRkYSxrQ0FBa0M7a0JBTDlDLFNBQVM7K0JBQ0UsaUNBQWlDOzswQkFXeEMsTUFBTTsyQkFBQyxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbmplY3QsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nUmVmLCBNQVRfRElBTE9HX0RBVEEgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHtcbiAgTm9kZWJvb3RPYXV0aDJTdGFydGVyU2VydmljZSxcbiAgUmVzb3VyY2UsXG59IGZyb20gJy4uLy4uL25vZGVib290LW9hdXRoMi1zdGFydGVyLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItZGVsZXRlLWFwcGxpY2F0aW9uLXJlc291cmNlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2RlbGV0ZS1hcHBsaWNhdGlvbi1yZXNvdXJjZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2RlbGV0ZS1hcHBsaWNhdGlvbi1yZXNvdXJjZS5jb21wb25lbnQuc2NzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBEZWxldGVBcHBsaWNhdGlvblJlc291cmNlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgZXJyb3JNZXNzYWdlITogc3RyaW5nO1xuICBsb2FkaW5nUmVzdWx0ID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPERlbGV0ZUFwcGxpY2F0aW9uUmVzb3VyY2VDb21wb25lbnQ+LFxuICAgIHByaXZhdGUgbmJTZXJ2aWNlOiBOb2RlYm9vdE9hdXRoMlN0YXJ0ZXJTZXJ2aWNlLFxuICAgIEBJbmplY3QoTUFUX0RJQUxPR19EQVRBKSBwdWJsaWMgcmVzb3VyY2U6IFJlc291cmNlXG4gICkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHt9XG5cbiAgZGVsZXRlKCkge1xuICAgIHRoaXMubG9hZGluZ1Jlc3VsdCA9IHRydWU7XG4gICAgdGhpcy5kaWFsb2dSZWYuZGlzYWJsZUNsb3NlID0gdHJ1ZTtcbiAgICB0aGlzLm5iU2VydmljZS5kZWxldGVSZXNvdXJjZSh0aGlzLnJlc291cmNlLmlkKS5zdWJzY3JpYmUoe1xuICAgICAgZXJyb3I6IChlcnIpID0+IHtcbiAgICAgICAgdGhpcy5kaWFsb2dSZWYuZGlzYWJsZUNsb3NlID0gZmFsc2U7XG4gICAgICAgIGlmIChlcnIuZXJyb3IpIHtcbiAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IGVyci5lcnJvci5tZXNzYWdlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gJ1Vua25vd24gRXJyb3InO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbmV4dDogKCkgPT4ge1xuICAgICAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZSh0cnVlKTtcbiAgICAgIH0sXG4gICAgICBjb21wbGV0ZTogKCkgPT4ge1xuICAgICAgICB0aGlzLmxvYWRpbmdSZXN1bHQgPSBmYWxzZTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICBjbG9zZURpYWxvZygpIHtcbiAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZSgpO1xuICB9XG59XG4iLCI8aDIgbWF0LWRpYWxvZy10aXRsZT5EZWxldGUgUmVzb3VyY2Uge3sgcmVzb3VyY2UuYXBwbGljYXRpb25SZXNvdXJjZU5hbWUgfX08L2gyPlxuPGRpdiBtYXQtZGlhbG9nLWNvbnRlbnQ+XG4gIDxkaXYgY2xhc3M9XCJlcnJvci1kaXNwbGF5XCIgKm5nSWY9XCJlcnJvck1lc3NhZ2VcIj5cbiAgICA8aDU+e3sgZXJyb3JNZXNzYWdlIH19PC9oNT5cbiAgPC9kaXY+XG4gIDxwPkFyZSB5b3Ugc3VyZT88L3A+XG48L2Rpdj5cbjxkaXYgYWxpZ249XCJlbmRcIiBtYXQtZGlhbG9nLWFjdGlvbnM+XG4gIDxidXR0b25cbiAgICAoY2xpY2spPVwiY2xvc2VEaWFsb2coKVwiXG4gICAgdHlwZT1cImJ1dHRvblwiXG4gICAgY29sb3I9XCJ3YXJuXCJcbiAgICBtYXQtc3Ryb2tlZC1idXR0b25cbiAgICBbZGlzYWJsZWRdPVwiZGlhbG9nUmVmLmRpc2FibGVDbG9zZVwiXG4gID5cbiAgICBDYW5jZWw8L2J1dHRvblxuICA+PGJ1dHRvblxuICAgIChjbGljayk9XCJkZWxldGUoKVwiXG4gICAgdHlwZT1cImJ1dHRvblwiXG4gICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICBtYXQtZmxhdC1idXR0b25cbiAgICBbZGlzYWJsZWRdPVwiZGlhbG9nUmVmLmRpc2FibGVDbG9zZVwiXG4gID5cbiAgICBEZWxldGVcbiAgPC9idXR0b24+XG48L2Rpdj5cbiJdfQ==