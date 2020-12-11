import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { NearbyListingItem } from "./nearby-listing-item"

storiesOf("NearbyListingItem", module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <NearbyListingItem style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
