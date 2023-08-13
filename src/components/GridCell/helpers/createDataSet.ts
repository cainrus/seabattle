import {GridCellDataSet} from "../types/GridCellDataSet";

export default function createDataSet(dataset: GridCellDataSet): Record<string, string> {
    return dataset
        ? Object.entries(dataset)
            .reduce((acc, [key, value]) => ({...acc, [`data-${key}`]: value}), {})
        : {};
}
