import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Map from "./components/Map";
import { fetchEarthquakes } from "./api/earthquakeApi";

const App = () => {
  const [earthquakeData, setEarthquakeData] = useState([]);
  const [filters, setFilters] = useState({
    place: "",
    radius: 100, // default radius km
  });

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchEarthquakes(filters);
      setEarthquakeData(data);
    };
    loadData();
  }, [filters]);

  const handlePlaceSelect = (place) => {
    setFilters((prev) => ({ ...prev, place }));
  };

  const handleRadiusChange = (radius) => {
    setFilters((prev) => ({ ...prev, radius }));
  };

  return (
    <>
      <NavBar onSearch={handlePlaceSelect} onRadiusChange={handleRadiusChange} />
      <Map earthquakeData={earthquakeData} filters={filters} />
    </>
  );
};

export default App;
