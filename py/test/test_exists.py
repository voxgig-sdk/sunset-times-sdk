# ProjectName SDK exists test

import pytest
from sunsettimes_sdk import SunsetTimesSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = SunsetTimesSDK.test(None, None)
        assert testsdk is not None
