import { Container } from "react-bootstrap";
import PropTypes from "prop-types";
import { useParams } from "react-router";

const PaginaLinea = (props) => {
    const { id, destino, tiempo } = useParams();
    return (
        <Container className="contenedor">
            <header className="cabecera">
                <h1>Línea {id}</h1>
                <h3>
                    Tiempo restante: {tiempo} minutos
                    </h3>
                <h3> Destino: {destino} </h3>
            </header>
            <a href="/parada"><button type="submit">Volver</button></a>
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