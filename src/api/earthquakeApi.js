export async function fetchEarthquakes({ place, zoomRadius, startDate, endDate }) {
  const baseUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
  // Modify URL / fetch logic according to filters
  const response = await fetch(baseUrl);
  const data = await response.json();
  return data.features; // Return GeoJSON features array
}
