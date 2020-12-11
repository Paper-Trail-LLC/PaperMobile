import { TextStyle } from "react-native"
import { UserBook } from "../../models";

export interface MyBookDetailProps {
    /**
     * Book list item style. Text color
     */
    style?: TextStyle,

    userBook?: UserBook,

    editable?: boolean
}