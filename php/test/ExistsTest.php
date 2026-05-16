<?php
declare(strict_types=1);

// SunsetTimes SDK exists test

require_once __DIR__ . '/../sunsettimes_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = SunsetTimesSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
