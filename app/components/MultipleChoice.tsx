import { useEffect, useState } from "react";
import shuffle from "lodash/shuffle";

function Choice({
  active,
  onChange,
  value,
  children,
}: {
  active: boolean;
  onChange: any;
  value: string;
  children: string;
}) {
  if (!children) return null;

  return (
    <div className="flex my-5 w-1/2 justify-center z-10">
      <button
        onClick={() => {
          onChange(value);
        }}
        value={value}
        className={`uppercase font-black rounded-md px-4 py-2 bg-gradient-to-r from-lime-700 to-lime-600 w-60 text-white transition-transform ${
          !active &&
          "hover:text-white hover:scale-110 hover:transition-transform"
        }`}
      >
        {value}
      </button>
    </div>
  );
}

export default function MultipleChoice({
  options,
  answer,
  onResponse,
}: {
  options: Array<string | null>;
  answer: string;
  onResponse: (arg0: boolean) => void;
}) {
  const [result, setResult] = useState("");
  const [questions, setQuestions] = useState<(string | null)[]>([null]);
  const success = result === answer;

  useEffect(() => {
    const newArray = shuffle(options);
    setQuestions(options);
  }, [options]);

  return (
    <div className="flex flex-col w-full items-center justify-center grow">
      {questions?.map((option, index) => {
        return !option ? null : (
          <Choice
            key={`${option}-${index}`}
            value={option}
            active={result === option}
            onChange={() => {
              setResult(option);
              onResponse(answer === option);
            }}
          >
            {option}
          </Choice>
        );
      })}
    </div>
  );
}
