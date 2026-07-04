-- ProjectName SDK configuration

local function make_config()
  return {
    main = {
      name = "SunsetTimes",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "https://api.sunrise-sunset.org",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["sunrise_and_sunset"] = {},
      },
    },
    entity = {
      ["sunrise_and_sunset"] = {
        ["fields"] = {
          {
            ["active"] = true,
            ["name"] = "result",
            ["req"] = false,
            ["type"] = "`$OBJECT`",
            ["index$"] = 0,
          },
          {
            ["active"] = true,
            ["name"] = "status",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 1,
          },
          {
            ["active"] = true,
            ["name"] = "tzid",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 2,
          },
        },
        ["name"] = "sunrise_and_sunset",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["query"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "query",
                      ["name"] = "callback",
                      ["orig"] = "callback",
                      ["reqd"] = false,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["active"] = true,
                      ["example"] = "2026-02-15",
                      ["kind"] = "query",
                      ["name"] = "date",
                      ["orig"] = "date",
                      ["reqd"] = false,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["active"] = true,
                      ["example"] = 1,
                      ["kind"] = "query",
                      ["name"] = "formatted",
                      ["orig"] = "formatted",
                      ["reqd"] = false,
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["active"] = true,
                      ["example"] = 36.72016,
                      ["kind"] = "query",
                      ["name"] = "lat",
                      ["orig"] = "lat",
                      ["reqd"] = true,
                      ["type"] = "`$NUMBER`",
                    },
                    {
                      ["active"] = true,
                      ["example"] = -4.42034,
                      ["kind"] = "query",
                      ["name"] = "lng",
                      ["orig"] = "lng",
                      ["reqd"] = true,
                      ["type"] = "`$NUMBER`",
                    },
                    {
                      ["active"] = true,
                      ["example"] = "UTC",
                      ["kind"] = "query",
                      ["name"] = "tzid",
                      ["orig"] = "tzid",
                      ["reqd"] = false,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["method"] = "GET",
                ["orig"] = "/json",
                ["parts"] = {
                  "json",
                },
                ["select"] = {
                  ["exist"] = {
                    "callback",
                    "date",
                    "formatted",
                    "lat",
                    "lng",
                    "tzid",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 0,
              },
            },
            ["key$"] = "load",
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
