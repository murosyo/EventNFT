from summerize import summerize
from deepl import translate
from Rake import _preprocess

def main():
    f = open('test.txt', 'r')
    all_text = f.read()
    f.close()
    summary_text = summerize(all_text)
    # print(summary_text)


if __name__ == "__main__":
    main()