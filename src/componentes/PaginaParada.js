import { Container } from "react-bootstrap";
import PropTypes from "prop-types";
import ParadasContext from "../contexts/ParadasContext";
import Display from "./Display";
import FormInput from "./FormInput";

const PaginaParada = (props) => {
    const {
        paradas,
        paradaInput,
        paradaSeleccionada,
        lineaSeleccionada,
        tiempoEsperaMin,
        muestraToast,
        paradaInexistente,
        checkExistenciaYFetch,
        modificarValue,
        seleccionarRuta
    } = props;

    return (
        <ParadasContext.Provider value={paradas} >
            <Container className="contenedor">
                <header className="cabecera">
                    <h1>Parada nº {paradaSeleccionada}</h1>
                    <Display />
                    <h2 hidden={lineaSeleccionada === ""}>
                        Tiempo para la línea {lineaSeleccionada}: {tiempoEsperaMin} minutos
                </h2>
                </header>
                <FormInput
                    paradas={paradas}
                    paradaInput={paradaInput}
                    muestraToast={muestraToast}
                    checkExistenciaYFetch={checkExistenciaYFetch}
                    modificarValue={modificarValue}
                    paradaInexistente={paradaInexistente}
                    seleccionarRuta={seleccionarRuta}
                />
                <div className="text-center" hidden={!paradaInexistente}>
                    La parada seleccionada no es válida
              </div>
            </Container>
        </ParadasContext.Provider >
    );
};

PaginaParada.propTypes = {
    paradas: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array,
    ]).isRequired,
    paradaInput: PropTypes.string.isRequired,
    paradaSeleccionada: PropTypes.string.isRequired,
    lineaSeleccionada: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
    ]).isRequired,
    tiempoEsperaMin: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    muestraToast: PropTypes.bool.isRequired,
    paradaInexistente: PropTypes.bool.isRequired,
    checkExistenciaYFetch: PropTypes.func.isRequired,
    modificarValue: PropTypes.func.isRequired,
    seleccionarRuta: PropTypes.func.isRequired
};

export default PaginaParada;