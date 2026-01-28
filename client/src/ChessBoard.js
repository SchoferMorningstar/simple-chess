import { Chess } from "chess.js";
import { socket } from "./socket";
import { useMemo, useState } from "react";

export default function ChessBoard({ fen, color }) {
  const chess = useMemo(() => new Chess(fen), [fen]);
  const [selected, setSelected] = useState(null);

  function click(square) {
    if (!selected) {
      setSelected(square);
      return;
    }

    socket.send(
      JSON.stringify({
        type: "move",
        move: { from: selected, to: square, promotion: "q" },
      }),
    );

    setSelected(null);
  }

  const board = chess.board();

  return (
    <div className="grid grid-cols-8">
      {board.flatMap((row, y) =>
        row.map((cell, x) => {
          const file = "abcdefgh"[x];
          const rank = 8 - y;
          const square = `${file}${rank}`;

          return (
            <div
              key={square}
              onClick={() => click(square)}
              className={`w-16 h-16 flex items-center justify-center text-2xl cursor-pointer
${(x + y) % 2 ? "bg-zinc-600" : "bg-zinc-300"}`}
            >
              {cell && piece(cell)}
            </div>
          );
        }),
      )}
    </div>
  );
}

function piece(p) {
  const map = {
    p: "♟",
    r: "♜",
    n: "♞",
    b: "♝",
    q: "♛",
    k: "♚",
  };
  return p.color === "w" ? map[p.type].toUpperCase() : map[p.type];
}
