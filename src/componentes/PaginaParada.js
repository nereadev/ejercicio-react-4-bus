import { Container } from "react-bootstrap";
import PropTypes from "prop-types";
import Display from "./Display";
import FormInput from "./FormInput";
import { useContext } from "react";
import VariablesContext from "../contexts/VariablesContext";

const PaginaParada = () => {
  const {
    paradaSeleccionada,
    lineaSeleccionada,
    tiempoEsperaMin,
    paradaInexistente
  } = useContext(VariablesContext);
  return (
    <Container className="contenedor">
      <header className="cabecera">
        <h1>{paradaInexistente ?
          `No existe la parada nº ${paradaSeleccionada}` :
          `Parada nº ${paradaSeleccionada}`}</h1>
        <Display />
        <h2 hidden={lineaSeleccionada === ""}>
          Tiempo para la línea {lineaSeleccionada}: {tiempoEsperaMin} minutos
        </h2>
      </header>
      <FormInput />
      <div className="text-center" hidden={!paradaInexistente}>
        La parada seleccionada no es válida
      </div>
    </Container>
  );
};

export default PaginaParada;
