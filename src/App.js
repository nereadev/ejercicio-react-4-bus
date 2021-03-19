import { useEffect, useMemo, useState } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Display from "./componentes/Display";
import FormLinea from "./componentes/FormLinea";
import ParadasContext from "./contexts/ParadasContext";
import paradasJson from "./paradasBus.json";

function App() {
  const appId = "7cafef14";
  const appKey = "a77affc64ad3ed493dc6a4da7fbec9f7";
  const [datosAPI, setDatosAPI] = useState(null);
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
  const checkExistenciaYFetch = async (e) => {
    e.preventDefault();
    const urlTransit = `https://api.tmb.cat/v1/transit/parades?app_id=${appId}&app_key=${appKey}`;
    const resp = await fetch(urlTransit);
    const datos = await resp.json();
    setDatosAPI(datos);
    const existeParada =
      datos.features.filter(feature => feature.properties.CODI_PARADA === +paradaInput).length > 0;
    if (existeParada) {
      fetchLineas(paradaInput);
    }
  };
  const fetchLineas = async () => {
    const urlLineas = `https://api.tmb.cat/v1/ibus/stops/2775?app_id=${appId}&app_key=${appKey}`;
    const resp = await fetch(urlLineas);
    const datos = await resp.json();
    console.log(datos);
    /* fetch de buscaParada, seteando paradas a lo que devuelva */
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
                <form onSubmit={checkExistenciaYFetch}>
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
          <Container className="contenedor">
            <ParadasContext.Provider value={paradas} >
              <header className="cabecera">
                <h1>Línea X</h1>
                <Display />
                <h2 hidden={lineaSeleccionada === ""}>
                  Tiempo para la línea {lineaSeleccionada}: {tiempoEsperaMin} minutos
                </h2>
              </header>
              <button type="submit">Volver</button>
            </ParadasContext.Provider >
          </Container>
        </Route>
        <Route path="*" exact>
          <h2 className="text-center p-5">No se ha encontrado la ruta solicitada.</h2>
          <button type="submit">Volver</button>
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
