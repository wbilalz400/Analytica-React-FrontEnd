import React, { useState, useEffect } from 'react';
import './Devices.css';
import {getImages} from '../api';

const Images = () => {
    const [images, setImages] = useState(null);

    useEffect(() => {
        const im = getImages().then((val)=>{
            setImages(val);
        });
    }, [])
    
    return (
        <div className='DevicesMain'>
            
            <h1>Images</h1>
            <div className='devicesContainer'>
            {images && images.map((val,index)=>{
                // if (val.type === undefined){
                //     val.type = 'image/webp';
                // }
                if (val.type)  return <div className='deviceItem'><img style={{height:225}}key={index} src={`data:${val.type};base64,${val.image}`} /></div>;
            })}
            </div>
        </div>
    )
}

export default Images

