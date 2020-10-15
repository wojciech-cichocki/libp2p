import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import TakeSeatButton from './TakeSeatButton'

storiesOf('components/TakeSeatButton', module)
  .addDecorator(withKnobs)
  .add('not initialized', () => (
    <TakeSeatButton initialized={false} taken={false} onClick={() => {}} releasable={false} />
  ))
  .add('free', () => <TakeSeatButton taken={false} onClick={() => {}} initialized={true} />)
  .add('taken by me', () => (
    <TakeSeatButton taken={true} releasable={true} onClick={() => {}} initialized={true} />
  ))
  .add('taken by other', () => (
    <TakeSeatButton taken={true} releasable={false} onClick={() => {}} initialized={true} />
  ))
