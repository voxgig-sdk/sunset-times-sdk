<?php
declare(strict_types=1);

// SunsetTimes SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

SunsetTimesUtility::setRegistrar(function (SunsetTimesUtility $u): void {
    $u->clean = [SunsetTimesClean::class, 'call'];
    $u->done = [SunsetTimesDone::class, 'call'];
    $u->make_error = [SunsetTimesMakeError::class, 'call'];
    $u->feature_add = [SunsetTimesFeatureAdd::class, 'call'];
    $u->feature_hook = [SunsetTimesFeatureHook::class, 'call'];
    $u->feature_init = [SunsetTimesFeatureInit::class, 'call'];
    $u->fetcher = [SunsetTimesFetcher::class, 'call'];
    $u->make_fetch_def = [SunsetTimesMakeFetchDef::class, 'call'];
    $u->make_context = [SunsetTimesMakeContext::class, 'call'];
    $u->make_options = [SunsetTimesMakeOptions::class, 'call'];
    $u->make_request = [SunsetTimesMakeRequest::class, 'call'];
    $u->make_response = [SunsetTimesMakeResponse::class, 'call'];
    $u->make_result = [SunsetTimesMakeResult::class, 'call'];
    $u->make_point = [SunsetTimesMakePoint::class, 'call'];
    $u->make_spec = [SunsetTimesMakeSpec::class, 'call'];
    $u->make_url = [SunsetTimesMakeUrl::class, 'call'];
    $u->param = [SunsetTimesParam::class, 'call'];
    $u->prepare_auth = [SunsetTimesPrepareAuth::class, 'call'];
    $u->prepare_body = [SunsetTimesPrepareBody::class, 'call'];
    $u->prepare_headers = [SunsetTimesPrepareHeaders::class, 'call'];
    $u->prepare_method = [SunsetTimesPrepareMethod::class, 'call'];
    $u->prepare_params = [SunsetTimesPrepareParams::class, 'call'];
    $u->prepare_path = [SunsetTimesPreparePath::class, 'call'];
    $u->prepare_query = [SunsetTimesPrepareQuery::class, 'call'];
    $u->result_basic = [SunsetTimesResultBasic::class, 'call'];
    $u->result_body = [SunsetTimesResultBody::class, 'call'];
    $u->result_headers = [SunsetTimesResultHeaders::class, 'call'];
    $u->transform_request = [SunsetTimesTransformRequest::class, 'call'];
    $u->transform_response = [SunsetTimesTransformResponse::class, 'call'];
});
