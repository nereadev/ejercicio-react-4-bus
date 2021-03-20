import { Container } from "react-bootstrap";
import PropTypes from "prop-types";
import ParadasContext from "../contexts/ParadasContext";
import Display from "./Display";
import FormLinea from "./FormLinea";

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
                    {
                        (paradas.length !== 0 && !paradaInexistente) ?
                            ((paradas.data.ibus.length !== 0) ?
                                <FormLinea
                                    seleccionarRuta={seleccionarRuta}
                                ></FormLinea> :
                                <div className="text-center">
                                    No hay buses disponibles para la parada seleccionada
                      </div>) :
                            null
                    }
                </section>
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