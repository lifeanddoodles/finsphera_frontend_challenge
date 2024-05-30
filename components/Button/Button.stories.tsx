import Button from "@/components/Button";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

const meta = {
  title: "Example/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },

  tags: ["autodocs"],

  argTypes: {
    children: {
      control: "text",
      name: "label",
      description: "Overwritten description",
    },
  },

  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    color: "primary",
    children: "Primary Button",
  },
};

export const Secondary: Story = {
  args: {
    color: "secondary",
    children: "Secondary Button",
  },
};
