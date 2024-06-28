import pandas as pd


def get_pm25():
    url = "https://data.moenv.gov.tw/api/v2/aqx_p_02?api_key=e8dd42e6-9b8b-43f8-991e-b3dee723a52d&limit=1000&sort=datacreationdate%20desc&format=CSV"
    df = pd.read_csv(url)

    col = df.columns.tolist()
    values = df.values.tolist()

    return col, values


# 區分出檔案是作為主程式直接執行，還是作為模組被引入到其他程式中使用
# __name__=="__main__為直接被執行，
if __name__ == "__main__":
    print(get_pm25())
