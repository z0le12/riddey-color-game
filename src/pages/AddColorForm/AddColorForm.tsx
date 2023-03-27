// libs imports
import React, {useEffect, useRef, useState} from 'react';
import { HexColorPicker } from "react-colorful";

// styles
import './AddColorForm.scss';

// components
import Svg from "./Svg";

// methods
import {addColor} from "../../mockServer";

// types
import {ColorItemTypes} from "../../interfaces";

interface AddColorFormProps {
    colorsList: ColorItemTypes[],
    setColorsList: Function
}

const maxTitleLength = 256

const AddColorForm = ({colorsList, setColorsList}: AddColorFormProps) => {
    const [showColorPicked, setShowColorPicked] = useState<boolean>(false);
    const colorPickedRef = useRef<HTMLDivElement>(null);
    const [title, setTitle] = useState('');
    const [code, setCode] = useState<string>('#4b19f8');
    const [error, setError] = useState<string>('');


    const onHandleClickOutside:React.EventHandler<any> = (event) => {
        if (colorPickedRef.current && !colorPickedRef.current.contains(event.target)) {
            setShowColorPicked(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', onHandleClickOutside, true);
        return () => {
            document.removeEventListener('click', onHandleClickOutside, true);
        };
    }, []);

    const onHandleColorPicker = () => {
        setShowColorPicked(!showColorPicked)
    }

    const isColorAlreadyAdded = (title: string, code: string) => {
        const itemFoundByTitle = colorsList.find(item => item.title === title)
        if (itemFoundByTitle) {
            return `color ${title} already exists`
        }
        const itemFoundByCode = colorsList.find(item => item.code === code)
        if (itemFoundByCode) {
            return `color with code ${code} already exists as ${itemFoundByCode.title}`
        }
    }

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('')

        if (!title) {
            return setError('Title is required')
        }
        if(title.length > maxTitleLength) {
            return setError(`Title length should be equal or less than ${maxTitleLength}`)
        }
        if (!code) {
            return setError('Color code is required')
        }
        const alreadyAddedError = isColorAlreadyAdded(title, code)
        if (alreadyAddedError) {
            return setError(alreadyAddedError)
        }

        const response = addColor({title, code})
        setColorsList(response)
        setShowColorPicked(false)
        setTitle('')
    }

    return (
        <>
            <Svg/>
            <form className='add-color-form' onSubmit={onSubmit}>
                <div className='form-data-wrapper'>
                    <div className='color-name-input-wrapper'>
                        <svg>
                            <use xlinkHref='#heart'/>
                        </svg>
                        <input
                            name='title'
                            type='text'
                            placeholder='Color name'
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                        />
                    </div>
                    <div className='color-picker-block' ref={colorPickedRef}>
                        <button
                            type='button'
                            onClick={onHandleColorPicker}
                            className='color-picker-btn'
                            style={{background: code}}
                        />
                        { showColorPicked &&
                            <div className='color-picker-selector'>
                                <HexColorPicker
                                    color={code}
                                    onChange={setCode}
                                />
                                <div className="existed-colors-block">
                                    {colorsList.map(({code, _id}) => (
                                        <button
                                            key={_id}
                                            type='button'
                                            className="existed-colors-item"
                                            style={{ background: code }}
                                            onClick={() => setCode(code)}
                                        />
                                    ))}
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <button className='add-color-btn'>
                    <svg>
                        <use xlinkHref='#plus'/>
                    </svg>
                </button>
            </form>
            {error && <div className='error-block'>{error}</div>}
        </>
    );
};

export default AddColorForm;