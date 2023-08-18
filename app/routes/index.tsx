import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Bienvenido a TotoJuegos</h1>
      <ul>
        <li>
          <Link to="/preguntas">Preguntas</Link>
        </li>
      </ul>
    </div>
  );
}
