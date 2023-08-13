import {GridCellType} from "./GridCellType";
import styles from './GridCell.module.scss';
import createDataSet from './helpers/createDataSet';
import {GridCellProps} from './GridCellProps';

export default function GridCell({
   onClick,
   onMouseEnter,
   onMouseLeave,
   dataset = { type: GridCellType.BATTLEFIELD },
   id,
    style,
   classList = [],
   children,
}: GridCellProps) {
    return (
        <div
            className={[...classList, styles.cell].join(' ')}
            {...createDataSet(dataset)}
            data-id={id}
            style={style}
            key={id}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >{children}</div>
    );
}
