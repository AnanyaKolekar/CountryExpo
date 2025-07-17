import React from "react";
import { useState, useEffect } from "react";
import './App.css';

const App = () =>{
const [teams, setTeams] = useState([]);
const [search, setSearch] = useState("")

useEffect(()=>{
  fetch("/Teams.json")
  .then((res)=>res.json())
  .then((data)=> setTeams(data))
  .catch((err)=>console.error('Failed to fetch teams:',err));
},[]);

const filteredTeams = teams.filter((team)=>
  team.name.toLowerCase().includes(search.toLowerCase()) ||
  team.homeGround.toLowerCase().includes(search.toLowerCase())
);

return(
  <>
  <div className="container">
    <h1>IPL Teams Viewer</h1>
    <input
    type="text"
    placeholder="Search your favorite team"
    value={search}
    onChange={(e)=> setSearch(e.target.value)}

    />
 
  <div className="teams-grid">
    {filteredTeams.map((team,index)=>(
      <div key ={index} className="team-card">
        <img src={team.logo} alt={team.name} />
        <h2>{team.name}</h2>
        <p><strong>Stadium:</strong> {team.homeGround}</p>
        <p><strong>Championships:</strong> {team.championships}</p>

      </div>
    ))}
  </div>
   </div>
  </>
)
}
export default App;
