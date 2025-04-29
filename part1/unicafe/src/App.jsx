import { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick} style={{ marginRight: '10px' }}>{text}</button>
);
const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);


const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;

  if (total === 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </div>
    );
  }

  const average = (good - bad) / total;
  const positivePercentage = (good / total) * 100;

  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
      <StatisticLine text="Good" value={good}/>
      <StatisticLine text="Neutral" value={neutral}/>
      <StatisticLine text="Bad" value={bad}/>
      <StatisticLine text="All" value={total}/>
      <StatisticLine text="Average" value={average.toFixed(1)}/>
      <StatisticLine text="Positive" value={`${positivePercentage.toFixed(1)} %`}/>
      </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
