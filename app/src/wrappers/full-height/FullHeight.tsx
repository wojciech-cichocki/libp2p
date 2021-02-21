import { FC, ReactElement, ReactNode } from 'react';
import React from 'react';
import useStyles from './styles';

interface IFullHeightProps {
  children: ReactNode;
  verticalAlign: boolean;
  horizontalAlign: boolean;
}

const FullHeight: FC<IFullHeightProps> = ({
  children,
}: IFullHeightProps): ReactElement<IFullHeightProps, any> => {
  const classes = useStyles();

  // TODO: fix
  const mocked = `${classes.root} ${classes.horizontalAlign} ${classes.verticalAlign}`;

  return <div className={mocked}>{children}</div>;
};

export default FullHeight;
