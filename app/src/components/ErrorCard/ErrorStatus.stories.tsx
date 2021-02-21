import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React, { ReactElement } from 'react';
import { ErrorCard, IErrorCard } from './ErrorCard';

storiesOf('components/ErrorStatus', module)
  .addDecorator(withKnobs)
  .add(
    'example error',
    (): ReactElement<IErrorCard, any> => (
      <ErrorCard title={'example title'} message={'example message'} />
    )
  );
