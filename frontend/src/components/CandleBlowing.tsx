import { useEffect, useState } from 'react'
import './CandleBlowing.css'

interface CandleBlowingProps {
  onAllCandlesBlown: () => void
  onFirstCandle?: () => void
}

const CandleBlowing = ({ onAllCandlesBlown, onFirstCandle }: CandleBlowingProps) => {
  const [candlesLit, setCandlesLit] = useState(Array(3).fill(true))

  useEffect(() => {
    if (candlesLit.every(lit => !lit)) {
      onAllCandlesBlown()
    }
  }, [candlesLit, onAllCandlesBlown])

  const blowOutCandle = () => {
    setCandlesLit(prev => {
      const litIndex = prev.findIndex(lit => lit)
      if (litIndex !== -1) {
        const newState = [...prev]
        newState[litIndex] = false
        return newState
      }
      return prev
    })
  }

  const handleClickBlow = () => {
    // Check if this is the first candle being blown
    const isFirstCandle = candlesLit.every(lit => lit)

    blowOutCandle()

    // Start happy birthday music on first candle click
    if (isFirstCandle && onFirstCandle) {
      onFirstCandle()
    }
  }

  return (
    <div className="candle-blowing-container">
      <div className="cake-display">
        <div className="cake-emoji">🎂</div>
        <div className="candles-grid">
          {candlesLit.map((lit, index) => (
            <span
              key={index}
              className={`candle-flame ${lit ? 'lit' : 'out'}`}
              onClick={handleClickBlow}
              style={{ cursor: 'pointer' }}
            >
              {lit ? '🕯️' : '💨'}
            </span>
          ))}
        </div>
      </div>

      {candlesLit.some(lit => lit) && (
        <p className="blow-instruction">
          💨 Click the candles to blow them out!
        </p>
      )}

      {!candlesLit.some(lit => lit) && (
        <div className="celebration-message">
          <h3>🎉 You blew them all out! Make a wish! 🎉</h3>
        </div>
      )}
    </div>
  )
}

export default CandleBlowing
