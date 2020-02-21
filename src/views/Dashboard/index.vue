<template>
    <div>
        首页
        <Chart :option="chartOption" style="height:400px" />
    </div>
</template>
<script>
import Chart from '../../components/Chart'
import request from '../../utils/request'
export default {
    data(){
        return {
            chartOption: {}
        }
    },
    mounted() {
        this.getChart()
    },
    methods: {
        getChart(){
            request({
                method: 'get',
                url: '/api/home/chart',
                params: {
                    id: '123'
                }
            })
            .then( response => {
                this.chartOption = {
                    title: {
                        text: 'ECharts 入门示例'
                    },
                    tooltip: {},
                    legend: {
                        data:['销量']
                    },
                    xAxis: {
                        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                    },
                    yAxis: {},
                    series: [{
                        name: '销量',
                        type: 'bar',
                        data: response
                    }]
                }
            })
        }
    },
    components: {
        Chart
    }
};
</script>