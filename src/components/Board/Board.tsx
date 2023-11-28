"use client";

import React, { useEffect, useState } from "react";
import { Hole } from "./Hole";
import { useGlobalContext } from "@/contexts";
import { getRandomNumber, getRandomNumbers } from "@/helpers/utils";

const initialHoles = new Array(9).fill({}).map((e, index) => ({
  mousesCount: 0,
  showMouses: false,
  key: index,
}));

export function Board({}) {
  const { visibilityDuration, selectedLevel, hidingDuration, resetGame } =
    useGlobalContext();

  const [holes, setHoles] = useState(initialHoles);
  const [timer, setTimer] = useState<any | null>(null);
  const [showMouses, setShowMouses] = useState(false);
  const [selectedHolesIndexOuter, setSelectedHolesIndex] = useState<{
    [key: string]: number;
  }>({});

  function mouseDaemon() {
    let totalMousesAllowed: number = selectedLevel.mouseCount;

    const selectedHolesIndex: {
      [key: string]: number;
    } = {};

    const randoms = getRandomNumbers(0, 9, selectedLevel.mouseCount);
    randoms.map((index) => {
      let mousesCount = 0;
      mousesCount =
        totalMousesAllowed > 0 ? getRandomNumber(1, totalMousesAllowed) : 0;
      totalMousesAllowed -= mousesCount;
      selectedHolesIndex[index] =
        (selectedHolesIndex[index] || 0) + mousesCount;
    });

    setSelectedHolesIndex(selectedHolesIndex);
  }

  useEffect(() => {
    if (!showMouses) {
      mouseDaemon();
      const t1 = setInterval(() => {
        clearInterval(t1);
        clearTimeout(t1);
        setShowMouses(true);
      }, hidingDuration);
      setTimer(t1);
    } else {
      const t1 = setTimeout(() => {
        setShowMouses(false);
      }, visibilityDuration * 1000);
      setTimer(t1);
    }
  }, [showMouses]);

  useEffect(() => {
    setShowMouses(false);
    return () => {
      clearTimeout(timer);
      clearInterval(timer);
    };
  }, [visibilityDuration, selectedLevel]);

  return (
    <>
      <div className="w-[200px] h-[200px] bg-white border-gray-700 border-2">
        <div className="grid grid-cols-3 grid-rows-3 h-full w-full gap-2 p-2">
          {holes.map((hole) => (
            <Hole
              key={hole.key}
              showMouses={showMouses}
              mousesCount={selectedHolesIndexOuter[hole.key] || 0}
            ></Hole>
          ))}
        </div>
      </div>
    </>
  );
}
