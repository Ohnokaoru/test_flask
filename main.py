from flask import Flask
from datetime import datetime


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
    return f"<h1>Hello Flask~ {now}</h1>"


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
    return books


app.run(debug=True)
