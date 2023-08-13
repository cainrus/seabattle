import $style from './CoordLabel.module.css'
import GridCell from "../GridCell/GridCell";
import {GridCellType} from "../GridCell/GridCellType";

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

interface CoordLabelProps {
    type: 'x' | 'y';
    size: number;
}

const typeMap = {
    x: GridCellType.HORIZONTAL_RULER,
    y: GridCellType.VERTICAL_RULER
}

function mapType(type: keyof typeof typeMap): GridCellType {
    return typeMap[type];
}

export function CoordLabel ({type, size}: CoordLabelProps) {
    const labels = [];
    for (let i = 0; i < size; i++) {
        const key = `${type}${i}`;
        const value = type === 'x' ? letters[i] : i + 1;
        labels.push(<GridCell
            id={i}
            key={key}
            classList={[$style.rulerCell]}
            dataset={{type: mapType(type)}}
        >{value}</GridCell>);
    }

    return (<>
        {labels}
    </>)
}
