import { useContext } from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";
import ParadasContext from "../contexts/ParadasContext";

function FormLinea(props) {
  const { seleccionarRuta } = props;
  const protoparadas = useContext(ParadasContext);
  const paradas = (protoparadas.length !== 0) ? protoparadas.data.ibus : [];
  return (
    <Form>
      <Form.Label htmlFor="tiempo-linea">Tiempo para que llegue la línea: </Form.Label>
      <select
        className="tiempo-linea"
        id="tiempo-linea"
        onChange={(e) => seleccionarRuta(e)}>
        <option value="">Elige línea</option>
        {
          (protoparadas.length !== 0) ?
            paradas.map(parada => <option
              key={parada.routeId}
              value={parada.line}
            >{parada.line}</option>) :
            null
        }
      </select>
    </Form>
  );
};

FormLinea.propTypes = {
  seleccionarRuta: PropTypes.func.isRequired
};

export default FormLinea;
