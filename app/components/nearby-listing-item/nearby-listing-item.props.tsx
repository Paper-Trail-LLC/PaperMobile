import { ViewStyle } from "react-native";

export interface NearbyListingItemProps {

    /**
     * Nearvy listing item style. Only the box dimensions, margins, and padding
     */
    style?: ViewStyle,

    /**
     * Book owner
     */
    owner: string,

    /**
     * Book owner's rating
     */
    ownerRating?: number,

    /**
     * True if book is listed for lending.
     */
    lending: boolean,

    /**
     * True if book is listed for selling.
     */
    selling: boolean,

    /**
     * Distance between user and book listing
     */
    distance: number

  }