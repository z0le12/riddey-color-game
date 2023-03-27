// libs imports
import React, {useEffect, useState} from 'react';

// styles
import './App.scss';

// components
import AddColorForm from "../AddColorForm/AddColorForm";
import ColorsList from "../ColorsList/ColorsList";

// methods
import {getColors} from "../../mockServer";

// types
import {ColorItemTypes} from "../../interfaces";

function App() {

    const [colorsList, setColorsList] = useState<ColorItemTypes[]>([])

    useEffect(() => {
        const response = getColors()
        setColorsList(response)
    }, [])

  return (
    <div className="app">
        <h1>My Favorite Colors</h1>
        <AddColorForm
            colorsList={colorsList}
            setColorsList={setColorsList}
        />
        <ColorsList
            colorsList={colorsList}
            setColorsList={setColorsList}
        />
    </div>
  );
}

export default App;
