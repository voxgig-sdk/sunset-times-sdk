# SunsetTimes SDK utility: make_context

from core.context import SunsetTimesContext


def make_context_util(ctxmap, basectx):
    return SunsetTimesContext(ctxmap, basectx)
