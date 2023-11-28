"use client";

import React, { useEffect, useState } from "react";
import { Hole } from "./Hole";
import { useGlobalContext } from "@/contexts";
import { getRandomNumber, getRandomNumbers } from "@/helpers/utils";

const initialHoles = new Array(9)
  .fill({})
  .map((e, index) => (
    <Hole mousesCount={0} showMouses={false} key={index}></Hole>
  ));

export function Board({}) {
  const { visibilityDuration, selectedLevel, hidingDuration, resetGame } =
    useGlobalContext();
  const [holes, setHoles] = useState(initialHoles);
  const [hidingTimer, setHidingTimer] = useState<any | null>(null);
  const [visibilityTimer, setVisibilityTimer] = useState<any | null>(null);

  function mouseDaemon() {
    clearTimeout(hidingTimer);
    clearTimeout(visibilityTimer);

    let totalMousesAllowed: number = selectedLevel.mouseCount;
    const selectedHolesIndex: {
      [key: string]: { index: number; mousesCount: number };
    } = {};
    
    const randoms = getRandomNumbers(0, 9, selectedLevel.mouseCount)
    randoms.map((index) => {
      let mousesCount = 0;
      mousesCount =
      totalMousesAllowed > 0 ? getRandomNumber(1, totalMousesAllowed) : 0;
      totalMousesAllowed -= mousesCount;
      selectedHolesIndex[index] = selectedHolesIndex[index]
      ? { index, mousesCount: selectedHolesIndex[index].mousesCount+ mousesCount }
      : { index, mousesCount };
    });
    // console.log('randoms', randoms, selectedHolesIndex)
    const t1 = setTimeout(() => {
      // const newsHoles = [...initialHoles];
      // selectedHolesIndex.map((h) => {
      //   // news[h.index] = React.cloneElement(news[h.index], { mousesCount: h.mousesCount, showMouses: h.mousesCount > 0 })
      // });

      setHoles((prev) => {
        // console.log('selectedHolesIndex', selectedHolesIndex)
        return prev.map((h, index) => {
          let selectedHole = h.key && selectedHolesIndex[h.key];
          if (selectedHole) {
            console.log('selectedHole,h.key', selectedHole,h.key)
            return (
              <Hole
                mousesCount={selectedHole.mousesCount}
                showMouses={selectedHole.mousesCount > 0}
                key={selectedHole.index}
              ></Hole>
            );
          } else {
            return <Hole mousesCount={0} showMouses={false} key={index}></Hole>;
          }
        });
      });

      const t2 = setTimeout(() => {
        setHoles((olds) => {
          return initialHoles;
        });
        mouseDaemon();
      }, visibilityDuration * 90);

      setHidingTimer(t2);
    }, hidingDuration);

    setVisibilityTimer(t1);
  }

  useEffect(() => {
    clearTimeout(hidingTimer);
    clearTimeout(visibilityTimer);
    mouseDaemon();
    // setTimeout(() => {
    //   resetGame()
    //   console.log('done')
    // }, 3000);
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
