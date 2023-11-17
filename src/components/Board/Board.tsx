"use client";

import React, { useEffect, useState } from "react";
import { Hole } from "./Hole";
import { useGlobalContext } from "@/contexts";
import { getRandomNumber, getRandomNumbers } from "@/helpers/utils";


const initialHoles = new Array(9)
  .fill({})
  .map((e, index) => <Hole mousesCount={0} showMouses={false} key={index}></Hole>);


export function Board({ }) {
  const { visibilityDuration, selectedLevel, hidingDuration } =
    useGlobalContext();
  const [holes, setHoles] = useState(initialHoles);
  const [hidingTimer, setHidingTimer] = useState<any | null>(null);
  const [visibilityTimer, setVisibilityTimer] = useState<any | null>(null);

  function mouseDaemon() {
    clearTimeout(hidingTimer);
    clearTimeout(visibilityTimer);

    let totalMousesAllowed: number = selectedLevel.mouseCount;
    let totalMousesPutsInHoles: number = 0;
    const selectedHolesIndex = getRandomNumbers(
      0,
      holes.length - 1,
      selectedLevel.mouseCount
    ).map((index) => {
      let mousesCount = 0;
      mousesCount = totalMousesAllowed > 0 ? getRandomNumber(1, totalMousesAllowed) : 0;
      totalMousesAllowed -= mousesCount;
      return { index, mousesCount };
    });
    const t1 = setTimeout(() => {
      setHoles((olds) => {
        return initialHoles.map((e, i) => {
          const isASelectedHole = selectedHolesIndex.find(item => item.index === i)
          if (isASelectedHole) {
            return <Hole mousesCount={isASelectedHole.mousesCount} showMouses={true} key={i}></Hole>;
          }
          return <Hole mousesCount={0} showMouses={false} key={i}></Hole>;
        });
      });
      const t2 = setTimeout(() => {
        setHoles((olds) => {
          return initialHoles;
        });
        mouseDaemon();
      }, visibilityDuration * 1000);

      setHidingTimer(t2);
    }, hidingDuration);

    setVisibilityTimer(t1);
  }

  useEffect(() => {
    mouseDaemon();
    return () => {
      clearTimeout(hidingTimer);
      clearTimeout(visibilityTimer);
    };
  }, [visibilityDuration, selectedLevel]);


  return (
    <div className="w-[200px] h-[200px] bg-white border-gray-700 border-2">
      <div className="grid grid-cols-3 grid-rows-3 h-full w-full gap-2 p-2">
        {holes.map((hole) => hole)}
      </div>
    </div>
  );
}
