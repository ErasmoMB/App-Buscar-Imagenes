import React, { useState, useEffect } from "react";

function App() {
  const [valor, setValor] = useState("");
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sugerencias, setSugerencias] = useState([]);

  useEffect(() => {
    if (valor.trim() === "") {
      setSugerencias([]);
      return;
    }

    const API_KEY = "MAmRich7Pee8HrSdI0P7HZfokz_OFiwTnE0EPKydte4";
    const SUGGESTION_URL = `https://api.unsplash.com/search/collections/?client_id=${API_KEY}&query=${valor}&per_page=5`;

    fetch(SUGGESTION_URL)
      .then((response) => response.json())
      .then((data) => {
        setSugerencias(data.results);
      })
      .catch((error) => {
        console.error("Error fetching suggestions:", error);
      });
  }, [valor]);

  const buscarResultados = async () => {
    setLoading(true);
    const API_KEY = "MAmRich7Pee8HrSdI0P7HZfokz_OFiwTnE0EPKydte4";
    const URL = `https://api.unsplash.com/search/photos/?client_id=${API_KEY}&query=${valor}&per_page=20`;

    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        setResultados(data.results);
        setLoading(false);
        setSugerencias([]);
      })
      .catch((error) => {
        console.error("Error fetching results:", error);
        setLoading(false);
      });
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      buscarResultados();
    }
  };

  return (
    <div className="container p-4">
      <h1 className="text-center">Buscar Imágenes</h1>
      <div className="row mt-4">
        <div className="col-12">
          <div className="input-group">
            <input
              className="form-control"
              type="text"
              placeholder="Buscar imágenes"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              onKeyPress={handleEnter}
            />
            <div className="input-group-append">
              <button
                onClick={() => buscarResultados()}
                className="btn btn-danger"
                disabled={loading}
              >
                {loading ? "Buscando..." : "Buscar"}
              </button>
            </div>
          </div>
          {sugerencias.length > 0 && (
            <ul className="list-group mt-2">
              {sugerencias.map((sugerencia, indice) => (
                <li
                  key={indice}
                  className="list-group-item"
                  onClick={() => {
                    setValor(sugerencia.title);
                    setSugerencias([]);
                  }}
                >
                  {sugerencia.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="row mt-4">
        {resultados.map((elemento, indice) => {
          return (
            <div key={indice} className="col-md-3 col-sm-6 mb-4">
              <div className="card">
                <img
                  src={elemento.urls.regular}
                  className="card-img-top"
                  alt={`Imagen ${indice}`}
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
