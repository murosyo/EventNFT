import pandas as pd
import neologdn
import re
import string
from tqdm import tqdm

from rake_ja import Tokenizer, JapaneseRake

class KeywordExtractor:
    def __init__(
        self,
        data: string,
    ) -> None:

        self.data = data

    # 前処理
    def _preprocess(self, x: str) -> str:
        emoji_pattern = re.compile(
            "["
            "\U0001F600-\U0001F64F"  # emoticons
            "\U0001F300-\U0001F5FF"  # symbols & pictographs
            "\U0001F680-\U0001F6FF"  # transport & map symbols
            "\U0001F1E0-\U0001F1FF"  # flags (iOS)
            "]+",
            flags=re.UNICODE,
        )
        x = emoji_pattern.sub(r"", x)

        x = neologdn.normalize(x)
        x = re.sub(r"https?://[\w/:%#\$&\?\(\)~\.=\+\-]+", "", x)
        x = re.sub(r"[!-/:-@[-`{-~]", r" ", x)
        x = re.sub("[■-♯]", " ", x)
        x = re.sub(r"(\d)([,.])(\d+)", r"\1\3", x)
        x = re.sub(r"\d+", "0", x)
        x = re.sub(r"・", ", ", x)
        x = re.sub(r"[\(\)「」【】]", "", x)

        return x

    def extract_phrases(self, text: str) -> tuple[list[float], list[str]]:
        raise NotImplementedError

    def apply_keywords_extract(self) -> pd.DataFrame:
        tqdm.pandas()
        self.data[["scores", "keywords"]] = self.data["text"].progress_apply(
            self.extract_phrases, result_type="expand"
        )

        return self.data

class Rake(KeywordExtractor):
    def __init__(self, data: string):
        super().__init__(data)

        self.tokenizer = Tokenizer()
        self.punctuations = string.punctuation + ",.。、"
        self.stopwords = (
            "か な において にとって について する これら から と も が は て で に を は し た の ない よう いる という".split()
            + "により 以外 それほど ある 未だ さ れ および として といった られ この ため こ たち ・ ご覧".split()
        )
        self.rake = JapaneseRake(
            max_length = 5, # 関連させる単語の最大数
            min_length = 2, # 関連させる単語の最小数
            punctuations=self.punctuations,
            stopwords=self.stopwords,
        )

    def extract_phrases(self, text: str) -> tuple[list[float], list[str]]:
        tokens = self.tokenizer.tokenize(self._preprocess(text))

        self.rake.extract_keywords_from_text(tokens)
        scrs_kwds = self.rake.get_ranked_phrases_with_scores()

        if len(scrs_kwds) > 1:
            # 関連スコアが4.0以上の単語群のみを返す
            return [x[1] for x in scrs_kwds if x[0] >= 4.0]
        else:
            return [], []