import { useEffect, useMemo, useState } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Display from "./componentes/Display";
import FormLinea from "./componentes/FormLinea";
import ParadasContext from "./contexts/ParadasContext";
import paradasJson from "./paradasBus.json";

function App() {
  const [paradas, setParadas] = useState(paradasJson);
  const [rutaSeleccionada, setRutaSeleccionada] = useState([]);
  const [paradaInput, setParadaInput] = useState("");
  const [muestraToast, setMuestraToast] = useState(false);
  const lineaSeleccionada = useMemo(() =>
    (rutaSeleccionada.length !== 0) ? rutaSeleccionada[0].line : "", [rutaSeleccionada]);
  const tiempoEsperaMin = useMemo(() =>
    (rutaSeleccionada.length !== 0) ? rutaSeleccionada[0]["t-in-min"] : "", [rutaSeleccionada]);
  const seleccionarRuta = (event) => {
    const rutaFiltrada = paradas.data.ibus.filter(parada => parada.line === event.target.value);
    setRutaSeleccionada(rutaFiltrada);
  };
  const modificarValue = (event) => {
    if (event.target.value < 0) {
      setMuestraToast(true);
      setTimeout(() => setMuestraToast(false), 1200);
    }
    setParadaInput(event.target.value >= 0 ? event.target.value : paradaInput);
  };
  return (
    <Router>
      <Switch>
        <Route path="/parada" exact>
          <ParadasContext.Provider value={paradas} >
            <Container className="contenedor">
              <header className="cabecera">
                <h1>Parada nº 15</h1>
                <Display />
                <h2 hidden={lineaSeleccionada === ""}>
                  Tiempo para la línea {lineaSeleccionada}: {tiempoEsperaMin} minutos
          </h2>
        </header>
        <section className="forms">
          <form>
            <label htmlFor="num-parada">Parada nº: </label>
            <input
              type="number"
              className="num-parada"
              id="num-parada"
              value={paradaInput}
              onChange={(e) => modificarValue(e)} />
            <button type="submit">Buscar</button>
          </form>
          <div className={`error-padre${!muestraToast ? " no-display" : ""}`}>
            <p className="error-num-negativo">El número de parada no puede ser negativo</p>
          </div>
          <FormLinea
            paradaValida={!(paradas.data.ibus.length !== 0)}
            seleccionarRuta={seleccionarRuta}
          ></FormLinea>
        </section>
        <div className="text-center" hidden={paradas.data.ibus.length !== 0}>
          La parada seleccionada no es válida
        </div>
            </Container>
          </ParadasContext.Provider >
        </Route>
        <Route path="/linea/X" exact>
          <p>Aquí va la parada X</p>
        </Route>
      </Switch>
    </Router>
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
