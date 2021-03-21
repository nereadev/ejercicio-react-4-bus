import { useContext } from "react";
import PropTypes from "prop-types";
import ParadasContext from "../contexts/ParadasContext";
import VariablesContext from "../contexts/VariablesContext";

const Display = () => {
  const { paradaInexistente, displayStyle } = useContext(VariablesContext);
  const protoparadas = useContext(ParadasContext);
  const paradas = (protoparadas.length !== 0) ? protoparadas.data.ibus : [];
  return (
    <div className="display">
      {
        (protoparadas.length !== 0 && !paradaInexistente) ?
          paradas.map(parada =>
            <div key={parada.routeId} className="bus" style={displayStyle}>
              <span className="linea">
                <a href={`/linea/${parada.line}/
                ${parada.destination}/${parada["t-in-min"]}`}>{parada.line}</a>
              </span>
              <span className="destino">{parada.destination}</span>
              <span className="tiempo">{`${parada["t-in-min"]}min`}</span>
            </div>) :
          null
      }
    </div >
  );
};

export default Display;

