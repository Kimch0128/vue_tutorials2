<template>
    <div class="leftContainer">
        <div id="cityNameBox">
            <div class="cityName">
                <p>{{ cityName }}</p>
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
            <div class="weaterBox">
                <div class="weatherDegree">
                    <p>{{Math.round(currentTemp)}}&deg;</p>
                </div>
                <div class="weatherIcon">
                    <img src="~/assets/images/10d.png" alt="mainLogo">
                </div>
                <div class="weatherData">
                    <div v-for="Temporary in TemporaryData" :key="Temporary.title" class="detailData">
                        <p>{{ Temporary.title }}</p>
                        <p>{{ Temporary.value }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div id="todayWeather">
            <div class="textBox">
                <p>시간대별 날씨 정보</p>
                <p>이번주 날씨 보기</p>
            </div>
            <div class="timelyWeatherBox">
                <div class="timelyWeather" v-for="temps in hourlyTemps" :key="temps.dt">
                    <div class="icon">
                        <img src="~/assets/images/09d.png" alt="">
                    </div>
                    <div class="data">
                        <p class="time">{{Unix_timestamp(temps.dt)}}</p>
                        <p class="currentDegree"> {{ Math.round(temps.temp) }}&deg;</p>
                        <div>
                            <img src="~/assets/images/50d.png" alt="temps.weather.description">
                            <p class="fall">{{temps.humidity}}%</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <nav>
<!--             
            <i class="fas fa-home"></i>
            <i class="fas fa-search-location"></i>
            <i class="fas fa-chart-line"></i>
            <i class="fas fa-cog"></i> -->

            <font-awesome-icon icon='fas fa-home' class="white-icon"></font-awesome-icon>
            <font-awesome-icon icon="fas fa-search-location" class="white-icon"></font-awesome-icon>
            <font-awesome-icon icon="fas fa-chart-line" class="white-icon"></font-awesome-icon>
            <font-awesome-icon icon="fas fa-cog" class="white-icon"></font-awesome-icon>
        </nav>
    </div>
</template>

<script>
import axios from 'axios';
import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");

export default {
    data() {
        return {
            tempdata:Object,
            //dayjs
            currentTime:dayjs().format("YYYY . MM . DD . ddd"),
            currentTemp: "",//현재온도

            //48시간 데이터
            hourlyTemps:[],

            //상세 날씨 데이터
            temps: [],
            icons:[],
            cityName:"",
            //임시 데이터
            TemporaryData: [
                {
                    title : "습도",
                    value : ""
                },
                {
                    title : "풍속",
                    value : ""
                },
                {
                    title : "체감온도",
                    value : ""
                },
            ]
        }
    },
    created() {
        const config = useRuntimeConfig();
        let initiaLat = 36.5683;
        let initiaLon = 126.9778;
        axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${initiaLat}&lon=${initiaLon}&appid=${config.public.OPEN_WEATHER_API_KEY}&units=metric`)
        .then(response => {
            let data = response.data;

            this.tempdata = data

            let initalCityName = data.timezone
            this.cityName = initalCityName.split("/").at(-1);
            this.currentTemp = data.current.temp;
            this.temp = Math.round(data.current.temp);
            this.TemporaryData[0].value = data.current.humidity+"%";
            this.TemporaryData[1].value = data.current.wind_speed+"m/s";
            this.TemporaryData[2].value = Math.round(data.current.feels_like)+"도";

            this.hourlyTemps = Object.values(data.hourly);
        })
        .catch(
            error=>
            {
                console.log(error)
            }
        )
    },
    methods:{
        //리눅스 타임 컨버터
        Unix_timestamp (dt) {
            let date = new Date(dt*1000);
            
            return date.getDate()+"일 "+date.getHours()+"시";
        },
    },
}
</script>

<style lang="scss" scoped>
@import "/assets/scss/main.scss";

.leftContainer {
    width: 324px;
    height: 700px;
    border-radius: 50px;
    background: linear-gradient(#16455f, #0e1239);
    box-shadow: 5px 5px 10px gray;
}

#cityNameBox {
    width: 100%;
    height: 10%;

    .cityName {
        @include c-center;
        width: 100%;
        height: 100%;

        p {
            color: white;
            font-family: "Poppins", sans-serif;
            line-height: 2.5;
            text-align: center;

            &:first-child {
                width: 241px;
                height: 33px;
                font-size: 1.35rem;
            }

            &:last-child {
                width: 160px;
                height: 19px;
                font-size: 0.9rem;
                font-weight: 100;
            }
        }
    }
}

#contentsBox {
    width: 100%;
    height: 62.5%;

    .buttonBox {
        @include center;
        width: 100%;
        height: 20%;

        .buttonBackground {
            width: 224px;
            height: 35px;
            background-color: #052137;
            border-radius: 10px;
            display: flex;

            button {
                width: 112px;
                height: 35px;
                border: 0;
                border-radius: 7.5px;
                outline: 0;
                cursor: pointer;

                &.forecast {
                    background-color: #0889ff;
                    color: white;
                }

                &.airquality {
                    background: transparent;
                    color: #467599;
                }
            }
        }
    }

    .weaterBox {
        width: 100%;
        height: 80%;

        .weatherDegree {
            @include center;
            width: 100%;
            height: 15%;

            p {
                font-size: 3.5rem;
                font-weight: 500;
                font-family: 'Be Vietnam Pro', sans-serif;
                color: white;
            }
        }

    }

    .weatherIcon {
        @include center;
        width: 100%;
        height: 60%;

        img {
            width: 168px;
            // height: 160px;
        }
    }

    .weatherData {
        display: flex;
        width: 100%;
        height: 25%;

        .detailData {
            @include c-center;
            width: 33.33%;
            height: 100%;

            //레이아웃==3, 동일한 레이아웃 반복
            &:nth-child(1) {
                margin-left: 10px;
            }

            &:nth-child(2) {
                margin-left: 0 -10px;
            }

            &:nth-child(3) {
                margin-right: 10px;
            }

            p {
                line-height: 1.5;
                color: white;

                &:first-child {
                    font-size: 1rem;
                    font-weight: 300;
                    font-family: 'Noto Sans KR', sans-serif;
                    color: #799ed0;
                }

                &:last-child {
                    font-size: 1rem;
                    font-weight: 200;
                    font-family: 'Noto Sans KR', sans-serif;
                }
            }
        }
    }
}

#todayWeather {
    width: 100%;
    height: 17.5%;

    .textBox {
        @include center-sb;
        width: calc(100% - 70px);
        height: 35%;
        padding: 0 35px;
        font-family: 'Noto Sans KR', sans-serif;

        p {
            font-weight: 400;
            font-size: 0.8rem;
            color: white;
            text-align: center;

            &:last-child {
                font-weight: 400;
                font-size: 0.8rem;
                color: #0085ff;
                cursor: pointer;
                margin-left: 2px;
            }
        }
    }

    .timelyWeatherBox {
        display: flex;
        align-items: center;
        width: calc(100% - 70px);
        height: 65%;
        padding: 0 30px;

        -ms-overflow-style: none;
        scrollbar-width: none;

        overflow: scroll;

        &::-webkit-scrollbar {
            display: none;
        }

        .timelyWeather {
            display: flex;
            min-width: 126px;
            width: 126px;
            height: 70px;
            background-color: #0989ff;
            border-radius: 20px;
            margin-left: 15px;

            &:first-child {
                margin-left: 0;
            }

            .icon {
                @include center;
                width: 45%;
                height: 100%;

                img {
                    width: 100%;
                }
            }

            .data {
                @include c-center-se;
                width: 55%;
                height: 100%;

                p {
                    color: whitesmoke;
                    font-family: 'Poppins', sans-serif;
                    text-align: center;

                    &.time {
                        font-size: 0.8rem;
                        font-weight: 200;
                        margin-top: 7.5px;
                    }

                    &.currentDegree {
                        font-size: 1.2rem;
                        margin-top: 7.5px;
                    }
                }

                div {
                    @include center;
                    width: 100%;
                    height: 33.33%;

                    img {
                        height: 55%;
                    }

                    .fall {
                        font-size: 0.9rem;
                        margin-top: 1.5px;
                    }
                }
            }
        }
    }
}

nav{
    @include center-sb;
    width: calc(100% - 100px);
    height: 10%;
    padding: 0 50px;

    i{
        // color: rgb(255,255,255);
        color: rgb(255,0,255);
        font-size: 1.15rem;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover{
            color: #799ed0;
        }
    }
}
</style>