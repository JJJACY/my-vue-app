<script setup>
import { reactive, ref, onMounted, watch } from 'vue'
import { Message } from '@arco-design/web-vue'
// import axios from 'axios'

const form = reactive({
  name: '',
  post: '',
  isRead: false
})
const handleClickItem = (item) => {
  console.log(item, 11)
}
const handleClickMessage = () => {
  Message.warning('你知道个叼毛！')
  // less.modifyVars({
  //   'themeColor': 'a0a1b1'
  // }).then(()=>{
  //   Message.success('你知道个叼毛！')
  // })
}

// const mapContainer = ref(null)
const mapInfo = reactive({
  name: '',
  text: ''
})

watch(() => [form.name, form.post], (newVal, oldVal) => {
  console.log(newVal, oldVal, 32)
  form.name = newVal[0]
  form.post = newVal[1]
})

// onMounted(() => {
//   // 用外層的 div 當 svg 的寬高
//   const width = (mapContainer.value.offsetWidth).toFixed()
//   const height = (mapContainer.value.offsetHeight).toFixed();

//   // 判斷螢幕寬度，給不同放大值
//   let mercatorScale, w = window.screen.width;
//   if(w > 1366) {
//     mercatorScale = 11000;
//   }
//   else if(w <= 1366 && w > 480) {
//     mercatorScale = 9000;
//   }
//   else {
//     mercatorScale = 6000;
//   }

//   //https://github.com/d3/d3/blob/main/CHANGES.md#geographies-d3-geo
//   // d3.geo.path ↦ d3.geoPath
//   // d3.geo.mercator ↦ d3.geoMercator

//   // d3：svg path 產生器
//   var path = d3.geoPath().projection(
//     d3.geoMercator()                    //墨卡托投影
//       .center([121,24])                 //链式写法，.center([longitude, latitude])设置地图中心
//       .scale(mercatorScale)             //设置地图缩放
//       .translate([width/2, height/2.5]) //设置偏移
//   );

//   // 讓d3抓svg，並寫入寬高
//   var svg = d3.select('#svg')
//     .attr('width', width)
//     .attr('height', height)
//     .attr('viewBox', `0 0 ${width} ${height}`);

//   // 讓d3抓GeoJSON檔，並寫入path的路徑
//   var url = '../newTw.json'; // GeoJSON的檔案路徑
//   d3.json(url).then((res) => {
//     svg
//       .selectAll('path')
//       .data(res.features)
//       .enter().append('path')
//       .attr('d', path)
//       .attr(
//         // 設定id，為了click時加class用
//         'id',(d) => ('city' + d.properties.COUNTYCODE)
//       )
//       .on('click',function(d,i) {
//         console.log(d,i)
//         mapInfo.name = i.properties.COUNTYNAME
//         mapInfo.text = i.properties.COUNTYENG
//         if(document.querySelector('.active')) {
//           document.querySelector('.active').classList.remove('active');
//           document.getElementById('city' + i.properties.COUNTYCODE).classList.remove('active');
//         }
//         //被點擊的縣市加上 .active
//         document.getElementById('city' + i.properties.COUNTYCODE).classList.add('active');
//       })
//   })
//   axios.get(url).then(res => {
//     svg
//     .selectAll('path')
//     .data(res.data.features)
//     .enter().append('path')
//     .attr('d', path)
//     .attr('id',(d) => ('city' + d.properties.COUNTYCODE))
//     .on('click', (d,i) => {
//       mapInfo.name = i.properties.COUNTYNAME
//       mapInfo.text = i.properties.COUNTYENG
//       if(document.querySelector('.active')) {
//         document.querySelector('.active').classList.remove('active');
//       }
//       // 被點擊的縣市加上 .active
//       document.getElementById('city' + i.properties.COUNTYCODE).classList.add('active');
//     });
//   })
// })
defineExpose({
  form,
  handleClickItem,
  handleClickMessage,
  mapInfo
})
</script>

<template>
  <div class="page-home">
    <h5>{{ $t("nav.home.name") }}</h5>
    <a-form :model="form" :style="{width:'600px'}">
      <a-form-item field="name" label="Username">
        <a-input v-model="form.name" placeholder="please enter your username..." />
        <template #help>
          <div>help message</div>
        </template>
      </a-form-item>
      <a-form-item field="post" label="Post">
        <a-input v-model="form.post" placeholder="please enter your post..." />
      </a-form-item>
      <a-form-item field="isRead">
        <a-checkbox v-model="form.isRead" class="arcoblue-6">
          I have read the manual
        </a-checkbox>
      </a-form-item>
      <a-form-item>
        <a-button @click="handleClickMessage">Submit</a-button>
      </a-form-item>
    </a-form>

    <!-- <svg class="twmap"></svg> -->
    <div ref="mapContainer" class="map-container">
      <!-- <div id="myMap" class="twmap" ref="myMap"></div> -->
      <div style="width: 200px">
        <h1>{{ mapInfo.name }}</h1>
        <h1>{{ mapInfo.text }}</h1>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.map-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 600px;
  height: 800px;
  margin: 0 auto;
  background: linear-gradient(to right, #414345, #232526);
}

svg {
  height: 100%;
}

path {
  fill: transparent;
  stroke: #FFF;
  cursor: pointer;
  transition: fill .2s ease, stroke .2s ease, transform .2s ease;
  &:hover, &.active {
    fill: rgba(#FFCA28, .5);
    stroke: #FFCA28;
    transform: translateY(-5px)
  }
}
</style>
