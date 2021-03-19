import { useContext } from "react";
import ParadasContext from "../contexts/ParadasContext";

const Display = () => {
  const protoparadas = useContext(ParadasContext);
  const paradas = (protoparadas.length !== 0) ? protoparadas.data.ibus : [];
  return (
    <div className="display">
      {
        (protoparadas.length !== 0) ?
          paradas.map(parada =>
            <div key={parada.routeId} className="bus">
              <span className="linea">{parada.line}</span>
              <span className="destino">{parada.destination}</span>
              <span className="tiempo">{`${parada["t-in-min"]}min`}</span>
            </div>) :
          null
      }
    </div >
  );
};

export default Display;

