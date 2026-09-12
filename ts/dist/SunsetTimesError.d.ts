import { Context } from './Context';
declare class SunsetTimesError extends Error {
    isSunsetTimesError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { SunsetTimesError };
