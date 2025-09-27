# earthquake-visualizer

A React application that displays earthquakes on an interactive world map, visualizing real-time earthquake data for the current day. Users can explore earthquakes by location, adjust the map radius, and view detailed colored tooltips—each representing the earthquake's magnitude.

## Features

🌎 Live Earthquake Map: View earthquakes that occurred today, visualized on a world map.

💡 Colored Markers: Earthquake intensity is represented with color-coded circles for instant clarity.

🔍 Country Search: Type/select a country to automatically zoom the map there.

🎚️ Radius Adjust: Choose different viewing radii to control the zoom level.

🖱️ Tooltip on Hover: Hover over markers to view styled tooltips showing location, magnitude, depth, and time.

🎨 Floating Legend: A fixed legend explains what each circle color means for earthquake magnitude.

📱 Responsive UI: Modern floating navbar, custom background, and user-friendly design.

## Usage

- Type a country in the search bar to filter and select it for map zoom.
- Pick a radius to control how close or wide the map zooms.
- Hover over colored circles on the map for earthquake details.
- Refer to the floating legend for magnitude color mappings.
- Earthquake data is loaded live for the current day.

## Tech Stack

- React
- react-leaflet & Leaflet
- JavaScript (ES6+)
- Inline CSS
