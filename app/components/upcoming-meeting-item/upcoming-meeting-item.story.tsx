import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { UpcomingMeetingItem } from "./upcoming-meeting-item"

storiesOf("UpcomingMeetingItem", module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <UpcomingMeetingItem style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
