// libs imports
import React from 'react';


// styles
import './ColorItem.scss';

import {ColorItemTypes} from "../../../interfaces";


// components

interface ColorItemProps {
    colorItem: ColorItemTypes,
    removeColor: Function,
}

const ColorItem = ({colorItem, removeColor}:ColorItemProps) => {

    const {code, title, _id} = colorItem

    const onHandleRemoveColor = () => {
        removeColor(_id)
    }

    return (
        <div className='color-item-block'>
            <div className='color-data-wrapper'>
                <div
                    className='color-picker-btn'
                    style={{backgroundColor: code}}
                />
                <p>{title}</p>
            </div>
            <button className='remove-color-btn' onClick={onHandleRemoveColor}>
                Remove Color
            </button>
        </div>
    );
};

export default ColorItem;