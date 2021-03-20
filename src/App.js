import { useMemo, useState } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Display from "./componentes/Display";
import FormLinea from "./componentes/FormLinea";
import PaginaLinea from "./componentes/PaginaLinea";
import PaginaParada from "./componentes/PaginaParada";
import ParadasContext from "./contexts/ParadasContext";

function App() {
  const appId = "7cafef14";
  const appKey = "a77affc64ad3ed493dc6a4da7fbec9f7";
  const [datosAPI, setDatosAPI] = useState(null);
  const [paradas, setParadas] = useState([]);
  const [paradaInexistente, setParadaInexistente] = useState(false);
  const [rutaSeleccionada, setRutaSeleccionada] = useState([]);
  const [paradaInput, setParadaInput] = useState(""); //ejemplo paradaInput= 3402
  const [paradaSeleccionada, setParadaSeleccionada] = useState("");
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
    setParadaSeleccionada(`${paradaInput}`);
    const urlTransit = `https://api.tmb.cat/v1/transit/parades?app_id=${appId}&app_key=${appKey}`;
    const respTransit = await fetch(urlTransit);
    const datosTransit = await respTransit.json();
    setDatosAPI(datosTransit);
    const existeParada = datosTransit.features
      .filter(feature => feature.properties.CODI_PARADA === +paradaInput).length > 0;
    if (existeParada) {
      setParadaInexistente(false);
      const urlLineas = `https://api.tmb.cat/v1/ibus/stops/${paradaInput}?app_id=${appId}&app_key=${appKey}`;
      const respLineas = await fetch(urlLineas);
      const datosLineas = await respLineas.json();
      console.log(datosLineas);
      setParadas(datosLineas);
    } else {
      setParadaInexistente(true);
    }
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
          <PaginaParada
            paradas={paradas}
            paradaInput={paradaInput}
            paradaSeleccionada={paradaSeleccionada}
            lineaSeleccionada={lineaSeleccionada}
            tiempoEsperaMin={tiempoEsperaMin}
            muestraToast={muestraToast}
            paradaInexistente={paradaInexistente}
            checkExistenciaYFetch={checkExistenciaYFetch}
            modificarValue={modificarValue}
            seleccionarRuta={seleccionarRuta}
          />
        </Route>
        <Route path="/linea/X" exact>
          <PaginaLinea
            paradas={paradas}
            lineaSeleccionada={lineaSeleccionada}
            tiempoEsperaMin={tiempoEsperaMin}
          />
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
