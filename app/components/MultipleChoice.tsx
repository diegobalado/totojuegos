import { useState } from "react";

function Choice({
  active,
  onChange,
  value,
  children
}: {
  active: boolean;
  onChange: any;
  value: string;
  children: string;
}) {
  if (!children) return null;

  return (
    <div className="flex my-6 w-1/2 justify-center">
      <button
        onClick={() => {
          console.log({ value });
          onChange(value);
        }}
        value={value}
        className={`btn btn-md btn-accent w-60 text-white ${
          !active && "btn-outline hover:text-white"
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
  onResponse
}: {
  options: Array<string>;
  answer: string;
  onResponse: (arg0: boolean) => void;
}) {
  const [result, setResult] = useState("");
  const success = result === answer;

  return (
    <div className="flex flex-col w-full items-center">
      {options.map((option, index) => (
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
      ))}
    </div>
  );
}
