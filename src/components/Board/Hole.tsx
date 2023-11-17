import Mouse from "./Mouse";
import { useGlobalContext } from "@/contexts";

type THoleProps = { mousesCount: number, showMouses: boolean }
export function Hole({ mousesCount = 0, showMouses = false }: THoleProps) {
  const { setScore } = useGlobalContext()
  function mousesRenderer() {
    return (
      <>
        {mousesCount === 1 ? (
          <Mouse show={showMouses} />
        ) : (
          new Array(mousesCount).fill({}).map((m, index) => <Mouse show={showMouses} key={index}></Mouse>)
        )}
      </>
    );
  }


  return <div className=" bg-gray-500 border-white flex flex-wrap items-center justify-center gap-1 hover:bg-gray-400" onClick={() => {
    setScore(mousesCount > 0 ? mousesCount : -1)
  }}>{mousesRenderer()}</div>;
}
