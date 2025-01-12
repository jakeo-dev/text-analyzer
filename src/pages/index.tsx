// this code uses \W instead of [^A-z0-9-_] for regex
// \W counts a "word" with a dash in it as two separate "words"[^A-z0-9-_], like "self-driving" or "spanish-speaking"
// [^A-z0-9-_] would count these "words" as one "word"
// from what ive seen from other word counter websites, they count all words with dashes in them as one, so thats what this code does too

import { useEffect, useState } from "react";
import ResponsiveTextArea from "@/components/ResponsiveTextArea";

export default function Home() {
  useEffect(() => {
    setInputText(localStorage.getItem("input") ?? "");
  }, []);

  const [inputText, setInputText] = useState("");

  const commonWords = [
    "the",
    "of",
    "to",
    "and",
    "a",
    "in",
    "is",
    "it",
    "you",
    "that",
    "he",
    "was",
    "for",
    "on",
    "are",
    "with",
    "as",
    "I",
    "his",
    "they",
    "be",
    "at",
    "have",
    "this",
    "from",
    "or",
    "had",
    "by",
    "but",
    "what",
    "some",
    "we",
    "can",
    "out",
    "were",
    "all",
    "there",
    "when",
    "use",
    "your",
    "how",
    "an",
    "each",
    "she",
    "which",
    "do",
    "their",
    "time",
    "if",
    "will",
    "way",
    "about",
    "many",
    "then",
    "them",
    "would",
    "so",
    "these",
    "her",
    "see",
    "him",
    "has",
    "more",
    "could",
    "go",
    "come",
    "did",
    "no",
    "most",
    "my",
    "over",
    "than",
    "who",
    "may",
    "been",
    "now",
    "any",
  ];

  function handleInput(text: string) {
    setInputText(text);
    localStorage.setItem("input", text);
  }

  function getWords(string: string) {
    // https://www.mediacollege.com/internet/javascript/text/count-words.html
    if (string.trim().length === 0) return [];
    else {
      string = string
        .replaceAll("\n", " ")
        .replace(/(^\s*)|(\s*$)/gi, "")
        .replace(/[ ]{2,}/gi, " ")
        .replace(/\n /, "\n");
      const words = string.split(" ").filter((word) => /\w/.test(word));
      return words;
    }
  }

  function avgArrayElementLength(array: Array<string>) {
    let sum = 0;
    for (const word of array) sum += word.replaceAll(/\W/g, "").length;

    return (sum / array.length).toFixed(1);
  }

  function longestWords(array: Array<string>) {
    const actualWordsArray = array
      .join(" ")
      .replace(/\W/g, " ")
      .split(" ")
      .filter((word) => word.length > 0);

    const uniqueWordsArray = removeDuplicates(actualWordsArray);

    const wordsDictionary: { [key: string]: number } = {};
    for (const word of uniqueWordsArray) {
      wordsDictionary[word.toLowerCase()] = word.length;
    }

    return sortDictionaryByValues(wordsDictionary);
  }

  function removeDuplicates(array: Array<string>) {
    // https://stackoverflow.com/a/9229821
    return [...new Set(array)];
  }

  function frequentWords(array: Array<string>) {
    const actualWordsArray = array
      .join(" ")
      .replace(/\W/g, " ")
      .split(" ")
      .filter((word) => word.length > 0);

    const uniqueWordsArray = removeDuplicates(actualWordsArray);

    const wordsDictionary: { [key: string]: number } = {};
    for (const word of uniqueWordsArray) {
      wordsDictionary[word.toLowerCase()] = 0;
    }
    for (const word of actualWordsArray) {
      wordsDictionary[word.toLowerCase()] += 1;
    }

    return sortDictionaryByValues(wordsDictionary);
  }

  function sortDictionaryByValues(dictionary: { [key: string]: number }) {
    // https://stackoverflow.com/questions/25500316/sort-a-dictionary-by-value-in-javascript
    const items: Array<[string, number]> = Object.keys(dictionary).map(
      function (key) {
        return [key, dictionary[key]];
      }
    );

    items.sort(function (first, second) {
      return second[1] - first[1];
    });

    return items;
  }

  function removeCommonWords(array: Array<string>) {
    let newArray = JSON.parse(JSON.stringify(array));
    for (const word of array)
      if (commonWords.includes(word))
        newArray.splice(newArray.indexOf(word), 1);

    return newArray;
  }

  return (
    <>
      <div className="lg:flex gap-4 items-center justify-center min-h-screen">
        <div className="flex-1">
          <h1 className="text-xl font-bold pl-3 pb-1.5">Text Analyzer</h1>
          <ResponsiveTextArea
            value={inputText}
            onInput={(e) => handleInput(e.currentTarget.value)}
            className="min-h-[31.875rem] max-h-[50vh] lg:max-h-[80vh]" // 1 line = 2.125 rem
            placeholder="Enter text to analyze..."
            maxLength={-1}
            required={true}
          />
        </div>

        <div className="lg:w-60 lg:max-h-[80vh] overflow-auto bg-gray-200 border-gray-200 border-2 rounded-md p-2 mt-4 lg:mt-0">
          <div className="statBigDiv">
            <div className="statDiv">
              <span className="statNum">{getWords(inputText).length}</span>
              <span className="statName">
                word
                {getWords(inputText).length != 1 ? "s" : ""}
              </span>
            </div>

            <div className="statDiv">
              <span className="statNum">
                {removeDuplicates(getWords(inputText)).length}
              </span>
              <span className="statName">
                unique word
                {getWords(inputText).length != 1 ? "s" : ""}
              </span>
            </div>

            <div className="statDiv">
              <span className="statNum">
                {inputText.replaceAll("\n", "").length}
              </span>
              <span className="statName">
                character
                {inputText.replaceAll("\n", "").length != 1 ? "s" : ""}
              </span>
            </div>

            <div className="statDiv">
              <span className="statNum">
                {inputText.replaceAll("\n", "").replaceAll(/\s/g, "").length}
              </span>
              <span className="statName">
                character
                {inputText.replaceAll("\n", "").replaceAll(/\s/g, "").length !=
                1
                  ? "s"
                  : ""}{" "}
                <span className="text-sm">(no spaces)</span>
              </span>
            </div>

            <div className="statDiv">
              <span className="statNum">
                {inputText.trim() == ""
                  ? 0
                  : inputText.trim().split(/.?\n+.?/g).length}
              </span>
              <span className="statName">
                paragraph
                {inputText.trim().split(/.?\n+.?/g).length != 1 &&
                inputText.trim() != ""
                  ? "s"
                  : ""}
              </span>
            </div>

            <div className="statDiv">
              <span className="statNum">
                {inputText.split(/.+?\?+/g).length - 1}
              </span>
              <span className="statName">
                question
                {inputText.split(/.+?\?+/g).length - 1 != 1 ? "s" : ""}
              </span>
            </div>

            <div className="statDiv">
              <span className="statNum">
                {inputText.split(/.+?!+/g).length - 1}
              </span>
              <span className="statName">
                exclamation
                {inputText.split(/.+?!+/g).length - 1 != 1 ? "s" : ""}
              </span>
            </div>

            <div className="statDiv">
              <span className="statNum">
                {inputText.split(/["“”].+?["“”]/g).length - 1}
              </span>
              <span className="statName">
                quotation
                {inputText.split(/["“”].+?["“”]/g).length - 1 != 1 ? "s" : ""}
              </span>
            </div>

            <div className="statDiv">
              <span className="statNum">
                {inputText.trim() == ""
                  ? 0
                  : avgArrayElementLength(getWords(inputText))}
              </span>
              <span className="statName">average word length</span>
            </div>
          </div>

          <div className="statBigDiv">
            <div className="statDiv block">
              <span className="statTitle">Longest words</span>
              {longestWords(getWords(inputText))
                .slice(0, 5)
                .map(([word], index) => (
                  <div className="statDiv" key={index}>
                    <span className="statNum">{word}</span>
                    {/* <span className="statName">{length}</span> */}
                  </div>
                ))}
            </div>
          </div>

          <div className="statBigDiv">
            <div className="statDiv block">
              <span className="statTitle">Most frequent words</span>
              {frequentWords(getWords(inputText))
                .slice(0, 5)
                .map(([word, count], index) => (
                  <div className="statDiv" key={index}>
                    <span className="statNum">{word}</span>
                    <span className="statName">{count}</span>
                  </div>
                ))}
            </div>
          </div>

          <div className="statBigDiv">
            <div className="statDiv block">
              <span className="statTitle">Most frequent uncommon words</span>
              {frequentWords(removeCommonWords(getWords(inputText)))
                .slice(0, 5)
                .map(([word, count], index) => (
                  <div className="statDiv" key={index}>
                    <span className="statNum">{word}</span>
                    <span className="statName">{count}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
