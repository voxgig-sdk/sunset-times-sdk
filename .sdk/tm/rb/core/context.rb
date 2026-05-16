# SunsetTimes SDK context

require_relative '../utility/struct/voxgig_struct'
require_relative 'control'
require_relative 'operation'
require_relative 'spec'
require_relative 'result'
require_relative 'response'
require_relative 'error'
require_relative 'helpers'

class SunsetTimesContext
  attr_accessor :id, :out, :client, :utility, :ctrl, :meta, :config,
                :entopts, :options, :entity, :shared, :opmap,
                :data, :reqdata, :match, :reqmatch, :point,
                :spec, :result, :response, :op

  def initialize(ctxmap = {}, basectx = nil)
    ctxmap ||= {}
    @id = "C#{rand(10000000..99999999)}"
    @out = {}

    @client = SunsetTimesHelpers.get_ctx_prop(ctxmap, "client") || basectx&.client
    @utility = SunsetTimesHelpers.get_ctx_prop(ctxmap, "utility") || basectx&.utility

    @ctrl = SunsetTimesControl.new
    ctrl_raw = SunsetTimesHelpers.get_ctx_prop(ctxmap, "ctrl")
    if ctrl_raw.is_a?(Hash)
      @ctrl.throw_err = ctrl_raw["throw"] if ctrl_raw.key?("throw")
      @ctrl.explain = ctrl_raw["explain"] if ctrl_raw["explain"].is_a?(Hash)
    elsif basectx&.ctrl
      @ctrl = basectx.ctrl
    end

    m = SunsetTimesHelpers.get_ctx_prop(ctxmap, "meta")
    @meta = m.is_a?(Hash) ? m : (basectx&.meta || {})

    cfg = SunsetTimesHelpers.get_ctx_prop(ctxmap, "config")
    @config = cfg.is_a?(Hash) ? cfg : basectx&.config

    eo = SunsetTimesHelpers.get_ctx_prop(ctxmap, "entopts")
    @entopts = eo.is_a?(Hash) ? eo : basectx&.entopts

    o = SunsetTimesHelpers.get_ctx_prop(ctxmap, "options")
    @options = o.is_a?(Hash) ? o : basectx&.options

    e = SunsetTimesHelpers.get_ctx_prop(ctxmap, "entity")
    @entity = e || basectx&.entity

    s = SunsetTimesHelpers.get_ctx_prop(ctxmap, "shared")
    @shared = s.is_a?(Hash) ? s : basectx&.shared

    om = SunsetTimesHelpers.get_ctx_prop(ctxmap, "opmap")
    @opmap = om.is_a?(Hash) ? om : (basectx&.opmap || {})

    @data = SunsetTimesHelpers.to_map(SunsetTimesHelpers.get_ctx_prop(ctxmap, "data")) || {}
    @reqdata = SunsetTimesHelpers.to_map(SunsetTimesHelpers.get_ctx_prop(ctxmap, "reqdata")) || {}
    @match = SunsetTimesHelpers.to_map(SunsetTimesHelpers.get_ctx_prop(ctxmap, "match")) || {}
    @reqmatch = SunsetTimesHelpers.to_map(SunsetTimesHelpers.get_ctx_prop(ctxmap, "reqmatch")) || {}

    pt = SunsetTimesHelpers.get_ctx_prop(ctxmap, "point")
    @point = pt.is_a?(Hash) ? pt : basectx&.point

    sp = SunsetTimesHelpers.get_ctx_prop(ctxmap, "spec")
    @spec = sp.is_a?(SunsetTimesSpec) ? sp : basectx&.spec

    r = SunsetTimesHelpers.get_ctx_prop(ctxmap, "result")
    @result = r.is_a?(SunsetTimesResult) ? r : basectx&.result

    rp = SunsetTimesHelpers.get_ctx_prop(ctxmap, "response")
    @response = rp.is_a?(SunsetTimesResponse) ? rp : basectx&.response

    opname = SunsetTimesHelpers.get_ctx_prop(ctxmap, "opname") || ""
    @op = resolve_op(opname)
  end

  def resolve_op(opname)
    return @opmap[opname] if @opmap[opname]
    return SunsetTimesOperation.new({}) if opname.empty?

    entname = @entity&.respond_to?(:get_name) ? @entity.get_name : "_"
    opcfg = VoxgigStruct.getpath(@config, "entity.#{entname}.op.#{opname}")

    input = (opname == "update" || opname == "create") ? "data" : "match"

    points = []
    if opcfg.is_a?(Hash)
      t = VoxgigStruct.getprop(opcfg, "points")
      points = t if t.is_a?(Array)
    end

    op = SunsetTimesOperation.new({
      "entity" => entname,
      "name" => opname,
      "input" => input,
      "points" => points,
    })
    @opmap[opname] = op
    op
  end

  def make_error(code, msg)
    SunsetTimesError.new(code, msg, self)
  end
end
