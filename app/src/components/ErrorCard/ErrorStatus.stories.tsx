import {storiesOf} from "@storybook/react";
import {withKnobs} from "@storybook/addon-knobs";
import {ErrorCard} from "./ErrorCard";
import React from "react";

storiesOf('components/ErrorStatus', module)
    .addDecorator(withKnobs)
    .add('example error', () => <ErrorCard title={"example title"} message={"example message"}/>)