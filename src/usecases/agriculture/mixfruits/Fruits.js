import React from 'react';
import img from './img.jpg';
import './Fruits.css';


const headerImg = {
  backgroundImage: `url(${img})`,
  backgroundSize: 'cover',
  backgroundPosition: '0 -75px',
  backgroundRepeat: 'no-repeat',
  height: 145,
  width: '100%',
  opacity: '1',
  position: 'relative',
  zIndex: 500
};

export default (props) => (
  <aside className="cardA">
    <header className="cardA-header" style={headerImg}></header>
    <main className="cardA-body">
      <h1 className="cardA-title center">Guardians Of The Galaxy</h1>
      <p>
        A group of intergalactic criminals are forced to work together to stop a fanatical warrior from taking control of the universe.
      </p>
    </main>
    <footer className="cardA-footer">
      <i className="ico far fa-heart" title="add as favorite"></i>
      <i className="ico fas fa-share-alt" title="share"></i>
      <i className="ico fab fa-instagram" title="post on Instagram"></i>
    </footer>
  </aside>
);