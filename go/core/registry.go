package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewSunriseAndSunsetEntityFunc func(client *SunsetTimesSDK, entopts map[string]any) SunsetTimesEntity

