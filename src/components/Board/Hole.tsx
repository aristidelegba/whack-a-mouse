import { useEffect, useState } from "react";
import Mouse from "./Mouse";
import { useGlobalContext } from "@/contexts";

type THoleProps = { mousesCount: number; showMouses: boolean };
export function Hole({ mousesCount = 0, showMouses = false }: THoleProps) {
  const [hasAlreadyClicked, setHasAlreadyClicked] = useState<boolean>(false);
  useEffect(() => {
    if (!showMouses) {
      setHasAlreadyClicked(false);
    }
  }, [showMouses]);

  function onClickOnHole() {
    if (hasAlreadyClicked) return;
    setHasAlreadyClicked(true);
    setScore(mousesCount > 0 ? mousesCount : -1);
  }
  const { setScore } = useGlobalContext();
  function mousesRenderer() {
    switch (mousesCount) {
      case 1:
        return <Mouse show={showMouses} />;

        break;
      case 2:
        return (
          <>
            <Mouse show={showMouses} />
            <Mouse show={showMouses} />
          </>
        );

        break;
      case 3:
        return (
          <>
            <Mouse show={showMouses} />
            <Mouse show={showMouses} />
            <Mouse show={showMouses} />
          </>
        );

        break;

      default:
        break;
    }
    // <>
    //   {mousesCount === 1 ? (
    //     <Mouse show={showMouses} />
    //   ) : (
    //     new Array(mousesCount)
    //       .fill({})
    //       .map((m, index) => <Mouse show={showMouses} key={index}></Mouse>)
    //   )}
    // </>
    // );
  }

  return (
    <div
      className=" bg-gray-500 border-white flex flex-wrap items-center justify-center gap-1 hover:bg-gray-400"
      onClick={() => {
        onClickOnHole();
      }}
    >
      {mousesRenderer()}
    </div>
  );
}
