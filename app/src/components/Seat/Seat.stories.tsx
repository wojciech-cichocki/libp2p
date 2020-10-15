import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { Seat } from './Seat'

storiesOf('components/Seat', module)
  .addDecorator(withKnobs)
  .add('free', () => <Seat free={true} releasable={true} />)
  .add('taken', () => <Seat free={false} releasable={false} peerId={'peerId'} />)
