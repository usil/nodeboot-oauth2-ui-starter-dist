import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as i0 from "@angular/core";
import * as i1 from "../../nodeboot-oauth2-starter.service";
import * as i2 from "@angular/material/dialog";
import * as i3 from "@angular/material/progress-spinner";
import * as i4 from "@angular/material/form-field";
import * as i5 from "@angular/material/button";
import * as i6 from "@angular/material/icon";
import * as i7 from "@angular/common";
import * as i8 from "@angular/material/input";
import * as i9 from "@angular/material/tooltip";
export class ShowSecretComponent {
    constructor(nbService, dialogRef, client) {
        this.nbService = nbService;
        this.dialogRef = dialogRef;
        this.client = client;
        this.hide = true;
    }
    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
    ngOnInit() {
        this.dialogRef.disableClose = true;
        this.subscription = this.nbService.getSecret(this.client.id).subscribe({
            error: (err) => {
                this.dialogRef.disableClose = false;
                if (err.error) {
                    this.errorMessage = err.error.message;
                }
                else {
                    this.errorMessage = 'Unknown Error';
                }
            },
            next: (res) => {
                this.dialogRef.disableClose = false;
                this.clientSecret = res.content.clientSecret;
            },
        });
    }
    closeDialog() {
        this.dialogRef.close();
    }
}
ShowSecretComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ShowSecretComponent, deps: [{ token: i1.NodebootOauth2StarterService }, { token: i2.MatDialogRef }, { token: MAT_DIALOG_DATA }], target: i0.ɵɵFactoryTarget.Component });
ShowSecretComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: ShowSecretComponent, selector: "lib-show-secret", ngImport: i0, template: "<h2 mat-dialog-title>Client secret for {{ client.name }}</h2>\n<div mat-dialog-content>\n  <div class=\"loading-shade\" *ngIf=\"!clientSecret\">\n    <mat-spinner *ngIf=\"!clientSecret\"></mat-spinner>\n  </div>\n  <mat-form-field *ngIf=\"clientSecret\" class=\"full-width\" appearance=\"fill\">\n    <mat-label>Client secret</mat-label>\n    <input\n      [type]=\"hide ? 'password' : 'text'\"\n      disabled\n      matInput\n      [value]=\"clientSecret\"\n    />\n    <button\n      matTooltip=\"Show secret\"\n      mat-icon-button\n      matSuffix\n      (click)=\"hide = !hide\"\n    >\n      <mat-icon>{{ hide ? \"visibility_off\" : \"visibility\" }}</mat-icon>\n    </button>\n  </mat-form-field>\n</div>\n<div align=\"end\" mat-dialog-actions>\n  <button (click)=\"closeDialog()\" type=\"button\" color=\"warn\" mat-stroked-button>\n    Close\n  </button>\n</div>\n", styles: [".full-width{width:100%}.loading-shade{position:absolute;top:0;left:0;bottom:56px;right:0;background:rgba(0,0,0,.15);z-index:1;display:flex;align-items:center;justify-content:center}\n"], components: [{ type: i3.MatSpinner, selector: "mat-spinner", inputs: ["color"] }, { type: i4.MatFormField, selector: "mat-form-field", inputs: ["color", "appearance", "hideRequiredMarker", "hintLabel", "floatLabel"], exportAs: ["matFormField"] }, { type: i5.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { type: i6.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }], directives: [{ type: i2.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { type: i2.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }, { type: i7.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.MatLabel, selector: "mat-label" }, { type: i8.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { type: i9.MatTooltip, selector: "[matTooltip]", exportAs: ["matTooltip"] }, { type: i4.MatSuffix, selector: "[matSuffix]" }, { type: i2.MatDialogActions, selector: "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: ShowSecretComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-show-secret', template: "<h2 mat-dialog-title>Client secret for {{ client.name }}</h2>\n<div mat-dialog-content>\n  <div class=\"loading-shade\" *ngIf=\"!clientSecret\">\n    <mat-spinner *ngIf=\"!clientSecret\"></mat-spinner>\n  </div>\n  <mat-form-field *ngIf=\"clientSecret\" class=\"full-width\" appearance=\"fill\">\n    <mat-label>Client secret</mat-label>\n    <input\n      [type]=\"hide ? 'password' : 'text'\"\n      disabled\n      matInput\n      [value]=\"clientSecret\"\n    />\n    <button\n      matTooltip=\"Show secret\"\n      mat-icon-button\n      matSuffix\n      (click)=\"hide = !hide\"\n    >\n      <mat-icon>{{ hide ? \"visibility_off\" : \"visibility\" }}</mat-icon>\n    </button>\n  </mat-form-field>\n</div>\n<div align=\"end\" mat-dialog-actions>\n  <button (click)=\"closeDialog()\" type=\"button\" color=\"warn\" mat-stroked-button>\n    Close\n  </button>\n</div>\n", styles: [".full-width{width:100%}.loading-shade{position:absolute;top:0;left:0;bottom:56px;right:0;background:rgba(0,0,0,.15);z-index:1;display:flex;align-items:center;justify-content:center}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.NodebootOauth2StarterService }, { type: i2.MatDialogRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_DIALOG_DATA]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hvdy1zZWNyZXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm9kZWJvb3Qtb2F1dGgyLXN0YXJ0ZXIvc3JjL2xpYi9vYXV0aC1zdGFydGVyLWNsaWVudC9zaG93LXNlY3JldC9zaG93LXNlY3JldC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ub2RlYm9vdC1vYXV0aDItc3RhcnRlci9zcmMvbGliL29hdXRoLXN0YXJ0ZXItY2xpZW50L3Nob3ctc2VjcmV0L3Nob3ctc2VjcmV0LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUNyRSxPQUFPLEVBQWdCLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7Ozs7Ozs7OztBQVd6RSxNQUFNLE9BQU8sbUJBQW1CO0lBTTlCLFlBQ1UsU0FBdUMsRUFDeEMsU0FBNEMsRUFDbkIsTUFBYztRQUZ0QyxjQUFTLEdBQVQsU0FBUyxDQUE4QjtRQUN4QyxjQUFTLEdBQVQsU0FBUyxDQUFtQztRQUNuQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBUmhELFNBQUksR0FBRyxJQUFJLENBQUM7SUFTVCxDQUFDO0lBRUosV0FBVztRQUNULElBQUksQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDbkMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQztZQUNyRSxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDYixJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7Z0JBQ3BDLElBQUksR0FBRyxDQUFDLEtBQUssRUFBRTtvQkFDYixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO2lCQUN2QztxQkFBTTtvQkFDTCxJQUFJLENBQUMsWUFBWSxHQUFHLGVBQWUsQ0FBQztpQkFDckM7WUFDSCxDQUFDO1lBQ0QsSUFBSSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ1osSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO2dCQUNwQyxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDO1lBQy9DLENBQUM7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDekIsQ0FBQzs7Z0hBcENVLG1CQUFtQiwwRkFTcEIsZUFBZTtvR0FUZCxtQkFBbUIsdURDYmhDLDYyQkE0QkE7MkZEZmEsbUJBQW1CO2tCQUwvQixTQUFTOytCQUNFLGlCQUFpQjs7MEJBYXhCLE1BQU07MkJBQUMsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBJbmplY3QsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXREaWFsb2dSZWYsIE1BVF9ESUFMT0dfREFUQSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQge1xuICBDbGllbnQsXG4gIE5vZGVib290T2F1dGgyU3RhcnRlclNlcnZpY2UsXG59IGZyb20gJy4uLy4uL25vZGVib290LW9hdXRoMi1zdGFydGVyLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItc2hvdy1zZWNyZXQnLFxuICB0ZW1wbGF0ZVVybDogJy4vc2hvdy1zZWNyZXQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9zaG93LXNlY3JldC5jb21wb25lbnQuc2NzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBTaG93U2VjcmV0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBoaWRlID0gdHJ1ZTtcbiAgY2xpZW50U2VjcmV0ITogc3RyaW5nO1xuICBlcnJvck1lc3NhZ2UhOiBzdHJpbmc7XG4gIHN1YnNjcmlwdGlvbiE6IFN1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG5iU2VydmljZTogTm9kZWJvb3RPYXV0aDJTdGFydGVyU2VydmljZSxcbiAgICBwdWJsaWMgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8U2hvd1NlY3JldENvbXBvbmVudD4sXG4gICAgQEluamVjdChNQVRfRElBTE9HX0RBVEEpIHB1YmxpYyBjbGllbnQ6IENsaWVudFxuICApIHt9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24/LnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmRpYWxvZ1JlZi5kaXNhYmxlQ2xvc2UgPSB0cnVlO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5uYlNlcnZpY2UuZ2V0U2VjcmV0KHRoaXMuY2xpZW50LmlkKS5zdWJzY3JpYmUoe1xuICAgICAgZXJyb3I6IChlcnIpID0+IHtcbiAgICAgICAgdGhpcy5kaWFsb2dSZWYuZGlzYWJsZUNsb3NlID0gZmFsc2U7XG4gICAgICAgIGlmIChlcnIuZXJyb3IpIHtcbiAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IGVyci5lcnJvci5tZXNzYWdlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gJ1Vua25vd24gRXJyb3InO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbmV4dDogKHJlcykgPT4ge1xuICAgICAgICB0aGlzLmRpYWxvZ1JlZi5kaXNhYmxlQ2xvc2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jbGllbnRTZWNyZXQgPSByZXMuY29udGVudC5jbGllbnRTZWNyZXQ7XG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgY2xvc2VEaWFsb2coKSB7XG4gICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UoKTtcbiAgfVxufVxuIiwiPGgyIG1hdC1kaWFsb2ctdGl0bGU+Q2xpZW50IHNlY3JldCBmb3Ige3sgY2xpZW50Lm5hbWUgfX08L2gyPlxuPGRpdiBtYXQtZGlhbG9nLWNvbnRlbnQ+XG4gIDxkaXYgY2xhc3M9XCJsb2FkaW5nLXNoYWRlXCIgKm5nSWY9XCIhY2xpZW50U2VjcmV0XCI+XG4gICAgPG1hdC1zcGlubmVyICpuZ0lmPVwiIWNsaWVudFNlY3JldFwiPjwvbWF0LXNwaW5uZXI+XG4gIDwvZGl2PlxuICA8bWF0LWZvcm0tZmllbGQgKm5nSWY9XCJjbGllbnRTZWNyZXRcIiBjbGFzcz1cImZ1bGwtd2lkdGhcIiBhcHBlYXJhbmNlPVwiZmlsbFwiPlxuICAgIDxtYXQtbGFiZWw+Q2xpZW50IHNlY3JldDwvbWF0LWxhYmVsPlxuICAgIDxpbnB1dFxuICAgICAgW3R5cGVdPVwiaGlkZSA/ICdwYXNzd29yZCcgOiAndGV4dCdcIlxuICAgICAgZGlzYWJsZWRcbiAgICAgIG1hdElucHV0XG4gICAgICBbdmFsdWVdPVwiY2xpZW50U2VjcmV0XCJcbiAgICAvPlxuICAgIDxidXR0b25cbiAgICAgIG1hdFRvb2x0aXA9XCJTaG93IHNlY3JldFwiXG4gICAgICBtYXQtaWNvbi1idXR0b25cbiAgICAgIG1hdFN1ZmZpeFxuICAgICAgKGNsaWNrKT1cImhpZGUgPSAhaGlkZVwiXG4gICAgPlxuICAgICAgPG1hdC1pY29uPnt7IGhpZGUgPyBcInZpc2liaWxpdHlfb2ZmXCIgOiBcInZpc2liaWxpdHlcIiB9fTwvbWF0LWljb24+XG4gICAgPC9idXR0b24+XG4gIDwvbWF0LWZvcm0tZmllbGQ+XG48L2Rpdj5cbjxkaXYgYWxpZ249XCJlbmRcIiBtYXQtZGlhbG9nLWFjdGlvbnM+XG4gIDxidXR0b24gKGNsaWNrKT1cImNsb3NlRGlhbG9nKClcIiB0eXBlPVwiYnV0dG9uXCIgY29sb3I9XCJ3YXJuXCIgbWF0LXN0cm9rZWQtYnV0dG9uPlxuICAgIENsb3NlXG4gIDwvYnV0dG9uPlxuPC9kaXY+XG4iXX0=