import { useContext } from "react";
import ParadasContext from "../contexts/ParadasContext";

const Display = () => {
    const paradas = useContext(ParadasContext).data.ibus;

    return (
        <div className="display">
            {
                paradas.map(parada =>
                    <div key={parada.routeId} className="bus">
                        <span className="linea">{parada.line}</span>
                        <span className="destino">{parada.destination}</span>
                        <span className="tiempo">{`${parada.["t-in-min"]}min`}</span>
                    </div>
                )
            }        </div >
    );
};

export default Display;