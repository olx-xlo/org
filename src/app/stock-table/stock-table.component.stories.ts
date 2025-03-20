import type { Meta, StoryObj } from '@storybook/angular';
import { StockTableComponent } from './stock-table.component';

const meta: Meta<StockTableComponent> = {
  component: StockTableComponent,
  title: 'StockTableComponent',
};
export default meta;
type Story = StoryObj<StockTableComponent>;

export const Primary: Story = {
  args: {},
};
