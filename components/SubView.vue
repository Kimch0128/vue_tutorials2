<template>
    <div class="rightContainer">
      <div id="cityNameBox">
              <div class="cityName">
                  <p>{{cityName}}</p>
                  <p>{{currentTime}}</p>
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
// import Map from '../components/Map.vue'

// import { useDayjs } from '#dayjs' // not need if you are using auto import

export default {
    setup() {
        const config = useRuntimeConfig();
        const dayjs = useDayjs();
        const currentTime = dayjs().format("YYYY. MM. DD. ddd");    

        const cityName = ref('')
        const feeling = ref('')

        const fetchOpenWheatherApi = async () => {
            
            let initiaLat = 36.5683;
            let initiaLon = 126.9778;

            await useFetch('https://api.openweathermap.org/data/3.0/onecall',
            {
                method:'get',
                query:{
                    lat:initiaLat,
                    lon:initiaLon,
                    appid:config.public.OPEN_WEATHER_API_KEY,
                    units:'metric',

                }
            }).then(response => {

                // console.log(response.data)
                if(!!response.error.value){
                    console.log(error.value);
                }

                const data = response.data.value;

                let initiaData = data.current;
                let initalCityName = data.timezone.split("/").at(-1);
                let isFeelLikeTemp = initiaData.feels_like;
                let isTimeOfSunrise = initiaData.sunrise;
                let isTimeOfSunset = initiaData.sunset;
                let isLineOfSight = initiaData.visibility;


                cityName.value = initalCityName;
                feeling.value = isFeelLikeTemp;



            })
        }

        fetchOpenWheatherApi();


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