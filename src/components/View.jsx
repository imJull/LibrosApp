import React from 'react'

export const View = ({books, deleteBook}) => {
  return books.map(book => (
    <tr key={book.isbn}>
        <td>{book.isbn}</td>
        <td>{book.title}</td>
        <td>{book.author}</td>
        <td onClick={() => deleteBook(book.isbn)}>X</td>
    </tr>
  ))
}
