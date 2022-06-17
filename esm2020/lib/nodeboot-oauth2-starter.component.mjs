import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./nodeboot-oauth2-starter.service";
export class NodebootOauth2StarterComponent {
    constructor(nbService) {
        this.nbService = nbService;
        this.testTextT = this.nbService.apiUrl;
    }
    ngOnInit() { }
}
NodebootOauth2StarterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.2", ngImport: i0, type: NodebootOauth2StarterComponent, deps: [{ token: i1.NodebootOauth2StarterService }], target: i0.ɵɵFactoryTarget.Component });
NodebootOauth2StarterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.0.2", type: NodebootOauth2StarterComponent, selector: "lib-nodeboot-oauth2-starter", inputs: { otherText: "otherText" }, ngImport: i0, template: "", styles: ["p{color:#0ff}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.2", ngImport: i0, type: NodebootOauth2StarterComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-nodeboot-oauth2-starter', template: "", styles: ["p{color:#0ff}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.NodebootOauth2StarterService }]; }, propDecorators: { otherText: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZWJvb3Qtb2F1dGgyLXN0YXJ0ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbm9kZWJvb3Qtb2F1dGgyLXN0YXJ0ZXIvc3JjL2xpYi9ub2RlYm9vdC1vYXV0aDItc3RhcnRlci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9ub2RlYm9vdC1vYXV0aDItc3RhcnRlci9zcmMvbGliL25vZGVib290LW9hdXRoMi1zdGFydGVyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDOzs7QUFNekQsTUFBTSxPQUFPLDhCQUE4QjtJQUd6QyxZQUFvQixTQUF1QztRQUF2QyxjQUFTLEdBQVQsU0FBUyxDQUE4QjtRQUN6RCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO0lBQ3pDLENBQUM7SUFFRCxRQUFRLEtBQVUsQ0FBQzs7MkhBUFIsOEJBQThCOytHQUE5Qiw4QkFBOEIsdUdDUDNDLEVBQUE7MkZET2EsOEJBQThCO2tCQUwxQyxTQUFTOytCQUNFLDZCQUE2QjttSEFNOUIsU0FBUztzQkFBakIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5vZGVib290T2F1dGgyU3RhcnRlclNlcnZpY2UgfSBmcm9tICcuL25vZGVib290LW9hdXRoMi1zdGFydGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItbm9kZWJvb3Qtb2F1dGgyLXN0YXJ0ZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vbm9kZWJvb3Qtb2F1dGgyLXN0YXJ0ZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9nbG9iYWwuc2NzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBOb2RlYm9vdE9hdXRoMlN0YXJ0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICB0ZXN0VGV4dFQhOiBzdHJpbmc7XG4gIEBJbnB1dCgpIG90aGVyVGV4dCE6IHN0cmluZztcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBuYlNlcnZpY2U6IE5vZGVib290T2F1dGgyU3RhcnRlclNlcnZpY2UpIHtcbiAgICB0aGlzLnRlc3RUZXh0VCA9IHRoaXMubmJTZXJ2aWNlLmFwaVVybDtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge31cbn1cbiIsIiJdfQ==