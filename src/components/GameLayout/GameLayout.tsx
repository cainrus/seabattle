import classnames from 'classnames';
import {useState} from "react";

import {BattleFieldObjects} from "../BattleFieldObjects/BattleFieldObjects";
import {BattleFieldUnderlay} from "../BattleFieldUnderlay/BattleFieldUnderlay";
import {CoordLabel} from "../CoordLabel/CoordLabel";
import GridCell from '../GridCell/GridCell';
import {GridCellType} from "../GridCell/GridCellType";
import styles from './GameLayout.module.scss';
import {GameLayoutProps} from "./GameLayoutProps";

const varCellSizeName = "--gridSize";

const varsData = {
    [varCellSizeName]: '40px'
}



const GameLayout = ({
   bombs = [],
   safe,
   ships,
   shoots,
   targets,
   isPaused,
   isSelectable,
   gridSize,
   destroyed,
   createMenuButton,
   onTarget,
   onClick
}: GameLayoutProps) => {
    const menuButton = createMenuButton?.();
    // TODO: we need to create top transparent grid level, interactable by user
    const [
        hovered,
        setHovered,
    ] = useState<{ id: number, row: number, column: number }>({ id: -1, row: -1, column: -1 });


    const gridCellSize = parseInt(varsData[varCellSizeName])
    function onMouseMove(e) {
        const column = Math.ceil(e.nativeEvent.offsetX/gridCellSize);
        const row = Math.ceil(e.nativeEvent.offsetY/gridCellSize);
        setHovered({
            column,
            row,
            id: (row - 1) * gridSize + column - 1
        });
    }

    function onOverlayClick(e) {
        const column = Math.ceil(e.nativeEvent.offsetX/gridCellSize);
        const row = Math.ceil(e.nativeEvent.offsetY/gridCellSize);
        onTarget?.((row - 1) * gridSize + column - 1)
    }

    function onMouseLeave() {
        console.log('leave');
        setHovered({
            column: -1,
            row: -1,
            id: -1,
        });
    }

    return (
        <div className={classnames({
            [styles.wrapper]: true,
            [styles.withMenuButton]: !!menuButton,
            [styles.isPausedGrid]: isPaused,
            [styles.isActiveGrid]: !isPaused,
            [styles.userSelectAuto]: isSelectable,
            [styles.userSelectNone]: !isSelectable,
            [styles.isTargetGrid]: !isSelectable,
        })}>
            <div
                className={styles.gridContainer}
                style={{[varCellSizeName]: gridSize}}

            >
                <GridCell
                    classList={[styles.menuCell]}
                    dataset={{type: GridCellType.MENU}}
                    key={0}
                    id={0}
                    onClick={onClick}
                >{menuButton}</GridCell>
                <div className={styles.topCoords}>
                    <CoordLabel
                        key={gridSize}
                        type={'x'}
                        size={gridSize}
                    />
                </div>
                <div className={styles.leftCoords}><CoordLabel
                    key={gridSize}
                    type={'y'}
                    size={gridSize}
                /></div>
                <div className={styles.layout__battlefield}>
                    <div
                        className={classnames(styles.layout__grid, styles.layout__water)}

                    >
                        <BattleFieldUnderlay
                            targets={targets}
                            gridSize={gridSize}
                            shoots={shoots}
                            hovered={hovered}
                            ships={ships}
                            destroyed={destroyed}
                            safe={safe}
                            isSelectable={isSelectable}
                            onClick={onClick}
                        />
                    </div>
                    <div
                        className={classnames(styles.layout__grid, styles.layout__objectsLayer)}
                    >
                        <BattleFieldObjects
                            gridSize={gridSize}
                            shots={shoots}
                            bombs={bombs}
                            ships={ships}
                            destroyed={destroyed}
                        />

                    </div>
                    <div
                        className={classnames([
                            styles.layout__top,
                            isSelectable ? styles['layout__top--selectable'] : null,
                        ])}
                        onMouseMove={onMouseMove}
                        onMouseLeave={onMouseLeave}
                        onClick={onOverlayClick}
                    />
                </div>
            </div>
        </div>
    );
};

export default GameLayout;
