import React from "react"

import { Story, Meta } from "@storybook/react/types-6-0"

import { Lolly, LollyProps } from "../components/Lolly"

export default {
  title: "Components/Lolly",
  component: Lolly,
} as Meta

const Template: Story<LollyProps> = args => <Lolly {...args} />

export const Primary = Template.bind({})
Primary.args = {
  top: "green",
  middle: "red",
  bottom: "yellow",
}

export const Secondary = Template.bind({})
Secondary.args = {
  top: "orange",
  middle: "yellow",
  bottom: "red",
}

