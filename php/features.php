<?php
declare(strict_types=1);

// SunsetTimes SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class SunsetTimesFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new SunsetTimesBaseFeature();
            case "test":
                return new SunsetTimesTestFeature();
            default:
                return new SunsetTimesBaseFeature();
        }
    }
}
