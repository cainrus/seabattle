import {debounce} from "lodash-es";
import {Slider, Button, Alert, InputNumber} from 'antd';
import {Space} from 'antd';
import { message } from 'antd';

import {useContext, useEffect, useState} from "react";
import {AddShipIcon} from "./AddShipIcon";
import styles from './GameSettings.module.css'
import {GameSettingsFleetSizes} from "./GameSettingsFleetSizes";
import {memoizedCanFleetFitOnGrid} from "../../helpers/canFleetFitOnGrid.worker";
import {maxGridSize, minGridSize, newShipSize} from "../../models/defaults";
import {GameSettings as GameSettingsState} from "../../store/State";
import {ActionTypes, Action} from "../../store/Action";
import {GameSettingsErrors} from "../../store/State";
import StoreContext from "../../store/StoreContext";

const validate = debounce(async function (dispatch: React.Dispatch<Action>, gameSettings: GameSettingsState, silent: boolean) {
    const {gridSize, fleetSizes, isLoading} = gameSettings;
    if (isLoading) {
        return;
    }
    dispatch({type: ActionTypes.START_LOADING_GAME_SETTINGS});
    try {
        const isValid = await memoizedCanFleetFitOnGrid(gridSize, fleetSizes);
        if (isValid && !silent) {
            message.success('Changes saved successfully');
        }
        dispatch({
            type: isValid
                ? ActionTypes.REMOVE_ERROR
                : ActionTypes.ADD_ERROR,
            error: GameSettingsErrors.InvalidFleet,
        });
    } finally {
        dispatch({
            type: ActionTypes.STOP_LOADING_GAME_SETTINGS
        });
    }
}, 600, {
    leading: false,
    trailing: true,
});

export default function GameSettings() {
    const {state, dispatch} = useContext(StoreContext);
    const [isActive, setActive] = useState(true);
    const gameSettings = state.gameSettings;
    const isFormDisabled = gameSettings.isLoading || !isActive;


    const runValidation = (silent = false) => void validate(dispatch, gameSettings, silent);
    useEffect(runValidation, [
        dispatch,
        gameSettings.gridSize,
        gameSettings.fleetSizes,
    ]);

    const handleGridSizeChange = async (value: number | null) => {
        if (value === null) return;
        dispatch({type: ActionTypes.CHANGE_GAME_SETTINGS, gridSize: value});
        runValidation();
    };

    const handleFleetSizeChange = (index: number, value: null | number) => {
        if (value === null) return;
        dispatch({type: ActionTypes.CHANGE_GAME_SETTINGS, fleetSize: {index, value}})
        runValidation();
    };

    const onShipAdd = () => {
        dispatch({
            type: ActionTypes.CHANGE_GAME_SETTINGS,
            fleetSize: {index: gameSettings.fleetSizes.length, value: newShipSize}
        })
    }

    function onShipRemove(index: number) {
        dispatch({type: ActionTypes.CHANGE_GAME_SETTINGS, fleetSize: {index, value: undefined}})
    }
    function onReset() {
        dispatch({type: ActionTypes.RESET_GAME_SETTINGS})
    }
    function onDone() {
        dispatch({type: ActionTypes.CLOSE_GAME_SETTINGS})
        setActive(false);
    }

    const errors = state.gameSettings.errors.reduce((acc, err) => {
        return err === GameSettingsErrors.InvalidFleet
            ? [...acc, "Fleet is not compatible with grid size"]
            : acc;
    }, [] as string[])

    const anyError = !!errors.length;



    const sectionAlerts = anyError
        ? <div key="section__alerts">
            <Button className={styles.button__reset} size="large" disabled={isFormDisabled} onClick={onReset}>Reset</Button>
            <Alert message={errors[0]} type="error" showIcon/>
          </div>
        : null;



    const sectionButtons = anyError ? null : (
        <div className={styles.section__buttons} key="section__buttons">
            <Button className={styles.button__reset} size="large" disabled={isFormDisabled} onClick={onReset}>Reset</Button>
            <Button className={styles.button__close} size="large" disabled={isFormDisabled} onClick={onDone}>Close</Button>
            <Button
                className={styles.button__addShip}
                icon={<AddShipIcon/>}
                size="large" disabled={isFormDisabled} onClick={onShipAdd}>&nbsp;Add Ship</Button>

        </div>
    );

    return (
        <Space direction="vertical" size="large"
               className={`${styles.GameSettings} ${isActive ? styles.isActiveGameSettings : styles.isPausedGameSettings}`}
               style={{ display: 'flex', maxWidth: '800px', margin: '0 auto'}}>
            <h1 key="section__header" className={styles.section__header}>Game Settings</h1>
            <div key="section__grid-size" className={styles.section__gridSize}>
                <h2>Grid size</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '14fr 2fr', gap: '10px'}}>
                    <Slider
                        className={styles.slider}
                        step={1}
                        min={minGridSize}
                        max={maxGridSize}
                        disabled={isFormDisabled}
                        value={gameSettings.gridSize}
                        onChange={(value) => handleGridSizeChange(value)}
                    />
                    <InputNumber
                        step={1}
                        value={gameSettings.gridSize}
                        disabled={isFormDisabled}
                        min={minGridSize}
                        max={maxGridSize}
                        onChange={(value) => handleGridSizeChange(value)}
                    ></InputNumber>
                </div>
            </div>

            <div key="section__ship-sizes">
                <h2>Sizes of the Ships</h2>
                <GameSettingsFleetSizes
                    gameSettings={{...gameSettings, isLoading: isFormDisabled}}
                    onShipSizeChange={handleFleetSizeChange}
                    onShipDelete={onShipRemove}
                />
            </div>
            {sectionAlerts}
            {sectionButtons}
        </Space>
    );


}
