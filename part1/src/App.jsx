import { useState } from 'react'

const Buttons = (props) => {
  console.log(props.text)
  return (
    <div>
      <button onClick={() => props.good((prev) => prev + 1)}>
        {props.text[0]}
      </button>
      <button onClick={() => props.neutral((prev) => prev + 1)}>
        {props.text[1]}
      </button>
      <button onClick={() => props.bad((prev) => prev + 1)}>
        {props.text[2]}
      </button>
    </div>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return <p>No feedback has been gathered</p>
  } else {
    return (
      <div>
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <tr>
              <td>all</td>
              <td>{good + neutral + bad}</td>
            </tr>
            <tr>
              <td>average</td>
              <td>{(good - bad) / (good + neutral + bad)}</td>
            </tr>
            <tr>
              <td>positive</td>
              <td>{(good / (good + neutral + bad)) * 100} %</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const buttonText = ['good', 'neutral', 'bad']

  return (
    <div>
      <h1>give feedback</h1>
      <Buttons
        good={setGood}
        neutral={setNeutral}
        bad={setBad}
        text={buttonText}
      />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
