# SunsetTimes SDK feature factory

from feature.base_feature import SunsetTimesBaseFeature
from feature.test_feature import SunsetTimesTestFeature


def _make_feature(name):
    features = {
        "base": lambda: SunsetTimesBaseFeature(),
        "test": lambda: SunsetTimesTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
