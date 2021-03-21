import PropTypes from "prop-types";
import FormLinea from "./FormLinea";
import { useContext } from "react";
import ParadasContext from "../contexts/ParadasContext";
import VariablesContext from "../contexts/VariablesContext";
import FuncionesContext from "../contexts/FuncionesContext";

const FormInput = () => {
  const { paradaInput, muestraToast, paradaInexistente } = useContext(VariablesContext);
  const { checkExistenciaYFetch, modificarValue } = useContext(FuncionesContext);
  const protoparadas = useContext(ParadasContext);
  const paradas = (protoparadas.length !== 0) ? protoparadas.data.ibus : [];
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
        (!paradaInexistente) ?
          (paradas.length !== 0 ?
            <FormLinea /> :
            <div className="text-center">
              No hay buses disponibles para la parada seleccionada
            </div>) :
          null
      }
    </section>
  );
};

export default FormInput;
