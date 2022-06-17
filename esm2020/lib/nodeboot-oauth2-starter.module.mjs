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
NodebootOauth2StarterModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.2", ngImport: i0, type: NodebootOauth2StarterModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NodebootOauth2StarterModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.0.2", ngImport: i0, type: NodebootOauth2StarterModule, declarations: [NodebootOauth2StarterComponent,
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
NodebootOauth2StarterModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.0.2", ngImport: i0, type: NodebootOauth2StarterModule, imports: [LibraryMaterials,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        ClipboardModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.2", ngImport: i0, type: NodebootOauth2StarterModule, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZWJvb3Qtb2F1dGgyLXN0YXJ0ZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbm9kZWJvb3Qtb2F1dGgyLXN0YXJ0ZXIvc3JjL2xpYi9ub2RlYm9vdC1vYXV0aDItc3RhcnRlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seURBQXlELENBQUM7QUFDOUYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seURBQXlELENBQUM7QUFDOUYsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUNyRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHFEQUFxRCxDQUFDO0FBQ2pHLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGlFQUFpRSxDQUFDO0FBQ3pHLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlEQUF5RCxDQUFDO0FBQzlGLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLCtEQUErRCxDQUFDO0FBQ3RHLE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLG1FQUFtRSxDQUFDO0FBQ3JILE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEQsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0scURBQXFELENBQUM7QUFDakcsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1B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Qzt3QkFDbEMscUJBQXFCO3dCQUNyQixtQkFBbUI7d0JBQ25CLG9CQUFvQjtxQkFDckI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLGdCQUFnQjt3QkFDaEIsZ0JBQWdCO3dCQUNoQixXQUFXO3dCQUNYLG1CQUFtQjt3QkFDbkIsWUFBWTt3QkFDWixlQUFlO3FCQUNoQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsOEJBQThCO3dCQUM5QiwwQkFBMEI7d0JBQzFCLGdDQUFnQzt3QkFDaEMsMEJBQTBCO3dCQUMxQiwyQkFBMkI7d0JBQzNCLHdDQUF3QztxQkFDekM7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEZWxldGVVc2VyQ29tcG9uZW50IH0gZnJvbSAnLi9vYXV0aC1zdGFydGVyLXVzZXJzL2RlbGV0ZS11c2VyL2RlbGV0ZS11c2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVcGRhdGVVc2VyQ29tcG9uZW50IH0gZnJvbSAnLi9vYXV0aC1zdGFydGVyLXVzZXJzL3VwZGF0ZS11c2VyL3VwZGF0ZS11c2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTm9kZWJvb3RPYXV0aDJTdGFydGVyQ29tcG9uZW50IH0gZnJvbSAnLi9ub2RlYm9vdC1vYXV0aDItc3RhcnRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTGlicmFyeU1hdGVyaWFscyB9IGZyb20gJy4vbWF0ZXJpYWwubW9kdWxlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBPYXV0aFN0YXJ0ZXJVc2Vyc0NvbXBvbmVudCB9IGZyb20gJy4vb2F1dGgtc3RhcnRlci11c2Vycy9vYXV0aC1zdGFydGVyLXVzZXJzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBWaWV3VXNlclJvbGVzQ29tcG9uZW50IH0gZnJvbSAnLi9vYXV0aC1zdGFydGVyLXVzZXJzL3ZpZXctdXNlci1yb2xlcy92aWV3LXVzZXItcm9sZXMuY29tcG9uZW50JztcbmltcG9ydCB7IENyZWF0ZVVzZXJDb21wb25lbnQgfSBmcm9tICcuL29hdXRoLXN0YXJ0ZXItdXNlcnMvY3JlYXRlLXVzZXIvY3JlYXRlLXVzZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEFkZFVzZXJSb2xlc0NvbXBvbmVudCB9IGZyb20gJy4vb2F1dGgtc3RhcnRlci11c2Vycy9hZGQtdXNlci1yb2xlcy9hZGQtdXNlci1yb2xlcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgT2F1dGhTdGFydGVyVXNlclByb2ZpbGVDb21wb25lbnQgfSBmcm9tICcuL29hdXRoLXN0YXJ0ZXItdXNlci1wcm9maWxlL29hdXRoLXN0YXJ0ZXItdXNlci1wcm9maWxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDbGlwYm9hcmRNb2R1bGUgfSBmcm9tICduZ3gtY2xpcGJvYXJkJztcbmltcG9ydCB7IE9hdXRoU3RhcnRlclJvbGVzQ29tcG9uZW50IH0gZnJvbSAnLi9vYXV0aC1zdGFydGVyLXJvbGVzL29hdXRoLXN0YXJ0ZXItcm9sZXMuY29tcG9uZW50JztcbmltcG9ydCB7IERlbGV0ZVJvbGVDb21wb25lbnQgfSBmcm9tICcuL29hdXRoLXN0YXJ0ZXItcm9sZXMvZGVsZXRlLXJvbGUvZGVsZXRlLXJvbGUuY29tcG9uZW50JztcbmltcG9ydCB7IE9wdGlvbnNDb21wb25lbnQgfSBmcm9tICcuL29hdXRoLXN0YXJ0ZXItcm9sZXMvb3B0aW9ucy9vcHRpb25zLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDcmVhdGVSb2xlQ29tcG9uZW50IH0gZnJvbSAnLi9vYXV0aC1zdGFydGVyLXJvbGVzL2NyZWF0ZS1yb2xlL2NyZWF0ZS1yb2xlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPYXV0aFN0YXJ0ZXJDbGllbnRDb21wb25lbnQgfSBmcm9tICcuL29hdXRoLXN0YXJ0ZXItY2xpZW50L29hdXRoLXN0YXJ0ZXItY2xpZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWxldGVDbGllbnRDb21wb25lbnQgfSBmcm9tICcuL29hdXRoLXN0YXJ0ZXItY2xpZW50L2RlbGV0ZS1jbGllbnQvZGVsZXRlLWNsaWVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVXBkYXRlQ2xpZW50Q29tcG9uZW50IH0gZnJvbSAnLi9vYXV0aC1zdGFydGVyLWNsaWVudC91cGRhdGUtY2xpZW50L3VwZGF0ZS1jbGllbnQuY29tcG9uZW50JztcbmltcG9ydCB7IEFkZENsaWVudFJvbGVzQ29tcG9uZW50IH0gZnJvbSAnLi9vYXV0aC1zdGFydGVyLWNsaWVudC9hZGQtY2xpZW50LXJvbGVzL2FkZC1jbGllbnQtcm9sZXMuY29tcG9uZW50JztcbmltcG9ydCB7IFZpZXdDbGllbnRSb2xlc0NvbXBvbmVudCB9IGZyb20gJy4vb2F1dGgtc3RhcnRlci1jbGllbnQvdmlldy1jbGllbnQtcm9sZXMvdmlldy1jbGllbnQtcm9sZXMuY29tcG9uZW50JztcbmltcG9ydCB7IFNob3dUb2tlbkNvbXBvbmVudCB9IGZyb20gJy4vb2F1dGgtc3RhcnRlci1jbGllbnQvc2hvdy10b2tlbi9zaG93LXRva2VuLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDcmVhdGVDbGllbnRDb21wb25lbnQgfSBmcm9tICcuL29hdXRoLXN0YXJ0ZXItY2xpZW50L2NyZWF0ZS1jbGllbnQvY3JlYXRlLWNsaWVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgT2F1dGhTdGFydGVyQXBwbGljYXRpb25SZXNvdXJjZUNvbXBvbmVudCB9IGZyb20gJy4vb2F1dGgtc3RhcnRlci1hcHBsaWNhdGlvbi1yZXNvdXJjZS9vYXV0aC1zdGFydGVyLWFwcGxpY2F0aW9uLXJlc291cmNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWxldGVBcHBsaWNhdGlvblJlc291cmNlQ29tcG9uZW50IH0gZnJvbSAnLi9vYXV0aC1zdGFydGVyLWFwcGxpY2F0aW9uLXJlc291cmNlL2RlbGV0ZS1hcHBsaWNhdGlvbi1yZXNvdXJjZS9kZWxldGUtYXBwbGljYXRpb24tcmVzb3VyY2UuY29tcG9uZW50JztcbmltcG9ydCB7IEFwcGxpY2F0aW9uT3B0aW9uc0NvbXBvbmVudCB9IGZyb20gJy4vb2F1dGgtc3RhcnRlci1hcHBsaWNhdGlvbi1yZXNvdXJjZS9hcHBsaWNhdGlvbi1vcHRpb25zL2FwcGxpY2F0aW9uLW9wdGlvbnMuY29tcG9uZW50JztcbmltcG9ydCB7IENyZWF0ZUFwcGxpY2F0aW9uUmVzb3VyY2VDb21wb25lbnQgfSBmcm9tICcuL29hdXRoLXN0YXJ0ZXItYXBwbGljYXRpb24tcmVzb3VyY2UvY3JlYXRlLWFwcGxpY2F0aW9uLXJlc291cmNlL2NyZWF0ZS1hcHBsaWNhdGlvbi1yZXNvdXJjZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2hhbmdlUGFzc3dvcmRDb21wb25lbnQgfSBmcm9tICcuL29hdXRoLXN0YXJ0ZXItdXNlci1wcm9maWxlL2NoYW5nZS1wYXNzd29yZC9jaGFuZ2UtcGFzc3dvcmQuY29tcG9uZW50JztcbmltcG9ydCB7IFNob3dOZXdUb2tlbkNvbXBvbmVudCB9IGZyb20gJy4vb2F1dGgtc3RhcnRlci1jbGllbnQvc2hvdy1uZXctdG9rZW4vc2hvdy1uZXctdG9rZW4uY29tcG9uZW50JztcbmltcG9ydCB7IFNob3dTZWNyZXRDb21wb25lbnQgfSBmcm9tICcuL29hdXRoLXN0YXJ0ZXItY2xpZW50L3Nob3ctc2VjcmV0L3Nob3ctc2VjcmV0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSZXZva2VUb2tlbkNvbXBvbmVudCB9IGZyb20gJy4vb2F1dGgtc3RhcnRlci1jbGllbnQvcmV2b2tlLXRva2VuL3Jldm9rZS10b2tlbi5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOb2RlYm9vdE9hdXRoMlN0YXJ0ZXJDb21wb25lbnQsXG4gICAgT2F1dGhTdGFydGVyVXNlcnNDb21wb25lbnQsXG4gICAgT2F1dGhTdGFydGVyVXNlclByb2ZpbGVDb21wb25lbnQsXG4gICAgVmlld1VzZXJSb2xlc0NvbXBvbmVudCxcbiAgICBDcmVhdGVVc2VyQ29tcG9uZW50LFxuICAgIFVwZGF0ZVVzZXJDb21wb25lbnQsXG4gICAgRGVsZXRlVXNlckNvbXBvbmVudCxcbiAgICBBZGRVc2VyUm9sZXNDb21wb25lbnQsXG4gICAgT2F1dGhTdGFydGVyUm9sZXNDb21wb25lbnQsXG4gICAgRGVsZXRlUm9sZUNvbXBvbmVudCxcbiAgICBPcHRpb25zQ29tcG9uZW50LFxuICAgIENyZWF0ZVJvbGVDb21wb25lbnQsXG4gICAgT2F1dGhTdGFydGVyQ2xpZW50Q29tcG9uZW50LFxuICAgIERlbGV0ZUNsaWVudENvbXBvbmVudCxcbiAgICBVcGRhdGVDbGllbnRDb21wb25lbnQsXG4gICAgQWRkQ2xpZW50Um9sZXNDb21wb25lbnQsXG4gICAgVmlld0NsaWVudFJvbGVzQ29tcG9uZW50LFxuICAgIFNob3dUb2tlbkNvbXBvbmVudCxcbiAgICBDcmVhdGVDbGllbnRDb21wb25lbnQsXG4gICAgQ2hhbmdlUGFzc3dvcmRDb21wb25lbnQsXG4gICAgT2F1dGhTdGFydGVyQXBwbGljYXRpb25SZXNvdXJjZUNvbXBvbmVudCxcbiAgICBEZWxldGVBcHBsaWNhdGlvblJlc291cmNlQ29tcG9uZW50LFxuICAgIEFwcGxpY2F0aW9uT3B0aW9uc0NvbXBvbmVudCxcbiAgICBDcmVhdGVBcHBsaWNhdGlvblJlc291cmNlQ29tcG9uZW50LFxuICAgIFNob3dOZXdUb2tlbkNvbXBvbmVudCxcbiAgICBTaG93U2VjcmV0Q29tcG9uZW50LFxuICAgIFJldm9rZVRva2VuQ29tcG9uZW50LFxuICBdLFxuICBpbXBvcnRzOiBbXG4gICAgTGlicmFyeU1hdGVyaWFscyxcbiAgICBIdHRwQ2xpZW50TW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIENsaXBib2FyZE1vZHVsZSxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIE5vZGVib290T2F1dGgyU3RhcnRlckNvbXBvbmVudCxcbiAgICBPYXV0aFN0YXJ0ZXJVc2Vyc0NvbXBvbmVudCxcbiAgICBPYXV0aFN0YXJ0ZXJVc2VyUHJvZmlsZUNvbXBvbmVudCxcbiAgICBPYXV0aFN0YXJ0ZXJSb2xlc0NvbXBvbmVudCxcbiAgICBPYXV0aFN0YXJ0ZXJDbGllbnRDb21wb25lbnQsXG4gICAgT2F1dGhTdGFydGVyQXBwbGljYXRpb25SZXNvdXJjZUNvbXBvbmVudCxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTm9kZWJvb3RPYXV0aDJTdGFydGVyTW9kdWxlIHt9XG4iXX0=