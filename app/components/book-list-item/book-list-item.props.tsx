import { ViewStyle } from "react-native"
import { Book } from "../../models"
export interface BookListItemProps {

    /**
     * Book list item style. Only the box dimensions, margins, and padding
     */
    style?: ViewStyle,

    /**
     * Book object
     */
    book: Book,

}