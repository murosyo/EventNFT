import openai
openai.api_key = "your API key"
def create_image_from_text(text):
    response = openai.Image.create(
        prompt="青空", # 画像生成するためのテキスト
        n=2, # 1~10で生成する画像数を決定
        size="1024x1024" # 画像サイズの設定 256×256 or 512×512 or 1024×1024
    )
    Image_url = response['data'][0]['url'] # 1つ目のurlを返す

    return Image_url