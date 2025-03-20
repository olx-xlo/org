import type { Meta, StoryObj } from '@storybook/angular';
import { SearchBarComponent } from './search-bar.component';

const meta: Meta<SearchBarComponent> = {
  component: SearchBarComponent,
  title: 'SearchBarComponent',
};
export default meta;
type Story = StoryObj<SearchBarComponent>;

export const Primary: Story = {
  args: {},
};
