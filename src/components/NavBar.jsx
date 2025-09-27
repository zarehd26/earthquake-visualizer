import React, { useState, useRef, useEffect } from "react";
import countryNames from "./countryNames"; // ✅ import external country list

const radiusOptions = [50, 100, 200, 500, 1000]; // km

const NavBar = ({ onSearch, onRadiusChange }) => {
  const [place, setPlace] = useState("");
  const [radius, setRadius] = useState(radiusOptions[0]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePlaceChange = (e) => {
    const val = e.target.value;
    setPlace(val);
    if (val.length > 0) {
      setFilteredCountries(
        countryNames.filter((c) =>
          c.toLowerCase().startsWith(val.toLowerCase())
        )
      );
      setShowSuggestions(true);
    } else {
      setFilteredCountries([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (val) => {
    setPlace(val);
    setFilteredCountries([]);
    setShowSuggestions(false);
    onSearch(val); // select immediately triggers search
  };

  const handleRadiusChange = (e) => {
    const val = Number(e.target.value);
    setRadius(val);
    onRadiusChange(val);
  };

  const handleSearchClick = () => {
    if (place) onSearch(place);
    setShowSuggestions(false);
  };

  return (
    <div style={styles.navbar}>
      <div style={styles.left}>EARTHQUAKES</div>
      <div style={styles.right} ref={wrapperRef}>
        <div style={styles.inputWrapper}>
          <input
            type="text"
            value={place}
            placeholder="Type to search country"
            onChange={handlePlaceChange}
            style={styles.textInput}
          />
          {showSuggestions && filteredCountries.length > 0 && (
            <ul style={styles.suggestionsList}>
              {filteredCountries.map((country) => (
                <li
                  key={country}
                  style={styles.suggestionItem}
                  onClick={() => handleSuggestionClick(country)}
                >
                  {country}
                </li>
              ))}
            </ul>
          )}
        </div>
        <select
          value={radius}
          onChange={handleRadiusChange}
          style={styles.radiusSelect}
        >
          {radiusOptions.map((r) => (
            <option key={r} value={r}>
              {r} km
            </option>
          ))}
        </select>

        <button
          onClick={handleSearchClick}
          style={styles.searchButton}
          title="Search"
        >
          🔍
        </button>
      </div>
    </div>
  );
};

const styles = {
  navbar: {
    position: "absolute",
    top: 20,
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "rgba(0,0,0,0.85)",
    borderRadius: 12,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    width: "90%",
    maxWidth: 900,
    color: "white",
    boxShadow: "0 2px 8px rgba(0,0,0,0.6)",
    zIndex: 2000, // stays above map
  },
  left: {
    flex: 1,
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 20,
    userSelect: "none",
  },
  right: {
    flex: 3,
    display: "flex",
    gap: 16,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  inputWrapper: {
    position: "relative",
    minWidth: 150,
  },
  textInput: {
    width: "100%",
    borderRadius: 8,
    border: "1px solid #ccc",
    padding: "6px 12px",
    fontSize: 16,
    boxSizing: "border-box",
  },
  suggestionsList: {
    position: "absolute",
    top: "100%",
    left: 0,
    backgroundColor: "white",
    color: "black",
    maxHeight: 150,
    overflowY: "auto",
    boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
    borderRadius: "0 0 8px 8px",
    marginTop: 2,
    padding: 0,
    listStyle: "none",
    zIndex: 2500,
    width: "100%",
  },
  suggestionItem: {
    padding: "8px 12px",
    cursor: "pointer",
    width: "100%",
    boxSizing: "border-box",
  },
  radiusSelect: {
    borderRadius: 8,
    border: "none",
    padding: "6px 12px",
    width: 100,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: "#28a745",
    borderRadius: "50%",
    border: "none",
    height: 36,
    width: 36,
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: 18,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 0 6px rgba(40, 167, 69, 0.6)",
  },
};

export default NavBar;
