import React, { useEffect, useState } from "react";
import "./App.css"; 

export default function SensorTable() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState(""); // Estado para el filtro

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:9222/sensoresyactuadores");
        const result = await response.json();
        setData(result);
        setFilteredData(result); // Inicializamos con todos los datos
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // Actualiza cada 5 segundos
    return () => clearInterval(interval);
  }, []);

  // Filtrar los datos en función del valor del filtro
  useEffect(() => {
    const filtered = data.filter((sensor) =>
      sensor.nombre.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredData(filtered);
  }, [filter, data]); // Se ejecuta cada vez que el filtro o los datos cambian

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Datos de Sensores</h1>

      {/* Filtro por nombre */}
      <input
        type="text"
        className="mb-4 p-2 border border-gray-300 rounded"
        placeholder="Buscar por nombre..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)} // Actualizamos el filtro
      />

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Valor</th>
              <th className="px-4 py-2">Unidad</th>
              <th className="px-4 py-2">Fecha y Hora</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((sensor) => (
              <tr key={sensor._id} className="border-t">
                <td className="px-4 py-2">{sensor.nombre}</td>
                <td className="px-4 py-2">{sensor.valor}</td>
                <td className="px-4 py-2">{sensor.unidad}</td>
                <td className="px-4 py-2">{new Date(sensor.fechaHora).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
