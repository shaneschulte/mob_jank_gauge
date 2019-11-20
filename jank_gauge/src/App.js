import React from 'react';
import './App.css';
import ReactSpeedometer from "react-d3-speedometer";
import * as R from "recharts";

const prod_fetch = () => fetch("https://shaneschulte.com/mob_jank_gauge/jankness_log.txt");
const test_data = () => Array(100).fill(null).map((_, i) => `${Date.now()+10*i*i} ${Math.random() * 1000}`);
const test_fetch = async () => ({ text: async () => test_data().join('\n')});
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

const [jank, setJank] = React.useState('0 0\n');
const getJankness = () => {
    getData()
    .then(response => response.text()).then(result => setJank(result));
}
React.useEffect(() => {
    const timer = setInterval(() => getJankness(), 1000);
    return () => clearInterval(timer);
});
const latestJankArray = jank.split('\n').filter(Boolean);
const latestJank = Number(latestJankArray[latestJankArray.length - 1].split(' ')[1]);

var splitted;
  return (
    <div className="App">
      <header className="App-header">
          Mobile Jank Gauge
          <div className="Inner-box">
          <ReactSpeedometer
              fluidWidth
              customSegmentStops={[0, 500, 750, 900, 1000]}
              needleColor="skyblue"
              segmentColors={["limegreen", "gold", "orange","firebrick"]}
              labelFontSize={0}
              valueTextFontSize={0}
              value={latestJank}
          />
      </div>Current State: {jank_text(latestJank)}
    <R.ResponsiveContainer width='70%' height={300}>
      <R.LineChart
  data={latestJankArray.map(a => ({ historicalJank: (splitted = a.split(' '))[1], timestamp: splitted[0]}))}
  margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
>
 <R.YAxis dataKey="historicalJank" type="number" domain={[0, 1000]} hide />
 <R.XAxis dataKey="timestamp" type="number" domain={['dataMin', 'dataMax']} hide />
  <R.Line type="monotone" dataKey="historicalJank" stroke="skyblue" strokeWidth={4} />
      </R.LineChart>
  </R.ResponsiveContainer>
      </header>
    </div>
  );
}

export default App;
