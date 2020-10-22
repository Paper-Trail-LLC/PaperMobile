import { ViewStyle } from "react-native"

export interface MyBookItemProps {

    /**
     * Book list item style. Only the box dimensions, margins, and padding
     */
    style?: ViewStyle,

    id: string,

    /**
     * Book cover image url
     */
    bookImage?: string,

    /**
     * Book title
     */
    title?: string,

    /**
     * Availability status
     */
    status?: string
}