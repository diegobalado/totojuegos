import Button from "~/components/Button";
import InputGroup from "~/components/InputGroup";

export default function Preguntas() {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-2xl mt-6">Bienvenid@ a TotoJuegos!!</h1>
      <div className="min-w-2 mt-4 w-3/4">
        <div className="bg-gray-100 border-2 border-gray-300 mb-4 p-4 rounded-xl">¿Cuál es la capital de Croacia?</div>
        <form className="flex flex-col justify-center items-center">
          <InputGroup placeholder="Escribi tu respuesta acá" />
          <Button />
        </form>
      </div>
    </div>
  );
}
