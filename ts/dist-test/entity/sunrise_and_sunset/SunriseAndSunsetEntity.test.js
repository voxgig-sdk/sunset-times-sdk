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
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "results", "req": false, "type": "`$OBJECT`", "index$": 0 }, { "active": true, "name": "status", "req": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "tzid", "req": false, "type": "`$STRING`", "index$": 2 }], "name": "sunrise_and_sunset", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "callback", "orig": "callback", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "example": "2026-02-15", "kind": "query", "name": "date", "orig": "date", "reqd": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "example": 1, "kind": "query", "name": "formatted", "orig": "formatted", "reqd": false, "type": "`$INTEGER`", "index$": 2 }, { "active": true, "example": 36.72016, "kind": "query", "name": "lat", "orig": "lat", "reqd": true, "type": "`$NUMBER`", "index$": 3 }, { "active": true, "example": -4.42034, "kind": "query", "name": "lng", "orig": "lng", "reqd": true, "type": "`$NUMBER`", "index$": 4 }, { "active": true, "example": "UTC", "kind": "query", "name": "tzid", "orig": "tzid", "reqd": false, "type": "`$STRING`", "index$": 5 }] }, "contract": { "id": "GET /json", "json": "{\"operationId\":\"getSunriseSunset\",\"parameters\":[{\"description\":\"Latitude in decimal degrees\",\"example\":36.72016,\"in\":\"query\",\"name\":\"lat\",\"required\":true,\"schema\":{\"format\":\"float\",\"maximum\":90,\"minimum\":-90,\"type\":\"number\"}},{\"description\":\"Longitude in decimal degrees\",\"example\":-4.42034,\"in\":\"query\",\"name\":\"lng\",\"required\":true,\"schema\":{\"format\":\"float\",\"maximum\":180,\"minimum\":-180,\"type\":\"number\"}},{\"description\":\"Date in YYYY-MM-DD format. Also accepts other date formats and relative date formats (e.g., 'today'). Defaults to current date if not provided.\",\"examples\":{\"specific\":{\"summary\":\"Specific date\",\"value\":\"2026-02-15\"},\"today\":{\"summary\":\"Today's date\",\"value\":\"today\"}},\"in\":\"query\",\"name\":\"date\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Callback function name for JSONP response\",\"in\":\"query\",\"name\":\"callback\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"0 or 1 (1 is default). When set to 0, time values will be expressed in ISO 8601 format and day_length will be in seconds.\",\"in\":\"query\",\"name\":\"formatted\",\"required\":false,\"schema\":{\"default\":1,\"enum\":[0,1],\"type\":\"integer\"}},{\"description\":\"A timezone identifier (e.g., UTC, Africa/Lagos, Asia/Hong_Kong, Europe/Lisbon). If provided, times in the response will be referenced to the given timezone.\",\"examples\":{\"asia\":{\"summary\":\"Hong Kong timezone\",\"value\":\"Asia/Hong_Kong\"},\"europe\":{\"summary\":\"Lisbon timezone\",\"value\":\"Europe/Lisbon\"},\"utc\":{\"summary\":\"UTC timezone\",\"value\":\"UTC\"}},\"in\":\"query\",\"name\":\"tzid\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"formatted\":{\"summary\":\"Formatted response (default)\",\"value\":{\"results\":{\"astronomical_twilight_begin\":\"5:54:14 AM\",\"astronomical_twilight_end\":\"6:38:43 PM\",\"civil_twilight_begin\":\"6:58:14 AM\",\"civil_twilight_end\":\"5:34:43 PM\",\"day_length\":\"9:38:53\",\"nautical_twilight_begin\":\"6:25:47 AM\",\"nautical_twilight_end\":\"6:07:10 PM\",\"solar_noon\":\"12:16:28 PM\",\"sunrise\":\"7:27:02 AM\",\"sunset\":\"5:05:55 PM\"},\"status\":\"OK\",\"tzid\":\"UTC\"}},\"invalidDate\":{\"summary\":\"Invalid date parameter\",\"value\":{\"results\":{},\"status\":\"INVALID_DATE\"}},\"invalidRequest\":{\"summary\":\"Invalid request (missing or invalid lat/lng)\",\"value\":{\"results\":{},\"status\":\"INVALID_REQUEST\"}},\"invalidTzid\":{\"summary\":\"Invalid timezone identifier\",\"value\":{\"results\":{\"astronomical_twilight_begin\":\"5:54:14 AM\",\"astronomical_twilight_end\":\"6:38:43 PM\",\"civil_twilight_begin\":\"6:58:14 AM\",\"civil_twilight_end\":\"5:34:43 PM\",\"day_length\":\"9:38:53\",\"nautical_twilight_begin\":\"6:25:47 AM\",\"nautical_twilight_end\":\"6:07:10 PM\",\"solar_noon\":\"12:16:28 PM\",\"sunrise\":\"7:27:02 AM\",\"sunset\":\"5:05:55 PM\"},\"status\":\"INVALID_TZID\",\"tzid\":\"UTC\"}},\"unformatted\":{\"summary\":\"Unformatted response (formatted=0)\",\"value\":{\"results\":{\"astronomical_twilight_begin\":\"2015-05-21T03:20:49+00:00\",\"astronomical_twilight_end\":\"2015-05-21T21:07:45+00:00\",\"civil_twilight_begin\":\"2015-05-21T04:36:17+00:00\",\"civil_twilight_end\":\"2015-05-21T19:52:17+00:00\",\"day_length\":51444,\"nautical_twilight_begin\":\"2015-05-21T04:00:13+00:00\",\"nautical_twilight_end\":\"2015-05-21T20:28:21+00:00\",\"solar_noon\":\"2015-05-21T12:14:17+00:00\",\"sunrise\":\"2015-05-21T05:05:35+00:00\",\"sunset\":\"2015-05-21T19:22:59+00:00\"},\"status\":\"OK\",\"tzid\":\"UTC\"}},\"unknownError\":{\"summary\":\"Server error\",\"value\":{\"results\":{},\"status\":\"UNKNOWN_ERROR\"}}},\"schema\":{\"oneOf\":[{\"properties\":{\"results\":{\"properties\":{\"astronomical_twilight_begin\":{\"description\":\"Astronomical twilight begin time in formatted string\",\"example\":\"5:54:14 AM\",\"type\":\"string\"},\"astronomical_twilight_end\":{\"description\":\"Astronomical twilight end time in formatted string\",\"example\":\"6:38:43 PM\",\"type\":\"string\"},\"civil_twilight_begin\":{\"description\":\"Civil twilight begin time in formatted string\",\"example\":\"6:58:14 AM\",\"type\":\"string\"},\"civil_twilight_end\":{\"description\":\"Civil twilight end time in formatted string\",\"example\":\"5:34:43 PM\",\"type\":\"string\"},\"day_length\":{\"description\":\"Length of the day in formatted string (e.g., '9:38:53')\",\"example\":\"9:38:53\",\"type\":\"string\"},\"nautical_twilight_begin\":{\"description\":\"Nautical twilight begin time in formatted string\",\"example\":\"6:25:47 AM\",\"type\":\"string\"},\"nautical_twilight_end\":{\"description\":\"Nautical twilight end time in formatted string\",\"example\":\"6:07:10 PM\",\"type\":\"string\"},\"solar_noon\":{\"description\":\"Solar noon time in formatted string\",\"example\":\"12:16:28 PM\",\"type\":\"string\"},\"sunrise\":{\"description\":\"Sunrise time in formatted string (e.g., '7:27:02 AM')\",\"example\":\"7:27:02 AM\",\"type\":\"string\"},\"sunset\":{\"description\":\"Sunset time in formatted string (e.g., '5:05:55 PM')\",\"example\":\"5:05:55 PM\",\"type\":\"string\"}},\"type\":\"object\"},\"status\":{\"description\":\"Status of the API request\",\"enum\":[\"OK\",\"INVALID_REQUEST\",\"INVALID_DATE\",\"UNKNOWN_ERROR\",\"INVALID_TZID\"],\"type\":\"string\"},\"tzid\":{\"description\":\"Timezone identifier used for the response times\",\"example\":\"UTC\",\"type\":\"string\"}},\"required\":[\"results\",\"status\"],\"type\":\"object\"},{\"properties\":{\"results\":{\"properties\":{\"astronomical_twilight_begin\":{\"description\":\"Astronomical twilight begin time in ISO 8601 format\",\"example\":\"2015-05-21T03:20:49+00:00\",\"format\":\"date-time\",\"type\":\"string\"},\"astronomical_twilight_end\":{\"description\":\"Astronomical twilight end time in ISO 8601 format\",\"example\":\"2015-05-21T21:07:45+00:00\",\"format\":\"date-time\",\"type\":\"string\"},\"civil_twilight_begin\":{\"description\":\"Civil twilight begin time in ISO 8601 format\",\"example\":\"2015-05-21T04:36:17+00:00\",\"format\":\"date-time\",\"type\":\"string\"},\"civil_twilight_end\":{\"description\":\"Civil twilight end time in ISO 8601 format\",\"example\":\"2015-05-21T19:52:17+00:00\",\"format\":\"date-time\",\"type\":\"string\"},\"day_length\":{\"description\":\"Length of the day in seconds\",\"example\":51444,\"type\":\"integer\"},\"nautical_twilight_begin\":{\"description\":\"Nautical twilight begin time in ISO 8601 format\",\"example\":\"2015-05-21T04:00:13+00:00\",\"format\":\"date-time\",\"type\":\"string\"},\"nautical_twilight_end\":{\"description\":\"Nautical twilight end time in ISO 8601 format\",\"example\":\"2015-05-21T20:28:21+00:00\",\"format\":\"date-time\",\"type\":\"string\"},\"solar_noon\":{\"description\":\"Solar noon time in ISO 8601 format\",\"example\":\"2015-05-21T12:14:17+00:00\",\"format\":\"date-time\",\"type\":\"string\"},\"sunrise\":{\"description\":\"Sunrise time in ISO 8601 format\",\"example\":\"2015-05-21T05:05:35+00:00\",\"format\":\"date-time\",\"type\":\"string\"},\"sunset\":{\"description\":\"Sunset time in ISO 8601 format\",\"example\":\"2015-05-21T19:22:59+00:00\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"},\"status\":{\"description\":\"Status of the API request\",\"enum\":[\"OK\",\"INVALID_REQUEST\",\"INVALID_DATE\",\"UNKNOWN_ERROR\",\"INVALID_TZID\"],\"type\":\"string\"},\"tzid\":{\"description\":\"Timezone identifier used for the response times\",\"example\":\"UTC\",\"type\":\"string\"}},\"required\":[\"results\",\"status\"],\"type\":\"object\"}]}}},\"description\":\"Successful response with sunrise and sunset times\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/json", "segments": [{ "lit": "json" }], "select": { "exist": ["callback", "date", "formatted", "lat", "lng", "tzid"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "sunrise_and_sunset", "name__orig": "sunrise_and_sunset", "Name": "SunriseAndSunset", "name_": "sunrise_and_sunset", "name-": "sunrise-and-sunset", "NAME": "SUNRISE_AND_SUNSET", "index$": 0 }, { "active": true, "entity": "sunrise_and_sunset", "key$": "BasicSunriseAndSunsetFlow", "kind": "basic", "name": "BasicSunriseAndSunsetFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "sunrise_and_sunset_ref01", "srcdatavar": "sunrise_and_sunset_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-sunrise_and_sunset_ref01" } }], "index$": 0 }] }, 'SunriseAndSunset');
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