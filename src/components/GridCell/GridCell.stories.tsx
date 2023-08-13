import GridCell from './GridCell';
import styles from '../GameLayout/GameLayout.module.scss';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: 'Example/GridCell',
  component: GridCell,
  tags: ['autodocs'],
  argTypes: {
    id: { description: 'cell id', control: { type: 'number', min: 0, max: 100, step: 1 } },
  },
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const DefaultCell = {
  args: {
    id: 0,
    className: styles.gridCell,
  },
};

export const WithShipCell = {
  args: {
    id: 0,
    color: styles.shipCell,
  },
};

export const MissCell = {
  args: {
    id: 0,
    color: styles.missCell,
  },
};
