import { useLoaderData, useNavigate } from "@remix-run/react";
import { createClient } from "@supabase/supabase-js";
import { Suspense, useEffect, useState } from "react";
import Button from "~/components/Button";
import InputGroup from "~/components/InputGroup";
import MultipleChoice from "~/components/MultipleChoice";
import preguntas from "../../data/preguntas.json";
const MAX_OPTIONS = 10;

export const loader = () => {
  const newOptions = Array.from({ length: MAX_OPTIONS }, (_, index) => {
    const rndInt = Math.floor(Math.random() * (preguntas.length - 1)) + 1;
    const newOption = preguntas.splice(rndInt, 1)[0];
    return newOption;
  });

  return { data: newOptions };
};

export default function Preguntas() {
  const [currentItem, setCurrentItem] = useState(0);
  const [success, setSuccess] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();
  const { data } = useLoaderData();
  const item = data?.[0];
  const message = success ? "Buenaaa" : "Dale, mamert@, andá a estudiar";
  console.log({ data, currentItem, showResult, current: data[currentItem] });

  return (
    <div className="h-screen bg-gradient-to-r from-slate-900 to-slate-700">
      {/* <div className="absolute h-96 w-full -z-10">
        <svg viewBox="0 0 500 200">
          <path
            d="M 0 50 C 150 150 300 0 500 80 L 500 0 L 0 0"
            fill="rgb(57, 27, 112)"
          ></path>
          <path
            d="M 0 50 C 150 150 330 -30 500 50 L 500 0 L 0 0"
            fill="#0E7452"
            opacity="0.8"
          ></path>
          <path
            d="M 0 50 C 215 150 250 0 500 100 L 500 0 L 0 0"
            fill="#0E7452"
            opacity="0.5"
          ></path>
        </svg>
      </div> */}
      {showAlert && (
        <div className="fixed flex items-center justify-center bg-slate-800 bg-opacity-60 w-full h-full z-20">
          <div className="alert w-80 shadow-lg flex flex-col content-between top-1/4">
            <div>
              <h3 className="font-bold">{message}</h3>
            </div>
            <button
              className="btn btn-sm btn-accent text-white"
              onClick={() => {
                setShowAlert(false);
                if (currentItem < MAX_OPTIONS - 1) {
                  setCurrentItem(currentItem + 1);
                } else {
                  setShowResult(true);
                }
              }}
            >
              Siguiente pregunta
            </button>
          </div>
        </div>
      )}
      {showResult ? (
        <div className="fixed flex items-center justify-center w-full h-full">
          {`
          Bien ahii!
          Acertaste ${score}
        `}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-center pt-0 text-4xl mt-6 text-slate-50 uppercase font-black">
            Bienvenid@ a TotoJuegos!!
          </h1>
          <div className="bg-gray-100 border-2 border-gray-300 mt-16 mb-4 p-4 rounded-xl w-auto">
            {data[currentItem].pregunta}
          </div>
          <MultipleChoice
            options={[
              data[currentItem].opcion_1,
              data[currentItem].opcion_2,
              data[currentItem].opcion_3,
              data[currentItem].opcion_4,
            ]}
            answer={data[currentItem].respuesta}
            onResponse={(response) => {
              setSuccess(response);
              if (response) setScore(score + 1);
              setShowAlert(true);
            }}
          />
        </div>
      )}
    </div>
  );
}
