const myChart = echarts.init(document.getElementById('main'));
const sixChart = echarts.init(document.getElementById('six'));

$("#update").click(() => {
    console.log("click");
});

// 呼叫函式
drawPM25()

// 動態繪製
function drawPM25() {
    // 讀取資料顯示loading畫面
    myChart.showLoading();

    $.ajax({
        //找route資料
        url: "/pm25-data",
        type: "GET",
        dataType: "json",
        //如果前面都成功要做什麼? return出來的值
        success: (result) => {
            // console.log(result);

            // jquery取值用法
            document.querySelector("#pm25_high_site").innerText = result["max_data"]["site"];
            // $("#pm25_high_site").text(result["max_data"]["site"]);
            $("#pm25_high_value").text(result["max_data"]["pm25"]);
            $("#pm25_low_site").text(result["min_data"]["site"]);
            $("#pm25_low_value").text(result["min_data"]["pm25"]);


            drawChart(myChart, result["time"], "PM2.5", result["site"], result["pm25"])

            // 讀取完資料讓loading畫面消失
            myChart.hideLoading();

            // 延遲出現
            this.setTimeout(() => {
                drawSixcounty_pm25();
            }, 1000);
        },
        error: () => {
            alert("读取数据失败");
            myChart.hideLoading();
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
};





// 繪製六都PM2.5平均值
function drawSixcounty_pm25() {
    // 讀取資料顯示loading畫面
    sixChart.showLoading();

    $.ajax({
        //找route資料
        url: "/sixcounty-pm25",
        type: "GET",
        dataType: "json",
        //如果前面都成功要做什麼? return出來的值
        success: (result) => {
            console.log(result);

            // jquery取值用法

            drawChart(sixChart, "六都PM2.5平均值", "PM2.5", result["site"], result["pm25"])

            // 讀取完資料讓loading畫面消失
            sixChart.hideLoading();

        },
        error: () => {
            alert("读取数据失败");
            sixChart.hideLoading();
        }


    });
};
