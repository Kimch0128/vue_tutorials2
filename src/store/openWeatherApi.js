export default{
    namespaced: true,
    // state : 실제로 취급해야하는 데이터
    state:{
        cityName: "Seoul",
        currentWeather: {
            currentTemp: 0,
            currentHumidity: 0,
            currentWindSpeed: 0,
            currentFellsLike: 0,
            currentSunrise: 0,
            currentSunset: 0,
            currentVisibility: 0,
        },
        hourlyWeather:[],
        images:[],
    },
    // getters: 계산된 상태의 데이터를 만들어내는 속성
    // computed와 비슷한 기능을 한다.
    getters:{},
    //mutations, actions: methods와 유사한 기능을 가지고 있다.
    // 1. mutations: 변이 메서드, 우리가 관리하는 데이터(state)를 변경 즉, state안의 데이터는 오로지 mutations에서만 변경
    mutations:{},
    // 2. actions: 특정한 데이터를 직접적으로 수정하는 것이 허용되지 않는다.
    // 위 사항이 가장 주의해야할 사항, 비동기로 동작
    actions:{
        // actions 부분에선 mutations처럼 state를 바로 불르는게 불가능
        // context라는 객체데이터를 호출하여 context를 참조하여 데이터를 불러온다.
        // context 안에 state, getters, mutation을 활용할 수 있는 내용이 드렁있다.

        async RETCH_POENWEATHER_API(context){
            let initiaLat = 36.5683;
            let initiaLon = 126.9778;
            const config = useRuntimeConfig();

            try {
                const res = await useFetch('https://api.openweathermap.org/data/3.0/onecall',
                {
                    method: 'get',
                    query: {
                        lat: initiaLat,
                        lon: initiaLon,
                        appid: config.public.OPEN_WEATHER_API_KEY,
                        units: 'metric',

                    }
                })   
            } catch (error) {
                console.log(error)
                
            }
        }
    },
}