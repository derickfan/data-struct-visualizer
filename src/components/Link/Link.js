import React from 'react';
import { Arrow } from "react-konva"

const Link = (props) => {
    return (
        <Arrow points={props.points} stroke="red" fill="red" />
    );
}

export default Link;
