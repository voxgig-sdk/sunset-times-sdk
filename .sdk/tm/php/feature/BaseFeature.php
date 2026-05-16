<?php
declare(strict_types=1);

// SunsetTimes SDK base feature

class SunsetTimesBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(SunsetTimesContext $ctx, array $options): void {}
    public function PostConstruct(SunsetTimesContext $ctx): void {}
    public function PostConstructEntity(SunsetTimesContext $ctx): void {}
    public function SetData(SunsetTimesContext $ctx): void {}
    public function GetData(SunsetTimesContext $ctx): void {}
    public function GetMatch(SunsetTimesContext $ctx): void {}
    public function SetMatch(SunsetTimesContext $ctx): void {}
    public function PrePoint(SunsetTimesContext $ctx): void {}
    public function PreSpec(SunsetTimesContext $ctx): void {}
    public function PreRequest(SunsetTimesContext $ctx): void {}
    public function PreResponse(SunsetTimesContext $ctx): void {}
    public function PreResult(SunsetTimesContext $ctx): void {}
    public function PreDone(SunsetTimesContext $ctx): void {}
    public function PreUnexpected(SunsetTimesContext $ctx): void {}
}
