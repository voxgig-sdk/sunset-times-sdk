package voxgigsunsettimessdk

import (
	"github.com/voxgig-sdk/sunset-times-sdk/go/core"
	"github.com/voxgig-sdk/sunset-times-sdk/go/entity"
	"github.com/voxgig-sdk/sunset-times-sdk/go/feature"
	_ "github.com/voxgig-sdk/sunset-times-sdk/go/utility"
)

// Type aliases preserve external API.
type SunsetTimesSDK = core.SunsetTimesSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type SunsetTimesEntity = core.SunsetTimesEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type SunsetTimesError = core.SunsetTimesError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewSunriseAndSunsetEntityFunc = func(client *core.SunsetTimesSDK, entopts map[string]any) core.SunsetTimesEntity {
		return entity.NewSunriseAndSunsetEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewSunsetTimesSDK = core.NewSunsetTimesSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewSunsetTimesSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *SunsetTimesSDK  { return NewSunsetTimesSDK(nil) }
func Test() *SunsetTimesSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
