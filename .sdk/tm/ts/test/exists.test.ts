
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { SunsetTimesSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = SunsetTimesSDK.test()
    equal(testsdk instanceof SunsetTimesSDK, true,
      'SunsetTimesSDK.test() must return a client synchronously')
  })

})
