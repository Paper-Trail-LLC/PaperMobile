export interface BookDetailProps {
    
    /**
     * Book cover image url
     */
    coverUri: string,

    /**
     * Book title
     */
    title: string,

    /**
     * Book author
     */
    authors: string[],

    /** 
     * Book release date
    */
    releaseDate: string,
}