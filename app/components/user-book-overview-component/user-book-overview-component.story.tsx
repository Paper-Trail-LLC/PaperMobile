import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { UserBookOverviewComponent } from "./user-book-overview-component"

storiesOf("UserBookOverviewComponent", module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <UserBookOverviewComponent style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
