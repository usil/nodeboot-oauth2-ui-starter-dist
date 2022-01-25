import { OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NodebootOauth2StarterService, User } from '../../nodeboot-oauth2-starter.service';
import * as i0 from "@angular/core";
export declare class ChangePasswordComponent implements OnInit {
    private formBuilder;
    dialogRef: MatDialogRef<ChangePasswordComponent>;
    private nbService;
    user: User;
    changePasswordForm: FormGroup;
    errorMessage: string;
    hideNewPassword: boolean;
    hideOldPassword: boolean;
    constructor(formBuilder: FormBuilder, dialogRef: MatDialogRef<ChangePasswordComponent>, nbService: NodebootOauth2StarterService, user: User);
    ngOnInit(): void;
    closeDialog(): void;
    changePassword(updatePasswordData: {
        oldPassword: string;
        newPassword: string;
    }): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ChangePasswordComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ChangePasswordComponent, "lib-change-password", never, {}, {}, never, never>;
}
