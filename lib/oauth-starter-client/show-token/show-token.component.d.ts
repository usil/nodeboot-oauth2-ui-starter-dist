import { OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ClientCreateContent } from '../../nodeboot-oauth2-starter.service';
import * as i0 from "@angular/core";
export declare class ShowTokenComponent implements OnInit {
    dialogRef: MatDialogRef<ShowTokenComponent>;
    clientResult: ClientCreateContent;
    constructor(dialogRef: MatDialogRef<ShowTokenComponent>, clientResult: ClientCreateContent);
    ngOnInit(): void;
    closeDialog(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ShowTokenComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ShowTokenComponent, "lib-show-token", never, {}, {}, never, never>;
}
