<?php
declare(strict_types=1);

// SunsetTimes SDK context

require_once __DIR__ . '/Control.php';
require_once __DIR__ . '/Operation.php';
require_once __DIR__ . '/Spec.php';
require_once __DIR__ . '/Result.php';
require_once __DIR__ . '/Response.php';
require_once __DIR__ . '/Error.php';
require_once __DIR__ . '/Helpers.php';

class SunsetTimesContext
{
    public string $id;
    public array $out;
    public mixed $client;
    public ?SunsetTimesUtility $utility;
    public SunsetTimesControl $ctrl;
    public array $meta;
    public ?array $config;
    public ?array $entopts;
    public ?array $options;
    public mixed $entity;
    public ?array $shared;
    public array $opmap;
    public array $data;
    public array $reqdata;
    public array $match;
    public array $reqmatch;
    public ?array $point;
    public ?SunsetTimesSpec $spec;
    public ?SunsetTimesResult $result;
    public ?SunsetTimesResponse $response;
    public SunsetTimesOperation $op;

    public function __construct(array $ctxmap = [], ?self $basectx = null)
    {
        $this->id = 'C' . random_int(10000000, 99999999);
        $this->out = [];

        $this->client = SunsetTimesHelpers::get_ctx_prop($ctxmap, 'client') ?? ($basectx ? $basectx->client : null);
        $this->utility = SunsetTimesHelpers::get_ctx_prop($ctxmap, 'utility') ?? ($basectx ? $basectx->utility : null);

        $this->ctrl = new SunsetTimesControl();
        $ctrl_raw = SunsetTimesHelpers::get_ctx_prop($ctxmap, 'ctrl');
        if (is_array($ctrl_raw)) {
            if (array_key_exists('throw', $ctrl_raw)) {
                $this->ctrl->throw_err = $ctrl_raw['throw'];
            }
            if (isset($ctrl_raw['explain']) && is_array($ctrl_raw['explain'])) {
                $this->ctrl->explain = $ctrl_raw['explain'];
            }
        } elseif ($basectx !== null && $basectx->ctrl !== null) {
            $this->ctrl = $basectx->ctrl;
        }

        $m = SunsetTimesHelpers::get_ctx_prop($ctxmap, 'meta');
        $this->meta = is_array($m) ? $m : ($basectx ? $basectx->meta ?? [] : []);

        $cfg = SunsetTimesHelpers::get_ctx_prop($ctxmap, 'config');
        $this->config = is_array($cfg) ? $cfg : ($basectx ? $basectx->config : null);

        $eo = SunsetTimesHelpers::get_ctx_prop($ctxmap, 'entopts');
        $this->entopts = is_array($eo) ? $eo : ($basectx ? $basectx->entopts : null);

        $o = SunsetTimesHelpers::get_ctx_prop($ctxmap, 'options');
        $this->options = is_array($o) ? $o : ($basectx ? $basectx->options : null);

        $e = SunsetTimesHelpers::get_ctx_prop($ctxmap, 'entity');
        $this->entity = $e ?? ($basectx ? $basectx->entity : null);

        $s = SunsetTimesHelpers::get_ctx_prop($ctxmap, 'shared');
        $this->shared = is_array($s) ? $s : ($basectx ? $basectx->shared : null);

        $om = SunsetTimesHelpers::get_ctx_prop($ctxmap, 'opmap');
        $this->opmap = is_array($om) ? $om : ($basectx ? $basectx->opmap ?? [] : []);

        $this->data = SunsetTimesHelpers::to_map(SunsetTimesHelpers::get_ctx_prop($ctxmap, 'data')) ?? [];
        $this->reqdata = SunsetTimesHelpers::to_map(SunsetTimesHelpers::get_ctx_prop($ctxmap, 'reqdata')) ?? [];
        $this->match = SunsetTimesHelpers::to_map(SunsetTimesHelpers::get_ctx_prop($ctxmap, 'match')) ?? [];
        $this->reqmatch = SunsetTimesHelpers::to_map(SunsetTimesHelpers::get_ctx_prop($ctxmap, 'reqmatch')) ?? [];

        $pt = SunsetTimesHelpers::get_ctx_prop($ctxmap, 'point');
        $this->point = is_array($pt) ? $pt : ($basectx ? $basectx->point : null);

        $sp = SunsetTimesHelpers::get_ctx_prop($ctxmap, 'spec');
        $this->spec = ($sp instanceof SunsetTimesSpec) ? $sp : ($basectx ? $basectx->spec : null);

        $r = SunsetTimesHelpers::get_ctx_prop($ctxmap, 'result');
        $this->result = ($r instanceof SunsetTimesResult) ? $r : ($basectx ? $basectx->result : null);

        $rp = SunsetTimesHelpers::get_ctx_prop($ctxmap, 'response');
        $this->response = ($rp instanceof SunsetTimesResponse) ? $rp : ($basectx ? $basectx->response : null);

        $opname = SunsetTimesHelpers::get_ctx_prop($ctxmap, 'opname') ?? '';
        $this->op = $this->resolve_op($opname);
    }

    public function resolve_op(string $opname): SunsetTimesOperation
    {
        // Cache key is `<entity>:<opname>` so two entities with the same op
        // (e.g. both have a "list") get distinct cached Operations. Keying
        // on opname alone caused the first-resolved entity's points to be
        // served to every subsequent entity's call.
        $entname = (is_object($this->entity) && method_exists($this->entity, 'get_name'))
            ? $this->entity->get_name()
            : '_';
        $cacheKey = $entname . ':' . $opname;

        if (isset($this->opmap[$cacheKey])) {
            return $this->opmap[$cacheKey];
        }
        if ($opname === '') {
            return new SunsetTimesOperation([]);
        }

        $opcfg = \Voxgig\Struct\Struct::getpath($this->config, "entity.{$entname}.op.{$opname}");

        $input = ($opname === 'update' || $opname === 'create') ? 'data' : 'match';

        $points = [];
        if (is_array($opcfg)) {
            $t = \Voxgig\Struct\Struct::getprop($opcfg, 'points');
            if (is_array($t)) {
                $points = $t;
            }
        }

        $op = new SunsetTimesOperation([
            'entity' => $entname,
            'name' => $opname,
            'input' => $input,
            'points' => $points,
        ]);
        $this->opmap[$cacheKey] = $op;
        return $op;
    }

    public function make_error(string $code, string $msg): SunsetTimesError
    {
        return new SunsetTimesError($code, $msg, $this);
    }
}
