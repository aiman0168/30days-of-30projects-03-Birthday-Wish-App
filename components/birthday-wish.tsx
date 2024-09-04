"use client";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
  CardFooter,
} from "./ui/card";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { FaBirthdayCake, FaGift } from "react-icons/fa";
import { GiBalloons } from "react-icons/gi";

//Confetti  Interface
interface ConfettiType {
  width: number;
  height: number;
}

//Dynamic import
const DynamicConfetti = dynamic(() => import("react-confetti"), { ssr: false });


//Define array of colours
const candleColors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8"];
const balloonColors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8"];
const confettiColors = ["#FF6B6B","#4ECDC4","#45B7D1","#FFA07A","#98D8C8","#F7DC6F","#BB8FCE",];
export default function BirthdayWish() {
  const [candlesLit, setCandlesLit] = useState<number>(0);
  const [balloonsPoppedCount, setBalloonsPoppedCount] = useState<number>(0);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [windowSize, setWindowSize] = useState<ConfettiType>({width: 0,height: 0,});
  const [celebrating, setCelebrating] = useState<boolean>(false);

  //define constants
  const totalCandles: number = 5;
  const totalBalloons: number = 5;


  //apply side effects
  useEffect(() => {
    const hangleSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    hangleSize();
    window.addEventListener("resize", hangleSize);
    return () => window.removeEventListener("resize", hangleSize);
  }, []);

  useEffect(() => {
    if (candlesLit === totalCandles && balloonsPoppedCount === totalBalloons) {
      setShowConfetti(true);
    }
  }, [candlesLit, balloonsPoppedCount]);


  //Birthday functions
  const lightCandle = (index: number) => {
    if (index === candlesLit) {
      setCandlesLit((previous) => previous + 1);
    }
  };

  const popBalloon = (index: number) => {
    if (index === balloonsPoppedCount) {
      setBalloonsPoppedCount((previous) => previous + 1);
    }
  };

  const celebrate = () => {
    setCelebrating(true);
    setShowConfetti(true);
    const interval = setInterval(() => {
      setCandlesLit((previous) => {
        if (previous < totalCandles) return previous + 1;
        clearInterval(interval);
        return previous;
      });
    }, 500);
  };
  return (
    <div className="min-h-screen bg-blue-800/10 flex p-4 items-center justify-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="mx-auto transition-all overflow-hidden duration-300 ease-in-out hover:shadow-2xl hover:shadow-cyan-900 border-2 border-black">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl text-black font-bold">
              Happy Birthday!
            </CardTitle>
            <CardDescription className="text-2xl font-semibold text-gray-600">
              Aiman
            </CardDescription>
            <p className="text-lg text-gray-500">18th December</p>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            {/* Candle Light Section */}
            <div>
              <h3 className="text-lg font-semibold text-black mb-2">
                Light the Candles:
              </h3>
              <div className="flex justify-center space-x-2">
                {[...Array(totalCandles)].map((_, index) => (
                  <AnimatePresence key={index}>
                    {(celebrating && index <= candlesLit) ||
                    (!celebrating && index < candlesLit) ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: celebrating ? index * 0.5 : 0,
                        }}
                      >
                        <FaBirthdayCake
                          className="w-8 h-8 transition-colors duration-300 ease-in-out cursor-pointer hover:scale-110"
                          style={{
                            color: candleColors[index % candleColors.length],
                          }}
                          onClick={() => lightCandle(index)}
                        />
                      </motion.div>
                    ) : (
                      <FaBirthdayCake
                        className="w-8 h-8 text-gray-300 transition-colors duration-300 ease-in-out cursor-pointer hover:scale-110"
                        onClick={() => lightCandle(index)}
                      />
                    )}
                  </AnimatePresence>
                ))}
              </div>
            </div>
            {/* balloon Popped section */}
            <div>
              <h3 className="text-lg font-semibold text-black mb-2">
                Pop the Balloons:
              </h3>
              <div className="flex justify-center space-x-2">
                {[...Array(totalBalloons)].map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 1 }}
                    animate={{ scale: index < balloonsPoppedCount ? 0 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <GiBalloons
                      className={`w-8 h-8 cursor-pointer hover:scale-110`}
                      style={{
                        color:
                          index < balloonsPoppedCount
                            ? "#D1D5DB"
                            : balloonColors[index % balloonColors.length],
                      }}
                      onClick={() => popBalloon(index)}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-3 justify-center">
            <div>
              <Button
                className="bg-black text-white hover:bg-gray-800 transition-all duration-300"
                onClick={celebrate}
                disabled={celebrating}
              >
                Celebrate! <FaGift className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
      {showConfetti && (
        <DynamicConfetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={500}
          recycle={false}
          colors={confettiColors}
        />
      )}
    </div>
  );
}