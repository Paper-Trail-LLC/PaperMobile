import { ViewStyle } from "react-native"

export interface AddBookProps {

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
     * Book author
     */
    author?: string,

    /** 
     * Book release date
    */
    releaseDate?: string

    /**
     * Book is bookmarked
     */
    isBookmarked?: boolean

    /**
     * Book status
     */
    status?: string,

    /**
     * Indicates if book is for selling
     */
    selling?: boolean,

    /**
     * Indicates if book is for lending
     */
    lending?: boolean,

    /**
     * Book location
     */
    location?: [number],

    /**
     * Book image uris
     */
    images?: [string]
}