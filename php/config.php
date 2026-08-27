<?php
declare(strict_types=1);

// SunsetTimes SDK configuration

class SunsetTimesConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "SunsetTimes",
                "slug" => "sunset-times",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
        ],
            ],
            "options" => [
                "base" => "https://api.sunrise-sunset.org",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "sunrise_and_sunset" => [],
                ],
            ],
            "entity" => [
        'sunrise_and_sunset' => [
          'fields' => [
            [
              'name' => 'results',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'status',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'tzid',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'sunrise_and_sunset',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'callback',
                        'orig' => 'callback',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => '2026-02-15',
                        'kind' => 'query',
                        'name' => 'date',
                        'orig' => 'date',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 1,
                        'kind' => 'query',
                        'name' => 'formatted',
                        'orig' => 'formatted',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 36.72016,
                        'kind' => 'query',
                        'name' => 'lat',
                        'orig' => 'lat',
                        'reqd' => true,
                        'type' => '`$NUMBER`',
                      ],
                      [
                        'example' => -4.42034,
                        'kind' => 'query',
                        'name' => 'lng',
                        'orig' => 'lng',
                        'reqd' => true,
                        'type' => '`$NUMBER`',
                      ],
                      [
                        'example' => 'UTC',
                        'kind' => 'query',
                        'name' => 'tzid',
                        'orig' => 'tzid',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/json',
                  'parts' => [
                    'json',
                  ],
                  'select' => [
                    'exist' => [
                      'callback',
                      'date',
                      'formatted',
                      'lat',
                      'lng',
                      'tzid',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return SunsetTimesFeatures::make_feature($name);
    }
}
