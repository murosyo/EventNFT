import os
import openai

openai.api_key = "###"

def create_image_from_text(text):
    response = openai.Image.create(
        prompt = text, # 画像生成するためのテキスト
        # prompt = "青空",
        n = 4, # 1~10で生成する画像数を決定
        size = "1024x1024" # 画像サイズの設定 256×256 or 512×512 or 1024×1024
    )
    # print(response)
    Image_url = response['data']

    # URLのリストを返す
    return Image_url
