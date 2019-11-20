import React from 'react';
import './App.css';
import ReactSpeedometer from "react-d3-speedometer";

const prod_fetch = () => fetch("https://shaneschulte.com/mob_jank_gauge/jankness.txt");
const test_fetch = async () => ({ json: async () => Math.random() * 1000});
const getData = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? test_fetch : prod_fetch;

const jank_text = (a) => {
    if(a >= 0 && a < 200)
    return "Iron-clad"
    if(a >= 200 && a < 400)
    return "Robust"
    if(a >= 400 && a < 500)
    return "Slightly Jank"
    if(a >= 500 && a < 750)
    return "Jank"
    if(a >= 750 && a < 900)
    return "Very Jank"
    if(a >= 900 && a < 1000)
    return "MAXIMUM Jank"
    return "SamsaraDriver"
}
function App() {

const [jank, setJank] = React.useState(0);
const getJankness = () => {
    getData()
    .then(response => response.json()).then(result => setJank(result));
}
React.useEffect(() => {
    const timer = setInterval(() => getJankness(), 1000);
    return () => clearInterval(timer);
});
  return (
    <div className="App">
      <header className="App-header">
          Mobile Jank Gauge
          <div className="Inner-box">
          <ReactSpeedometer
              fluidWidth
              customSegmentStops={[0, 500, 750, 900, 1000]}
              segmentColors={["limegreen", "gold", "orange","firebrick"]}
              labelFontSize={0}
              valueTextFontSize={0}
              value={jank}
          />
      </div>Current State: {jank_text(jank)}
      </header>
    </div>
  );
}

export default App;
