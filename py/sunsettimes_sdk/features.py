# SunsetTimes SDK feature factory

from sunsettimes_sdk.feature.base_feature import SunsetTimesBaseFeature
from sunsettimes_sdk.feature.ratelimit_feature import SunsetTimesRatelimitFeature
from sunsettimes_sdk.feature.retry_feature import SunsetTimesRetryFeature
from sunsettimes_sdk.feature.test_feature import SunsetTimesTestFeature
from sunsettimes_sdk.feature.timeout_feature import SunsetTimesTimeoutFeature


_FEATURES = {
    "base": lambda: SunsetTimesBaseFeature(),
    "ratelimit": lambda: SunsetTimesRatelimitFeature(),
    "retry": lambda: SunsetTimesRetryFeature(),
    "test": lambda: SunsetTimesTestFeature(),
    "timeout": lambda: SunsetTimesTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
