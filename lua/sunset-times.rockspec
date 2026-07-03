package = "voxgig-sdk-sunset-times"
version = "0.0.1-1"
source = {
  -- git+https (GitHub dropped git:// in 2022); pin the install to the release
  -- tag pushed by `make publish`, and point at the lua/ subdir of the monorepo.
  url = "git+https://github.com/voxgig-sdk/sunset-times-sdk.git",
  tag = "lua/v0.0.1",
  dir = "sunset-times-sdk/lua"
}
description = {
  summary = "Unofficial generated Lua SDK for the Sunset Times public API. Not affiliated with or endorsed by the upstream API provider.",
  homepage = "https://github.com/voxgig-sdk/sunset-times-sdk",
  issues_url = "https://github.com/voxgig-sdk/sunset-times-sdk/issues",
  license = "MIT",
  labels = { "voxgig", "sdk", "generated-sdk", "openapi", "api-client", "sunset-times" }
}
dependencies = {
  "lua >= 5.3",
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
