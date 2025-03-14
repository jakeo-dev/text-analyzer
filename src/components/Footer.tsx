import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function Footer({ fixed }: { fixed: boolean }) {
  return (
    <footer
      className={`${
        fixed ? "fixed bottom-0" : ""
      } bg-gray-200 w-full p-3 lg:p-4 mt-auto lg:mt-0`}
    >
      <div className="flex justify-center items-center text-xs lg:text-sm text-center">
        <a
          className="hover:drop-shadow-md active:drop-shadow-none transition"
          href="https://jakeo.dev"
          target="_blank"
          aria-label="Go to JakeO.dev"
        >
          <img
            src="https://www.jakeo.dev/logos/bunny-jakeo-wordmark.png"
            className="w-[3.25rem] lg:w-16"
            alt="JakeO.dev logo"
          />
        </a>
        <span className="mx-3">•</span>
        <a
          className="text-gray-800 hover:text-gray-700 active:text-gray-600 transition"
          href="https://github.com/jakeo-dev/text-analyzer"
          target="_blank"
        >
          <FontAwesomeIcon
            icon={faGithub}
            className="text-xs lg:text-sm mr-1"
            aria-hidden
          />
          GitHub
        </a>
      </div>
    </footer>
  );
}
