import styles from './CellAttackTarget.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCrosshairs } from "@fortawesome/free-solid-svg-icons";

export default function CellAttackTargetIcon() {
    return <FontAwesomeIcon icon={faCrosshairs} className={styles.cellAttackTarget}/>
}
