import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React, { ReactElement } from 'react';

import TakeSeatButton, { ITakeSeatButton } from './TakeSeatButton';

storiesOf('components/TakeSeatButton', module)
  .addDecorator(withKnobs)
  .add(
    'not initialized',
    (): ReactElement<ITakeSeatButton, any> => (
      <TakeSeatButton
        initialized={false}
        taken={false}
        onClick={(): void => {}}
        releasable={false}
      />
    )
  )
  .add(
    'free',
    (): ReactElement<ITakeSeatButton, any> => (
      <TakeSeatButton
        taken={false}
        onClick={(): void => {}}
        initialized={true}
      />
    )
  )
  .add(
    'taken by me',
    (): ReactElement<ITakeSeatButton, any> => (
      <TakeSeatButton
        taken={true}
        releasable={true}
        onClick={(): void => {}}
        initialized={true}
      />
    )
  )
  .add('taken by other', () => (
    <TakeSeatButton
      taken={true}
      releasable={false}
      onClick={(): void => {}}
      initialized={true}
    />
  ));
