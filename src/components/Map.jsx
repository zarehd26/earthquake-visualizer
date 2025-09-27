import React, { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Tooltip,
  Circle,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import countryCoords from "./countryCoords";

const magnitudeColors = (mag) => {
  if (mag >= 7) return "#c70da8ff";
  if (mag >= 6) return "#d73027";
  if (mag >= 5) return "#fc8d59";
  if (mag >= 4) return "#fbfb49ff";
  if (mag >= 3) return "#93fc29ff";
  return "#049112ff";
};

const UpdateMapView = ({ place, radius }) => {
  const map = useMap();

  useEffect(() => {
    if (place && countryCoords[place]) {
      const [lat, lon] = countryCoords[place];

      const delta = radius / 111; // ~111 km per degree
      const bounds = [
        [lat - delta, lon - delta],
        [lat + delta, lon + delta],
      ];

      map.fitBounds(bounds, { animate: true, padding: [50, 50] });
    } else {
      map.setView([20, 0], 2, { animate: true });
    }
  }, [place, radius, map]);

  // Background + bounds setup
  useEffect(() => {
    const bounds = [
      [-90, -180], // bottom-left
      [90, 180],   // top-right
    ];
    map.setMinZoom(2);
    map.setMaxBounds(bounds);
    map.options.noWrap = false;

    const mapPane = map.getContainer();
    if (mapPane) {
      mapPane.style.backgroundColor = "#a6cfdce8"; // ✅ restore teal background
    }
  }, [map]);

  return place && countryCoords[place] ? (
    <Circle
      center={countryCoords[place]}
      radius={radius * 1000}
      pathOptions={{ color: "#3388ff", fillOpacity: 0.05 }}
    />
  ) : null;
};

const legendItems = [
  { label: "7+", color: "#c70da8ff" },
  { label: "6 - 6.9", color: "#d73027" },
  { label: "5 - 5.9", color: "#fc8d59" },
  { label: "4 - 4.9", color: "#fbfb49ff" },
  { label: "3 - 3.9", color: "#93fc29ff" },
  { label: "< 3", color: "#049112ff" },
];

const Legend = () => (
  <div
    style={{
      position: "fixed",
      bottom: 20,
      right: 20,
      backgroundColor: "rgba(0,0,0,0.7)",
      color: "white",
      padding: "10px",
      borderRadius: "8px",
      zIndex: 1200,
      fontSize: "0.85rem",
      boxShadow: "0 0 8px rgba(0,0,0,0.5)",
    }}
  >
    <b>Magnitude</b>
    <ul style={{ listStyle: "none", margin: 0, padding: 0, marginTop: 8 }}>
      {legendItems.map(({ label, color }) => (
        <li
          key={label}
          style={{ display: "flex", alignItems: "center", marginBottom: 6 }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              backgroundColor: color,
              marginRight: 10,
              borderRadius: "50%",
              border: "1.5px solid white",
            }}
          />
          {label}
        </li>
      ))}
    </ul>
  </div>
);

const Map = ({ earthquakeData, filters }) => {
  return (
    <>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        minZoom={2}
        style={{ height: "100vh", width: "100vw" }}
        zoomControl={true}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          noWrap={false}
        />
        <UpdateMapView place={filters.place} radius={filters.radius} />

        {earthquakeData.map((eq) => {
          const [longitude, latitude, depth] = eq.geometry.coordinates;
          const mag = eq.properties.mag;

          return (
            <CircleMarker
              key={eq.id}
              center={[latitude, longitude]}
              radius={4 + mag * 2}
              color={magnitudeColors(mag)}
              fillOpacity={0.9}
              weight={2}
            >
              <Tooltip
                direction="auto"
                offset={[0, -10]}
                opacity={0.95}
                permanent={false}
                sticky={true}
                className="custom-tooltip"
              >
                <div
                  style={{
                    backgroundColor: "rgba(0,0,0,0.85)",
                    color: "white",
                    padding: "5px 8px",
                    borderRadius: "6px",
                    fontSize: "0.85rem",
                    whiteSpace: "nowrap",
                    border: "1px solid grey", // ✅ grey border
                    zIndex: 3000,             // ✅ floats above navbar
                    position: "relative",
                  }}
                >
                  <div>
                    <b>Location:</b> {eq.properties.place}
                  </div>
                  <div>
                    <b>Magnitude:</b> {mag}
                  </div>
                  <div>
                    <b>Depth:</b> {depth} km
                  </div>
                  <div>
                    <b>Time:</b> {new Date(eq.properties.time).toLocaleString()}
                  </div>
                </div>
              </Tooltip>
            </CircleMarker>
          );
        })}
      </MapContainer>
      <Legend />
    </>
  );
};

export default Map;
