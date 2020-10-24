import React from 'react';
import { Fruit } from '..';
import './Fruit.css';
import img from './img2.jpg';


const backgroundImg = {
  backgroundImage: `url(${img})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  height: 100,
  position: 'relative',
  zIndex: 1
};

export default (props) => (
  <aside className="cardB" style={backgroundImg}>
    <header className="cardB-header">
      <h1 className="cardB-title center">Guardians of the Galaxy</h1>
    </header>
    <main className="cardB-body">
      <p>
        A group of intergalactic criminals are forced to work together to stop a fanatical warrior from taking control of the universe.
      </p>
    </main>
    <footer className="cardB-footer">
      <i className="ico far fa-heart" title="add as favorite"></i>
      <i className="ico fas fa-share-alt" title="share"></i>
      <i className="ico fab fa-instagram" title="post on Instagram"></i>
    </footer>
  </aside>
);