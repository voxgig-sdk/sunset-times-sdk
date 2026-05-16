<?php
declare(strict_types=1);

// SunsetTimes SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class SunsetTimesMakeContext
{
    public static function call(array $ctxmap, ?SunsetTimesContext $basectx): SunsetTimesContext
    {
        return new SunsetTimesContext($ctxmap, $basectx);
    }
}
