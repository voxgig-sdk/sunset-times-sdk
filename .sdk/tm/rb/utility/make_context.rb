# SunsetTimes SDK utility: make_context
require_relative '../core/context'
module SunsetTimesUtilities
  MakeContext = ->(ctxmap, basectx) {
    SunsetTimesContext.new(ctxmap, basectx)
  }
end
