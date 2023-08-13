import {join, resolve} from "path";
import {mergeConfig} from "vite";

const toPath = (filePath) => join(process.cwd(), filePath);


export default  {
  stories: ['../src/**/*.stories.tsx'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links', '@storybook/addon-essentials', '@storybook/preset-create-react-app'],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  docs: {
    autodocs: true
  },
  async viteFinal(config, { configType }) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@': resolve(join(__dirname, '../src'))
        }
      }
    });
  }
};
