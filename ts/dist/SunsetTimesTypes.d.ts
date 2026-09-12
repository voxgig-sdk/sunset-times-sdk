export interface SunriseAndSunset {
    results?: Record<string, any>;
    status?: string;
    tzid?: string;
}
export interface SunriseAndSunsetLoadMatch {
    callback?: string;
    date?: string;
    formatted?: number;
    lat: number;
    lng: number;
    tzid?: string;
}
