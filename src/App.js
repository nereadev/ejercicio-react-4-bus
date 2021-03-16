import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Display from "./componentes/Display";
import FormLinea from "./componentes/FormLinea";
import ParadasContext from "./contexts/ParadasContext";
import paradasJson from "./paradasBus.json";

function App() {
  const [paradas, setParadas] = useState(paradasJson);
  return (
    <ParadasContext.Provider value={paradas}>
      <Container className="contenedor">
        <header className="cabecera">
          <h1>Parada nº 15</h1>
          <Display />
          <h2>Tiempo para la línea 60: 2 minutos</h2>
        </header>
        <section className="forms">
          <form>
            <label htmlFor="num-parada">Parada nº: </label>
            <input type="number" id="num-parada" />
            <button type="submit">Buscar</button>
          </form>
          <FormLinea paradaValida={!(paradas.data.ibus.length !== 0)}></FormLinea>
        </section>
        <div className="text-center" hidden={paradas.data.ibus.length !== 0}>
          La parada seleccionada no es válida
        </div>
      </Container>
    </ParadasContext.Provider>
  );
};

export default App;

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
