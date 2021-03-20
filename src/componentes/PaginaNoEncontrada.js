const PaginaNoEncontrada = (prop) => {

    return (
        <>
            <h2 className="text-center p-5">No se ha encontrado la ruta solicitada.</h2>
            <a href="/parada"><button type="submit">Volver</button></a>
        </>
    );
};

export default PaginaNoEncontrada;