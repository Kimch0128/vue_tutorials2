<template>
    <div id="mapContainer">
        <div id="map"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    mounted() {
        if (window.kakao && window.kakao.maps) {
            this.initMap();
        } else {
            const script = document.createElement('script');
            /* global kakao */
            script.onload = () => kakao.maps.load(this.initMap);
            script.src =
                `http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.KAKAO_MAP_API_KEY}`;
            document.head.appendChild(script);
        }
    },
    methods: {
        initMap() {
            var mapContainer = document.getElementById('map'), // 지도를 표시할 div
                mapOption = {
                    center: new kakao.maps.LatLng(37.564343, 126.947613), // 지도의 중심좌표
                    level: 3, // 지도의 확대 레벨
                };

            var map = new kakao.maps.Map(mapContainer, mapOption);
            var positions = [
                {
                    label: "서울",
                    latlng: new kakao.maps.LatLng(37.5683, 126.9778),
                    cityName: "Seoul"
                },
                {
                    label: "인천",
                    latlng: new kakao.maps.LatLng(37.40864282648822, 126.65071862847725),
                    cityName: "Incheon"
                },
                {
                    label: "수원",
                    latlng: new kakao.maps.LatLng(37.2911, 127.0089),
                    cityName: "Suwon"
                },
                {
                    label: "대전",
                    latlng: new kakao.maps.LatLng(36.3519957815787, 127.39131469478555),
                    cityName: "Daejeon"
                },
                {
                    label: "태백",
                    latlng: new kakao.maps.LatLng(37.15818414766273, 128.928560966107),
                    cityName: "Taebaek"
                },
                {
                    label: "강릉",
                    latlng: new kakao.maps.LatLng(37.791688035246636, 128.82867301427635),
                    cityName: "Gangneung"
                },
                {
                    label: "대구",
                    latlng: new kakao.maps.LatLng(35.871148697228875, 128.61345034272617),
                    cityName: "Daegu"
                },
                {
                    label: "울산",
                    latlng: new kakao.maps.LatLng(35.5372, 129.3167),
                    cityName: "Ulsan"
                },
                {
                    label: "부산",
                    latlng: new kakao.maps.LatLng(35.185997613083536, 129.0662809358643),
                    cityName: "Busan"
                },
                {
                    label: "전주",
                    latlng: new kakao.maps.LatLng(35.90493196781132, 127.17357575637105),
                    cityName: "Jeonju"
                },
                {
                    label: "광주",
                    latlng: new kakao.maps.LatLng(35.166611792579545, 126.84603104436039),
                    cityName: "Gwangju"
                },
                {
                    label: "목포",
                    latlng: new kakao.maps.LatLng(34.823630139082525, 126.39766650967137),
                    cityName: "Mokpo"
                },
                {
                    label: "제주도",
                    latlng: new kakao.maps.LatLng(33.5097, 126.5219),
                    cityName: "Jeju"
                }
            ];

            console.log(positions);
            //마커 생성
            positions.forEach(function (pos) {
                var marker = new kakao.maps.Marker({
                    position: pos.latlng,//마커위치
                })
                marker.setMap(map);
            });


        }
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/main.scss';

#mapContainer {
    @include center;
    width: 100%;
    height: 35%;
    // background-color: whitesmoke;

    #map {
        width: 80%;
        height: 90%;
        border-radius: 10px;
    }
}
</style>