import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import React from 'react'
import { SeatStatus } from './CardStatus'

storiesOf('components/SeatStatus', module)
  .addDecorator(withKnobs)
  .add('free', () => <SeatStatus taken={false} initialized={true} />)
  .add('taken', () => (
    <SeatStatus
      taken={true}
      peerId={'QmWjz6xb8v9K4KnYEwP5Yk75k5mMBCehzWFLCvvQpYxF3d'}
      initialized={true}
    />
  ))
