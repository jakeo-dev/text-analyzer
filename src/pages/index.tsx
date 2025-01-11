import { useState } from "react";
import ResponsiveTextArea from "@/components/ResponsiveTextArea";

export default function Home() {
  const [inputText, setInputText] = useState("");

  function handleClick(text: string) {
    setInputText(text);
    console.log(text);
  }

  function wordCount(string: string) {
    // https://www.mediacollege.com/internet/javascript/text/count-words.html
    if (string.trim().length == 0) return 0;
    else {
      string = string
        .replaceAll("\n", " ")
        .replace(/(^\s*)|(\s*$)/gi, "")
        .replace(/[ ]{2,}/gi, " ")
        .replace(/\n /, "\n");
      return string.split(" ").length;
    }
  }

  return (
    <div className="flex gap-4 items-center justify-center min-h-screen">
      <ResponsiveTextArea
        value={inputText}
        onInput={(e) => handleClick(e.currentTarget.value)}
        className="max-h-[80vh] flex flex-1" // 1 line = 2.125 rem
        placeholder="Enter text..."
        maxLength={1000000}
        required={true}
      />

      <div className="flex-[0.5] bg-gray-200 rounded-md p-4">
        <span className="stat">
          {wordCount(inputText)} word
          {wordCount(inputText) != 1 ? "s" : ""}
        </span>
        <span className="stat">
          {inputText.replaceAll("\n", "").length} character
          {inputText.replaceAll("\n", "").length != 1 ? "s" : ""}
        </span>
      </div>
    </div>
  );
}
