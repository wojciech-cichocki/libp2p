import React from 'react'
import {storiesOf} from '@storybook/react'
import {withKnobs} from '@storybook/addon-knobs'
import {SeatCard} from './SeatCard'

storiesOf('components/SeatCard', module)
    .addDecorator(withKnobs)
    .add('not initialized', () => <SeatCard id={1} taken={false} releasable={true} initialized={false}/>)
    .add('free', () => <SeatCard id={2} taken={false} releasable={true} initialized={true}/>)
    .add('taken by me', () => (
        <SeatCard
            id={1}
            taken={true}
            releasable={true}
            peerId={'QmWjz6xb8v9K4KnYEwP5Yk75k5mMBCehzWFLCvvQpYxF3d'}
            initialized={true}
        />
    ))
    .add('taken by other', () => (
        <SeatCard
            id={2}
            taken={true}
            releasable={false}
            peerId={'QmWjz6xb8v9K4KnYEwP5Yk75k5mMBCehzWFLCvvQpYxF3d'}
            initialized={true}
        />
    ))
