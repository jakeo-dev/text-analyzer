import { useEffect, useState } from "react";
import ResponsiveTextArea from "@/components/ResponsiveTextArea";

export default function Home() {
  const placeholderText = "Lorem ipsum odor amet, consectetuer adipiscing elit. Auctor erat ullamcorper lectus magnis neque. Justo senectus velit pulvinar diam fames scelerisque neque. Pellentesque consectetur dolor magnis dapibus, sodales habitasse. Libero cubilia accumsan tincidunt fermentum dictum massa tristique habitant imperdiet. Vitae eu venenatis augue et sit fermentum augue. Quam quisque efficitur efficitur ridiculus per elementum. Potenti id platea dis curabitur nibh suspendisse eleifend penatibus. Vehicula phasellus ullamcorper a habitasse, aenean placerat lacus tellus. Porta rutrum faucibus hendrerit platea facilisis hac nec ultrices\n\nTempus vivamus interdum per aliquam curae dui convallis. Conubia facilisi adipiscing arcu cursus venenatis fames mattis velit. In inceptos tristique euismod donec interdum molestie. Ridiculus a congue risus ad; amet dapibus. Lectus etiam aliquet ornare, facilisi iaculis lectus dignissim. Class semper nec sapien vulputate lobortis senectus orci nam lobortis. Primis facilisis proin pulvinar eu, natoque finibus iaculis magna. Pellentesque porta montes nulla sem; habitant praesent. Venenatis feugiat augue mus netus conubia rutrum sagittis.\n\nEfficitur ipsum maecenas vulputate; tristique himenaeos at sit. Hac diam maximus ligula cubilia tincidunt. Nulla eget penatibus odio tincidunt; per venenatis. Hendrerit vitae gravida efficitur nulla fermentum amet. Nisi volutpat nam vulputate habitant fermentum aptent molestie. Mattis suspendisse lacus eros feugiat purus. Elementum ex convallis turpis tristique interdum. Orci condimentum duis platea himenaeos feugiat.\n\nOrci curabitur maecenas mattis; tempus penatibus libero molestie. Purus tortor aenean velit turpis lobortis pellentesque? Elit donec ante eget enim proin ullamcorper proin. Pulvinar donec commodo eros eros aliquet cubilia. Tincidunt vehicula lacinia pulvinar phasellus vestibulum arcu adipiscing. Aenean sem ultricies massa gravida lectus venenatis. Aenean diam sagittis sapien in nostra odio phasellus eleifend condimentum. Fermentum penatibus aliquam; placerat suscipit primis convallis.\n\nJusto nam justo praesent sociosqu quisque euismod sagittis! Curabitur dictum elit nunc, varius iaculis posuere at vestibulum. Scelerisque semper sollicitudin massa semper pharetra donec. Euismod pharetra posuere condimentum phasellus lobortis nulla pellentesque quam senectus. Sollicitudin lacus hac nec erat finibus tempor massa sed. Dignissim elit pretium vestibulum augue imperdiet eu donec. Dictumst nullam orci phasellus at ad. Fermentum porta id leo vitae justo orci.\n\nRisus suspendisse semper vestibulum aptent maecenas; feugiat fermentum placerat. Torquent pharetra viverra elit ligula vestibulum curae sed vitae? Ante malesuada tristique euismod amet morbi. Ultricies aliquet penatibus quam finibus nulla magnis class. Cursus pharetra luctus finibus primis vestibulum mattis. Placerat platea tempor interdum felis, facilisi est erat. Ornare tincidunt efficitur convallis rhoncus ultricies. Nullam primis curae fermentum sapien sapien luctus nibh erat dapibus. Convallis leo mattis hac ultricies lacinia.";
  
  useEffect(() => {
    setInputText(localStorage.getItem("input") ?? placeholderText);
  }, []);

  const [inputText, setInputText] = useState(placeholderText);

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

  /* function handleDebugClick() {
    console.log(inputText.match(/[A-Z]]/g));
  } */

  function handleInput(text: string) {
    setInputText(text);
    localStorage.setItem("input", text);
  }

  function wordCount(string: string) {
    // https://www.mediacollege.com/internet/javascript/text/count-words.html
    // get word count
    if (string.trim().length === 0) return 0;
    else {
      const words = string
        .replaceAll("\n", " ")
        .replace(/(^\s*)|(\s*$)/gi, "")
        .replace(/[ ]{2,}/gi, " ")
        .replace(/\n /, "\n")
        .split(/(\s|—|--)+/g)
        .filter((word) => /\w/.test(word));
      return words.length;
    }
  }

  function getActualWords(string: string) {
    // used to get the actual individual words; returns an array of words
    if (string.trim().length === 0) return [];
    else {
      let words = string
        .replaceAll("\n", " ")
        .replace(/(^\s*)|(\s*$)/gi, "")
        .replace(/[ ]{2,}/gi, " ")
        .replace(/\n /, "\n")
        .split(" ")
        .filter((word) => /\w/.test(word));
      words = words
        .join(" ")
        .replace(/[^A-Za-z0-9-_\p{L}'’]/gu, " ") // counts words with dashes in them as one word, like "self-driving" or "spanish-speaking"
        .replace(/(?<=.)' | '(?=.)/g, " ") // makes sure that single quotes are only counted as being parts of word when they're surrounded by letters on both sides (accounts for contractions & possessives but not plural possessives)
        .split(" ")
        .filter((word) => word.length > 0)
        .map((word) => word.toLowerCase());
      return words;
    }
  }

  function avgArrayElementLength(array: Array<string>) {
    let sum = 0;
    for (const word of array) sum += word.length;

    return (sum / array.length).toFixed(1);
  }

  function longestWords(array: Array<string>) {
    const uniqueWordsArray = removeDuplicates(array);

    const wordsDictionary: { [key: string]: number } = {};
    for (const word of uniqueWordsArray) {
      wordsDictionary[word] = word.length;
    }

    return sortDictionaryByValues(wordsDictionary);
  }

  function removeDuplicates(array: Array<string>) {
    // https://stackoverflow.com/a/9229821
    return [...new Set(array)];
  }

  function frequentWords(array: Array<string>) {
    const uniqueWordsArray = removeDuplicates(array);

    const wordsDictionary: { [key: string]: number } = {};
    for (const word of uniqueWordsArray) {
      wordsDictionary[word] = 0;
    }
    for (const word of array) {
      wordsDictionary[word] += 1;
    }

    return sortDictionaryByValues(wordsDictionary);
  }

  function sortDictionaryByValues(dictionary: { [key: string]: number }) {
    // https://stackoverflow.com/questions/25500316/sort-a-dictionary-by-value-in-javascript
    const items: Array<[string, number]> = Object.keys(dictionary).map(function (key) {
      return [key, dictionary[key]];
    });

    items.sort(function (first, second) {
      return second[1] - first[1];
    });

    return items;
  }

  function removeCommonWords(array: Array<string>) {
    const newArray = JSON.parse(JSON.stringify(array));
    for (const word of array)
      if (commonWords.includes(word)) newArray.splice(newArray.indexOf(word), 1);

    return newArray;
  }

  return (
    <>
      {/* <button
        className="border-4 border-black bg-red-500 text-white text-3xl hover:bg-red-600 active:bg-red-700"
        onClick={handleDebugClick}
      >
        DEBUG BUTTON!!!
      </button> */}

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

        <div className="lg:w-60 lg:max-h-[80vh] overflow-auto bg-gray-200 border-gray-200 border-2 rounded-md p-2 mt-4 lg:mt-0 lg:-mb-6">
          <div className="statBigDiv">
            <div className="statDiv">
              <span className="statNum">{wordCount(inputText)}</span>
              <span className="statName">
                word
                {wordCount(inputText) != 1 ? "s" : ""}
              </span>
            </div>

            <div className="statDiv">
              <span className="statNum">{removeDuplicates(getActualWords(inputText)).length}</span>
              <span className="statName">
                unique word
                {removeDuplicates(getActualWords(inputText)).length != 1 ? "s" : ""}
              </span>
            </div>

            <div className="statDiv">
              <span className="statNum">{inputText.replaceAll("\n", "").length}</span>
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
                {inputText.replaceAll("\n", "").replaceAll(/\s/g, "").length != 1 ? "s" : ""}{" "}
                <span className="text-sm">(no spaces)</span>
              </span>
            </div>

            <div className="statDiv">
              <span className="statNum">
                {inputText.split(/.+?[.?!]+(?=\s+[A-Z]|\n|$)/g).length - 1}
              </span>
              <span className="statName">
                sentence
                {inputText.split(/.+?[.?!]+(?=\s+[A-Z]|\n|$)/g).length != 1 ? "s" : ""}
              </span>
            </div>

            <div className="statDiv">
              <span className="statNum">
                {inputText.trim() == "" ? 0 : inputText.trim().split(/.?\n+.?/g).length}
              </span>
              <span className="statName">
                paragraph
                {inputText.trim().split(/.?\n+.?/g).length != 1 || inputText.trim() == ""
                  ? "s"
                  : ""}
              </span>
            </div>
          </div>

          <div className="statBigDiv">
            <div className="statDiv block">
              <span className="statTitle">Most frequent words</span>
              {frequentWords(getActualWords(inputText))
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
              {frequentWords(removeCommonWords(getActualWords(inputText)))
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
              <span className="statTitle">Longest words</span>
              {longestWords(getActualWords(inputText))
                .slice(0, 5)
                .map(([word /* , length */], index) => (
                  <div className="statDiv" key={index}>
                    <span className="statNum">{word}</span>
                    {/* <span className="statName">{length}</span> */}
                  </div>
                ))}
            </div>
          </div>

          <div className="statBigDiv">
            <div className="statDiv">
              {/* average 4 words per second; 240 words per minute */}
              <span className="statNum">
                {Math.trunc(wordCount(inputText) / 4 / 60)} min{" "}
                {((wordCount(inputText) / 4) % 60).toFixed(0)} sec
              </span>
              <span className="statName">avg reading time</span>
            </div>

            <div className="statDiv">
              {/* average 2.5 words per second; 150 words per minute */}
              <span className="statNum">
                {Math.trunc(wordCount(inputText) / 2.5 / 60)} min{" "}
                {((wordCount(inputText) / 2.5) % 60).toFixed(0)} sec
              </span>
              <span className="statName">avg speaking time</span>
            </div>

            <div className="statDiv">
              {/* average 0.7 words per second; 40 words per minute */}
              <span className="statNum">
                {Math.trunc(wordCount(inputText) / 0.7 / 60)} min{" "}
                {((wordCount(inputText) / 0.7) % 60).toFixed(0)} sec
              </span>
              <span className="statName">avg typing time</span>
            </div>

            <div className="statDiv">
              {/* average 1.16 characters (no spaces) per second; 70 characters (no spaces) per minute */}
              <span className="statNum">
                {Math.trunc(
                  inputText.replaceAll("\n", "").replaceAll(/\s/g, "").length / 1.16 / 60
                )}{" "}
                min{" "}
                {(
                  (inputText.replaceAll("\n", "").replaceAll(/\s/g, "").length / 1.16) %
                  60
                ).toFixed(0)}{" "}
                sec
              </span>
              <span className="statName">avg handwriting time</span>
            </div>
          </div>

          <div className="statBigDiv">
            <div className="statDiv">
              <span className="statNum">{inputText.split(/.+?\?+/g).length - 1}</span>
              <span className="statName">
                question
                {inputText.split(/.+?\?+/g).length - 1 != 1 ? "s" : ""}
              </span>
            </div>

            <div className="statDiv">
              <span className="statNum">{inputText.split(/.+?!+/g).length - 1}</span>
              <span className="statName">
                exclamation
                {inputText.split(/.+?!+/g).length - 1 != 1 ? "s" : ""}
              </span>
            </div>

            <div className="statDiv">
              <span className="statNum">{inputText.split(/["“”].+?["“”]/g).length - 1}</span>
              <span className="statName">
                quotation
                {inputText.split(/["“”].+?["“”]/g).length - 1 != 1 ? "s" : ""}
              </span>
            </div>

            <div className="statDiv">
              <span className="statNum">
                {inputText.match(/(\(.+?\))|(\[.+?\])|(\{.+?\})|(—.+?—)|(--.+?--)/g)?.length ?? 0}
              </span>
              <span className="statName">
                paranthetical
                {inputText.match(/(\(.+?\))|(\[.+?\])|(\{.+?\})|(—.+?—)|(--.+?--)/g)?.length != 1
                  ? "s"
                  : ""}
              </span>
            </div>

            <div className="statDiv">
              <span className="statNum">{inputText.match(/[0-9]+([.,]?[0-9]+)?/g)?.length ?? 0}</span>
              <span className="statName">numbers</span>
            </div>

            <div className="statDiv">
              <span className="statNum">{inputText.match(/[0-9]/g)?.length ?? 0}</span>
              <span className="statName">digits</span>
            </div>

            <div className="statDiv">
              <span className="statNum">{inputText.match(/[A-Z]/g)?.length ?? 0}</span>
              <span className="statName">uppercase letters</span>
            </div>

            <div className="statDiv">
              <span className="statNum">{inputText.match(/[a-z]/g)?.length ?? 0}</span>
              <span className="statName">lowercase letters</span>
            </div>

            <div className="statDiv">
              <span className="statNum">
                {inputText.match(/[bcdfghjklmnpqrstvwxyz]/gi)?.length ?? 0}
              </span>
              <span className="statName">consonants</span>
            </div>

            <div className="statDiv">
              <span className="statNum">{inputText.match(/[aeiou]/gi)?.length ?? 0}</span>
              <span className="statName">vowels</span>
            </div>

            <div className="statDiv">
              <span className="statNum">
                {inputText.trim() == "" ? 0 : avgArrayElementLength(getActualWords(inputText))}
              </span>
              <span className="statName">average word length</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
