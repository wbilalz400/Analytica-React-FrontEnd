import React from 'react';
import { faAngry } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default ({text}) => (
  <aside className="angry-joe center top-margin">
    <h1>{text}</h1>
    <FontAwesomeIcon icon={faAngry}/>
  </aside>
);
