import { OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import * as i0 from "@angular/core";
export declare class ShowNewTokenComponent implements OnInit {
    dialogRef: MatDialogRef<ShowNewTokenComponent>;
    security: {
        access_token: string;
    };
    hide: boolean;
    errorMessage: string;
    constructor(dialogRef: MatDialogRef<ShowNewTokenComponent>, security: {
        access_token: string;
    });
    ngOnInit(): void;
    closeDialog(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ShowNewTokenComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ShowNewTokenComponent, "lib-show-new-token", never, {}, {}, never, never>;
}
