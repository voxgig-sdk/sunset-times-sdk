# SunriseAndSunset direct test

require "minitest/autorun"
require "json"
require_relative "../SunsetTimes_sdk"
require_relative "runner"

class SunriseAndSunsetDirectTest < Minitest::Test
  def test_direct_load_sunrise_and_sunset
    setup = sunrise_and_sunset_direct_setup({ "id" => "direct01" })
    _should_skip, _reason = Runner.is_control_skipped("direct", "direct-load-sunrise_and_sunset", setup[:live] ? "live" : "unit")
    if _should_skip
      skip(_reason || "skipped via sdk-test-control.json")
      return
    end
    client = setup[:client]

    params = {}
    query = {}
    if setup[:live]
      query["lat"] = 36.72016
      query["lng"] = -4.42034
    end

    result, err = client.direct({
      "path" => "json",
      "method" => "GET",
      "params" => params,
      "query" => query,
    })
    if setup[:live]
      # Live mode is lenient: synthetic IDs frequently 4xx. Skip rather
      # than fail when the load endpoint isn't reachable with the IDs
      # we can construct from setup.idmap.
      if !err.nil?
        skip("load call failed (likely synthetic IDs against live API): #{err}")
        return
      end
      unless result["ok"]
        skip("load call not ok (likely synthetic IDs against live API)")
        return
      end
      status = Helpers.to_int(result["status"])
      if status < 200 || status >= 300
        skip("expected 2xx status, got #{status}")
        return
      end
    else
      assert_nil err
      assert result["ok"]
      assert_equal 200, Helpers.to_int(result["status"])
      assert !result["data"].nil?
      if result["data"].is_a?(Hash)
        assert_equal "direct01", result["data"]["id"]
      end
      assert_equal 1, setup[:calls].length
    end
  end

end


def sunrise_and_sunset_direct_setup(mockres)
  Runner.load_env_local

  calls = []

  env = Runner.env_override({
    "SUNSETTIMES_TEST_SUNRISE_AND_SUNSET_ENTID" => {},
    "SUNSETTIMES_TEST_LIVE" => "FALSE",
    "SUNSETTIMES_APIKEY" => "NONE",
  })

  live = env["SUNSETTIMES_TEST_LIVE"] == "TRUE"

  if live
    merged_opts = {
      "apikey" => env["SUNSETTIMES_APIKEY"],
    }
    client = SunsetTimesSDK.new(merged_opts)
    return {
      client: client,
      calls: calls,
      live: true,
      idmap: {},
    }
  end

  mock_fetch = ->(url, init) {
    calls.push({ "url" => url, "init" => init })
    return {
      "status" => 200,
      "statusText" => "OK",
      "headers" => {},
      "json" => ->() {
        if !mockres.nil?
          return mockres
        end
        return { "id" => "direct01" }
      },
      "body" => "mock",
    }, nil
  }

  client = SunsetTimesSDK.new({
    "base" => "http://localhost:8080",
    "system" => {
      "fetch" => mock_fetch,
    },
  })

  {
    client: client,
    calls: calls,
    live: false,
    idmap: {},
  }
end
