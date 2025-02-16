import pandas as pd

url = "https://data.moenv.gov.tw/api/v2/aqx_p_02?api_key=e8dd42e6-9b8b-43f8-991e-b3dee723a52d&limit=1000&sort=datacreationdate%20desc&format=CSV"
df = None

six_countys = ["臺北市", "新北市", "桃園市", "臺中市", "臺南市", "高雄市"]


def get_pm25():
    # 取得全域端
    global df
    if df is None:
        df = pd.read_csv(url)
        df = df.dropna()

    col = df.columns.tolist()
    values = df.values.tolist()

    return col, values


# 六都datas
def get_county_pm25():
    global df
    if df is None:
        df = pd.read_csv(url)
        df = df.dropna()

    pm25 = []
    for county in six_countys:
        pm25.append(round(df.groupby("county").get_group(county)["pm25"].mean(), 2))

    return pm25


# 各縣市
def get_onecounty():
    global df
    if df is None:
        df = pd.read_csv(url)
        df = df.dropna()

    one_county = df["county"].unique()

    return one_county


def get_onecounty_pm25(county):
    global df
    if df is None:
        df = pd.read_csv(url)
        df = df.dropna()

    df1 = df.groupby("county").get_group(county)

    col = df1.columns.tolist()
    values = df1.values.tolist()

    return col, values


# 區分出檔案是作為主程式直接執行，還是作為模組被引入到其他程式中使用
# __name__=="__main__為直接被執行，
if __name__ == "__main__":
    print(get_county_pm25())
