// https://nuxt.com/docs/api/configuration/nuxt-config
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import path from 'node:path';
require("dotenv").config({path:process.env.ENV_PATH})



module.exports = {
  runtimeConfig:{
    public:{
      ENV_TYPE:process.env.ENV_TYPE,
      OPEN_WEATHER_API_KEY:process.env.OPEN_WEATHER_API_KEY,
      KAKAO_MAP_API_KEY:process.env.KAKAO_MAP_API_KEY,
    },
    private:{
    },
  },
  env:process.env,
  devtools: { enabled: true },
  resolve: {
    extensions: [".js", ".vue"],
    alias: {
      "~": path.resolve(__dirname, ""),
      assets: path.resolve(__dirname, "assets"),
    },
  },
  head: {
    title: 'vue_weather2',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    script:[
      // {
      // src:'https://kit.fontawesome.com/e73c4d3d72.js',
      // crossorigin:"anonymous"
      // }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/reset-css@5.0.1/reset.min.css'},
      { rel: 'preconnect', href: 'https://fonts.googleapis.com'},
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin:true},
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap'},
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'},
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'},
    ],

  },
  css:[
    '@/assets/scss/main.scss',
    '@/assets/scss/mainview.scss',
    '@/assets/scss/subview.scss',
    '@fortawesome/fontawesome-svg-core/styles.css',
    // 'https://cdn.jsdelivr.net/npm/reset-css@5.0.1/reset.min.css'
  ],
  plugins:[
    {src:'~/plugins/fontawesome.js',},
    // { src: 'dayjs', mode: 'client' },
  ],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  ssr: false,
  // component:[],
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // Sass loader 모듈 추가
    '@nuxtjs/style-resources',
    // '@nuxtjs/dotenv',
  ],
  modules: [
    'dayjs-nuxt',
  ],
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },
  // dotenv:{
  //   path:'.locd.env'
  // },
  styleResources:{
    scss:[
      '@/assets/scss/main.scss',
      '@/assets/scss/mainview.scss',
      '@/assets/scss/subview.scss',
    ]
  }
}