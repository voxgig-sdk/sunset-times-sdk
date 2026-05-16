<?php
declare(strict_types=1);

// SunsetTimes SDK utility: prepare_body

class SunsetTimesPrepareBody
{
    public static function call(SunsetTimesContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
