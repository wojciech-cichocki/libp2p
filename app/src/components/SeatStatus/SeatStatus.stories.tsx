import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React, { ReactElement } from 'react';

import { ISeatStatus, SeatStatus } from './SeatStatus';

storiesOf('components/SeatStatus', module)
  .addDecorator(withKnobs)
  .add(
    'not initialized',
    (): ReactElement<ISeatStatus, any> => (
      <SeatStatus taken={false} initialized={false} />
    )
  )
  .add(
    'free',
    (): ReactElement<ISeatStatus, any> => (
      <SeatStatus taken={false} initialized={true} />
    )
  )
  .add(
    'taken',
    (): ReactElement<ISeatStatus, any> => (
      <SeatStatus
        taken={true}
        peerId={'QmWjz6xb8v9K4KnYEwP5Yk75k5mMBCehzWFLCvvQpYxF3d'}
        initialized={true}
      />
    )
  );
