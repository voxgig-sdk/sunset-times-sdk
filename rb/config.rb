# SunsetTimes SDK configuration

module SunsetTimesConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "SunsetTimes",
        "slug" => "sunset-times",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://api.sunrise-sunset.org",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "sunrise_and_sunset" => {},
        },
      },
      "entity" => {
        "sunrise_and_sunset" => {
          "fields" => [
            {
              "name" => "results",
              "title" => "Results",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "status",
              "title" => "Status",
              "type" => "`$STRING`",
            },
            {
              "name" => "tzid",
              "title" => "Tzid",
              "type" => "`$STRING`",
            },
          ],
          "name" => "sunrise_and_sunset",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/json",
                  "segments" => [
                    {
                      "lit" => "json",
                    },
                  ],
                  "parts" => [
                    "json",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "callback",
                        "orig" => "callback",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "date",
                        "orig" => "date",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "2026-02-15",
                      },
                      {
                        "name" => "formatted",
                        "orig" => "formatted",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 1,
                      },
                      {
                        "name" => "lat",
                        "orig" => "lat",
                        "type" => "`$NUMBER`",
                        "kind" => "query",
                        "reqd" => true,
                        "example" => 36.72016,
                      },
                      {
                        "name" => "lng",
                        "orig" => "lng",
                        "type" => "`$NUMBER`",
                        "kind" => "query",
                        "reqd" => true,
                        "example" => -4.42034,
                      },
                      {
                        "name" => "tzid",
                        "orig" => "tzid",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "UTC",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "callback",
                      "date",
                      "formatted",
                      "lat",
                      "lng",
                      "tzid",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    SunsetTimesFeatures.make_feature(name)
  end
end
