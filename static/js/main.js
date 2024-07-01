const myChart = echarts.init(document.getElementById('main'));
const sixChart = echarts.init(document.getElementById('six'));
const select_county = echarts.init(document.getElementById('county'));

$("#update").click(() => {
    console.log("click");
});



// select option
$("#select_county").change(() => {
    county = $("#select_county").val()
    console.log(county);
    drawOnecounty_pm25(county)
});




function drawChart(chart, title, legend, xData, yData, color = "#40A578") {
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
                data: yData,
                itemStyle: {
                    color: color
                }
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    chart.setOption(option);
};






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

            // 延遲出現
            this.setTimeout(() => {
                drawChart(myChart, result["time"], "PM2.5", result["site"], result["pm25"], "#FF4191")

                drawSixcounty_pm25();
                drawOnecounty_pm25("彰化縣")

                // 讀取完資料讓loading畫面消失
                myChart.hideLoading();

            }, 1000);


        },
        error: () => {
            alert("读取数据失败");
            myChart.hideLoading();
        }


    });
}






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

            this.setTimeout(() => {
                drawChart(sixChart, "六都PM2.5平均值", "PM2.5", result["site"], result["pm25"], "#FFA62F")

                // 讀取完資料讓loading畫面消失
                sixChart.hideLoading();
            }, 1000);


        },
        error: () => {
            alert("读取数据失败");
            sixChart.hideLoading();
        }


    });
};






// 畫單一縣市
function drawOnecounty_pm25(county) {
    // 讀取資料顯示loading畫面
    select_county.showLoading();

    $.ajax({
        //找route資料
        url: `/county-pm25-data/${county}`,
        type: "GET",
        dataType: "json",
        //如果前面都成功要做什麼? return出來的值
        success: (result) => {
            console.log(result);


            this.setTimeout(() => {
                drawChart(select_county, county, "PM2.5", result["site"], result["pm25"])

                // 讀取完資料讓loading畫面消失
                select_county.hideLoading();
            }, 1000);
        },
        error: () => {
            alert("读取数据失败");
            select_county.hideLoading();
        }


    });
};

















