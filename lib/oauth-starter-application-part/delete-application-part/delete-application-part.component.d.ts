import { OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NodebootOauth2StarterService, Part } from '../../nodeboot-oauth2-starter.service';
import * as i0 from "@angular/core";
export declare class DeleteApplicationPartComponent implements OnInit {
    dialogRef: MatDialogRef<DeleteApplicationPartComponent>;
    private nbService;
    part: Part;
    errorMessage: string;
    loadingResult: boolean;
    constructor(dialogRef: MatDialogRef<DeleteApplicationPartComponent>, nbService: NodebootOauth2StarterService, part: Part);
    ngOnInit(): void;
    delete(): void;
    closeDialog(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DeleteApplicationPartComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DeleteApplicationPartComponent, "lib-delete-application-part", never, {}, {}, never, never>;
}
