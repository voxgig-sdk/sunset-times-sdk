
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { SunsetTimesSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await SunsetTimesSDK.test()
    equal(null !== testsdk, true)
  })

})
