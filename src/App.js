import { useEffect, useState } from "react";

function App() {

  /* const appId = "7cafef14";
const appKey = "a77affc64ad3ed493dc6a4da7fbec9f7"; parada: 3402
const url = `https://api.tmb.cat/v1/ibus/stops/2775?app_id=${appId}&app_key=${appKey}`;
const [datos, setDatos] = useState(null);
useEffect(() => {
  (async () => {
    const resp = await fetch(url);
    const datos = await resp.json();
    setDatos(datos);
    console.log(datos);
  })();
}, [url]); */

  return (
    <div className="contenedor">
      <header className="cabecera">
        <h1>Parada nº 15</h1>
        <div className="display">
          <div className="bus">
            <span className="linea">V16</span>
            <span className="destino">Universitat</span>
            <span className="tiempo">10min</span>
          </div>
          <div className="bus">
            <span className="linea">H12</span>
            <span className="destino">Pla de Palau</span>
            <span className="tiempo">1min</span>
          </div>
          <div className="bus">
            <span className="linea">32</span>
            <span className="destino">Barceloneta</span>
            <span className="tiempo">4min</span>
          </div>
        </div>
        <h2>Tiempo para la línea 60: 2 minutos</h2>
      </header>
      <section className="forms">
        <form>
          <label htmlFor="num-parada">Parada nº: </label>
          <input type="number" id="num-parada" />
          <button type="submit">Buscar</button>
        </form>
        <form>
          <label htmlFor="tiempo-linea">Tiempo para que llegue la línea: </label>
          <select id="tiempo-linea">
            <option value="">Elige línea</option>
          </select>
        </form>
      </section>
    </div>
  );
}

export default App;
