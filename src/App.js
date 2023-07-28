import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState({});
  const [map, setMap] = useState("");

  function handleSearch(event) {
    setSearchQuery(event.target.value);
    console.log(searchQuery);
  }

  async function getLocation(event) {
    // console.log("location found");
    try {
      
      event.preventDefault();
      event.target.input.value = "";
      const API = `https://eu1.locationiq.com/v1/search?key=${process.env.REACT_APP_API_KEY}&q=${searchQuery}&format=json`;
      console.log(API);
      const res = await axios.get(API);
      // console.log(res.data[0]);
      setLocation(res.data[0]);
      handleMap(res.data[0]);
    } catch (error) {
      console.log(error);
      alert(error)
    }
  }

  function handleMap(data) {
    // console.log(data);
    const API = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_API_KEY}&center=${data.lat},${data.lon}&zoom=9`;
    setMap(API);
  }

  return (
    <div className="App">
      <h1>City Explorer</h1>
      <form onSubmit={getLocation}>
        <input type="text" placeholder="Search for a city" onChange={handleSearch} name="input" />
        <button type="submit">Explore!</button>
      </form>
      <p className="para">Location</p>
      <p>{location.display_name}</p>
      <p className="para">Latitude</p>
      <p>{location.lat}</p>
      <p className="para">Longitude</p>
      <p>{location.lon}</p>
      <p className="para">Map</p>
      {map && <img src={map} alt="map" />}
      
    </div>
  );
}

export default App;