import { useState } from "react";
import MultipleChoice from "~/components/MultipleChoice";
import preguntas from "../../data/preguntas.json";
import { useLoaderData } from "@remix-run/react";

const MAX_OPTIONS = 5;

export function loader() {
  const data = Array.from({ length: MAX_OPTIONS }, (_, index) => {
    const rndInt = Math.floor(Math.random() * preguntas?.length - 1);
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

  const message = success ? (
    "Buenaaa!!! 🎉🎉🎉"
  ) : (
    <div>
      <div>Dale, mamert@, andá a estudiar</div>
      <div className="flex justify-center">💩💩💩</div>
    </div>
  );
  const handleClick = () => {
    window.location.reload();
  };

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

      <div
        className={`fixed flex items-center justify-center bg-slate-800 bg-opacity-60 w-full h-full ${
          !showAlert ? "-" : ""
        }z-10`}
      >
        <div
          className={`alert w-80 shadow-lg flex flex-col content-between top-1/4 ${
            showAlert && "animate-jump-in animate-duration-300"
          }  z-20`}
        >
          <div>
            <h3 className="font-bold">{message}</h3>
          </div>
          <button
            className="uppercase font-black rounded-md px-4 py-2 bg-gradient-to-r from-lime-700 to-lime-600 w-60 text-white transition-transform hover:scale-110 hover:transition-transform"
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

      {showResult ? (
        <div className="fixed flex flex-col items-center justify-center w-full h-full text-center pt-0 text-2xl mt-6 text-slate-50 uppercase font-black">
          <div className="flex flex-col">
            <p>
              {`
              ${
                score > MAX_OPTIONS / 2
                  ? "Bien ahi!"
                  : "Hay que ponernos las pilas, ehhh"
              }
              `}
            </p>
            <p className="mt-1">{`Acertaste ${score} de ${MAX_OPTIONS}`}</p>
          </div>
          <button
            className="uppercase text-base font-black rounded-md mt-6 px-4 py-2 bg-gradient-to-r from-lime-700 to-lime-600 w-60 text-white transition-transform hover:scale-110 hover:transition-transform"
            onClick={() => handleClick()}
          >
            Jugar de nuevo
          </button>
        </div>
      ) : (
        <div className="flex flex-col justify-start items-center h-screen relative z-0">
          <h1 className="text-center pt-0 text-2xl mt-6 text-slate-50 uppercase font-black">
            Bienvenid@ a Tiago Preguntas!!
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
