import css from "./App.module.css";
import CafeInfo from "../CafeInfo/CafeInfo";
import VoteOptions from "../VoteOptions/VoteOptions";
import VoteStats from "../VoteStats/VoteStats";
import Notification from "../Notification/Notification";
import { useState } from "react";
import { Votes, VoteType } from "../../types/votes";

export default function App() {
  const [votes, setVotes] = useState<Votes>({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  let isResetBtn = false

  const handleVote = (type: VoteType) => {
    setVotes({
      ...votes,
      [type]: votes[type] + 1,
    });
  };

  let totalVotes: number = Object.values(votes).reduce(
    (acc, current) => acc + current,
    0
  );

  if(totalVotes > 0) {

   isResetBtn = true

  }

  let rateVotes: number = totalVotes
    ? Math.round((votes.good / totalVotes) * 100)
    : 0;

  const resetVotes = () => {
    setVotes({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };

  return (
    <div className={css.app}>
      <CafeInfo />
      <VoteOptions
        onVote={handleVote}
        onReset={resetVotes}
        canReset={isResetBtn}
      />
      {totalVotes ? (
        <VoteStats
          votes={votes}
          totalVotes={totalVotes}
          positiveRate={rateVotes}
        />
      ) : (
        <Notification />
      )}
    </div>
  );
}
