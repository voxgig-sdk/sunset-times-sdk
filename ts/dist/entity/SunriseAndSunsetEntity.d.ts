import { SunsetTimesEntityBase } from '../SunsetTimesEntityBase';
import type { SunsetTimesSDK } from '../SunsetTimesSDK';
import type { Control } from '../types';
import type { SunriseAndSunset, SunriseAndSunsetLoadMatch } from '../SunsetTimesTypes';
declare class SunriseAndSunsetEntity extends SunsetTimesEntityBase<SunriseAndSunset> {
    constructor(client: SunsetTimesSDK, entopts: any);
    make(this: SunriseAndSunsetEntity): SunriseAndSunsetEntity;
    load(this: any, reqmatch?: SunriseAndSunsetLoadMatch, ctrl?: Control): Promise<SunriseAndSunsetEntity>;
}
export { SunriseAndSunsetEntity };
