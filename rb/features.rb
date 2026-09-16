# SunsetTimes SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module SunsetTimesFeatures
  def self.make_feature(name)
    case name
    when "base"
      SunsetTimesBaseFeature.new
    when "ratelimit"
      SunsetTimesRatelimitFeature.new
    when "retry"
      SunsetTimesRetryFeature.new
    when "test"
      SunsetTimesTestFeature.new
    when "timeout"
      SunsetTimesTimeoutFeature.new
    else
      SunsetTimesBaseFeature.new
    end
  end
end
