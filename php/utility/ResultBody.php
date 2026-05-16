<?php
declare(strict_types=1);

// SunsetTimes SDK utility: result_body

class SunsetTimesResultBody
{
    public static function call(SunsetTimesContext $ctx): ?SunsetTimesResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
