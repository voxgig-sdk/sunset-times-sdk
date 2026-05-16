package = "voxgig-sdk-sunset-times"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/sunset-times-sdk.git"
}
description = {
  summary = "SunsetTimes SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["sunset-times_sdk"] = "sunset-times_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
