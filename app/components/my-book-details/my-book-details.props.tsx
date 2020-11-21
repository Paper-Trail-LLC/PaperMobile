import { TextStyle } from "react-native"

export interface MyBookDetailProps {
    /**
     * Book list item style. Text color
     */
    style?: TextStyle,

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

    editable?: boolean
}