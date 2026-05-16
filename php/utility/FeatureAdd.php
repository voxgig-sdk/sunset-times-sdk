<?php
declare(strict_types=1);

// SunsetTimes SDK utility: feature_add

class SunsetTimesFeatureAdd
{
    public static function call(SunsetTimesContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
