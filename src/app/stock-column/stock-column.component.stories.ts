import type { Meta, StoryObj } from '@storybook/angular';
import { StockColumnComponent } from './stock-column.component';

const meta: Meta<StockColumnComponent> = {
  component: StockColumnComponent,
  title: 'StockColumnComponent',
};
export default meta;
type Story = StoryObj<StockColumnComponent>;

export const Primary: Story = {
  args: {},
};
