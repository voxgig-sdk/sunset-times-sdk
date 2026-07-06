# frozen_string_literal: true

# Typed models for the SunsetTimes SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# SunriseAndSunset entity data model.
#
# @!attribute [rw] result
#   @return [Hash, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] tzid
#   @return [String, nil]
SunriseAndSunset = Struct.new(
  :result,
  :status,
  :tzid,
  keyword_init: true
)

# Request payload for SunriseAndSunset#load.
#
# @!attribute [rw] result
#   @return [Hash, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] tzid
#   @return [String, nil]
SunriseAndSunsetLoadMatch = Struct.new(
  :result,
  :status,
  :tzid,
  keyword_init: true
)

