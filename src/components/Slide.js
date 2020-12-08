/** @jsx jsx */
import React from 'react'
import { css, jsx } from '@emotion/core'

const Slide = ({ content }) => (
  <div
    css={css`
      height: 100%;
      width: 50%;
      background-image: url('${content}');
      background-size: auto;
      background-repeat: no-repeat;
      background-position: center;
    `}
  />
)

export default Slide