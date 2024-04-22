"use client";
import Image from "next/image";
import { useState, Fragment, useCallback } from "react";

type HeaderProps = {};

const Header = (props: HeaderProps) => {
  return <div>Game clock</div>;
};

const Team = ({ name, score }: { name: string; score: number }) => {
  return (
    <>
      <div>Name: {name}</div>
      <div>Score: {score || 0}</div>
    </>
  );
};

export default function Home() {
  const [teamOne, changeTeamOne] = useState({
    name: "team name 1",
    teamScore: 0,
    buttonChangeteam1: false,
  });
  const [teamTwo, changeTeamTwo] = useState({
    name: "team name 2",
    teamScore: 0,
    buttonChangeteam1: false,
  });
  // Change team name 1 með string og useState
  return (
    <div>
      <Header />
      <Team name={teamOne.name} score={teamOne.teamScore}></Team>
      {/* Change name input */}
      <div>
        Change team name:
        <input
          type="text"
          style={{ border: "1px solid #ddd" }}
          onChange={(e) => changeTeamOne({ ...teamOne, name: e.target.value })}
        ></input>
      </div>
      <div>
        Change team score:
        <input
          type="number"
          style={{ border: "1px solid #ddd" }}
          onChange={(e) =>
            changeTeamTwo({ ...teamOne, teamScore: e.target.value })
          }
        ></input>
      </div>
      <Team name={teamTwo.name} score={teamTwo.teamScore}></Team>
      {/* Change name input */}
      <div>
        Change team name:
        <input
          type="text"
          style={{ border: "1px solid #ddd" }}
          onChange={(e) => changeTeamTwo({ ...teamTwo, name: e.target.value })}
        ></input>
      </div>
      <div>
        Change team score:
        <input
          type="number"
          style={{ border: "1px solid #ddd" }}
          onChange={(e) =>
            changeTeamTwo({ ...teamTwo, teamScore: e.target.value })
          }
        ></input>
      </div>
    </div>
  );
}
