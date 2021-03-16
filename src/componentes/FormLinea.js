import { useContext } from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";
import ParadasContext from "../contexts/ParadasContext";

function FormLinea(props) {
  const { paradaValida } = props;
  const paradas = useContext(ParadasContext).data.ibus;
  return (
    <Form hidden={paradaValida}>
      <Form.Label htmlFor="tiempo-linea">Tiempo para que llegue la línea: </Form.Label>
      <select className="tiempo-linea" id="tiempo-linea">
        <option value="">Elige línea</option>
        {
          paradas.map(parada => <option key={parada.routeId} value={parada.line}>{parada.line}</option>)
        }
      </select>
    </Form>
  );
};

export default FormLinea;