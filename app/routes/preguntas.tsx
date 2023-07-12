import { useLoaderData, useNavigate } from "@remix-run/react";
import { createClient } from "@supabase/supabase-js";
import { Suspense, useEffect, useState } from "react";
import Button from "~/components/Button";
import InputGroup from "~/components/InputGroup";
import MultipleChoice from "~/components/MultipleChoice";

export const loader = async ({}) => {
  const supabaseUrl = process.env.SUPABASE_URL || "";
  const supabaseKey = process.env.SUPABASE_KEY || "";
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data } = await supabase.from("pregunta_random").select();

  return { data };
};

export default function Preguntas() {
  const [success, setSuccess] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const { data } = useLoaderData();
  const item = data[0];
  const message = success ? "Buenaaa" : "Dale, mamert@, andá a estudiar";

  const Component = () =>
    item.tipo === "multiple_choice" ? MultipleChoice : <div></div>;

  console.log({ success, showAlert });

  return (
    <>
      <div className="absolute h-96 w-full -z-10">
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
                setTimeout(() => {
                  setSuccess(false);
                  setShowAlert(false);
                  navigate(".", { replace: true });
                }, 500);
              }}
            >
              Siguiente pregunta
            </button>
          </div>
        </div>
      )}
      <div className="flex flex-col justify-center items-center">
        <h1 className="absolute top-0 pt-1 pl-1 text-2xl mt-6 text-gray-900 uppercase font-black">
          Bienvenid@ a TotoJuegos!!
        </h1>
        <h1 className="absolute top-0 pt-0 text-2xl mt-6 text-green-100 uppercase font-black">
          Bienvenid@ a TotoJuegos!!
        </h1>
        <div className="bg-gray-100 border-2 border-gray-300 mt-44 mb-4 p-4 rounded-xl w-auto">
          {item.pregunta}
        </div>
        <MultipleChoice
          options={[item.opcion_1, item.opcion_2, item.opcion_3, item.opcion_4]}
          answer={item.respuesta}
          onResponse={(response) => {
            setTimeout(() => {
              console.log({ response });
              setSuccess(response);
              setShowAlert(true);
            }, 500);
          }}
        />
      </div>
    </>
  );
}
