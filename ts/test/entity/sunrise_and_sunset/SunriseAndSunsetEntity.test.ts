

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { SunsetTimesSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('SunriseAndSunsetEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when SUNSET_TIMES_TEST_LIVE=TRUE.
  afterEach(liveDelay('SUNSET_TIMES_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = SunsetTimesSDK.test()
    const ent = testsdk.SunriseAndSunset()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.SUNSET_TIMES_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'sunrise_and_sunset.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"results":{"a":true,"h":"Results","n":"results","r":false,"t":"`$OBJECT`","key$":"results","index$":0},"status":{"a":true,"h":"Status","n":"status","r":false,"t":"`$STRING`","key$":"status","index$":1},"tzid":{"a":true,"h":"Tzid","n":"tzid","r":false,"t":"`$STRING`","key$":"tzid","index$":2}},"name":"sunrise_and_sunset","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /json","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"callback","or":"callback","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":"2026-02-15","k":"query","n":"date","or":"date","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":1,"k":"query","n":"formatted","or":"formatted","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"ex":36.72016,"k":"query","n":"lat","or":"lat","r":true,"t":"`$NUMBER`","index$":3},{"a":true,"ex":-4.42034,"k":"query","n":"lng","or":"lng","r":true,"t":"`$NUMBER`","index$":4},{"a":true,"ex":"UTC","k":"query","n":"tzid","or":"tzid","r":false,"t":"`$STRING`","index$":5}]},"k":"http","m":"GET","o":"/json","q":{"exist":["callback","date","formatted","lat","lng","tzid"]},"r":{},"s":[{"lit":"json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"sunrise_and_sunset","name__orig":"sunrise_and_sunset","Name":"SunriseAndSunset","name_":"sunrise_and_sunset","name-":"sunrise-and-sunset","NAME":"SUNRISE_AND_SUNSET","index$":0}, {"active":true,"entity":"sunrise_and_sunset","key$":"BasicSunriseAndSunsetFlow","kind":"basic","name":"BasicSunriseAndSunsetFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"sunrise_and_sunset_ref01","srcdatavar":"sunrise_and_sunset_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-sunrise_and_sunset_ref01"}}],"index$":0}]}, 'SunriseAndSunset', {"GET /json":{"protocol":"http","operationId":"getSunriseSunset","responses":{"200":{"description":"Successful response with sunrise and sunset times","content":{"application/json":{"schema":{"oneOf":[{"type":"object","properties":{"results":{"type":"object","properties":{"sunrise":{"type":"string","description":"Sunrise time in formatted string (e.g., '7:27:02 AM')","example":"7:27:02 AM"},"sunset":{"type":"string","description":"Sunset time in formatted string (e.g., '5:05:55 PM')","example":"5:05:55 PM"},"solar_noon":{"type":"string","description":"Solar noon time in formatted string","example":"12:16:28 PM"},"day_length":{"type":"string","description":"Length of the day in formatted string (e.g., '9:38:53')","example":"9:38:53"},"civil_twilight_begin":{"type":"string","description":"Civil twilight begin time in formatted string","example":"6:58:14 AM"},"civil_twilight_end":{"type":"string","description":"Civil twilight end time in formatted string","example":"5:34:43 PM"},"nautical_twilight_begin":{"type":"string","description":"Nautical twilight begin time in formatted string","example":"6:25:47 AM"},"nautical_twilight_end":{"type":"string","description":"Nautical twilight end time in formatted string","example":"6:07:10 PM"},"astronomical_twilight_begin":{"type":"string","description":"Astronomical twilight begin time in formatted string","example":"5:54:14 AM"},"astronomical_twilight_end":{"type":"string","description":"Astronomical twilight end time in formatted string","example":"6:38:43 PM"}}},"status":{"type":"string","enum":["OK","INVALID_REQUEST","INVALID_DATE","UNKNOWN_ERROR","INVALID_TZID"],"description":"Status of the API request"},"tzid":{"type":"string","description":"Timezone identifier used for the response times","example":"UTC"}},"required":["results","status"],"x-ref":"#/components/schemas/FormattedResponse"},{"type":"object","properties":{"results":{"type":"object","properties":{"sunrise":{"type":"string","format":"date-time","description":"Sunrise time in ISO 8601 format","example":"2015-05-21T05:05:35+00:00"},"sunset":{"type":"string","format":"date-time","description":"Sunset time in ISO 8601 format","example":"2015-05-21T19:22:59+00:00"},"solar_noon":{"type":"string","format":"date-time","description":"Solar noon time in ISO 8601 format","example":"2015-05-21T12:14:17+00:00"},"day_length":{"type":"integer","description":"Length of the day in seconds","example":51444},"civil_twilight_begin":{"type":"string","format":"date-time","description":"Civil twilight begin time in ISO 8601 format","example":"2015-05-21T04:36:17+00:00"},"civil_twilight_end":{"type":"string","format":"date-time","description":"Civil twilight end time in ISO 8601 format","example":"2015-05-21T19:52:17+00:00"},"nautical_twilight_begin":{"type":"string","format":"date-time","description":"Nautical twilight begin time in ISO 8601 format","example":"2015-05-21T04:00:13+00:00"},"nautical_twilight_end":{"type":"string","format":"date-time","description":"Nautical twilight end time in ISO 8601 format","example":"2015-05-21T20:28:21+00:00"},"astronomical_twilight_begin":{"type":"string","format":"date-time","description":"Astronomical twilight begin time in ISO 8601 format","example":"2015-05-21T03:20:49+00:00"},"astronomical_twilight_end":{"type":"string","format":"date-time","description":"Astronomical twilight end time in ISO 8601 format","example":"2015-05-21T21:07:45+00:00"}}},"status":{"type":"string","enum":["OK","INVALID_REQUEST","INVALID_DATE","UNKNOWN_ERROR","INVALID_TZID"],"description":"Status of the API request"},"tzid":{"type":"string","description":"Timezone identifier used for the response times","example":"UTC"}},"required":["results","status"],"x-ref":"#/components/schemas/UnformattedResponse"}]},"examples":{"formatted":{"summary":"Formatted response (default)","value":{"results":{"sunrise":"7:27:02 AM","sunset":"5:05:55 PM","solar_noon":"12:16:28 PM","day_length":"9:38:53","civil_twilight_begin":"6:58:14 AM","civil_twilight_end":"5:34:43 PM","nautical_twilight_begin":"6:25:47 AM","nautical_twilight_end":"6:07:10 PM","astronomical_twilight_begin":"5:54:14 AM","astronomical_twilight_end":"6:38:43 PM"},"status":"OK","tzid":"UTC"}},"unformatted":{"summary":"Unformatted response (formatted=0)","value":{"results":{"sunrise":"2015-05-21T05:05:35+00:00","sunset":"2015-05-21T19:22:59+00:00","solar_noon":"2015-05-21T12:14:17+00:00","day_length":51444,"civil_twilight_begin":"2015-05-21T04:36:17+00:00","civil_twilight_end":"2015-05-21T19:52:17+00:00","nautical_twilight_begin":"2015-05-21T04:00:13+00:00","nautical_twilight_end":"2015-05-21T20:28:21+00:00","astronomical_twilight_begin":"2015-05-21T03:20:49+00:00","astronomical_twilight_end":"2015-05-21T21:07:45+00:00"},"status":"OK","tzid":"UTC"}},"invalidRequest":{"summary":"Invalid request (missing or invalid lat/lng)","value":{"results":{},"status":"INVALID_REQUEST"}},"invalidDate":{"summary":"Invalid date parameter","value":{"results":{},"status":"INVALID_DATE"}},"invalidTzid":{"summary":"Invalid timezone identifier","value":{"results":{"sunrise":"7:27:02 AM","sunset":"5:05:55 PM","solar_noon":"12:16:28 PM","day_length":"9:38:53","civil_twilight_begin":"6:58:14 AM","civil_twilight_end":"5:34:43 PM","nautical_twilight_begin":"6:25:47 AM","nautical_twilight_end":"6:07:10 PM","astronomical_twilight_begin":"5:54:14 AM","astronomical_twilight_end":"6:38:43 PM"},"status":"INVALID_TZID","tzid":"UTC"}},"unknownError":{"summary":"Server error","value":{"results":{},"status":"UNKNOWN_ERROR"}}}}}}},"parameters":[{"name":"lat","in":"query","description":"Latitude in decimal degrees","required":true,"schema":{"type":"number","format":"float","minimum":-90,"maximum":90},"example":36.72016,"index$":0},{"name":"lng","in":"query","description":"Longitude in decimal degrees","required":true,"schema":{"type":"number","format":"float","minimum":-180,"maximum":180},"example":-4.42034,"index$":1},{"name":"date","in":"query","description":"Date in YYYY-MM-DD format. Also accepts other date formats and relative date formats (e.g., 'today'). Defaults to current date if not provided.","required":false,"schema":{"type":"string"},"examples":{"specific":{"value":"2026-02-15","summary":"Specific date"},"today":{"value":"today","summary":"Today's date"}},"index$":2},{"name":"callback","in":"query","description":"Callback function name for JSONP response","required":false,"schema":{"type":"string"},"index$":3},{"name":"formatted","in":"query","description":"0 or 1 (1 is default). When set to 0, time values will be expressed in ISO 8601 format and day_length will be in seconds.","required":false,"schema":{"type":"integer","enum":[0,1],"default":1},"index$":4},{"name":"tzid","in":"query","description":"A timezone identifier (e.g., UTC, Africa/Lagos, Asia/Hong_Kong, Europe/Lisbon). If provided, times in the response will be referenced to the given timezone.","required":false,"schema":{"type":"string"},"examples":{"utc":{"value":"UTC","summary":"UTC timezone"},"europe":{"value":"Europe/Lisbon","summary":"Lisbon timezone"},"asia":{"value":"Asia/Hong_Kong","summary":"Hong Kong timezone"}},"index$":5}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let sunrise_and_sunset_ref01_data = Object.values(setup.data.existing.sunrise_and_sunset)[0] as any

    // LOAD
    const sunrise_and_sunset_ref01_ent = client.SunriseAndSunset()
    const sunrise_and_sunset_ref01_match_dt0: any = {}
    const sunrise_and_sunset_ref01_data_dt0 = (await sunrise_and_sunset_ref01_ent.load(sunrise_and_sunset_ref01_match_dt0)).data()
    assert(null != sunrise_and_sunset_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/sunrise_and_sunset/SunriseAndSunsetTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = SunsetTimesSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['sunrise_and_sunset01','sunrise_and_sunset02','sunrise_and_sunset03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'SUNSET_TIMES_TEST_SUNRISE_AND_SUNSET_ENTID': idmap,
    'SUNSET_TIMES_TEST_LIVE': 'FALSE',
    'SUNSET_TIMES_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['SUNSET_TIMES_TEST_SUNRISE_AND_SUNSET_ENTID']

  const live = 'TRUE' === env.SUNSET_TIMES_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['SUNSET_TIMES_TEST_SUNRISE_AND_SUNSET_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new SunsetTimesSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
