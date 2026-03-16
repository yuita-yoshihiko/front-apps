import { useState } from 'react'
import './App.css'

type Cell = '○' | '×' | null

const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

function checkWinner(board: Cell[]): Cell {
  for (const [a, b, c] of WINNING_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]
    }
  }
  return null
}

function App() {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null))
  const [isMaruTurn, setIsMaruTurn] = useState(true)

  const winner = checkWinner(board)
  const isDraw = !winner && board.every((cell) => cell !== null)

  const handleClick = (index: number) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = isMaruTurn ? '○' : '×'
    setBoard(newBoard)
    setIsMaruTurn(!isMaruTurn)
  }

  const handleReset = () => {
    setBoard(Array(9).fill(null))
    setIsMaruTurn(true)
  }

  const status = winner
    ? `${winner} の勝ち！`
    : isDraw
    ? '引き分け！'
    : `次は ${isMaruTurn ? '○' : '×'} の番`

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <h1 className="text-3xl font-bold">○×ゲーム</h1>

      <p className="text-xl">{status}</p>

      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className="w-24 h-24 text-4xl font-bold border-2 border-gray-400 rounded cursor-pointer hover:bg-gray-100 disabled:cursor-default"
            disabled={!!cell || !!winner}
          >
            {cell}
          </button>
        ))}
      </div>

      <button
        onClick={handleReset}
        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        リセット
      </button>
    </div>
  )
}

export default App
