<?php
declare(strict_types=1);

// SunriseAndSunset entity test

require_once __DIR__ . '/../sunsettimes_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class SunriseAndSunsetEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = SunsetTimesSDK::test(null, null);
        $ent = $testsdk->SunriseAndSunset(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = sunrise_and_sunset_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "sunrise_and_sunset." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set SUNSETTIMES_TEST_SUNRISE_AND_SUNSET_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $sunrise_and_sunset_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.sunrise_and_sunset")));
        $sunrise_and_sunset_ref01_data = null;
        if (count($sunrise_and_sunset_ref01_data_raw) > 0) {
            $sunrise_and_sunset_ref01_data = Helpers::to_map($sunrise_and_sunset_ref01_data_raw[0][1]);
        }

        // LOAD
        $sunrise_and_sunset_ref01_ent = $client->SunriseAndSunset(null);
        $sunrise_and_sunset_ref01_match_dt0 = [];
        $sunrise_and_sunset_ref01_data_dt0_loaded = $sunrise_and_sunset_ref01_ent->load($sunrise_and_sunset_ref01_match_dt0, null);
        $this->assertNotNull($sunrise_and_sunset_ref01_data_dt0_loaded);

    }
}

function sunrise_and_sunset_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/sunrise_and_sunset/SunriseAndSunsetTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = SunsetTimesSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["sunrise_and_sunset01", "sunrise_and_sunset02", "sunrise_and_sunset03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("SUNSETTIMES_TEST_SUNRISE_AND_SUNSET_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "SUNSETTIMES_TEST_SUNRISE_AND_SUNSET_ENTID" => $idmap,
        "SUNSETTIMES_TEST_LIVE" => "FALSE",
        "SUNSETTIMES_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["SUNSETTIMES_TEST_SUNRISE_AND_SUNSET_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["SUNSETTIMES_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new SunsetTimesSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["SUNSETTIMES_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["SUNSETTIMES_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
