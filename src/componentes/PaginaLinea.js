import { Container } from "react-bootstrap";
import PropTypes from "prop-types";
import ParadasContext from "../contexts/ParadasContext";
import Display from "./Display";

const PaginaLinea = (props) => {
    const {
        paradas,
        lineaSeleccionada,
        tiempoEsperaMin
    } = props;
    return (
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
    );
};

PaginaLinea.propTypes = {
    paradas: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array,
    ]).isRequired,
    lineaSeleccionada: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
    ]).isRequired,
    tiempoEsperaMin: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired
};

export default PaginaLinea;