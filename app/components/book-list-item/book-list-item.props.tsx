import { ViewStyle } from "react-native"

export interface BookListItemProps {

    /**
     * Book list item style
     */
    style?: ViewStyle

    /**
     * Book cover image, if any
     */
    bookImage?: string,

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
    isBookmarked: boolean
}