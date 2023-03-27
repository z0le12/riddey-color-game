// libs imports
import React from 'react';

// styles
import './ColorsList.scss'

// components
import ColorItem from "./ColorItem/ColorItem";

// methods
import {deleteColor} from "../../mockServer";

// types
import {ColorItemTypes} from "../../interfaces";

interface ColorListProps {
    colorsList: ColorItemTypes[],
    setColorsList: Function,
}

const ColorsList = ({colorsList, setColorsList}:ColorListProps) => {

    const removeColor = (_id: string) => {
        const response = deleteColor(_id)
        setColorsList(response)
    }

    return (
        <div>
            <h4>Color Collection</h4>
            <div className='colors-list'>
                {colorsList.map(colorItem => (
                    <ColorItem
                        key={colorItem._id}
                        colorItem={colorItem}
                        removeColor={removeColor}
                    />
                ))}
            </div>
        </div>
    );
};

export default ColorsList;