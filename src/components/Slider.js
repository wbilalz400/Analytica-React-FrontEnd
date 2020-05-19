/** @jsx jsx */
import React, { useState } from 'react'
import { css, jsx } from '@emotion/core'
import SliderContent from './SliderContent'
import Slide from './Slide'

/**
 * @function Slider
 */
const Slider = props => {
  const getWidth = () => window.innerWidth 

  const [state, setState] = useState({
    translate: 0,
    transition: 0.45
  })

  const { translate, transition } = state

  return (
    <div css={SliderCSS}>
      <SliderContent
        translate={translate}
        transition={transition}
        width={getWidth()* props.slides.length}
      >
        {
            props.slides.map(slide => (
            <Slide key ={slide} content={slide}/>
            ))}
      </SliderContent>
    </div>
  )
}

const SliderCSS = css`
  position: relative;
  height: 100vh;
  width: 100vw;
  margin: 0 auto;
  overflow: hidden;
`
export default Slider