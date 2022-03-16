import { OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NodebootOauth2StarterService, Resource } from '../../nodeboot-oauth2-starter.service';
import * as i0 from "@angular/core";
export declare class DeleteApplicationResourceComponent implements OnInit {
    dialogRef: MatDialogRef<DeleteApplicationResourceComponent>;
    private nbService;
    resource: Resource;
    errorMessage: string;
    loadingResult: boolean;
    constructor(dialogRef: MatDialogRef<DeleteApplicationResourceComponent>, nbService: NodebootOauth2StarterService, resource: Resource);
    ngOnInit(): void;
    delete(): void;
    closeDialog(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DeleteApplicationResourceComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DeleteApplicationResourceComponent, "lib-delete-application-resource", never, {}, {}, never, never>;
}
