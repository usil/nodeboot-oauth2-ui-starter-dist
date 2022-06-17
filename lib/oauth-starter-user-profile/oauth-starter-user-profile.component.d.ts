import { NodebootOauth2StarterService, User } from './../nodeboot-oauth2-starter.service';
import { OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as i0 from "@angular/core";
export declare class OauthStarterUserProfileComponent implements OnInit {
    private nbService;
    dialog: MatDialog;
    user: User;
    constructor(nbService: NodebootOauth2StarterService, dialog: MatDialog);
    ngOnInit(): void;
    openChangePasswordDialog(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<OauthStarterUserProfileComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OauthStarterUserProfileComponent, "lib-oauth-starter-user-profile", never, {}, {}, never, never, false>;
}
