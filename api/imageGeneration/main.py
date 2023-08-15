import re
from typing import List, Union

from create_image import create_image_from_text
from deepl import translate_en_to_ja, translate_ja_to_en
from fastapi import FastAPI
from pydantic import BaseModel
from Rake import Rake
from summerize import summerize

app = FastAPI()


class Event(BaseModel):
    title: Union[str, None] = None
    location: Union[str, None] = None
    detail: Union[str, None] = None


class Data(BaseModel):
    event: Event
    comments: str = None
    keywords: List[str] = []


@app.get("/")
async def root(data: Data):
    # # ファイル読み込み
    # # f = open('test_en.txt', 'r')
    # f = open('test_ja.txt', 'r')
    # all_text = f.read()
    # f.close()

    all_text = data.comments

    # summerize APIが日本語の要約できないみたいなので、日本語文なら一旦英語に翻訳
    IsJapanese = contains_japanese(all_text)
    if IsJapanese:
        all_text = translate_ja_to_en(all_text)
    else:
        all_text = all_text

    # 文章の要約
    summary_text = summerize(all_text)
    # print(summary_text)

    # 英語から日本語に翻訳
    trans_text = translate_en_to_ja(summary_text)
    # 改行コード（\n）の除去
    trans_text = re.sub(r'\n', '', trans_text)
    # print(trans_text)

    # 翻訳したテキストをRakeで処理し、キーワードを抽出
    rake = Rake(trans_text)
    keywords = rake.extract_phrases(trans_text)
    # keywords.append("水彩画") # 水彩画仕様に変更
    # for i in len(data.keywords):
    #     if data.keywords[i] != None:
    #         keywords.append(data.keywords[i])
    # keywords.append(data.keywords)
    for i in len(data.keywords):
        keywords.append(data.keywords[i])
    keywords = " ".join(keywords)
    # print(keywords)

    # キーワードから画像を生成
    Image_URL = create_image_from_text(keywords)
    urls = [item["url"] for item in Image_URL]

    # 要約した文章を返すかテスト
    # return summary_text

    # 翻訳した文章を返すかテスト
    # return trans_text

    # キーワードを抽出できているかテスト
    # return keywords

    # 画像のリンクを返すかテスト
    return urls


def contains_japanese(text):
    # 正規表現で日本語の文字を検索
    pattern = re.compile(r'[ぁ-んァ-ン一-龥]')
    return bool(pattern.search(text))
