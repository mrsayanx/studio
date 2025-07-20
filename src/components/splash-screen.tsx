"use client";

import { cn } from "@/lib/utils";

const SplashScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-black overflow-hidden">
      <div className="relative">
        <style jsx>{`
          @keyframes drop {
            0% {
              transform: translateY(-200px) scaleY(0.9);
              opacity: 0;
            }
            5% {
              opacity: 0.7;
            }
            50% {
              transform: translateY(0px) scaleY(1);
              opacity: 1;
            }
            65% {
              transform: translateY(-17px) scaleY(0.9);
            }
            75% {
              transform: translateY(-22px) scaleY(0.9);
            }
            100% {
              transform: translateY(0px) scaleY(1);
            }
          }
          .welcome-text span {
            display: inline-block;
            opacity: 0;
            animation: drop 1.2s ease-out forwards;
          }
        `}</style>
        <h1
          className="welcome-text font-headline text-2xl md:text-4xl lg:text-5xl font-black text-center tracking-wider text-white"
          style={{ textShadow: "0px 0px 10px rgba(255, 255, 255, 0.3)" }}
        >
          {"Welcome To ".split("").map((char, index) => (
            <span key={index} style={{ animationDelay: `${index * 0.05}s` }}>
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
          <span className="text-primary" style={{ animationDelay: `${"Welcome To ".length * 0.05}s`, textShadow: "0px 0px 15px hsl(var(--primary))" }}>
            T
          </span>
          {"ekitto".split("").map((char, index) => (
            <span key={index} style={{ animationDelay: `${("Welcome To T".length + index) * 0.05}s` }}>
              {char}
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
};

export default SplashScreen;
