from flask import Flask, render_template
from datetime import datetime
from pm25 import get_pm25, get_county_pm25, six_countys
import json

# 全域端
books = {1: "Python book", 2: "Java book", 3: "Flask book"}

app = Flask(__name__)


# 多參數網址
@app.route("/sum/x=<x>&y=<y>")
def get_sum(x, y):
    try:
        return f"總和:{eval(x)+eval(y)}"

    except Exception as e:
        print(e)
        return "數值輸入錯誤"


# 共用首頁邏輯
@app.route("/hi")
# 首頁
@app.route("/")
# 做動邏輯
def index():
    print(datetime.now())
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    name = "kaoru"
    return render_template("index.html", time=now, username=name)


# 單一參數網址
@app.route("/books/<int:id>")
def get_book(id):
    try:
        return books[id]

    except Exception as e:
        print(e)

        return "此編號，無書籍"


# 不帶參數網址
@app.route("/books")
def get_books():
    books = {
        1: {
            "name": "Python book",
            "price": 299,
            "image_url": "https://im2.book.com.tw/image/getImage?i=https://www.books.com.tw/img/CN1/136/11/CN11361197.jpg&v=58096f9ck&w=348&h=348",
        },
        2: {
            "name": "Java book",
            "price": 399,
            "image_url": "https://im1.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/087/31/0010873110.jpg&v=5f7c475bk&w=348&h=348",
        },
        3: {
            "name": "C# book",
            "price": 499,
            "image_url": "https://im1.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/036/04/0010360466.jpg&v=62d695bak&w=348&h=348",
        },
    }
    # 測試用
    # for id in books:
    #     print(
    #         f"{id} 名稱:{books[id]['name']} 價格:{books[id]['price']} 圖片:{books[id]['image_url']}"
    #     )

    return render_template("books.html", books=books)


@app.route("/pm25-table")
def pm25_table():
    # 呼叫外部模組的函式
    cols, values = get_pm25()

    return render_template("pm25-table.html", cols=cols, values=values)


# 繪圖
@app.route("/pm25-charts")
def pm25_charts():
    return render_template("pm25-charts.html")


# 資料不想給外部看到，methods=["POST"]
@app.route("/pm25-data", methods=["GET"])
def pm25_data():
    cols, values = get_pm25()
    site = [value[0] for value in values]
    pm25 = [value[2] for value in values]
    datetime = values[0][-2]

    # 尋找max與min
    sorted_data = sorted(values, key=lambda x: x[2])
    # print(sorted_data)
    min_data = {"site": sorted_data[0][0], "pm25": sorted_data[0][2]}
    max_data = {"site": sorted_data[-1][0], "pm25": sorted_data[-1][2]}

    # 前端只認識json，所以要以python的dict轉json輸出
    result = json.dumps(
        {
            "site": site,
            "pm25": pm25,
            "time": datetime,
            "min_data": min_data,
            "max_data": max_data,
        },
        ensure_ascii=False,
    )

    # print(site, pm25)
    return result


@app.route("/sixcounty-pm25")
def get_sixcounty_pm25():
    pm25 = get_county_pm25()

    result = json.dumps(
        {"pm25": pm25, "site": six_countys},
        ensure_ascii=False,
    )

    return result


# print(pm25_data())

app.run(debug=True)
