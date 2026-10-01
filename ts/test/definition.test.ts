import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "sunrise_and_sunset",
    "accessor": "SunriseAndSunset",
    "op": "load",
    "method": "GET",
    "path": "/json",
    "args": [],
    "select": {
      "callback": "v1",
      "date": "v1",
      "formatted": "v1",
      "lat": 36.72016,
      "lng": -4.42034,
      "tzid": "v1"
    },
    "headers": [],
    "query": [
      "lat",
      "lng",
      "date",
      "callback",
      "formatted",
      "tzid"
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
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
