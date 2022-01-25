import { OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NodebootOauth2StarterService, User, UserUpdateBody } from '../../nodeboot-oauth2-starter.service';
import * as i0 from "@angular/core";
export declare class UpdateUserComponent implements OnInit {
    private formBuilder;
    dialogRef: MatDialogRef<UpdateUserComponent>;
    private nbService;
    user: User;
    errorMessage: string;
    updateUserForm: FormGroup;
    constructor(formBuilder: FormBuilder, dialogRef: MatDialogRef<UpdateUserComponent>, nbService: NodebootOauth2StarterService, user: User);
    closeDialog(): void;
    updateUser(updateUserData: UserUpdateBody): void;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UpdateUserComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UpdateUserComponent, "lib-update-user", never, {}, {}, never, never>;
}
