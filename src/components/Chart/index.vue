<template>
    <div ref="chartEl"></div>
</template>
<script>
import echarts from 'echarts'
import debounce from 'lodash/debounce'
import { addListener, removeListener } from 'resize-detector'
export default {
    props: {
        option:{
            type: Object,
            default: () => {}
        }
    },
    watch: {
        // 该方法需要数据更新后，重新给optios赋值
        option(val){
            this.chart.setOption(val);
        },
        // 该方法则只用改option指定位置的值 但是损耗性能
        // option: {
        //    handler(val){
        //        this.chart.setOption(val);
        //    },
        //    deep: true
        // }
    },
    created(){
        this.resize = debounce(this.resize, 300)
    },
    mounted(){
        this.renderChart()
        addListener(this.$refs.chartEl,this.resize)
    },
    beforeDestroy(){
        removeListener(this.$refs.chartEl,this.resize)
        this.chart.dispose()
        this.chart = null
    },
    methods: {
        resize(){
            this.chart.resize()
        },
        renderChart(){
            this.chart = echarts.init(this.$refs.chartEl);
            this.chart.setOption(this.option);
        }
    }
}
</script>