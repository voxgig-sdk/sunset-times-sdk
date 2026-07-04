# Typed models for the SunsetTimes SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class SunriseAndSunset:
    result: Optional[dict] = None
    status: Optional[str] = None
    tzid: Optional[str] = None


@dataclass
class SunriseAndSunsetLoadMatch:
    result: Optional[dict] = None
    status: Optional[str] = None
    tzid: Optional[str] = None

