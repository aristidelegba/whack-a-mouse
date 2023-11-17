import { Board } from "../components/Board/Board";
import LevelPicker from "@/components/Board/LevelPicker";
import VisibilityDurationInput from '../components/Board/VisibilityDurationInput';
import Score from "@/components/Board/Score";
import GoodByeScreen from "@/components/Board/GoodByeScreen";

export default function Home() { 
  return (
    <main className="flex min-h-screen flex-col items-center gap-5 lg:p-24 p-10">
      <div className="p-2 grid gap-2">
        <Score/>
        <VisibilityDurationInput/>
        <LevelPicker />
      </div>
      <Board />
      <GoodByeScreen/>
    </main>
  );
}
