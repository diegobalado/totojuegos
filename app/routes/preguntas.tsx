import { useLoaderData } from "@remix-run/react";
import { createClient } from "@supabase/supabase-js";
import Button from "~/components/Button";
import InputGroup from "~/components/InputGroup";
import MultipleChoice from "~/components/MultipleChoice";

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

export const loader = async ({}) => {
  const { data } = await supabase.from("pregunta_random").select();
  return { data };
};

export default function Preguntas() {
  const { data } = useLoaderData();
  console.log({ data });
  const Component = () =>
    data[0].tipo === "multiple_choice" ? MultipleChoice : <div></div>;

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-2xl mt-6">Bienvenid@ a TotoJuegos!!</h1>
      <div className="bg-gray-100 border-2 border-gray-300 mt-6 mb-4 p-4 rounded-xl w-1/2">
        {data[0].pregunta}
      </div>
      <MultipleChoice
        answers={[
          data[0].opcion_1,
          data[0].opcion_2,
          data[0].opcion_3,
          data[0].opcion_4
        ]}
      />
    </div>
  );
}
