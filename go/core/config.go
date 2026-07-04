package core

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
						"active": true,
						"name": "result",
						"req": false,
						"type": "`$OBJECT`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "status",
						"req": false,
						"type": "`$STRING`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "tzid",
						"req": false,
						"type": "`$STRING`",
						"index$": 2,
					},
				},
				"name": "sunrise_and_sunset",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "callback",
											"orig": "callback",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": "2026-02-15",
											"kind": "query",
											"name": "date",
											"orig": "date",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": 1,
											"kind": "query",
											"name": "formatted",
											"orig": "formatted",
											"reqd": false,
											"type": "`$INTEGER`",
										},
										map[string]any{
											"active": true,
											"example": 36.72016,
											"kind": "query",
											"name": "lat",
											"orig": "lat",
											"reqd": true,
											"type": "`$NUMBER`",
										},
										map[string]any{
											"active": true,
											"example": -4.42034,
											"kind": "query",
											"name": "lng",
											"orig": "lng",
											"reqd": true,
											"type": "`$NUMBER`",
										},
										map[string]any{
											"active": true,
											"example": "UTC",
											"kind": "query",
											"name": "tzid",
											"orig": "tzid",
											"reqd": false,
											"type": "`$STRING`",
										},
									},
								},
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
								"index$": 0,
							},
						},
						"key$": "load",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
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
