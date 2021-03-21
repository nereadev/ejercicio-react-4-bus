import { Container } from "react-bootstrap";
import PropTypes from "prop-types";
import ParadasContext from "../contexts/ParadasContext";
import Display from "./Display";
import { useParams } from "react-router";

const PaginaLinea = (props) => {
    const {
        paradas,
        lineaSeleccionada,
        tiempoEsperaMin
    } = props;
    const { id } = useParams();
    return (
        <Container className="contenedor">
            <ParadasContext.Provider value={paradas} >
                <header className="cabecera">
                    <h1>Línea {id}</h1>
                    <Display />
                    <h2>
                        Tiempo para la línea {id}:
                         {tiempoEsperaMin} minutos
                    </h2>
                </header>
                <a href="/parada"><button type="submit">Volver</button></a>
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