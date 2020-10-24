import React from "react";
import { string, number, array } from "prop-types";
import { animated, interpolate } from "react-spring/hooks";
import Carousel from "nuka-carousel";

const Card = ({ i, x, y, rot, scale, trans, bind, data,data2,data3 }) => {
  const { name, pH1,pH2, humidity1, humidity2,temperature1,temperature2, text, pics } = data3[i];

  return (
    <animated.div
      key={i}
      style={{
        transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`)
      }}
    >
      <animated.div
        {...bind(i)}
        style={{
          transform: interpolate([rot, scale], trans)
        }}
      >
        <div className="card">
          <Carousel>

            {pics.map((pic, index) => (
              <img src={pic} key={index} alt="profilePicture" />
            ))}
          </Carousel>
          <table>
            <th>{name}</th>
          </table>
          <table>
            <td><strong>Recommended Values</strong></td>
          </table>
          
          <table>
            
            <th>pH</th>
            <td>{pH1}-</td>
            <td>{pH2}</td>
            
          </table>
          <table>
          <th>Temperature</th>
            <td>{temperature1}-</td>
            <td>{temperature2}°C</td>
          </table>
          <table>
            <th>Humidity</th>
            <td>{humidity1}-</td>
            <td>{humidity2}%</td>
          </table>
        </div>
      </animated.div>
    </animated.div>
  );
};

Card.propTypes = {
  name: string,
  pH1: number,
  pH2: number,
  humidity1: number,
  humidity2: number,
  temperature1: number,
  temperature2: number,
  text: string,
  pics: array
};

export default Card;
