import requests

API_KEY = '04a0b924-7924-fb14-60cf-5c4a577ac4d3:fx' # 自身の API キーを指定

def translate_en_to_ja(text):
    text = text
    source_lang = 'EN'
    target_lang = 'JA'

    # パラメータの指定
    params = {
                'auth_key' : API_KEY,
                'text' : text,
                'source_lang' : source_lang, # 翻訳対象の言語
                "target_lang": target_lang  # 翻訳後の言語
            }

    # リクエストを投げる
    request = requests.post("https://api-free.deepl.com/v2/translate", data=params) # URIは有償版, 無償版で異なるため要注意
    result = request.json()

    # print(result)
    return result['translations'][0]["text"]

def translate_ja_to_en(text):
    text = text
    source_lang = 'JA'
    target_lang = 'EN'

    # パラメータの指定
    params = {
                'auth_key' : API_KEY,
                'text' : text,
                'source_lang' : source_lang, # 翻訳対象の言語
                "target_lang": target_lang  # 翻訳後の言語
            }

    # リクエストを投げる
    request = requests.post("https://api-free.deepl.com/v2/translate", data=params) # URIは有償版, 無償版で異なるため要注意
    result = request.json()

    # print(result)
    return result['translations'][0]["text"]