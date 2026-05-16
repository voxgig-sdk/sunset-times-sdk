# SunsetTimes SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module SunsetTimesFeatures
  def self.make_feature(name)
    case name
    when "base"
      SunsetTimesBaseFeature.new
    when "test"
      SunsetTimesTestFeature.new
    else
      SunsetTimesBaseFeature.new
    end
  end
end
