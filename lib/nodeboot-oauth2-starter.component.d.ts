import { NodebootOauth2StarterService } from './nodeboot-oauth2-starter.service';
import { OnInit } from '@angular/core';
import * as i0 from "@angular/core";
export declare class NodebootOauth2StarterComponent implements OnInit {
    private nbService;
    testTextT: string;
    otherText: string;
    constructor(nbService: NodebootOauth2StarterService);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NodebootOauth2StarterComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NodebootOauth2StarterComponent, "lib-nodeboot-oauth2-starter", never, { "otherText": "otherText"; }, {}, never, never, false>;
}
