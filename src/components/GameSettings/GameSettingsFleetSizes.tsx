import {Button, Input, InputNumber, Slider} from "antd";
import {Fragment} from "react";
import { useSpring, animated } from '@react-spring/web'

import styles from "./GameSettings.module.css";
import {ShipDeleteIcon} from "./ShipDeleteIcon";
import {newShipMaxSize, newShipMinSize} from "../../models/defaults";
import {GameSettings} from "../../store/State";
interface GameSettingsFleetSizesProps {
    gameSettings: GameSettings;
    onShipSizeChange:  (index: number, value: null | number) => void;
    onShipDelete:  (index: number) => void;
}

export function GameSettingsFleetSizes({ gameSettings, onShipSizeChange, onShipDelete }: GameSettingsFleetSizesProps) {
    const { isLoading, gridSize } = gameSettings;
    const minimalMaxGridSize = Math.max(newShipMaxSize, gridSize);
    const { fleetSizes } = gameSettings;

    const props = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
    })

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '14fr 1fr 1fr', gap: '10px'}}>
            {fleetSizes.map((size, index) => (
                <Fragment key={index}>
                    <Slider
                        className={styles.slider}
                        reverse
                        min={newShipMinSize}
                        max={minimalMaxGridSize}
                        disabled={isLoading}
                        value={size}
                        onChange={(value) => onShipSizeChange(index, value)}
                    />
                    <InputNumber
                        maxLength={2}
                        disabled={gameSettings.isLoading}
                        min={newShipMinSize}
                        max={minimalMaxGridSize}

                        value={size}
                        onChange={(value) => onShipSizeChange(index, value)}
                    />
                    <Button
                        disabled={gameSettings.isLoading || fleetSizes.length === 1}
                        onClick={() => onShipDelete(index)}><ShipDeleteIcon/></Button>
                </Fragment>
            ))}
        </div>
    )
}