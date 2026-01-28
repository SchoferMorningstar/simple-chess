import express from "express";
import http from "http";
import { Server } from "socket.io";
import { Chess } from "chess.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const games = new Map();

// Generowanie krótkiego ID
function shortId(length = 6) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "";
  for (let i = 0; i < length; i++)
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  return id;
}

// Tworzenie nowego meczu
function createGame(timeMinutes, colorChoice) {
  let colors = ["w", "b"];
  let white, black;

  if (colorChoice === "white") {
    white = null;
    black = null;
  } else if (colorChoice === "black") {
    white = null;
    black = null;
  } else {
    // losowo
    if (Math.random() < 0.5) {
      white = null;
      black = null;
    } else {
      white = null;
      black = null;
    }
  }

  return {
    id: shortId(),
    chess: new Chess(),
    players: [],
    turn: "w",
    time: { w: timeMinutes * 60, b: timeMinutes * 60 },
    lastMoveAt: Date.now(),
  };
}

io.on("connection", (socket) => {
  // Tworzenie meczu
  socket.on("game:create", ({ time, color }, cb) => {
    try {
      const game = createGame(time, color);
      game.players.push({
        id: socket.id,
        color: color === "random" ? (Math.random() < 0.5 ? "w" : "b") : color,
      });
      games.set(game.id, game);
      socket.join(game.id);
      cb({ gameId: game.id, color: game.players[0].color });
    } catch (err) {
      console.error(err);
      cb({ error: "Error creating game" });
    }
  });

  // Dołączanie do meczu
  socket.on("game:join", ({ gameId }, cb) => {
    const game = games.get(gameId);
    if (!game) return cb({ error: "Game not found" });

    if (game.players.length >= 2) return cb({ error: "Game full" });

    let color = game.players[0].color === "w" ? "b" : "w";
    game.players.push({ id: socket.id, color });
    socket.join(gameId);

    io.to(gameId).emit("game:update", {
      fen: game.chess.fen(),
      time: game.time,
      turn: game.turn,
    });

    cb({ success: true, color });
  });

  // Ruch gracza
  socket.on("game:move", ({ gameId, move }, cb) => {
    const game = games.get(gameId);
    if (!game) return;

    try {
      const player = game.players.find((p) => p.id === socket.id);
      if (!player) return cb({ error: "Not a player" });
      if (player.color !== game.turn) return cb({ error: "Not your turn" });

      const now = Date.now();
      const elapsed = Math.floor((now - game.lastMoveAt) / 1000);
      game.time[game.turn] -= elapsed;
      game.lastMoveAt = now;

      if (game.time[game.turn] <= 0) {
        io.to(gameId).emit("game:over", {
          winner: game.turn === "w" ? "b" : "w",
          reason: "timeout",
        });
        games.delete(gameId);
        return;
      }

      const result = game.chess.move(move);
      if (!result) return cb({ error: "Illegal move" });

      game.turn = game.chess.turn();

      io.to(gameId).emit("game:update", {
        fen: game.chess.fen(),
        time: game.time,
        turn: game.turn,
      });

      cb({ success: true });
    } catch (err) {
      console.error(err);
      cb({ error: "Error processing move" });
    }
  });

  socket.on("disconnect", () => {
    for (const [id, game] of games) {
      game.players = game.players.filter((p) => p.id !== socket.id);
      if (game.players.length === 0) games.delete(id);
    }
  });
});

server.listen(3001, () => console.log("Server listening on 3001"));
