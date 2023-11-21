import { useState } from "react";
import styles from "./styles.module.css";

const Prediction = ({ image }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="w-full flex p-2 shadow-md border border-gray-400 mb-3 rounded-md"
      style={{ maxWidth: "400px" }}
    >
      <div className={`${expanded && "hidden"}`}>
        <img
          src={`data:image/png;base64,${image.base64}`}
          style={{ width: "75px" }}
          className="rounded-md"
        />
      </div>
      <div
        className={`flex flex-col justify-center flex-grow ${
          !expanded && "ml-2"
        }`}
      >
        <div className="text-lg font-semibold text-center">
          Predictions for &rsquo;{image.name}&rsquo; <hr />
        </div>
        <div className="flex items-center flex-grow justify-evenly py-2">
          <a
            className="cursor-pointer bg-blue-800 text-white font-semibold text-sm uppercase py-1 px-3 rounded-md hover:shadow-lg hover:translate-y-[-5%] transition-all"
            download={`detected_circles_${image.name}`}
            href={`data:image/png;base64,${image.base64}`}
          >
            Download
          </a>
          <button
            className="bg-teal-800 text-white font-semibold text-sm uppercase py-1 px-3 rounded-md hover:shadow-lg hover:translate-y-[-5%] transition-all"
            onClick={() => setExpanded((prev) => !prev)}
          >
            {expanded ? "Collapse" : "Expand"}
          </button>
        </div>
        <div className={`ml-auto mr-auto w-full`}>
          <img
            className={`${
              expanded ? styles.img_expanded : styles.img_collapsed
            } rounded-md ${styles.img}`}
            src={`data:image/png;base64,${image.base64}`}
          />
        </div>
      </div>
    </div>
  );
};

export default Prediction;
