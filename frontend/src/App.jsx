import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [questions, setQuestions] = useState([])
  const [selectedOptions, setSelectedOptions] = useState({})
  const [name, setName] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [loading, setLoading] = useState(true)
  const [savedScore, setSavedScore] = useState(null)
  const [allScores, setAllScores] = useState([])

  useEffect(() => {
    fetch('http://localhost:5135/questions')
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => {
        setQuestions(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching questions:', error)
        setLoading(false)
      })

    fetchScores()
  }, [])

  const fetchScores = () => {
    fetch('http://localhost:5135/scores')
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok')
        return response.json()
      })
      .then(data => setAllScores(data))
      .catch(error => console.error('Error fetching scores:', error))
  }

  const handleOptionSelect = (qIndex, option) => {
    setSelectedOptions(prev => ({
      ...prev,
      [qIndex]: option
    }))
  }

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handleSubmit = () => {
    let calculatedScore = 0
    questions.forEach((question, qIndex) => {
      if (selectedOptions[qIndex] === question.answer) {
        calculatedScore++
      }
    })

    if (name.trim().length > 0) {
      fetch('http://localhost:5135/scores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name,
          score: calculatedScore,
          maxScore: questions.length
        }),
      })
        .then(response => response.json())
        .then(data => {
          setSavedScore(data)
          fetchScores()
        })
        .catch(error => {
          console.error('Error saving score:', error)
        })
    }

    setScore(calculatedScore)
    setShowResult(true)
  }

  if (loading) return <div>กำลังโหลด...</div>
  if (questions.length === 0) return <div>ไม่พบข้อมูลคำถาม</div>

  if (showResult) {
    return (
      <div className="quiz-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div className="quiz-header" style={{ backgroundColor: '#28a745', color: 'white', padding: '10px', textAlign: 'center' }}>
          <h2>IT 10-2</h2>
        </div>
        <div className="quiz-content" style={{ padding: '20px', border: '1px solid #ccc', position: 'relative' }}>
          <div style={{ marginBottom: '20px' }}>
            <label>ชื่อ-สกุล: </label>
            <input type="text" value={name} disabled style={{ padding: '5px', width: '300px' }} />
          </div>

          {questions.map((question, qIndex) => (
            <div key={qIndex} style={{ marginBottom: '20px' }}>
              <p>{qIndex + 1}. {question.question}</p>
              <div style={{ marginLeft: '20px' }}>
                {question.options.map((option, oIndex) => (
                  <div key={oIndex} style={{ marginBottom: '10px' }}>
                    <label style={{ display: 'flex', alignItems: 'center' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          backgroundColor: option === question.answer ? '#000' : '#ccc',
                          marginRight: '10px',
                        }}
                      />
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h3>คุณ {name} สอบได้คะแนน: {score}/{questions.length}</h3>
          </div>

          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <button
              onClick={() => {
                setShowResult(false)
                setScore(0)
                setSelectedOptions({})
                setName('')
              }}
              style={{
                backgroundColor: '#007bff',
                color: 'white',
                padding: '8px 16px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              สอบอีกครั้ง
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="quiz-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="quiz-header" style={{ backgroundColor: '#28a745', color: 'white', padding: '10px', textAlign: 'center' }}>
        <h2>IT 10-1</h2>
      </div>
      <div className="quiz-content" style={{ padding: '20px', border: '1px solid #ccc' }}>
        <div style={{ marginBottom: '20px' }}>
          <label>ชื่อ-สกุล: </label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            style={{ padding: '5px', width: '300px' }}
          />
        </div>

        {questions.map((question, qIndex) => (
          <div key={qIndex} style={{ marginBottom: '20px' }}>
            <p>{qIndex + 1}. {question.question}</p>
            <div style={{ marginLeft: '20px' }}>
              {question.options.map((option, oIndex) => (
                <div key={oIndex} style={{ marginBottom: '10px' }}>
                  <label style={{ display: 'flex', alignItems: 'center' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: selectedOptions[qIndex] === option ? '#000' : '#ccc',
                        marginRight: '10px',
                        cursor: 'pointer'
                      }}
                      onClick={() => handleOptionSelect(qIndex, option)}
                    />
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}

        <button
          onClick={handleSubmit}
          disabled={Object.keys(selectedOptions).length !== questions.length}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '8px 16px',
            border: 'none',
            borderRadius: '4px',
            cursor: Object.keys(selectedOptions).length !== questions.length ? 'not-allowed' : 'pointer',
            opacity: Object.keys(selectedOptions).length !== questions.length ? 0.6 : 1,
            display: 'block',
            margin: '30px auto 0'
          }}
        >
          ส่งคำตอบ
        </button>
      </div>
    </div>
  )
}

export default App
