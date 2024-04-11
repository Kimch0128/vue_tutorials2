<template>
    <div class="rightContainer">
        <div id="cityNameBox">
            <div class="cityName">
                <p>{{ cityName }}</p>
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
                    <p>{{feeling}}</p>
                </div>
                <div class="detail">
                    <div class="title">상세 날씨 데이터</div>
                    <div class="data" v-for="(detailData, index) in subWeatherData" :key="index">
                        <div class="dataName">
                            <p></p>
                            <p>{{ detailData.name }}</p>
                        </div>
                        <div class="dataValue">
                            <p>
                                {{ detailData.value }}
                                <span></span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Map />
        <nav>
            <font-awesome-icon icon="home" class="white-icon" />
            <font-awesome-icon icon="search-location" class="white-icon" />
            <font-awesome-icon icon="chart-line" class="white-icon" />
            <font-awesome-icon icon="cog" class="white-icon" />
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

        const subWeatherData = ref([]);
        //리눅스 타임컨버터
        const Unix_timestamp = (dt) => {
            let date = new Date(dt * 1000);

            return date.getDate() + "일 " + date.getHours() + "시";
        }

        //openweather 데이터 조회
        const fetchOpenWheatherApi = async () => {

            let initiaLat = 36.5683;
            let initiaLon = 126.9778;

            await useFetch('https://api.openweathermap.org/data/3.0/onecall',
                {
                    method: 'get',
                    query: {
                        lat: initiaLat,
                        lon: initiaLon,
                        appid: config.public.OPEN_WEATHER_API_KEY,
                        units: 'metric',

                    }
                }).then(response => {

                    // console.log(response.data)
                    if (!!response.error.value) {
                        console.log(error.value);
                    }

                    const data = response.data.value;

                    let initiaData = data.current;
                    let initalCityName = data.timezone.split("/").at(-1);
                    let isFeelLikeTemp = initiaData.feels_like;
                    let isTimeOfSunrise = initiaData.sunrise;
                    let isTimeOfSunset = initiaData.sunset;
                    let isLineOfSight = initiaData.visibility;

                    if(isFeelLikeTemp > 30) feeling.value = "매우더움";
                    else if(isFeelLikeTemp <= 30) feeling.value = "더움";
                    else if(isFeelLikeTemp <= 25) feeling.value = "보통";
                    else if(isFeelLikeTemp <= 20) feeling.value = "선선함";
                    else if(isFeelLikeTemp <= 15) feeling.value = "쌀쌀함";
                    else if(isFeelLikeTemp <= 10) feeling.value = "추움";
                    else feeling.value = "매우추움";

                    if(isFeelLikeTemp <=0) feeling.value = "매우추움"
                    else if(isFeelLikeTemp <= 10) feeling.value = "추움"
                    else if(isFeelLikeTemp <= 15) feeling.value = "쌀쌀함"
                    else if(isFeelLikeTemp <= 20) feeling.value = "선선함"
                    else if(isFeelLikeTemp <= 25) feeling.value = "보통"
                    else if(isFeelLikeTemp <= 30) feeling.value = "더움"
                    else feeling.value = "매우더움"

                    let isProcesseData = [
                        { name: "일출시간", value: Unix_timestamp(isTimeOfSunrise) },
                        { name: "일몰시간", value: Unix_timestamp(isTimeOfSunset) },
                        { name: "가시거리", value: isLineOfSight.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+"M" }
                    ]

                    subWeatherData.value = isProcesseData;

                    cityName.value = initalCityName;



                })
        }

        fetchOpenWheatherApi();


        return {
            currentTime,
            cityName,
            feeling,
            subWeatherData,
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/main.scss';
@import '~/assets/scss/subview.scss';
</style>