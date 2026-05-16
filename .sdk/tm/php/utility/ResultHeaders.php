<?php
declare(strict_types=1);

// SunsetTimes SDK utility: result_headers

class SunsetTimesResultHeaders
{
    public static function call(SunsetTimesContext $ctx): ?SunsetTimesResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
