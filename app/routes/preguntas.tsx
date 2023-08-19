import { useState } from "react";
import MultipleChoice from "~/components/MultipleChoice";
import preguntas from "../../data/preguntas.json";
import { useLoaderData } from "@remix-run/react";

const MAX_OPTIONS = 10;

export function loader() {
  const data = Array.from({ length: MAX_OPTIONS }, (_, index) => {
    const rndInt = Math.floor(Math.random() * preguntas?.length);
    return preguntas.splice(rndInt, 1)[0];
  });

  return { data };
}

export default function Preguntas() {
  const [currentItem, setCurrentItem] = useState(0);
  const [success, setSuccess] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const { data } = useLoaderData();
  const item = data?.[currentItem];

  const message = success ? "Buenaaa" : "Dale, mamert@, andá a estudiar";
  console.log({ data });
  return (
    <div className="h-screen bg-gradient-to-r from-slate-900 to-slate-700 wrapper">
      <div className="box -z-10">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      {showAlert && (
        <div className="fixed flex items-center justify-center bg-slate-800 bg-opacity-60 w-full h-full">
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
        <div className="fixed flex items-center justify-center w-full h-full text-center pt-0 text-2xl mt-6 text-slate-50 uppercase font-black">
          {`
          Bien ahii!
          Acertaste ${score}
        `}
        </div>
      ) : (
        <div className="flex flex-col justify-start items-center h-screen relative">
          <h1 className="text-center pt-0 text-2xl mt-6 text-slate-50 uppercase font-black">
            Bienvenid@ a TotoJuegos!!
          </h1>
          <div className="bg-gray-100 border-2 border-gray-300 mt-6 p-4 rounded-xl w-auto text-center">
            {item?.pregunta}
          </div>
          <MultipleChoice
            options={[
              item?.opcion_1,
              item?.opcion_2,
              item?.opcion_3,
              item?.opcion_4,
            ]}
            answer={item?.respuesta}
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
