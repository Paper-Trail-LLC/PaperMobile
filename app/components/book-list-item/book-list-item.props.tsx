import { ViewStyle } from "react-native"

export interface BookListItemProps {

    /**
     * Book list item style. Only the box dimensions, margins, and padding
     */
    style?: ViewStyle,

    id: string,

    isbn13: string,
    /**
     * Book cover image url
     */
    coverURI?: string,

    /**
     * Book title
     */
    title?: string,

    /**
     * Book author
     */
    authors?: [string],

    /** 
     * Book release date
    */
    releaseDate?: string

    /**
     * Book is bookmarked
     */
    isBookmarked?: boolean
}