<template>
    <div class="rightContainer">
      <div id="cityNameBox">
              <div class="cityName">
                  <p>san fran</p>
                  <p>jan</p>
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
              <i class="fas fa-home"></i>
              <i class="fas fa-search-location"></i>
              <i class="fas fa-chart-line"></i>
              <i class="fas fa-cog"></i>
          </nav>
    </div>
  </template>

<script>
import Map from '../components/Map.vue'
export default {
    components:{
        Map,
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/main.scss';
@import '~/assets/scss/subview.scss';
</style>