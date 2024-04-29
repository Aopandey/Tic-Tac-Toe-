import { useState } from "react";

export default function Player({name, symbol, isActive, whenNameChange}){
    const [playerName, setplayerName] = useState(name);
    const [ isEditing, setIsEditing] = useState(false);

    function handleClickEdit() {
        setIsEditing((editing) => !editing);

        if (isEditing){
        whenNameChange(symbol, playerName);
        }
    }

    function handleChange(event) {
        setplayerName(event.target.value);
    }

    let editplayerName = <span className="player-name">{playerName}</span>
    let btnvalue = 'Edit';

    if(isEditing) {
        editplayerName= <input text="text" required value={playerName} onChange={handleChange}/>;
        btnvalue = 'Save';
    }

    return(
        <li className={isActive ? 'active' : undefined}>
          <span className="player">
                {editplayerName}    
              <span className="player-symbol">{symbol}</span>
          </span>
          <button onClick={handleClickEdit}>{btnvalue}</button>
        </li>
    );
}