import { useLoaderData } from "@remix-run/react";
import { createClient } from "@supabase/supabase-js";
import Button from "~/components/Button";
import Flex from "~/components/Flex";
import InputGroup from "~/components/InputGroup";

// const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || "";
// const supabaseKey = process.env.REACT_APP_SUPABASE_KEY || "";
// const supabase = createClient(supabaseUrl, supabaseKey);

// export const loader = async ({}) => {
//   const { data } = await supabase.from("pregunta_random").select();
//   return { data };
// };

export default function CargarPreguntas() {
  // const { data } = useLoaderData();
  // console.log({ data });

  return (
    <Flex vertical className="w-full p-8 content-center">
      <h1 className="text-4xl m-3">Cargar preguntas nuevas</h1>
      <InputGroup label="Pregunta" />
      <InputGroup label="Respuesta nº1" />
      <InputGroup label="Respuesta nº2" />
      <InputGroup label="Respuesta nº3" />
      <Button>Guardar</Button>
    </Flex>
  );
}
