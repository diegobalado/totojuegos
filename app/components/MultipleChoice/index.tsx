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
  console.log({ value });
  if (!children) return null;

  return (
    <div className="flex my-6 w-1/2">
      <input
        type="checkbox"
        id={`checkbox-${value}`}
        className="peer hidden"
        checked={active}
        onChange={(event) => {
          console.log({ active: event.target.value, value });
          onChange(event.target.value);
        }}
        value={value}
      />
      <label
        htmlFor={`checkbox-${value}`}
        className="select-none cursor-pointer rounded-lg border-2 border-gray-200
       py-3 px-6 font-bold text-gray-200 transition-colors duration-200 ease-in-out peer-checked:bg-gray-200 peer-checked:text-gray-900 peer-checked:border-gray-200 w-full text-center"
      >
        {children}
      </label>
    </div>
  );
}

export default function MultipleChoice({
  answers
}: {
  answers: Array<string>;
}) {
  const [active, setActive] = useState("");
  //   console.log({ active });
  return (
    <>
      {answers.map((answer, index) => (
        <Choice
          key={`${answer}-${index}`}
          value={answer}
          active={active === answer}
          onChange={setActive}
        >
          {answer}
        </Choice>
      ))}
    </>
  );
}
