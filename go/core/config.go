package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "SunsetTimes",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://api.sunrise-sunset.org",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"sunrise_and_sunset": map[string]any{},
			},
		},
		"entity": map[string]any{
			"sunrise_and_sunset": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "results",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "status",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "tzid",
						"type": "`$STRING`",
					},
				},
				"name": "sunrise_and_sunset",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "callback",
											"orig": "callback",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "2026-02-15",
											"kind": "query",
											"name": "date",
											"orig": "date",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "formatted",
											"orig": "formatted",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 36.72016,
											"kind": "query",
											"name": "lat",
											"orig": "lat",
											"reqd": true,
											"type": "`$NUMBER`",
										},
										map[string]any{
											"example": -4.42034,
											"kind": "query",
											"name": "lng",
											"orig": "lng",
											"reqd": true,
											"type": "`$NUMBER`",
										},
										map[string]any{
											"example": "UTC",
											"kind": "query",
											"name": "tzid",
											"orig": "tzid",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/json",
								"parts": []any{
									"json",
								},
								"select": map[string]any{
									"exist": []any{
										"callback",
										"date",
										"formatted",
										"lat",
										"lng",
										"tzid",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
