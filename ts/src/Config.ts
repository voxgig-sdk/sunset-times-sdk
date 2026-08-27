
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'SunsetTimes',
        slug: "sunset-times",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
    },

  }


  options = {
    base: "https://api.sunrise-sunset.org",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      sunrise_and_sunset: {
      },

    }
  }


  entity = {
    "sunrise_and_sunset": {
      "fields": [
        {
          "name": "results",
          "type": "`$OBJECT`"
        },
        {
          "name": "status",
          "type": "`$STRING`"
        },
        {
          "name": "tzid",
          "type": "`$STRING`"
        }
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
                    "type": "`$STRING`"
                  },
                  {
                    "example": "2026-02-15",
                    "kind": "query",
                    "name": "date",
                    "orig": "date",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "formatted",
                    "orig": "formatted",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": 36.72016,
                    "kind": "query",
                    "name": "lat",
                    "orig": "lat",
                    "reqd": true,
                    "type": "`$NUMBER`"
                  },
                  {
                    "example": -4.42034,
                    "kind": "query",
                    "name": "lng",
                    "orig": "lng",
                    "reqd": true,
                    "type": "`$NUMBER`"
                  },
                  {
                    "example": "UTC",
                    "kind": "query",
                    "name": "tzid",
                    "orig": "tzid",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/json",
              "parts": [
                "json"
              ],
              "select": {
                "exist": [
                  "callback",
                  "date",
                  "formatted",
                  "lat",
                  "lng",
                  "tzid"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

