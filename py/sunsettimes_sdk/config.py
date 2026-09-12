# SunsetTimes SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "SunsetTimes",
            "slug": "sunset-times",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
      },
        },
        "options": {
            "base": "https://api.sunrise-sunset.org",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "sunrise_and_sunset": {},
            },
        },
        "entity": {
      "sunrise_and_sunset": {
        "fields": [
          {
            "name": "results",
            "type": "`$OBJECT`",
          },
          {
            "name": "status",
            "type": "`$STRING`",
          },
          {
            "name": "tzid",
            "type": "`$STRING`",
          },
        ],
        "name": "sunrise_and_sunset",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "callback",
                      "orig": "callback",
                      "type": "`$STRING`",
                    },
                    {
                      "example": "2026-02-15",
                      "kind": "query",
                      "name": "date",
                      "orig": "date",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "formatted",
                      "orig": "formatted",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 36.72016,
                      "kind": "query",
                      "name": "lat",
                      "orig": "lat",
                      "reqd": True,
                      "type": "`$NUMBER`",
                    },
                    {
                      "example": -4.42034,
                      "kind": "query",
                      "name": "lng",
                      "orig": "lng",
                      "reqd": True,
                      "type": "`$NUMBER`",
                    },
                    {
                      "example": "UTC",
                      "kind": "query",
                      "name": "tzid",
                      "orig": "tzid",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/json",
                "segments": [
                  {
                    "lit": "json",
                  },
                ],
                "select": {
                  "exist": [
                    "callback",
                    "date",
                    "formatted",
                    "lat",
                    "lng",
                    "tzid",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "json",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
