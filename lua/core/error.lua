-- SunsetTimes SDK error

local SunsetTimesError = {}
SunsetTimesError.__index = SunsetTimesError


function SunsetTimesError.new(code, msg, ctx)
  local self = setmetatable({}, SunsetTimesError)
  self.is_sdk_error = true
  self.sdk = "SunsetTimes"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function SunsetTimesError:error()
  return self.msg
end


function SunsetTimesError:__tostring()
  return self.msg
end


return SunsetTimesError
