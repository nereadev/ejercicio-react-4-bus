import PropTypes from "prop-types";
import FormLinea from "./FormLinea";


const FormInput = (props) => {
    const {
        paradas,
        paradaInput,
        muestraToast,
        checkExistenciaYFetch,
        modificarValue,
        paradaInexistente,
        seleccionarRuta,
    } = props;

    return (
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
    );
};

FormInput.propTypes = {
    paradas: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array,
    ]).isRequired,
    muestraToast: PropTypes.bool.isRequired,
    checkExistenciaYFetch: PropTypes.func.isRequired,
    modificarValue: PropTypes.func.isRequired,
    paradaInexistente: PropTypes.bool.isRequired,
    seleccionarRuta: PropTypes.func.isRequired
};

export default FormInput;