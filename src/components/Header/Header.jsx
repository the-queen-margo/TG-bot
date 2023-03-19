import React from 'react';
import './Header.css';

import {useTelegram} from '../useTelegram'
export const Header =()=>{
    const { user, onClose} = useTelegram();
    return(
        <>
        <button className='btn' onClick={onClose}>Закрыть</button>
        <span className='userName'>
        sup TTYL    {user?.username}
        </span>
        </>
    )
}

    