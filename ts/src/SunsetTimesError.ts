
import { Context } from './Context'


class SunsetTimesError extends Error {

  isSunsetTimesError = true

  sdk = 'SunsetTimes'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  SunsetTimesError
}

