import {MouseEventHandler} from "react";

export default interface ButtonProps {
    onClick?: MouseEventHandler<HTMLDivElement>;
}