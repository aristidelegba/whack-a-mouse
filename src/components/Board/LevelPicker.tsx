"use client";

import { TLevel } from "@/configs";
import { useGlobalContext } from "@/contexts";
import cn from "classnames";

function LevelPicker() {
  const { levels, selectedLevel, setSelectedLevel } = useGlobalContext();
  function Level({ level }: { level: TLevel }) {
    const isSelected = selectedLevel.id === level.id;
    return (
      <button
        className={cn(
          "bg-black flex items-center justify-center text-white rounded-full px-4 py-2 hover:shadow-2xl",
          { "bg-green-500": isSelected }
        )}
        onClick={() => {
          setSelectedLevel(level.id);
        }}
      >
        {level.label}
      </button>
    );
  }
  return (
    <>
      <strong>Levels:</strong>
      <div className="grid grid-cols-3 gap-2">
        {levels.map((level, key) => {
          return <Level level={level} key={level.id} />;
        })}
      </div>
    </>
  );
}

export default LevelPicker;
