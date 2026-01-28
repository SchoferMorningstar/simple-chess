import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Chessboard from "chessboardjsx";

const socket = io("http://localhost:3001");

export default function App() {
  const [gameId, setGameId] = useState(null);
  const [fen, setFen] = useState("start");
  const [time, setTime] = useState({ w: 0, b: 0 });
  const [joinId, setJoinId] = useState("");
  const [turn, setTurn] = useState("w");
  const [color, setColor] = useState("w");
  const [inputTime, setInputTime] = useState(5);
  const [inputColor, setInputColor] = useState("random");

  useEffect(() => {
    socket.on("game:update", (data) => {
      setFen(data.fen);
      setTime(data.time);
      setTurn(data.turn);
    });

    socket.on("game:over", ({ winner, reason }) => {
      alert(`Winner: ${winner} (${reason})`);
      setGameId(null);
      setFen("start");
      setTime({ w: 0, b: 0 });
    });
  }, []);

  // Żywy zegar
  useEffect(() => {
    if (!gameId) return;
    const interval = setInterval(() => {
      setTime((prev) => {
        const newTime = { ...prev };
        if (turn === "w") newTime.w = Math.max(newTime.w - 1, 0);
        else newTime.b = Math.max(newTime.b - 1, 0);
        return newTime;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [gameId, turn]);

  const createGame = () => {
    socket.emit(
      "game:create",
      { time: Number(inputTime), color: inputColor },
      (res) => {
        if (res.error) return alert(res.error);
        setGameId(res.gameId);
        setColor(res.color);
      },
    );
  };

  const joinGame = () => {
    socket.emit("game:join", { gameId: joinId }, (res) => {
      if (res?.error) return alert(res.error);
      setGameId(joinId);
      setColor(res.color);
    });
  };

  const onDrop = ({ sourceSquare, targetSquare }) => {
    socket.emit(
      "game:move",
      {
        gameId,
        move: { from: sourceSquare, to: targetSquare, promotion: "q" },
      },
      (res) => res?.error && alert(res.error),
    );
  };

  const fmt = (t) => `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`;

  const formLabelClass = "block text-white font-semibold mb-1 mt-2";
  const formInputClass =
    "w-full p-2 rounded border border-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6 gap-4">
      {!gameId && (
        <div className="w-full max-w-md flex flex-col gap-4 bg-gray-800 p-6 rounded shadow-lg">
          <div>
            <label className={formLabelClass}>Time (minutes)</label>
            <input
              type="number"
              min="1"
              className={formInputClass}
              value={inputTime}
              onChange={(e) => setInputTime(e.target.value)}
            />
          </div>

          <div>
            <label className={formLabelClass}>Side</label>
            <select
              className={formInputClass}
              value={inputColor}
              onChange={(e) => setInputColor(e.target.value)}
            >
              <option value="random">Random</option>
              <option value="w">White</option>
              <option value="b">Black</option>
            </select>
          </div>

          <button
            onClick={createGame}
            className="bg-green-600 hover:bg-green-700 transition-colors text-white font-bold py-2 rounded"
          >
            Create game
          </button>

          <div>
            <label className={formLabelClass}>Game ID</label>
            <input
              className={formInputClass}
              placeholder="Enter game ID"
              onChange={(e) => setJoinId(e.target.value.toUpperCase())}
            />
          </div>

          <button
            onClick={joinGame}
            className="bg-blue-600 hover:bg-blue-700 transition-colors text-white font-bold py-2 rounded"
          >
            Join game
          </button>
        </div>
      )}

      {gameId && (
        <div className="flex flex-col items-center gap-4">
          <div className="text-lg font-bold">Game ID: {gameId}</div>
          <div className="flex gap-6 text-lg">
            <div>White: {fmt(time.w)}</div>
            <div>Black: {fmt(time.b)}</div>
          </div>
          <div className="text-lg">
            Turn: {turn === "w" ? "White" : "Black"} | You:{" "}
            {color === "w" ? "White" : "Black"}
          </div>
          <div className="mt-4">
            <Chessboard
              position={fen}
              onDrop={onDrop}
              orientation={color === "w" ? "white" : "black"}
            />
          </div>
        </div>
      )}
    </div>
  );
}
