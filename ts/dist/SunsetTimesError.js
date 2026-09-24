"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SunsetTimesError = void 0;
class SunsetTimesError extends Error {
    isSunsetTimesError = true;
    sdk = 'SunsetTimes';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.SunsetTimesError = SunsetTimesError;
//# sourceMappingURL=SunsetTimesError.js.map