import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { Seat } from './Seat'

storiesOf('components/Seat', module)
  .addDecorator(withKnobs)
  .add('free', () => <Seat taken={false} releasable={true} initialized={true} />)
  .add('taken', () => (
    <Seat
      taken={true}
      releasable={false}
      peerId={'QmWjz6xb8v9K4KnYEwP5Yk75k5mMBCehzWFLCvvQpYxF3d'}
      initialized={true}
    />
  ))
