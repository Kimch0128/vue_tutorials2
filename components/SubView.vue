<template>
    <div class="rightContainer">
      <div id="cityNameBox">
              <div class="cityName">
                  <p>{{cityName}}</p>
                  <p>{{ currentTime }}</p>
              </div>
          </div>
          <div id="contentsBox">
              <div class="buttonBox">
                  <div class="buttonBackground">
                      <button class="forecast">Forecast</button>
                      <button class="airquality">Air Quality</button>
                  </div>
              </div>
              <div class="weatherBox">
                  <div class="airCondition">
                      <p>매우추움</p>
                      <!-- <p>{{ feeling }}</p> -->
                  </div>
                  <div class="detail">
                      <div class="title">ssss</div>
                      <div class="data">
                          <div class="dataName">
                              <p></p>
                              <p></p>
                          </div>
                          <div class="dataValue">
                              <p>
                                  <span></span>&deg;
                              </p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <Map/>
          <nav>
            <font-awesome-icon icon="home" class="white-icon"/>
            <font-awesome-icon icon="search-location" class="white-icon"/>
            <font-awesome-icon icon="chart-line" class="white-icon"/>
            <font-awesome-icon icon="cog" class="white-icon"/> 
              <!-- <i class="fas fa-home"></i>
              <i class="fas fa-search-location"></i>
              <i class="fas fa-chart-line"></i>
              <i class="fas fa-cog"></i> -->
          </nav>
    </div>
  </template>

<script>
import { faChessBishop } from '@fortawesome/free-solid-svg-icons';


export default {
    components:{
        Map,
    },
    setup(){
        let dayjs = useDayjs();
        let currentTime = dayjs().format("YYYY. MM. DD. ddd");
        let cityName = ref("");
        let feeling = ref("")

        const config = useRuntimeConfig();
        let initiaLat = 36.5683;
        let initiaLon = 126.9778;
        let url = `https://api.openweathermap.org/data/3.0/onecall`

        //openweather api 조회 함수
        const fetchOpenWeatherApi = async () =>{
            await useFetch(url,{
                method: 'get',
                query:{lat:initiaLat,
                    lon:initiaLon,
                    appid:config.public.OPEN_WEATHER_API_KEY,
                    units:'metric'}
            },).then(response=>{
                let data = response.data.value;

                //초기데이터
                let isInitialData = data.current;
                //초기 도시이름 데이터
                let isInitialCityName = data.timezone;
                //초기데이터 > 체감온도
                let isFeelLikeTemp = isInitialData.feels_like;
                //초기데이터 > 일출시간
                let isTimeOfSunrise = isInitialData.sunrise
                //초기데이터 > 일몰시간
                let isTimeOfSunset = isInitialData.sunset
                //초기데이터 > 가시거리
                let isLineOfSight = isInitialData.visibility

                cityName.value = isInitialCityName.split("/").at(-1);;
                feeling.value = isFeelLikeTemp;

                console.log(cityName.value);
                console.log(feeling.value)
            })
            .catch(
                error=>{
                    console.log(error);
                }
            );
        };

        fetchOpenWeatherApi();
        // const { data, pending, error, refresh } = 
        return{
            currentTime,
            cityName,
            feeling
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/main.scss';
@import '~/assets/scss/subview.scss';
</style>