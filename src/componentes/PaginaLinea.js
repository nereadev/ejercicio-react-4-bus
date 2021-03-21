import { Container } from "react-bootstrap";
import { useParams } from "react-router";

const PaginaLinea = () => {
    const { id, destino, tiempo } = useParams();
    return (
        <Container className="contenedor">
            <header className="cabecera">
                <h1>Línea {id}</h1>
                <h3>Tiempo restante: {tiempo} minutos</h3>
                <h3> Destino: {destino} </h3>
            </header>
            <a href="/parada"><button type="submit">Volver</button></a>
        </Container>
    );
};

export default PaginaLinea;