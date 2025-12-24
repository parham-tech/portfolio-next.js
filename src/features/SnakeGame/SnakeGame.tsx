"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 1, y: 0 };

export default function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  // 🔊 صداها (اختیاری) - استفاده از ref برای جلوگیری از بازسازی در هر رندر
  const eatSoundRef = useRef<HTMLAudioElement | null>(null);
  const gameOverSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      eatSoundRef.current = new Audio("/sounds/eat.mp3");
      gameOverSoundRef.current = new Audio("/sounds/gameover.mp3");
    }
  }, []);

  // 🎮 کنترل جهت
  useEffect(() => {
    document.body.style.overflow = "hidden"; // ❌ قفل اسکرول

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          if (direction.y === 1) return;
          setDirection({ x: 0, y: -1 });
          break;
        case "ArrowDown":
          if (direction.y === -1) return;
          setDirection({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
          if (direction.x === 1) return;
          setDirection({ x: -1, y: 0 });
          break;
        case "ArrowRight":
          if (direction.x === -1) return;
          setDirection({ x: 1, y: 0 });
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction]);

  // 🐍 حرکت مار
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setSnake((prev) => {
        const newSnake = [...prev];
        const head = {
          x: (newSnake[0].x + direction.x + GRID_SIZE) % GRID_SIZE,
          y: (newSnake[0].y + direction.y + GRID_SIZE) % GRID_SIZE,
        };

        // برخورد با خودش
        if (newSnake.some((s) => s.x === head.x && s.y === head.y)) {
          gameOverSoundRef.current?.play();
          setGameOver(true);
          return prev;
        }

        newSnake.unshift(head);

        // خوردن غذا 🍎
        if (head.x === food.x && head.y === food.y) {
          eatSoundRef.current?.play();
          setScore((s) => s + 1);
          setFood({
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE),
          });
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [direction, food, gameOver]); // eatSoundRef و gameOverSoundRef نیاز نیستند چون ref هستند

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood({ x: 5, y: 5 });
    setDirection(INITIAL_DIRECTION);
    setGameOver(false);
    setScore(0);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-10 bg-black text-white rounded-2xl shadow-[0_0_40px_#00ffff30] border border-cyan-500/20">
      {/* 🧊 صفحه بازی */}
      <div
        className="grid border-4 border-cyan-400 bg-black rounded-md shadow-[0_0_25px_#00ffff80]"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, 20px)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 20px)`,
        }}
      >
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
          const x = i % GRID_SIZE;
          const y = Math.floor(i / GRID_SIZE);
          const isSnake = snake.some((s) => s.x === x && s.y === y);
          const isFood = food.x === x && food.y === y;

          return (
            <div
              key={i}
              className={`w-5 h-5 transition-all duration-150 ${
                isSnake
                  ? "bg-cyan-400 shadow-[0_0_12px_#00ffff]"
                  : isFood
                  ? "bg-pink-500 shadow-[0_0_15px_#ff00ff]"
                  : "bg-gray-900"
              }`}
            />
          );
        })}
      </div>

      {/* 🎯 امتیاز و وضعیت */}
      <div className="text-center text-cyan-300 space-y-2">
        {gameOver ? (
          <div className="flex flex-col items-center gap-4">
            <Image
              src="/gameover.gif"
              alt="Game Over"
              width={192} // w-48 ~ 192px
              height={192} // Assuming square or similar, adjust as needed. auto height in css means aspect ratio preserved.
              className="w-48 h-auto drop-shadow-[0_0_30px_#00ffff]"
            />
            <button
              onClick={resetGame}
              className="px-6 py-2 bg-cyan-600 hover:bg-cyan-800 rounded-lg text-white font-bold 
                         shadow-[0_0_25px_#00ffff] hover:shadow-[0_0_35px_#00ffff80] transition-all"
            >
              Restart
            </button>
          </div>
        ) : (
          <div className="text-2xl font-mono tracking-widest">
            Score: {score}
          </div>
        )}
        <p className="text-xs text-gray-400 mt-2">
          Use Arrow Keys to Move
        </p>
      </div>
    </div>
  );
}
