import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ButtonProps from "./ButtonProps";

interface ObserveMenuButtonProps extends ButtonProps {
  isVisible: boolean;
}

export default function ObserveMenuButton({onClick, isVisible}: ObserveMenuButtonProps) {
  return (<div onClick={onClick}><FontAwesomeIcon icon={isVisible? faEye : faEyeSlash}/></div>)
}
