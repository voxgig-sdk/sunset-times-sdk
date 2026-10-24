"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "sunrise_and_sunset",
        "accessor": "SunriseAndSunset",
        "op": "load",
        "method": "GET",
        "path": "/json",
        "args": [],
        "select": {
            "lat": 36.72016,
            "lng": -4.42034,
            "callback": "v1",
            "date": "2026-02-15",
            "formatted": 1,
            "tzid": "UTC"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "lat",
            "lng",
            "date",
            "callback",
            "formatted",
            "tzid"
        ],
        "queryArgs": [
            {
                "name": "callback",
                "wire": "callback"
            },
            {
                "name": "date",
                "wire": "date"
            },
            {
                "name": "formatted",
                "wire": "formatted"
            },
            {
                "name": "lat",
                "wire": "lat"
            },
            {
                "name": "lng",
                "wire": "lng"
            },
            {
                "name": "tzid",
                "wire": "tzid"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "results": {
                "sunrise": "7:27:02 AM",
                "sunset": "5:05:55 PM",
                "solar_noon": "12:16:28 PM",
                "day_length": "9:38:53",
                "civil_twilight_begin": "6:58:14 AM",
                "civil_twilight_end": "5:34:43 PM",
                "nautical_twilight_begin": "6:25:47 AM",
                "nautical_twilight_end": "6:07:10 PM",
                "astronomical_twilight_begin": "5:54:14 AM",
                "astronomical_twilight_end": "6:38:43 PM"
            },
            "status": "OK",
            "tzid": "UTC"
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map