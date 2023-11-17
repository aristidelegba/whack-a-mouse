"use client";
import React from "react";
import Input from "../Forms/Input";
import { useGlobalContext } from "@/contexts";

function VisibilityDurationInput() {
  const { visibilityDuration, setVisibilityDuration } = useGlobalContext();
  return (
    <div className="grid gap-2">
      <strong>
        <label htmlFor="duration" className="capitalize">
          durée de visibilité ({visibilityDuration}) seconds
        </label>
      </strong>
      <Input min={1} type="number" value={visibilityDuration} onChange={(e) => setVisibilityDuration(parseInt(e.target.value))} />
    </div>
  );
}

export default VisibilityDurationInput;
