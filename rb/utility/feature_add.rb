# SunsetTimes SDK utility: feature_add
module SunsetTimesUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
