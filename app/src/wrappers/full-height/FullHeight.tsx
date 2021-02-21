import {FC, ReactNode} from "react";
import React from "react";
import useStyles from "./styles";

interface IFullHeightProps {
    children: ReactNode
    verticalAlign: boolean,
    horizontalAlign: boolean
}

const FullHeight: FC<IFullHeightProps> = ({children}) => {
    const classes = useStyles();

    const mocked = `${classes.root} ${classes.horizontalAlign} ${classes.verticalAlign}`

    return <div className={mocked}>{children}</div>
}

export default FullHeight