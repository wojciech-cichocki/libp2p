import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { SeatCard } from './SeatCard'

storiesOf('components/SeatCard', module)
  .addDecorator(withKnobs)
  .add('free', () => <SeatCard taken={false} releasable={true} initialized={true} />)
  .add('taken', () => (
    <SeatCard
      taken={true}
      releasable={false}
      peerId={'QmWjz6xb8v9K4KnYEwP5Yk75k5mMBCehzWFLCvvQpYxF3d'}
      initialized={true}
    />
  ))
