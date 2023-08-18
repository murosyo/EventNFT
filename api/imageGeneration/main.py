import re
from typing import List, Union

from create_image import create_image_from_text
from deepl import translate_en_to_ja, translate_ja_to_en
from fastapi import FastAPI
from pydantic import BaseModel
from Rake import Rake
from Rake_en import Rake_en
from starlette.middleware.cors import CORSMiddleware
from summerize import summerize

app = FastAPI()

origins = [
    "http://localhost:8000",
    "http://localhost:3000",
    "http://localhost",
    "http://127.0.0.1:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

class Event(BaseModel):
    title: str = None
    location: str = None
    details: str = None


class Data(BaseModel):
    event: Event
    comments: List[str] = []
    keywords: List[str] = []


@app.get("/")
def root():
    return "success"


@app.post("/")
async def root(data: Data):
    # # ファイル読み込み
    # # f = open('test_en.txt', 'r')
    # f = open('test_ja.txt', 'r')
    # all_text = f.read()
    # f.close()

    # print(data)
    event_comments = data.comments
    all_text = "".join(event_comments)
    all_text = re.sub(r'\n', '', all_text)
    event_title = data.event.title
    event_location = data.event.location
    event_detail = data.event.details
    event_keywords = data.keywords
    # print(all_text)
    # print(event_title)
    # print(event_location)
    # print(event_detail)
    # print(event_keywords)
    # print(type(event_title))
    # print(type(event_location))
    # print(type(event_detail))
    # print(type(event_keywords))
    # print(len(event_keywords))

    # summerize APIが日本語の要約できないみたいなので、日本語文なら一旦英語に翻訳
    IsJapanese = contains_japanese(all_text)
    if IsJapanese:
        all_text = translate_ja_to_en(all_text)
    else:
        all_text = all_text

    # 文章の要約
    if all_text.count(' ') > 40:
        summary_text = summerize(all_text)
    else:
        summary_text = all_text
    # print(summary_text)

    # 英語から日本語に翻訳
    # trans_text = translate_en_to_ja(summary_text)
    # # 改行コード（\n）の除去
    # trans_text = re.sub(r'\n', '', trans_text)
    # # print(trans_text)

    # 改行コード（\n）の除去
    summary_text = re.sub(r'\n', '', summary_text)
    # 翻訳したテキストをRakeで処理し、キーワードを抽出
    # rake = Rake(trans_text)
    # keywords = rake.extract_phrases(trans_text)
    rake = Rake_en(summary_text)
    keywords = rake.extract_phrases(summary_text)
    keywords.append("oil-art painting.")  # 水彩画仕様に変更
    # keywords = [keyword.replace(' ', '') for keyword in keywords]
    print(keywords)
    # print(type(keywords))
    if len(event_keywords) > 0:
        for i in range(len(event_keywords)):
            keywords.append(event_keywords[i])
    keywords.append(event_location)
    # print(keywords)
    keywords = set(keywords)
    keywords = " ".join(keywords)
    keywords = keywords.split()
    # keywords = set(keywords)
    keywords = list(keywords)
    unique_word = []
    seen_word = set()
    for keyword in keywords:
        if keyword not in seen_word:
            unique_word.append(keyword)
            seen_word.add(keyword)
    keywords = " ".join(unique_word)
    # keywords = " ".join(keywords)
    print(keywords)

    # キーワードから画像を生成
    Image_URL = create_image_from_text(keywords)
    urls = [item["url"] for item in Image_URL]
    # print(urls)
    # 要約した文章を返すかテスト
    # return summary_text

    # 翻訳した文章を返すかテスト
    # return trans_text

    # キーワードを抽出できているかテスト
    # return keywords

    # 画像のリンクを返すかテスト
    return urls


@app.post("/test")
def test():
    return [
        "https://oaidalleapiprodscus.blob.core.windows.net/private/org-L5rKMX1oku2hAoH7ybZp9G4o/user-LJ9poxHXWK1B3skbqkStfsO9/img-oVnqSSnb1kqTpTJN4x7Ik0sn.png?st=2023-08-18T05%3A09%3A36Z&se=2023-08-18T07%3A09%3A36Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-08-17T17%3A54%3A00Z&ske=2023-08-18T17%3A54%3A00Z&sks=b&skv=2021-08-06&sig=G2/BwLsKHmkWIpM8YmdNIaXExaFVioUewS6IMx6nb9U%3D",
        "https://oaidalleapiprodscus.blob.core.windows.net/private/org-L5rKMX1oku2hAoH7ybZp9G4o/user-LJ9poxHXWK1B3skbqkStfsO9/img-q9xnfdMRwbc5EeEHiX55VWGf.png?st=2023-08-18T05%3A09%3A35Z&se=2023-08-18T07%3A09%3A35Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-08-17T17%3A54%3A00Z&ske=2023-08-18T17%3A54%3A00Z&sks=b&skv=2021-08-06&sig=hVYEW9%2BUHlTjzuxtMV6UtNKWWODdH7CCuAmciV6GSxI%3D",
        "https://oaidalleapiprodscus.blob.core.windows.net/private/org-L5rKMX1oku2hAoH7ybZp9G4o/user-LJ9poxHXWK1B3skbqkStfsO9/img-AolpqZ6I07bjGRGPGRTQBcTo.png?st=2023-08-18T05%3A09%3A35Z&se=2023-08-18T07%3A09%3A35Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-08-17T17%3A54%3A00Z&ske=2023-08-18T17%3A54%3A00Z&sks=b&skv=2021-08-06&sig=E1X92ykM1u70mD8t2/786urct1JOZcqeBFvOiUSmGDY%3D",
        "https://oaidalleapiprodscus.blob.core.windows.net/private/org-L5rKMX1oku2hAoH7ybZp9G4o/user-LJ9poxHXWK1B3skbqkStfsO9/img-cnaZH2SWxeQWoEQ8nNrMGIzG.png?st=2023-08-18T05%3A09%3A35Z&se=2023-08-18T07%3A09%3A35Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-08-17T17%3A54%3A00Z&ske=2023-08-18T17%3A54%3A00Z&sks=b&skv=2021-08-06&sig=YdxorVvoPMVrFcJ/ass/WoNiwhYPjtnHJfabuPaPsVM%3D"
    ]


def contains_japanese(text):
    # 正規表現で日本語の文字を検索
    pattern = re.compile(r'[ぁ-んァ-ン一-龥]')
    return bool(pattern.search(text))
