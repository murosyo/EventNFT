import ai21
ai21.api_key = 'VwdnggzozuNBIMwaKGiISMAe1dtI4YDZ'


def summerize(all_text):
    result =  ai21.Summarize.execute(source=all_text, sourceType="TEXT")
    summary_text = result["summary"]
    # print(type(summary_text))
    # print(summary_text)
    return summary_text