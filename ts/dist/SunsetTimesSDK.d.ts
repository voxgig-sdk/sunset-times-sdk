import { SunriseAndSunsetEntity } from './entity/SunriseAndSunsetEntity';
export type * from './SunsetTimesTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { SunsetTimesEntityBase } from './SunsetTimesEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
declare class SunsetTimesSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    SunriseAndSunset(entopts?: Record<string, any>): SunriseAndSunsetEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): SunsetTimesSDK;
    tester(testopts?: any, sdkopts?: any): SunsetTimesSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof SunsetTimesSDK;
export { stdutil, config, BaseFeature, SunsetTimesEntityBase, SunsetTimesSDK, SDK, };
export type { DirectResult };
