"use client";
import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { NEON, neonGlow } from "./neonAssets";
import { getSpeedForRound, pickNextTarget } from "./reflexLogic";
import GameOverModal from "@/features/GameOver/GameOverModal";

type NeonReflexProps = {
  nodes?: number;
};

export default function NeonReflex({ nodes = 6 }: NeonReflexProps) {
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [lives, setLives] = useState(3);
  const [active, setActive] = useState<number | null>(null);
  const [progress, setProgress] = useState(1);
  const [running, setRunning] = useState(true);
  const [showGameOver, setShowGameOver] = useState(false);
  const [restartKey, setRestartKey] = useState(0);

  const lastRef = useRef<number | undefined>(undefined);
  const timerRef = useRef<number | null>(null);
  const startedAtRef = useRef<number>(0);
  const intervalMsRef = useRef<number>(getSpeedForRound(1).intervalMs);

  // 🎵 موزیک پس‌زمینه
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const musicStartedRef = useRef(false);

  useEffect(() => {
    bgMusicRef.current = new Audio("/audio/background.mp3");
    bgMusicRef.current.loop = true;
    bgMusicRef.current.volume = 0.5;

    const startMusic = () => {
      if (!musicStartedRef.current) {
        bgMusicRef.current!.play().catch(() => {
          console.log("مرورگر اجازه پخش خودکار صدا را نداد.");
        });
        musicStartedRef.current = true;
      }
    };

    // موزیک بعد از اولین تعامل کاربر شروع می‌شود
    document.addEventListener("click", startMusic, { once: true });

    return () => {
      bgMusicRef.current?.pause();
      bgMusicRef.current = null;
      document.removeEventListener("click", startMusic);
    };
  }, []);

  const palette = useMemo(
    () => [NEON.cyan, NEON.magenta, NEON.yellow, NEON.green, NEON.purple, NEON.red],
    []
  );
  const totalNodes = Math.max(3, Math.min(nodes, palette.length));
  const nodesArray = useMemo(() => Array.from({ length: totalNodes }), [totalNodes]);

  // 🎯 شروع راند
  const startRound = useCallback(
    (r: number) => {
      const { intervalMs } = getSpeedForRound(r);
      intervalMsRef.current = intervalMs;
      startedAtRef.current = performance.now();

      const next = pickNextTarget(lastRef.current, totalNodes);
      lastRef.current = next;
      setActive(next);
      setProgress(1);

      if (timerRef.current) cancelAnimationFrame(timerRef.current);

      const tick = () => {
        const elapsed = performance.now() - startedAtRef.current;
        const p = Math.max(0, 1 - elapsed / intervalMsRef.current);
        setProgress(p);

        if (p <= 0) {
          setLives((lv) => {
            const nextLives = lv - 1;
            if (nextLives <= 0) {
              setRunning(false);
              setActive(null);
              setShowGameOver(true);
              return 0;
            }
            setRound((rr) => rr + 1);
            startRound(r + 1);
            return nextLives;
          });
          return;
        }

        timerRef.current = requestAnimationFrame(tick);
      };

      timerRef.current = requestAnimationFrame(tick);
    },
    [totalNodes]
  );

  useEffect(() => {
    if (!running) return;
    startRound(round);
    return () => {
      if (timerRef.current) cancelAnimationFrame(timerRef.current);
    };
  }, [round, running, startRound, restartKey]);

  const handleHit = (idx: number) => {
    if (!running) return;
    if (idx === active) {
      setScore((s) => s + 1);
      setRound((r) => r + 1);
      startRound(round + 1);
    } else {
      setLives((lv) => {
        const nextLives = lv - 1;
        if (nextLives <= 0) {
          setRunning(false);
          setActive(null);
          setShowGameOver(true);
          return 0;
        }
        setRound((r) => r + 1);
        startRound(round + 1);
        return nextLives;
      });
    }
  };

  const ringStyle = (color: string) => ({
    boxShadow: neonGlow(color, 22),
    background: `conic-gradient(${color} ${Math.round((1 - progress) * 360)}deg, ${color}22 0deg)`,
  });

  const handleRestart = () => {
    setScore(0);
    setRound(1);
    setLives(3);
    setRunning(true);
    setActive(null);
    setProgress(1);
    setShowGameOver(false);
    setRestartKey((k) => k + 1);
  };

  return (
    <>
      <div
        className="relative w-full max-w-3xl rounded-2xl border border-white/10
          bg-[radial-gradient(1200px_600px_at_50%_-10%,#1f1b39,#0b1020_60%)]
          p-6 md:p-8 text-white max-h-[90vh] overflow-hidden"
        style={{ boxShadow: "0 30px 80px #0007" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span
              className="inline-block w-2.5 h-2.5 rounded-full"
              style={{ background: running ? NEON.green : NEON.red, boxShadow: neonGlow(NEON.green, 10) }}
            />
            <h3 className="text-xl font-semibold tracking-wider">NEON REFLEX</h3>
          </div>
        </div>

        {/* Score / Lives */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <span className="text-sm opacity-80">Score</span>
            <span
              className="px-3 py-1 rounded-lg text-black font-bold"
              style={{ background: NEON.yellow, boxShadow: neonGlow(NEON.yellow, 14) }}
            >
              {score}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-full"
                style={{ background: i < lives ? NEON.magenta : "#222", boxShadow: i < lives ? neonGlow(NEON.magenta, 14) : "none" }}
              />
            ))}
          </div>
        </div>

        {/* Nodes */}
        <div
          className="grid gap-6 place-items-center"
          style={{ gridTemplateColumns: totalNodes === 6 ? "repeat(3, minmax(0,1fr))" : "repeat(3, minmax(0,1fr))" }}
        >
          {nodesArray.map((_, i) => {
            const color = palette[i % palette.length];
            const isActive = i === active;
            return (
              <button
                key={i}
                onClick={() => handleHit(i)}
                className="relative aspect-square w-[70%] rounded-full border border-white/10 bg-black/40 hover:bg-black/30 transition-transform duration-150 focus:outline-none"
                style={{ boxShadow: neonGlow(color, isActive ? 26 : 10), transform: isActive ? "scale(1.06)" : "scale(1.0)" }}
              >
                {isActive && <div className="absolute inset-0 rounded-full" style={ringStyle(color)} />}
                <div
                  className="absolute inset-[20%] rounded-full"
                  style={{
                    background: color,
                    boxShadow: neonGlow(color, 18),
                    opacity: isActive ? 1 : 0.55,
                    transition: "opacity .15s, transform .15s",
                    transform: isActive ? "scale(1.02)" : "scale(1)",
                  }}
                />
              </button>
            );
          })}
        </div>

        <p className="mt-8 text-center text-sm opacity-70">
          Click the glowing nodes before the ring closes. Miss or mis-click costs a life!
        </p>
      </div>

      {/* GameOver Modal */}
      {showGameOver && <GameOverModal score={score} onRestart={handleRestart} onClose={() => setShowGameOver(false)} />}
    </>
  );
}
