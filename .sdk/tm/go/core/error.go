package core

type SunsetTimesError struct {
	IsSunsetTimesError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewSunsetTimesError(code string, msg string, ctx *Context) *SunsetTimesError {
	return &SunsetTimesError{
		IsSunsetTimesError: true,
		Sdk:              "SunsetTimes",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *SunsetTimesError) Error() string {
	return e.Msg
}
