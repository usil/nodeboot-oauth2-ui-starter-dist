import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/dialog";
import * as i2 from "../../nodeboot-oauth2-starter.service";
import * as i3 from "@angular/material/button";
import * as i4 from "@angular/common";
export class DeleteUserComponent {
    constructor(dialogRef, nbService, user) {
        this.dialogRef = dialogRef;
        this.nbService = nbService;
        this.user = user;
    }
    ngOnInit() { }
    delete() {
        this.dialogRef.disableClose = true;
        this.nbService.deleteUser(this.user.subjectId).subscribe({
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
DeleteUserComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: DeleteUserComponent, deps: [{ token: i1.MatDialogRef }, { token: i2.NodebootOauth2StarterService }, { token: MAT_DIALOG_DATA }], target: i0.ɵɵFactoryTarget.Component });
DeleteUserComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: DeleteUserComponent, selector: "lib-delete-user", ngImport: i0, template: "<h2 mat-dialog-title>Delete User {{ user.name }}</h2>\n<div mat-dialog-content>\n  <div class=\"error-display\" *ngIf=\"errorMessage\">\n    <h5>{{ errorMessage }}</h5>\n  </div>\n  <p>Are you sure?</p>\n</div>\n<div align=\"end\" mat-dialog-actions>\n  <button\n    (click)=\"closeDialog()\"\n    type=\"button\"\n    color=\"warn\"\n    mat-stroked-button\n    [disabled]=\"dialogRef.disableClose\"\n  >\n    Cancel</button\n  ><button\n    (click)=\"delete()\"\n    type=\"button\"\n    color=\"primary\"\n    mat-flat-button\n    [disabled]=\"dialogRef.disableClose\"\n  >\n    Delete\n  </button>\n</div>\n", styles: [".error-display{margin:1rem 0;background-color:#ffab1098;padding:.5rem;border-radius:.25rem}.error-display h5{margin:0;font-size:16px}\n"], components: [{ type: i3.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }], directives: [{ type: i1.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { type: i1.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }, { type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.MatDialogActions, selector: "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: DeleteUserComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-delete-user', template: "<h2 mat-dialog-title>Delete User {{ user.name }}</h2>\n<div mat-dialog-content>\n  <div class=\"error-display\" *ngIf=\"errorMessage\">\n    <h5>{{ errorMessage }}</h5>\n  </div>\n  <p>Are you sure?</p>\n</div>\n<div align=\"end\" mat-dialog-actions>\n  <button\n    (click)=\"closeDialog()\"\n    type=\"button\"\n    color=\"warn\"\n    mat-stroked-button\n    [disabled]=\"dialogRef.disableClose\"\n  >\n    Cancel</button\n  ><button\n    (click)=\"delete()\"\n    type=\"button\"\n    color=\"primary\"\n    mat-flat-button\n    [disabled]=\"dialogRef.disableClose\"\n  >\n    Delete\n  </button>\n</div>\n", styles: [".error-display{margin:1rem 0;background-color:#ffab1098;padding:.5rem;border-radius:.25rem}.error-display h5{margin:0;font-size:16px}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.MatDialogRef }, { type: i2.NodebootOauth2StarterService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_DIALOG_DATA]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLXVzZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm9kZWJvb3Qtb2F1dGgyLXN0YXJ0ZXIvc3JjL2xpYi9vYXV0aC1zdGFydGVyLXVzZXJzL2RlbGV0ZS11c2VyL2RlbGV0ZS11c2VyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25vZGVib290LW9hdXRoMi1zdGFydGVyL3NyYy9saWIvb2F1dGgtc3RhcnRlci11c2Vycy9kZWxldGUtdXNlci9kZWxldGUtdXNlci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUMxRCxPQUFPLEVBQWdCLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7Ozs7QUFXekUsTUFBTSxPQUFPLG1CQUFtQjtJQUc5QixZQUNTLFNBQTRDLEVBQzNDLFNBQXVDLEVBQ2YsSUFBVTtRQUZuQyxjQUFTLEdBQVQsU0FBUyxDQUFtQztRQUMzQyxjQUFTLEdBQVQsU0FBUyxDQUE4QjtRQUNmLFNBQUksR0FBSixJQUFJLENBQU07SUFDekMsQ0FBQztJQUVKLFFBQVEsS0FBVSxDQUFDO0lBRW5CLE1BQU07UUFDSixJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDbkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFDdkQsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ2IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO2dCQUNwQyxJQUFJLEdBQUcsQ0FBQyxLQUFLLEVBQUU7b0JBQ2IsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztpQkFDdkM7cUJBQU07b0JBQ0wsSUFBSSxDQUFDLFlBQVksR0FBRyxlQUFlLENBQUM7aUJBQ3JDO1lBQ0gsQ0FBQztZQUNELElBQUksRUFBRSxHQUFHLEVBQUU7Z0JBQ1QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0IsQ0FBQztTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN6QixDQUFDOztnSEE5QlUsbUJBQW1CLDBGQU1wQixlQUFlO29HQU5kLG1CQUFtQix1RENaaEMscW1CQTBCQTsyRkRkYSxtQkFBbUI7a0JBTC9CLFNBQVM7K0JBQ0UsaUJBQWlCOzswQkFVeEIsTUFBTTsyQkFBQyxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbmplY3QsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nUmVmLCBNQVRfRElBTE9HX0RBVEEgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHtcbiAgTm9kZWJvb3RPYXV0aDJTdGFydGVyU2VydmljZSxcbiAgVXNlcixcbn0gZnJvbSAnLi4vLi4vbm9kZWJvb3Qtb2F1dGgyLXN0YXJ0ZXIuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpYi1kZWxldGUtdXNlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9kZWxldGUtdXNlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2RlbGV0ZS11c2VyLmNvbXBvbmVudC5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIERlbGV0ZVVzZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBlcnJvck1lc3NhZ2UhOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPERlbGV0ZVVzZXJDb21wb25lbnQ+LFxuICAgIHByaXZhdGUgbmJTZXJ2aWNlOiBOb2RlYm9vdE9hdXRoMlN0YXJ0ZXJTZXJ2aWNlLFxuICAgIEBJbmplY3QoTUFUX0RJQUxPR19EQVRBKSBwdWJsaWMgdXNlcjogVXNlclxuICApIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7fVxuXG4gIGRlbGV0ZSgpIHtcbiAgICB0aGlzLmRpYWxvZ1JlZi5kaXNhYmxlQ2xvc2UgPSB0cnVlO1xuICAgIHRoaXMubmJTZXJ2aWNlLmRlbGV0ZVVzZXIodGhpcy51c2VyLnN1YmplY3RJZCkuc3Vic2NyaWJlKHtcbiAgICAgIGVycm9yOiAoZXJyKSA9PiB7XG4gICAgICAgIHRoaXMuZGlhbG9nUmVmLmRpc2FibGVDbG9zZSA9IGZhbHNlO1xuICAgICAgICBpZiAoZXJyLmVycm9yKSB7XG4gICAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSBlcnIuZXJyb3IubWVzc2FnZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9ICdVbmtub3duIEVycm9yJztcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG5leHQ6ICgpID0+IHtcbiAgICAgICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UodHJ1ZSk7XG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgY2xvc2VEaWFsb2coKSB7XG4gICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UoKTtcbiAgfVxufVxuIiwiPGgyIG1hdC1kaWFsb2ctdGl0bGU+RGVsZXRlIFVzZXIge3sgdXNlci5uYW1lIH19PC9oMj5cbjxkaXYgbWF0LWRpYWxvZy1jb250ZW50PlxuICA8ZGl2IGNsYXNzPVwiZXJyb3ItZGlzcGxheVwiICpuZ0lmPVwiZXJyb3JNZXNzYWdlXCI+XG4gICAgPGg1Pnt7IGVycm9yTWVzc2FnZSB9fTwvaDU+XG4gIDwvZGl2PlxuICA8cD5BcmUgeW91IHN1cmU/PC9wPlxuPC9kaXY+XG48ZGl2IGFsaWduPVwiZW5kXCIgbWF0LWRpYWxvZy1hY3Rpb25zPlxuICA8YnV0dG9uXG4gICAgKGNsaWNrKT1cImNsb3NlRGlhbG9nKClcIlxuICAgIHR5cGU9XCJidXR0b25cIlxuICAgIGNvbG9yPVwid2FyblwiXG4gICAgbWF0LXN0cm9rZWQtYnV0dG9uXG4gICAgW2Rpc2FibGVkXT1cImRpYWxvZ1JlZi5kaXNhYmxlQ2xvc2VcIlxuICA+XG4gICAgQ2FuY2VsPC9idXR0b25cbiAgPjxidXR0b25cbiAgICAoY2xpY2spPVwiZGVsZXRlKClcIlxuICAgIHR5cGU9XCJidXR0b25cIlxuICAgIGNvbG9yPVwicHJpbWFyeVwiXG4gICAgbWF0LWZsYXQtYnV0dG9uXG4gICAgW2Rpc2FibGVkXT1cImRpYWxvZ1JlZi5kaXNhYmxlQ2xvc2VcIlxuICA+XG4gICAgRGVsZXRlXG4gIDwvYnV0dG9uPlxuPC9kaXY+XG4iXX0=