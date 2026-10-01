"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('SunriseAndSunsetEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when SUNSET_TIMES_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('SUNSET_TIMES_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.SunsetTimesSDK.test();
        const ent = testsdk.SunriseAndSunset();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.SUNSET_TIMES_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'sunrise_and_sunset.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "results": { "a": true, "h": "Results", "n": "results", "r": false, "t": "`$OBJECT`", "key$": "results", "index$": 0 }, "status": { "a": true, "h": "Status", "n": "status", "r": false, "t": "`$STRING`", "key$": "status", "index$": 1 }, "tzid": { "a": true, "h": "Tzid", "n": "tzid", "r": false, "t": "`$STRING`", "key$": "tzid", "index$": 2 } }, "name": "sunrise_and_sunset", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /json", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "callback", "or": "callback", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "2026-02-15", "k": "query", "n": "date", "or": "date", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": 1, "k": "query", "n": "formatted", "or": "formatted", "r": false, "t": "`$INTEGER`", "index$": 2 }, { "a": true, "ex": 36.72016, "k": "query", "n": "lat", "or": "lat", "r": true, "t": "`$NUMBER`", "index$": 3 }, { "a": true, "ex": -4.42034, "k": "query", "n": "lng", "or": "lng", "r": true, "t": "`$NUMBER`", "index$": 4 }, { "a": true, "ex": "UTC", "k": "query", "n": "tzid", "or": "tzid", "r": false, "t": "`$STRING`", "index$": 5 }] }, "k": "http", "m": "GET", "o": "/json", "q": { "exist": ["callback", "date", "formatted", "lat", "lng", "tzid"] }, "r": {}, "s": [{ "lit": "json" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "sunrise_and_sunset", "name__orig": "sunrise_and_sunset", "Name": "SunriseAndSunset", "name_": "sunrise_and_sunset", "name-": "sunrise-and-sunset", "NAME": "SUNRISE_AND_SUNSET", "index$": 0 }, { "active": true, "entity": "sunrise_and_sunset", "key$": "BasicSunriseAndSunsetFlow", "kind": "basic", "name": "BasicSunriseAndSunsetFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "sunrise_and_sunset_ref01", "srcdatavar": "sunrise_and_sunset_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-sunrise_and_sunset_ref01" } }], "index$": 0 }] }, 'SunriseAndSunset', { "GET /json": { "protocol": "http", "parameters": [{ "name": "lat", "in": "query", "description": "Latitude in decimal degrees", "required": true, "schema": { "type": "number", "format": "float", "minimum": -90, "maximum": 90 }, "example": 36.72016, "index$": 0 }, { "name": "lng", "in": "query", "description": "Longitude in decimal degrees", "required": true, "schema": { "type": "number", "format": "float", "minimum": -180, "maximum": 180 }, "example": -4.42034, "index$": 1 }, { "name": "date", "in": "query", "description": "Date in YYYY-MM-DD format. Also accepts other date formats and relative date formats (e.g., 'today'). Defaults to current date if not provided.", "required": false, "schema": { "type": "string" }, "examples": { "specific": { "value": "2026-02-15", "summary": "Specific date" }, "today": { "value": "today", "summary": "Today's date" } }, "index$": 2 }, { "name": "callback", "in": "query", "description": "Callback function name for JSONP response", "required": false, "schema": { "type": "string" }, "index$": 3 }, { "name": "formatted", "in": "query", "description": "0 or 1 (1 is default). When set to 0, time values will be expressed in ISO 8601 format and day_length will be in seconds.", "required": false, "schema": { "type": "integer", "enum": [0, 1], "default": 1 }, "index$": 4 }, { "name": "tzid", "in": "query", "description": "A timezone identifier (e.g., UTC, Africa/Lagos, Asia/Hong_Kong, Europe/Lisbon). If provided, times in the response will be referenced to the given timezone.", "required": false, "schema": { "type": "string" }, "examples": { "utc": { "value": "UTC", "summary": "UTC timezone" }, "europe": { "value": "Europe/Lisbon", "summary": "Lisbon timezone" }, "asia": { "value": "Asia/Hong_Kong", "summary": "Hong Kong timezone" } }, "index$": 5 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let sunrise_and_sunset_ref01_data = Object.values(setup.data.existing.sunrise_and_sunset)[0];
        // LOAD
        const sunrise_and_sunset_ref01_ent = client.SunriseAndSunset();
        const sunrise_and_sunset_ref01_match_dt0 = {};
        const sunrise_and_sunset_ref01_data_dt0 = (await sunrise_and_sunset_ref01_ent.load(sunrise_and_sunset_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != sunrise_and_sunset_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/sunrise_and_sunset/SunriseAndSunsetTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.SunsetTimesSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['sunrise_and_sunset01', 'sunrise_and_sunset02', 'sunrise_and_sunset03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'SUNSET_TIMES_TEST_SUNRISE_AND_SUNSET_ENTID': idmap,
        'SUNSET_TIMES_TEST_LIVE': 'FALSE',
        'SUNSET_TIMES_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['SUNSET_TIMES_TEST_SUNRISE_AND_SUNSET_ENTID'];
    const live = 'TRUE' === env.SUNSET_TIMES_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['SUNSET_TIMES_TEST_SUNRISE_AND_SUNSET_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.SunsetTimesSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.SUNSET_TIMES_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=SunriseAndSunsetEntity.test.js.map