"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'SunsetTimes',
        slug: "sunset-times",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://api.sunrise-sunset.org",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            sunrise_and_sunset: {},
        }
    };
    entity = {
        "sunrise_and_sunset": {
            "fields": [
                {
                    "name": "results",
                    "title": "Results",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "status",
                    "title": "Status",
                    "type": "`$STRING`"
                },
                {
                    "name": "tzid",
                    "title": "Tzid",
                    "type": "`$STRING`"
                }
            ],
            "name": "sunrise_and_sunset",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/json",
                            "segments": [
                                {
                                    "lit": "json"
                                }
                            ],
                            "parts": [
                                "json"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "callback",
                                        "orig": "callback",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "date",
                                        "orig": "date",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "2026-02-15"
                                    },
                                    {
                                        "name": "formatted",
                                        "orig": "formatted",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 1
                                    },
                                    {
                                        "name": "lat",
                                        "orig": "lat",
                                        "type": "`$NUMBER`",
                                        "kind": "query",
                                        "reqd": true,
                                        "example": 36.72016
                                    },
                                    {
                                        "name": "lng",
                                        "orig": "lng",
                                        "type": "`$NUMBER`",
                                        "kind": "query",
                                        "reqd": true,
                                        "example": -4.42034
                                    },
                                    {
                                        "name": "tzid",
                                        "orig": "tzid",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "UTC"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "callback",
                                    "date",
                                    "formatted",
                                    "lat",
                                    "lng",
                                    "tzid"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map