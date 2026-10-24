# SunsetTimes SDK utility: prepare_body
require_relative 'media'
module SunsetTimesUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return SunsetTimesUtilities.raw_body(ctx.reqdata) if SunsetTimesUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
