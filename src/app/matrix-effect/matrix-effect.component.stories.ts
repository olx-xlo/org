import type { Meta, StoryObj } from '@storybook/angular';
import { MatrixEffectComponent } from './matrix-effect.component';

const meta: Meta<MatrixEffectComponent> = {
  component: MatrixEffectComponent,
  title: 'MatrixEffectComponent',
};
export default meta;
type Story = StoryObj<MatrixEffectComponent>;

export const Primary: Story = {
  args: {},
};
