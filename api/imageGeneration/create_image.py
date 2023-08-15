import os
import openai
# openai.organization = "org-RXnF9tUb9UuKoRoXH1LGUdO3"
openai.api_key = "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"
# openai.api_key = os.getenv("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")
def create_image_from_text(text):
    response = openai.Image.create(
        prompt = text, # 画像生成するためのテキスト
        # prompt = "青空",
        n = 4, # 1~10で生成する画像数を決定
        size = "1024x1024" # 画像サイズの設定 256×256 or 512×512 or 1024×1024
    )
    Image_url = response['data'][0]['url']

    # URLのリストを返す
    return Image_url