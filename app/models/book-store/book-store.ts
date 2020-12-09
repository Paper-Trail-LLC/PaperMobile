import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { GetBookByISBNResult, GetBooksByQuery } from "../../services/api";
import { BookModel } from "../book/book"
import { withEnvironment } from "../extensions/with-environment";
import { UserBookModel } from "../user-book/user-book";
import { User } from "../user/user";
/**
 * Model description here for TypeScript hints.
 */
export const BookStoreModel = types
  .model("BookStore")
  .props({
    nearbyBooks: types.optional(types.array(BookModel), []),
    forMeBooks: types.optional(types.array(BookModel), []),
    popularBooks: types.optional(types.array(BookModel), []),
    choice: types.optional(types.string, ''),
    myBooks: types.optional(types.array(BookModel), []),
    searchQuery: types.optional(types.string, ''),
    searchResults: types.optional(types.array(BookModel), [])
  })
  .extend(withEnvironment)
  .views(self => ({
    areSugestionsLoaded: () => {
      return self.nearbyBooks.length != 0 && self.popularBooks.length != 0 && self.forMeBooks.length != 0;
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    addBook: (b) => {
      let i = self.myBooks.findIndex((item) => item.isbn13 == b.isbn13);
      if (i < 0) self.myBooks.push(BookModel.create(b));
    },
    clear: function () {
      self.myBooks.clear();
    },
    getBook: function (isbn13: string) {
      let i = self.myBooks.findIndex((item) => item.isbn13 == isbn13);
      if (i < 0) return;
      else return self.myBooks[i];
    },
    setChoice: (isbn13: string) => {
      self.choice = isbn13;
    }
  }))
  .actions(self => ({ // SEARCH ACTIONS
    searchBookByISBN: flow(function* (isbn: string) {
      const result: GetBookByISBNResult = yield self.environment.api.Books.searchBookByISBN(isbn);
      __DEV__ && console.tron.log(result);
      if (result.kind === "ok") {
        result.book.releaseDate = new Date(result.book.releaseDate);
        if (!self.getBook(result.book.isbn13)) self.addBook(result.book);
        return result.book;
      } else {
        __DEV__ && console.tron.log(result.kind);
        return;
      }
    }),
    searchBookByQuery: flow(function* (query: string, page: number = 0, limit: number = 10, criteria?: string) {
      self.searchQuery = query;
      const result: GetBooksByQuery = yield self.environment.api.Books.searchBook(query, page, limit, criteria);
      __DEV__ && console.tron.log(result);
      if (result.kind === "ok") {
        result.books.map((b) => { b.releaseDate = new Date(b.releaseDate) });
        self.searchResults = result.books;
        return result.books;
      } else {
        __DEV__ && console.tron.log(result.kind);
        return [];
      }
    }),
    clearSearchResults: () => {
      self.searchResults.clear();
    },
    clearSearchQuery: () => {
      self.searchQuery = '';
    }
  }))
  .actions(self => ({ // My Books actions
    addBookToLibrary: (userBook) => {
      self.myBooks.push(UserBookModel.create(userBook));
    },
    removeBookFromLibrary: (id: string) => {
      const i = self.myBooks.findIndex((item) => item.id == id);
      self.myBooks.slice(i, 1);
    },
    getMyLibrary: flow(function* (user) {
    }),
    loadSuggestions: flow(function* (user?: User) {
      const mainGenres = ['romance', 'mystery', 'fantasy', 'science fiction', 'thrillers',
        'horror', 'young adult', 'children', 'inspirational', 'self-help', 'religious', 'biography', 'memoir'];
      let keywords = []; // Two because there are "just for you and" and "Popular"
      if (user && user.likes.length != 0) {
        keywords.push(user.likes[Math.floor(Math.random() * user.likes.length)]);
        keywords.push(user.likes[Math.floor(Math.random() * user.likes.length)]);
      }
      else {
        keywords.push(mainGenres[Math.floor(Math.random() * mainGenres.length)]);
        keywords.push(mainGenres[Math.floor(Math.random() * mainGenres.length)]);
      }
      const results: GetBooksByQuery[] = yield Promise.all([self.environment.api.Books.searchBook(keywords[0], 0, 10, 'genre'),
      self.environment.api.Books.searchBook(keywords[1], 0, 10, 'genre')]);

      // Verify first search "Just for you"
      if (results[0].kind === "ok") {
        results[0].books.map((b) => { b.releaseDate = new Date(b.releaseDate) });
        results[0].books.forEach((b) => {
          self.forMeBooks.push(b);
        });
      } else {
        __DEV__ && console.tron.log(results[0].kind);
      }

      // Verify first search "Popular in your area"
      if (results[1].kind === "ok") {
        results[1].books.map((b) => { b.releaseDate = new Date(b.releaseDate) });
        results[1].books.forEach((b) =>{
          self.popularBooks.push(b);
        });
      } else {
        __DEV__ && console.tron.log(results[0].kind);
      }
      return;
    }),
  }))

// eslint-disable-line @typescript-eslint/no-unused-vars

/**
* Un-comment the following to omit model attributes from your snapshots (and from async storage).
* Useful for sensitive data like passwords, or transitive state like whether a modal is open.

* Note that you'll need to import `omit` from ramda, which is already included in the project!
*  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
*/

type BookStoreType = Instance<typeof BookStoreModel>
export interface BookStore extends BookStoreType { }
type BookStoreSnapshotType = SnapshotOut<typeof BookStoreModel>
export interface BookStoreSnapshot extends BookStoreSnapshotType { }
