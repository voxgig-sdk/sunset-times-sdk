# SunsetTimes SDK

Sunrise, sunset, twilight and solar noon times for any latitude/longitude worldwide

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Sunset Times API

[Sunrise Sunset](https://sunrise-sunset.org) is a small REST API that returns sunrise, sunset and twilight times for any point on Earth. The service is hosted at `https://api.sunrise-sunset.org` and is free to use without an API key.

What you get from the API:

- `sunrise`, `sunset` and `solar_noon` times
- `day_length` in seconds (or formatted)
- Civil, nautical and astronomical twilight begin/end times
- Optional timezone-aware output via the `tzid` parameter (e.g. `UTC`, `Africa/Lagos`)
- JSONP support via the `callback` parameter

The single endpoint is `GET /json` with required `lat` and `lng` query parameters and optional `date` (YYYY-MM-DD, defaults to today), `formatted` (0 or 1), `tzid` and `callback`. Responses include a `status` field with values such as `OK`, `INVALID_REQUEST`, `INVALID_DATE`, `INVALID_TZID` or `UNKNOWN_ERROR`. CORS is enabled and attribution back to sunrise-sunset.org is expected.

## Try it

**TypeScript**
```bash
npm install sunset-times
```

**Python**
```bash
pip install sunset-times-sdk
```

**PHP**
```bash
composer require voxgig/sunset-times-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/sunset-times-sdk/go
```

**Ruby**
```bash
gem install sunset-times-sdk
```

**Lua**
```bash
luarocks install sunset-times-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { SunsetTimesSDK } from 'sunset-times'

const client = new SunsetTimesSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o sunset-times-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "sunset-times": {
      "command": "/abs/path/to/sunset-times-mcp"
    }
  }
}
```

## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **SunriseAndSunset** | Sunrise, sunset, solar noon, day length and the three twilight phases (civil, nautical, astronomical) for a given latitude/longitude and optional date — served from `GET /json?lat={lat}&lng={lng}`. | `/json` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from sunsettimes_sdk import SunsetTimesSDK

client = SunsetTimesSDK({})


# Load a specific sunriseandsunset
sunriseandsunset, err = client.SunriseAndSunset(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'sunsettimes_sdk.php';

$client = new SunsetTimesSDK([]);


// Load a specific sunriseandsunset
[$sunriseandsunset, $err] = $client->SunriseAndSunset(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/sunset-times-sdk/go"

client := sdk.NewSunsetTimesSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "SunsetTimes_sdk"

client = SunsetTimesSDK.new({})


# Load a specific sunriseandsunset
sunriseandsunset, err = client.SunriseAndSunset(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("sunset-times_sdk")

local client = sdk.new({})


-- Load a specific sunriseandsunset
local sunriseandsunset, err = client:SunriseAndSunset(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = SunsetTimesSDK.test()
const result = await client.SunriseAndSunset().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = SunsetTimesSDK.test(None, None)
result, err = client.SunriseAndSunset(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = SunsetTimesSDK::test(null, null);
[$result, $err] = $client->SunriseAndSunset(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.SunriseAndSunset(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = SunsetTimesSDK.test(nil, nil)
result, err = client.SunriseAndSunset(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:SunriseAndSunset(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Sunset Times API

- Upstream: [https://sunrise-sunset.org](https://sunrise-sunset.org)
- API docs: [https://sunrise-sunset.org/api](https://sunrise-sunset.org/api)

- Free service for sunrise/sunset data with no authentication required.
- Attribution is required: link back to [sunrise-sunset.org](https://sunrise-sunset.org).
- Usage must not exceed reasonable request volume.
- No published rate limit, but excessive traffic may be throttled.

---

Generated from the Sunset Times API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
