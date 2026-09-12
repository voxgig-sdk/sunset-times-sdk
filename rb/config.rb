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
        "test" => {
          "options" => {
            "active" => false,
          },
          "transport" => "base",
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
              "type" => "`$OBJECT`",
            },
            {
              "name" => "status",
              "type" => "`$STRING`",
            },
            {
              "name" => "tzid",
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
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "callback",
                        "orig" => "callback",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "2026-02-15",
                        "kind" => "query",
                        "name" => "date",
                        "orig" => "date",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => 1,
                        "kind" => "query",
                        "name" => "formatted",
                        "orig" => "formatted",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => 36.72016,
                        "kind" => "query",
                        "name" => "lat",
                        "orig" => "lat",
                        "reqd" => true,
                        "type" => "`$NUMBER`",
                      },
                      {
                        "example" => -4.42034,
                        "kind" => "query",
                        "name" => "lng",
                        "orig" => "lng",
                        "reqd" => true,
                        "type" => "`$NUMBER`",
                      },
                      {
                        "example" => "UTC",
                        "kind" => "query",
                        "name" => "tzid",
                        "orig" => "tzid",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/json",
                  "segments" => [
                    {
                      "lit" => "json",
                    },
                  ],
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
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "json",
                  ],
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
