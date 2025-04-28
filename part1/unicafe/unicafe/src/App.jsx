import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = good + bad + neutral
  const average = total === 0 ? 0 : (good - bad) /total
  const positivePercentage = total === 0 ? 0 : (good/total) * 100

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad+1)}>bad</button>

  
      <h1>Statistics</h1>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {total}</p>
      <p>Average: {average.toFixed(1)}</p>
      <p>Positive: {positivePercentage.toFixed(1)} %</p>
    </div>
  );
};

export default App;
