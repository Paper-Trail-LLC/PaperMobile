import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { CoverSideScroll } from "./cover-side-scroll"

storiesOf("CoverSideScroll", module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <CoverSideScroll style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
