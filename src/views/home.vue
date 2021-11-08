<script setup>
  import { reactive,onMounted,getCurrentInstance,ref } from 'vue'
  import { Message } from '@arco-design/web-vue'

  const form = reactive({
    name: '',
    post: '',
    isRead: false,
  })
  const handleClickItem = (item) =>{
   console.log(item,11)
  }
  const handleClickMessage = () => {
    // Message.warning('你知道个叼毛！')
    less.modifyVars({
      '@themeColor': 'a0a1b9'
    }).then(()=>{
      Message.success('你知道个叼毛！')
    })
  }
  
  let { proxy } = getCurrentInstance();
  const chart = ref(null)
  const mapOption = ref({
      backgroundColor: "#FFFFFF",
      geo: {
        map: "tw",
        roam: false,
        zoom: 1,
        scaleLimit: { min: 1, max: 13 }, // 缩放级别
        regions: [
          {
            name: "南海诸岛",
            value: 0,
            itemStyle: {
              // normal: {
              //   opacity: 0,
              //   label: {
              //     show: false,
              //   },
              // },
            },
          },
        ],
        itemStyle: {
          areaColor: "#BEDAEE", //默认的地图板块颜色
          borderWidth: 1,
          borderColor: "#009ce0",
        },
      },
      title: {
        text: "台湾地图",
        x: "center",
        y: 20,
      },
      tooltip: {
        trigger: "item",
      },

      //配置属性
      series: [
        {
          name: "数据",
          type: "map",
          map: "tw",
          center: [120.912,23.670], //视角中心点
          aspectScale: 0.75,
          roam: 'scale', //缩放、平移
          geoIndex: 0,
          emphasis: {
            focus: 'self',
            label: {
              show: false,
            },
          },
          data: [
            { name: '台北市',value: Math.round(Math.random() * 500)},
            { name: '新北市',value: Math.round(Math.random() * 500)},
            { name: '基隆市',value: Math.round(Math.random() * 500)},
            { name: '宜蘭縣',value: Math.round(Math.random() * 500)},
            { name: '新竹市',value: Math.round(Math.random() * 500)},
            { name: '新竹縣',value: Math.round(Math.random() * 500)},
            { name: '桃園市',value: Math.round(Math.random() * 500)},
            { name: '苗栗縣',value: Math.round(Math.random() * 500)},
            { name: '台中市',value: Math.round(Math.random() * 500)},
            { name: '彰化縣',value: Math.round(Math.random() * 500)},
            { name: '南投縣',value: Math.round(Math.random() * 500)},
            { name: '雲林縣',value: Math.round(Math.random() * 500)},
            { name: '嘉義市',value: Math.round(Math.random() * 500)},
            { name: '嘉義縣',value: Math.round(Math.random() * 500)},
            { name: '台南市',value: Math.round(Math.random() * 500)},
            { name: '高雄市',value: Math.round(Math.random() * 500)},
            { name: '屏東縣',value: Math.round(Math.random() * 500)},
            { name: '台東縣',value: Math.round(Math.random() * 500)},
            { name: '花蓮縣',value: Math.round(Math.random() * 500)},
            { name: '金門縣',value: Math.round(Math.random() * 500)}
          ], //数据
        },
      ],
    });
    onMounted(() => {
      chart.value = proxy.$echarts.init(
        document.getElementById("myMap"),
        // "macarons"
      );
      chart.value.setOption(mapOption.value);
      // this.chart.on("click", function(params) {
      //   //此点击事件也可以做为其他echarts图表的点击 事件
      //   alert(params.name);
      //   console.info(params);
      // });
      
    });

  defineExpose({
    // a,
    form,
    handleClickItem,
    handleClickMessage
  })
</script>

<template>
  <div class="page-home">
    <h5>首页</h5> 
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

    <div class="map-container">
      <div id="myMap" class="twmap" ref="myMap"></div>
    </div>
  </div>
</template>

<style>
.map-container {
  width: 800px;
  height: 600px;
  margin: 0 auto;
}
.twmap {
  width: 100%;
  height: 100%;
}
</style>
