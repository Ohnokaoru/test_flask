const myChart = echarts.init(document.getElementById('main'));

// 呼叫函式
drawPM25()

// 動態繪製
function drawPM25() {
    $.ajax({
        //找route資料
        url: "/pm25-data",
        type: "GET",
        dataType: "json",
        //如果前面都成功要做什麼? return出來的值
        success: (result) => {
            // console.log(result);
            drawChart(myChart, result["time"], "PM2.5", result["site"], result["pm25"])

            // jquery取值用法
            $("#pm25_high_site").text(result["max_data"]["site"]);
            $("#pm25_high_value").text(result["max_data"]["pm25"]);
            $("#pm25_low_site").text(result["min_data"]["site"]);
            $("#pm25_low_value").text(result["min_data"]["pm25"]);

        },
        error: () => {
            console.error("读取数据失败");
        }


    });
}

function drawChart(chart, title, legend, xData, yData,) {
    // 基于准备好的dom，初始化echarts实例


    // 指定图表的配置项和数据
    let option = {
        title: {
            text: title
        },
        tooltip: {},
        legend: {
            data: [legend]
        },
        xAxis: {
            data: xData
        },
        yAxis: {},
        series: [
            {
                name: legend,
                type: 'bar',
                data: yData
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    chart.setOption(option);




}
