import { DeleteUserComponent } from './oauth-starter-users/delete-user/delete-user.component';
import { UpdateUserComponent } from './oauth-starter-users/update-user/update-user.component';
import { NgModule } from '@angular/core';
import { NodebootOauth2StarterComponent } from './nodeboot-oauth2-starter.component';
import { LibraryMaterials } from './material.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OauthStarterUsersComponent } from './oauth-starter-users/oauth-starter-users.component';
import { ViewUserRolesComponent } from './oauth-starter-users/view-user-roles/view-user-roles.component';
import { CreateUserComponent } from './oauth-starter-users/create-user/create-user.component';
import { AddUserRolesComponent } from './oauth-starter-users/add-user-roles/add-user-roles.component';
import { OauthStarterUserProfileComponent } from './oauth-starter-user-profile/oauth-starter-user-profile.component';
import { ClipboardModule } from 'ngx-clipboard';
import { OauthStarterRolesComponent } from './oauth-starter-roles/oauth-starter-roles.component';
import { DeleteRoleComponent } from './oauth-starter-roles/delete-role/delete-role.component';
import { OptionsComponent } from './oauth-starter-roles/options/options.component';
import { CreateRoleComponent } from './oauth-starter-roles/create-role/create-role.component';
import { OauthStarterClientComponent } from './oauth-starter-client/oauth-starter-client.component';
import { DeleteClientComponent } from './oauth-starter-client/delete-client/delete-client.component';
import { UpdateClientComponent } from './oauth-starter-client/update-client/update-client.component';
import { AddClientRolesComponent } from './oauth-starter-client/add-client-roles/add-client-roles.component';
import { ViewClientRolesComponent } from './oauth-starter-client/view-client-roles/view-client-roles.component';
import { ShowTokenComponent } from './oauth-starter-client/show-token/show-token.component';
import { CreateClientComponent } from './oauth-starter-client/create-client/create-client.component';
import { OauthStarterApplicationResourceComponent } from './oauth-starter-application-resource/oauth-starter-application-resource.component';
import { DeleteApplicationResourceComponent } from './oauth-starter-application-resource/delete-application-resource/delete-application-resource.component';
import { ApplicationOptionsComponent } from './oauth-starter-application-resource/application-options/application-options.component';
import { CreateApplicationResourceComponent } from './oauth-starter-application-resource/create-application-resource/create-application-resource.component';
import { ChangePasswordComponent } from './oauth-starter-user-profile/change-password/change-password.component';
import { ShowNewTokenComponent } from './oauth-starter-client/show-new-token/show-new-token.component';
import { ShowSecretComponent } from './oauth-starter-client/show-secret/show-secret.component';
import { RevokeTokenComponent } from './oauth-starter-client/revoke-token/revoke-token.component';
import * as i0 from "@angular/core";
export class NodebootOauth2StarterModule {
}
NodebootOauth2StarterModule.??fac = i0.????ngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NodebootOauth2StarterModule, deps: [], target: i0.????FactoryTarget.NgModule });
NodebootOauth2StarterModule.??mod = i0.????ngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NodebootOauth2StarterModule, declarations: [NodebootOauth2StarterComponent,
        OauthStarterUsersComponent,
        OauthStarterUserProfileComponent,
        ViewUserRolesComponent,
        CreateUserComponent,
        UpdateUserComponent,
        DeleteUserComponent,
        AddUserRolesComponent,
        OauthStarterRolesComponent,
        DeleteRoleComponent,
        OptionsComponent,
        CreateRoleComponent,
        OauthStarterClientComponent,
        DeleteClientComponent,
        UpdateClientComponent,
        AddClientRolesComponent,
        ViewClientRolesComponent,
        ShowTokenComponent,
        CreateClientComponent,
        ChangePasswordComponent,
        OauthStarterApplicationResourceComponent,
        DeleteApplicationResourceComponent,
        ApplicationOptionsComponent,
        CreateApplicationResourceComponent,
        ShowNewTokenComponent,
        ShowSecretComponent,
        RevokeTokenComponent], imports: [LibraryMaterials,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        ClipboardModule], exports: [NodebootOauth2StarterComponent,
        OauthStarterUsersComponent,
        OauthStarterUserProfileComponent,
        OauthStarterRolesComponent,
        OauthStarterClientComponent,
        OauthStarterApplicationResourceComponent] });
