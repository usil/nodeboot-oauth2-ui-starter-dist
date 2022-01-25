import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/dialog";
import * as i2 from "../../nodeboot-oauth2-starter.service";
import * as i3 from "@angular/material/button";
import * as i4 from "@angular/common";
export class DeleteApplicationPartComponent {
    constructor(dialogRef, nbService, part) {
        this.dialogRef = dialogRef;
        this.nbService = nbService;
        this.part = part;
        this.loadingResult = false;
    }
    ngOnInit() { }
    delete() {
        this.loadingResult = true;
        this.dialogRef.disableClose = true;
        this.nbService.deletePart(this.part.id).subscribe({
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
DeleteApplicationPartComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: DeleteApplicationPartComponent, deps: [{ token: i1.MatDialogRef }, { token: i2.NodebootOauth2StarterService }, { token: MAT_DIALOG_DATA }], target: i0.ɵɵFactoryTarget.Component });
DeleteApplicationPartComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: DeleteApplicationPartComponent, selector: "lib-delete-application-part", ngImport: i0, template: "<h2 mat-dialog-title>Delete Part {{ part.applicationPartName }}</h2>\n<div mat-dialog-content>\n  <div class=\"error-display\" *ngIf=\"errorMessage\">\n    <h5>{{ errorMessage }}</h5>\n  </div>\n  <p>Are you sure?</p>\n</div>\n<div align=\"end\" mat-dialog-actions>\n  <button\n    (click)=\"closeDialog()\"\n    type=\"button\"\n    color=\"warn\"\n    mat-stroked-button\n    [disabled]=\"dialogRef.disableClose\"\n  >\n    Cancel</button\n  ><button\n    (click)=\"delete()\"\n    type=\"button\"\n    color=\"primary\"\n    mat-flat-button\n    [disabled]=\"dialogRef.disableClose\"\n  >\n    Delete\n  </button>\n</div>\n", styles: [""], components: [{ type: i3.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }], directives: [{ type: i1.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { type: i1.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }, { type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.MatDialogActions, selector: "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: DeleteApplicationPartComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-delete-application-part', template: "<h2 mat-dialog-title>Delete Part {{ part.applicationPartName }}</h2>\n<div mat-dialog-content>\n  <div class=\"error-display\" *ngIf=\"errorMessage\">\n    <h5>{{ errorMessage }}</h5>\n  </div>\n  <p>Are you sure?</p>\n</div>\n<div align=\"end\" mat-dialog-actions>\n  <button\n    (click)=\"closeDialog()\"\n    type=\"button\"\n    color=\"warn\"\n    mat-stroked-button\n    [disabled]=\"dialogRef.disableClose\"\n  >\n    Cancel</button\n  ><button\n    (click)=\"delete()\"\n    type=\"button\"\n    color=\"primary\"\n    mat-flat-button\n    [disabled]=\"dialogRef.disableClose\"\n  >\n    Delete\n  </button>\n</div>\n", styles: [""] }]
        }], ctorParameters: function () { return [{ type: i1.MatDialogRef }, { type: i2.NodebootOauth2StarterService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_DIALOG_DATA]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLWFwcGxpY2F0aW9uLXBhcnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm9kZWJvb3Qtb2F1dGgyLXN0YXJ0ZXIvc3JjL2xpYi9vYXV0aC1zdGFydGVyLWFwcGxpY2F0aW9uLXBhcnQvZGVsZXRlLWFwcGxpY2F0aW9uLXBhcnQvZGVsZXRlLWFwcGxpY2F0aW9uLXBhcnQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbm9kZWJvb3Qtb2F1dGgyLXN0YXJ0ZXIvc3JjL2xpYi9vYXV0aC1zdGFydGVyLWFwcGxpY2F0aW9uLXBhcnQvZGVsZXRlLWFwcGxpY2F0aW9uLXBhcnQvZGVsZXRlLWFwcGxpY2F0aW9uLXBhcnQuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDMUQsT0FBTyxFQUFnQixlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7Ozs7O0FBV3pFLE1BQU0sT0FBTyw4QkFBOEI7SUFJekMsWUFDUyxTQUF1RCxFQUN0RCxTQUF1QyxFQUNmLElBQVU7UUFGbkMsY0FBUyxHQUFULFNBQVMsQ0FBOEM7UUFDdEQsY0FBUyxHQUFULFNBQVMsQ0FBOEI7UUFDZixTQUFJLEdBQUosSUFBSSxDQUFNO1FBTDVDLGtCQUFhLEdBQUcsS0FBSyxDQUFDO0lBTW5CLENBQUM7SUFFSixRQUFRLEtBQVUsQ0FBQztJQUVuQixNQUFNO1FBQ0osSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFDMUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ25DLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQ2hELEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUNiLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztnQkFDcEMsSUFBSSxHQUFHLENBQUMsS0FBSyxFQUFFO29CQUNiLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7aUJBQ3ZDO3FCQUFNO29CQUNMLElBQUksQ0FBQyxZQUFZLEdBQUcsZUFBZSxDQUFDO2lCQUNyQztZQUNILENBQUM7WUFDRCxJQUFJLEVBQUUsR0FBRyxFQUFFO2dCQUNULElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdCLENBQUM7WUFDRCxRQUFRLEVBQUUsR0FBRyxFQUFFO2dCQUNiLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1lBQzdCLENBQUM7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDekIsQ0FBQzs7MkhBbkNVLDhCQUE4QiwwRkFPL0IsZUFBZTsrR0FQZCw4QkFBOEIsbUVDWjNDLG9uQkEwQkE7MkZEZGEsOEJBQThCO2tCQUwxQyxTQUFTOytCQUNFLDZCQUE2Qjs7MEJBV3BDLE1BQU07MkJBQUMsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5qZWN0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdERpYWxvZ1JlZiwgTUFUX0RJQUxPR19EQVRBIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7XG4gIE5vZGVib290T2F1dGgyU3RhcnRlclNlcnZpY2UsXG4gIFBhcnQsXG59IGZyb20gJy4uLy4uL25vZGVib290LW9hdXRoMi1zdGFydGVyLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItZGVsZXRlLWFwcGxpY2F0aW9uLXBhcnQnLFxuICB0ZW1wbGF0ZVVybDogJy4vZGVsZXRlLWFwcGxpY2F0aW9uLXBhcnQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9kZWxldGUtYXBwbGljYXRpb24tcGFydC5jb21wb25lbnQuc2NzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBEZWxldGVBcHBsaWNhdGlvblBhcnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBlcnJvck1lc3NhZ2UhOiBzdHJpbmc7XG4gIGxvYWRpbmdSZXN1bHQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8RGVsZXRlQXBwbGljYXRpb25QYXJ0Q29tcG9uZW50PixcbiAgICBwcml2YXRlIG5iU2VydmljZTogTm9kZWJvb3RPYXV0aDJTdGFydGVyU2VydmljZSxcbiAgICBASW5qZWN0KE1BVF9ESUFMT0dfREFUQSkgcHVibGljIHBhcnQ6IFBhcnRcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge31cblxuICBkZWxldGUoKSB7XG4gICAgdGhpcy5sb2FkaW5nUmVzdWx0ID0gdHJ1ZTtcbiAgICB0aGlzLmRpYWxvZ1JlZi5kaXNhYmxlQ2xvc2UgPSB0cnVlO1xuICAgIHRoaXMubmJTZXJ2aWNlLmRlbGV0ZVBhcnQodGhpcy5wYXJ0LmlkKS5zdWJzY3JpYmUoe1xuICAgICAgZXJyb3I6IChlcnIpID0+IHtcbiAgICAgICAgdGhpcy5kaWFsb2dSZWYuZGlzYWJsZUNsb3NlID0gZmFsc2U7XG4gICAgICAgIGlmIChlcnIuZXJyb3IpIHtcbiAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IGVyci5lcnJvci5tZXNzYWdlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gJ1Vua25vd24gRXJyb3InO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbmV4dDogKCkgPT4ge1xuICAgICAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZSh0cnVlKTtcbiAgICAgIH0sXG4gICAgICBjb21wbGV0ZTogKCkgPT4ge1xuICAgICAgICB0aGlzLmxvYWRpbmdSZXN1bHQgPSBmYWxzZTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICBjbG9zZURpYWxvZygpIHtcbiAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZSgpO1xuICB9XG59XG4iLCI8aDIgbWF0LWRpYWxvZy10aXRsZT5EZWxldGUgUGFydCB7eyBwYXJ0LmFwcGxpY2F0aW9uUGFydE5hbWUgfX08L2gyPlxuPGRpdiBtYXQtZGlhbG9nLWNvbnRlbnQ+XG4gIDxkaXYgY2xhc3M9XCJlcnJvci1kaXNwbGF5XCIgKm5nSWY9XCJlcnJvck1lc3NhZ2VcIj5cbiAgICA8aDU+e3sgZXJyb3JNZXNzYWdlIH19PC9oNT5cbiAgPC9kaXY+XG4gIDxwPkFyZSB5b3Ugc3VyZT88L3A+XG48L2Rpdj5cbjxkaXYgYWxpZ249XCJlbmRcIiBtYXQtZGlhbG9nLWFjdGlvbnM+XG4gIDxidXR0b25cbiAgICAoY2xpY2spPVwiY2xvc2VEaWFsb2coKVwiXG4gICAgdHlwZT1cImJ1dHRvblwiXG4gICAgY29sb3I9XCJ3YXJuXCJcbiAgICBtYXQtc3Ryb2tlZC1idXR0b25cbiAgICBbZGlzYWJsZWRdPVwiZGlhbG9nUmVmLmRpc2FibGVDbG9zZVwiXG4gID5cbiAgICBDYW5jZWw8L2J1dHRvblxuICA+PGJ1dHRvblxuICAgIChjbGljayk9XCJkZWxldGUoKVwiXG4gICAgdHlwZT1cImJ1dHRvblwiXG4gICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICBtYXQtZmxhdC1idXR0b25cbiAgICBbZGlzYWJsZWRdPVwiZGlhbG9nUmVmLmRpc2FibGVDbG9zZVwiXG4gID5cbiAgICBEZWxldGVcbiAgPC9idXR0b24+XG48L2Rpdj5cbiJdfQ==