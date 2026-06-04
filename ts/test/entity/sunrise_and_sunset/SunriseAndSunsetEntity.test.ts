
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { SunsetTimesSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


describe('SunriseAndSunsetEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when SUNSETTIMES_TEST_LIVE=TRUE.
  afterEach(liveDelay('SUNSETTIMES_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = SunsetTimesSDK.test()
    const ent = testsdk.SunriseAndSunset()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.SUNSET_TIMES_TEST_LIVE
    for (const op of ['load']) {
      if (maybeSkipControl(t, 'entityOp', 'sunrise_and_sunset.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set SUNSET_TIMES_TEST_SUNRISE_AND_SUNSET_ENTID JSON to run live')
      return
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let sunrise_and_sunset_ref01_data = Object.values(setup.data.existing.sunrise_and_sunset)[0] as any

    // LOAD
    const sunrise_and_sunset_ref01_ent = client.SunriseAndSunset()
    const sunrise_and_sunset_ref01_match_dt0: any = {}
    const sunrise_and_sunset_ref01_data_dt0 = await sunrise_and_sunset_ref01_ent.load(sunrise_and_sunset_ref01_match_dt0)
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

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['SUNSET_TIMES_TEST_SUNRISE_AND_SUNSET_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'SUNSET_TIMES_TEST_SUNRISE_AND_SUNSET_ENTID': idmap,
    'SUNSET_TIMES_TEST_LIVE': 'FALSE',
    'SUNSET_TIMES_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['SUNSET_TIMES_TEST_SUNRISE_AND_SUNSET_ENTID']

  const live = 'TRUE' === env.SUNSET_TIMES_TEST_LIVE

  if (live) {
    client = new SunsetTimesSDK(merge([
      {
      },
      extra
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
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