NodebootOauth2StarterModule.??inj = i0.????ngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NodebootOauth2StarterModule, imports: [[
            LibraryMaterials,
            HttpClientModule,
            FormsModule,
            ReactiveFormsModule,
            CommonModule,
            ClipboardModule,
        ]] });
i0.????ngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NodebootOauth2StarterModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        NodebootOauth2StarterComponent,
                        OauthStarterUsersComponent,
                        OauthStarterUserProfileComponent,
                        ViewUserRolesComponent,
                        CreateUserComponent,
                        UpdateUserComponent,
                        DeleteUserComponent,
                        AddUserRolesComponent,
                        OauthStarterRolesComponent,
                        DeleteRoleComponent,
                        OptionsComponent,
                        CreateRoleComponent,
                        OauthStarterClientComponent,
                        DeleteClientComponent,
                        UpdateClientComponent,
                        AddClientRolesComponent,
                        ViewClientRolesComponent,
                        ShowTokenComponent,
                        CreateClientComponent,
                        ChangePasswordComponent,
                        OauthStarterApplicationResourceComponent,
                        DeleteApplicationResourceComponent,
                        ApplicationOptionsComponent,
                        CreateApplicationResourceComponent,
                        ShowNewTokenComponent,
                        ShowSecretComponent,
                        RevokeTokenComponent,
                    ],
                    imports: [
                        LibraryMaterials,
                        HttpClientModule,
                        FormsModule,
                        ReactiveFormsModule,
                        CommonModule,
                        ClipboardModule,
                    ],
                    exports: [
                        NodebootOauth2StarterComponent,
                        OauthStarterUsersComponent,
                        OauthStarterUserProfileComponent,
                        OauthStarterRolesComponent,
                        OauthStarterClientComponent,
                        OauthStarterApplicationResourceComponent,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZWJvb3Qtb2F1dGgyLXN0YXJ0ZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbm9kZWJvb3Qtb2F1dGgyLXN0YXJ0ZXIvc3JjL2xpYi9ub2RlYm9vdC1vYXV0aDItc3RhcnRlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seURBQXlELENBQUM7QUFDOUYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seURBQXlELENBQUM7QUFDOUYsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUNyRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHFEQUFxRCxDQUFDO0FBQ2pHLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGlFQUFpRSxDQUFDO0FBQ3pHLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlEQUF5RCxDQUFDO0FBQzlGLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLCtEQUErRCxDQUFDO0FBQ3RHLE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLG1FQUFtRSxDQUFDO0FBQ3JILE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEQsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0scURBQXFELENBQUM7QUFDakcsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seURBQXlELENBQUM7QUFDOUYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saURBQWlELENBQUM7QUFDbkYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seURBQXlELENBQUM7QUFDOUYsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sdURBQXVELENBQUM7QUFDcEcsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sOERBQThELENBQUM7QUFDckcsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sOERBQThELENBQUM7QUFDckcsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sb0VBQW9FLENBQUM7QUFDN0csT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sc0VBQXNFLENBQUM7QUFDaEgsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0RBQXdELENBQUM7QUFDNUYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sOERBQThELENBQUM7QUFDckcsT0FBTyxFQUFFLHdDQUF3QyxFQUFFLE1BQU0sbUZBQW1GLENBQUM7QUFDN0ksT0FBTyxFQUFFLGtDQUFrQyxFQUFFLE1BQU0sd0dBQXdHLENBQUM7QUFDNUosT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sd0ZBQXdGLENBQUM7QUFDckksT0FBTyxFQUFFLGtDQUFrQyxFQUFFLE1BQU0sd0dBQXdHLENBQUM7QUFDNUosT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sd0VBQXdFLENBQUM7QUFDakgsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sZ0VBQWdFLENBQUM7QUFDdkcsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMERBQTBELENBQUM7QUFDL0YsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNERBQTRELENBQUM7O0FBaURsRyxNQUFNLE9BQU8sMkJBQTJCOzt3SEFBM0IsMkJBQTJCO3lIQUEzQiwyQkFBMkIsaUJBN0NwQyw4QkFBOEI7UUFDOUIsMEJBQTBCO1FBQzFCLGdDQUFnQztRQUNoQyxzQkFBc0I7UUFDdEIsbUJBQW1CO1FBQ25CLG1CQUFtQjtRQUNuQixtQkFBbUI7UUFDbkIscUJBQXFCO1FBQ3JCLDBCQUEwQjtRQUMxQixtQkFBbUI7UUFDbkIsZ0JBQWdCO1FBQ2hCLG1CQUFtQjtRQUNuQiwyQkFBMkI7UUFDM0IscUJBQXFCO1FBQ3JCLHFCQUFxQjtRQUNyQix1QkFBdUI7UUFDdkIsd0JBQXdCO1FBQ3hCLGtCQUFrQjtRQUNsQixxQkFBcUI7UUFDckIsdUJBQXVCO1FBQ3ZCLHdDQUF3QztRQUN4QyxrQ0FBa0M7UUFDbEMsMkJBQTJCO1FBQzNCLGtDQUFrQztRQUNsQyxxQkFBcUI7UUFDckIsbUJBQW1CO1FBQ25CLG9CQUFvQixhQUdwQixnQkFBZ0I7UUFDaEIsZ0JBQWdCO1FBQ2hCLFdBQVc7UUFDWCxtQkFBbUI7UUFDbkIsWUFBWTtRQUNaLGVBQWUsYUFHZiw4QkFBOEI7UUFDOUIsMEJBQTBCO1FBQzFCLGdDQUFnQztRQUNoQywwQkFBMEI7UUFDMUIsMkJBQTJCO1FBQzNCLHdDQUF3Qzt5SEFHL0IsMkJBQTJCLFlBakI3QjtZQUNQLGdCQUFnQjtZQUNoQixnQkFBZ0I7WUFDaEIsV0FBVztZQUNYLG1CQUFtQjtZQUNuQixZQUFZO1lBQ1osZUFBZTtTQUNoQjsyRkFVVSwyQkFBMkI7a0JBL0N2QyxRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRTt3QkFDWiw4QkFBOEI7d0JBQzlCLDBCQUEwQjt3QkFDMUIsZ0NBQWdDO3dCQUNoQyxzQkFBc0I7d0JBQ3RCLG1CQUFtQjt3QkFDbkIsbUJBQW1CO3dCQUNuQixtQkFBbUI7d0JBQ25CLHFCQUFxQjt3QkFDckIsMEJBQTBCO3dCQUMxQixtQkFBbUI7d0JBQ25CLGdCQUFnQjt3QkFDaEIsbUJBQW1CO3dCQUNuQiwyQkFBMkI7d0JBQzNCLHFCQUFxQjt3QkFDckIscUJBQXFCO3dCQUNyQix1QkFBdUI7d0JBQ3ZCLHdCQUF3Qjt3QkFDeEIsa0JBQWtCO3dCQUNsQixxQkFBcUI7d0JBQ3JCLHVCQUF1Qjt3QkFDdkIsd0NBQXdDO3dCQUN4QyxrQ0FBa0M7d0JBQ2xDLDJCQUEyQjt3QkFDM0Isa0NBQWtDO3dCQUNsQyxxQkFBcUI7d0JBQ3JCLG1CQUFtQjt3QkFDbkIsb0JBQW9CO3FCQUNyQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsZ0JBQWdCO3dCQUNoQixnQkFBZ0I7d0JBQ2hCLFdBQVc7d0JBQ1gsbUJBQW1CO3dCQUNuQixZQUFZO3dCQUNaLGVBQWU7cUJBQ2hCO29CQUNELE9BQU8sRUFBRTt3QkFDUCw4QkFBOEI7d0JBQzlCLDBCQUEwQjt3QkFDMUIsZ0NBQWdDO3dCQUNoQywwQkFBMEI7d0JBQzFCLDJCQUEyQjt3QkFDM0Isd0NBQXdDO3FCQUN6QztpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERlbGV0ZVVzZXJDb21wb25lbnQgfSBmcm9tICcuL29hdXRoLXN0YXJ0ZXItdXNlcnMvZGVsZXRlLXVzZXIvZGVsZXRlLXVzZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFVwZGF0ZVVzZXJDb21wb25lbnQgfSBmcm9tICcuL29hdXRoLXN0YXJ0ZXItdXNlcnMvdXBkYXRlLXVzZXIvdXBkYXRlLXVzZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOb2RlYm9vdE9hdXRoMlN0YXJ0ZXJDb21wb25lbnQgfSBmcm9tICcuL25vZGVib290LW9hdXRoMi1zdGFydGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMaWJyYXJ5TWF0ZXJpYWxzIH0gZnJvbSAnLi9tYXRlcmlhbC5tb2R1bGUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE9hdXRoU3RhcnRlclVzZXJzQ29tcG9uZW50IH0gZnJvbSAnLi9vYXV0aC1zdGFydGVyLXVzZXJzL29hdXRoLXN0YXJ0ZXItdXNlcnMuY29tcG9uZW50JztcbmltcG9ydCB7IFZpZXdVc2VyUm9sZXNDb21wb25lbnQgfSBmcm9tICcuL29hdXRoLXN0YXJ0ZXItdXNlcnMvdmlldy11c2VyLXJvbGVzL3ZpZXctdXNlci1yb2xlcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ3JlYXRlVXNlckNvbXBvbmVudCB9IGZyb20gJy4vb2F1dGgtc3RhcnRlci11c2Vycy9jcmVhdGUtdXNlci9jcmVhdGUtdXNlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgQWRkVXNlclJvbGVzQ29tcG9uZW50IH0gZnJvbSAnLi9vYXV0aC1zdGFydGVyLXVzZXJzL2FkZC11c2VyLXJvbGVzL2FkZC11c2VyLXJvbGVzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPYXV0aFN0YXJ0ZXJVc2VyUHJvZmlsZUNvbXBvbmVudCB9IGZyb20gJy4vb2F1dGgtc3RhcnRlci11c2VyLXByb2ZpbGUvb2F1dGgtc3RhcnRlci11c2VyLXByb2ZpbGUuY29tcG9uZW50JztcbmltcG9ydCB7IENsaXBib2FyZE1vZHVsZSB9IGZyb20gJ25neC1jbGlwYm9hcmQnO1xuaW1wb3J0IHsgT2F1dGhTdGFydGVyUm9sZXNDb21wb25lbnQgfSBmcm9tICcuL29hdXRoLXN0YXJ0ZXItcm9sZXMvb2F1dGgtc3RhcnRlci1yb2xlcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVsZXRlUm9sZUNvbXBvbmVudCB9IGZyb20gJy4vb2F1dGgtc3RhcnRlci1yb2xlcy9kZWxldGUtcm9sZS9kZWxldGUtcm9sZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3B0aW9uc0NvbXBvbmVudCB9IGZyb20gJy4vb2F1dGgtc3RhcnRlci1yb2xlcy9vcHRpb25zL29wdGlvbnMuY29tcG9uZW50JztcbmltcG9ydCB7IENyZWF0ZVJvbGVDb21wb25lbnQgfSBmcm9tICcuL29hdXRoLXN0YXJ0ZXItcm9sZXMvY3JlYXRlLXJvbGUvY3JlYXRlLXJvbGUuY29tcG9uZW50JztcbmltcG9ydCB7IE9hdXRoU3RhcnRlckNsaWVudENvbXBvbmVudCB9IGZyb20gJy4vb2F1dGgtc3RhcnRlci1jbGllbnQvb2F1dGgtc3RhcnRlci1jbGllbnQuY29tcG9uZW50JztcbmltcG9ydCB7IERlbGV0ZUNsaWVudENvbXBvbmVudCB9IGZyb20gJy4vb2F1dGgtc3RhcnRlci1jbGllbnQvZGVsZXRlLWNsaWVudC9kZWxldGUtY2xpZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVcGRhdGVDbGllbnRDb21wb25lbnQgfSBmcm9tICcuL29hdXRoLXN0YXJ0ZXItY2xpZW50L3VwZGF0ZS1jbGllbnQvdXBkYXRlLWNsaWVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQWRkQ2xpZW50Um9sZXNDb21wb25lbnQgfSBmcm9tICcuL29hdXRoLXN0YXJ0ZXItY2xpZW50L2FkZC1jbGllbnQtcm9sZXMvYWRkLWNsaWVudC1yb2xlcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgVmlld0NsaWVudFJvbGVzQ29tcG9uZW50IH0gZnJvbSAnLi9vYXV0aC1zdGFydGVyLWNsaWVudC92aWV3LWNsaWVudC1yb2xlcy92aWV3LWNsaWVudC1yb2xlcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2hvd1Rva2VuQ29tcG9uZW50IH0gZnJvbSAnLi9vYXV0aC1zdGFydGVyLWNsaWVudC9zaG93LXRva2VuL3Nob3ctdG9rZW4uY29tcG9uZW50JztcbmltcG9ydCB7IENyZWF0ZUNsaWVudENvbXBvbmVudCB9IGZyb20gJy4vb2F1dGgtc3RhcnRlci1jbGllbnQvY3JlYXRlLWNsaWVudC9jcmVhdGUtY2xpZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPYXV0aFN0YXJ0ZXJBcHBsaWNhdGlvblJlc291cmNlQ29tcG9uZW50IH0gZnJvbSAnLi9vYXV0aC1zdGFydGVyLWFwcGxpY2F0aW9uLXJlc291cmNlL29hdXRoLXN0YXJ0ZXItYXBwbGljYXRpb24tcmVzb3VyY2UuY29tcG9uZW50JztcbmltcG9ydCB7IERlbGV0ZUFwcGxpY2F0aW9uUmVzb3VyY2VDb21wb25lbnQgfSBmcm9tICcuL29hdXRoLXN0YXJ0ZXItYXBwbGljYXRpb24tcmVzb3VyY2UvZGVsZXRlLWFwcGxpY2F0aW9uLXJlc291cmNlL2RlbGV0ZS1hcHBsaWNhdGlvbi1yZXNvdXJjZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQXBwbGljYXRpb25PcHRpb25zQ29tcG9uZW50IH0gZnJvbSAnLi9vYXV0aC1zdGFydGVyLWFwcGxpY2F0aW9uLXJlc291cmNlL2FwcGxpY2F0aW9uLW9wdGlvbnMvYXBwbGljYXRpb24tb3B0aW9ucy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ3JlYXRlQXBwbGljYXRpb25SZXNvdXJjZUNvbXBvbmVudCB9IGZyb20gJy4vb2F1dGgtc3RhcnRlci1hcHBsaWNhdGlvbi1yZXNvdXJjZS9jcmVhdGUtYXBwbGljYXRpb24tcmVzb3VyY2UvY3JlYXRlLWFwcGxpY2F0aW9uLXJlc291cmNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDaGFuZ2VQYXNzd29yZENvbXBvbmVudCB9IGZyb20gJy4vb2F1dGgtc3RhcnRlci11c2VyLXByb2ZpbGUvY2hhbmdlLXBhc3N3b3JkL2NoYW5nZS1wYXNzd29yZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2hvd05ld1Rva2VuQ29tcG9uZW50IH0gZnJvbSAnLi9vYXV0aC1zdGFydGVyLWNsaWVudC9zaG93LW5ldy10b2tlbi9zaG93LW5ldy10b2tlbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2hvd1NlY3JldENvbXBvbmVudCB9IGZyb20gJy4vb2F1dGgtc3RhcnRlci1jbGllbnQvc2hvdy1zZWNyZXQvc2hvdy1zZWNyZXQuY29tcG9uZW50JztcbmltcG9ydCB7IFJldm9rZVRva2VuQ29tcG9uZW50IH0gZnJvbSAnLi9vYXV0aC1zdGFydGVyLWNsaWVudC9yZXZva2UtdG9rZW4vcmV2b2tlLXRva2VuLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE5vZGVib290T2F1dGgyU3RhcnRlckNvbXBvbmVudCxcbiAgICBPYXV0aFN0YXJ0ZXJVc2Vyc0NvbXBvbmVudCxcbiAgICBPYXV0aFN0YXJ0ZXJVc2VyUHJvZmlsZUNvbXBvbmVudCxcbiAgICBWaWV3VXNlclJvbGVzQ29tcG9uZW50LFxuICAgIENyZWF0ZVVzZXJDb21wb25lbnQsXG4gICAgVXBkYXRlVXNlckNvbXBvbmVudCxcbiAgICBEZWxldGVVc2VyQ29tcG9uZW50LFxuICAgIEFkZFVzZXJSb2xlc0NvbXBvbmVudCxcbiAgICBPYXV0aFN0YXJ0ZXJSb2xlc0NvbXBvbmVudCxcbiAgICBEZWxldGVSb2xlQ29tcG9uZW50LFxuICAgIE9wdGlvbnNDb21wb25lbnQsXG4gICAgQ3JlYXRlUm9sZUNvbXBvbmVudCxcbiAgICBPYXV0aFN0YXJ0ZXJDbGllbnRDb21wb25lbnQsXG4gICAgRGVsZXRlQ2xpZW50Q29tcG9uZW50LFxuICAgIFVwZGF0ZUNsaWVudENvbXBvbmVudCxcbiAgICBBZGRDbGllbnRSb2xlc0NvbXBvbmVudCxcbiAgICBWaWV3Q2xpZW50Um9sZXNDb21wb25lbnQsXG4gICAgU2hvd1Rva2VuQ29tcG9uZW50LFxuICAgIENyZWF0ZUNsaWVudENvbXBvbmVudCxcbiAgICBDaGFuZ2VQYXNzd29yZENvbXBvbmVudCxcbiAgICBPYXV0aFN0YXJ0ZXJBcHBsaWNhdGlvblJlc291cmNlQ29tcG9uZW50LFxuICAgIERlbGV0ZUFwcGxpY2F0aW9uUmVzb3VyY2VDb21wb25lbnQsXG4gICAgQXBwbGljYXRpb25PcHRpb25zQ29tcG9uZW50LFxuICAgIENyZWF0ZUFwcGxpY2F0aW9uUmVzb3VyY2VDb21wb25lbnQsXG4gICAgU2hvd05ld1Rva2VuQ29tcG9uZW50LFxuICAgIFNob3dTZWNyZXRDb21wb25lbnQsXG4gICAgUmV2b2tlVG9rZW5Db21wb25lbnQsXG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgICBMaWJyYXJ5TWF0ZXJpYWxzLFxuICAgIEh0dHBDbGllbnRNb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgQ2xpcGJvYXJkTW9kdWxlLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTm9kZWJvb3RPYXV0aDJTdGFydGVyQ29tcG9uZW50LFxuICAgIE9hdXRoU3RhcnRlclVzZXJzQ29tcG9uZW50LFxuICAgIE9hdXRoU3RhcnRlclVzZXJQcm9maWxlQ29tcG9uZW50LFxuICAgIE9hdXRoU3RhcnRlclJvbGVzQ29tcG9uZW50LFxuICAgIE9hdXRoU3RhcnRlckNsaWVudENvbXBvbmVudCxcbiAgICBPYXV0aFN0YXJ0ZXJBcHBsaWNhdGlvblJlc291cmNlQ29tcG9uZW50LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBOb2RlYm9vdE9hdXRoMlN0YXJ0ZXJNb2R1bGUge31cbiJdfQ==