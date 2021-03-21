import { useContext } from "react";
import PropTypes from "prop-types";
import { Redirect, Route, Switch } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import ParadasContext from "../contexts/ParadasContext";

const Display = (props) => {
  const { paradaInexistente, displayStyle } = props;
  const protoparadas = useContext(ParadasContext);
  const paradas = (protoparadas.length !== 0) ? protoparadas.data.ibus : [];

  return (
    <div className="display">
      {
        (protoparadas.length !== 0 && !paradaInexistente) ?
          paradas.map(parada =>
            <div key={parada.routeId} className="bus" style={displayStyle}>
              <span className="linea">
                <a href={`/linea/${parada.line}`}>{parada.line}</a>
              </span>
              <span className="destino">{parada.destination}</span>
              <span className="tiempo">{`${parada["t-in-min"]}min`}</span>
            </div>) :
          null
      }
    </div >
  );
};

Display.propTypes = {
  paradaInexistente: PropTypes.bool.isRequired,
  displayStyle: PropTypes.shape({
    marginTop: PropTypes.string,
    marginBottom: PropTypes.string,
  }).isRequired,
};

export default Display;

