# SunsetTimes SDK exists test

require "minitest/autorun"
require_relative "../SunsetTimes_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = SunsetTimesSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
