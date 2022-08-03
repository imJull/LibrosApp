import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import "./App.css";
import { View } from "./components/View";

// valores del local storage
const DataLS = () => {
  const data = localStorage.getItem("books")
  if(data){
    return JSON.parse(data)
  }else{
    return []
  }
}

function App() {

  //Estado de libros
  const [books, setBooks] = useState(DataLS());
  //Inputs
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [isbn, setIsbn] = useState('')

  //Formulario submit
  const handleAddBookSubmit = (e) =>{
    e.preventDefault()
    let book ={
      title: title,
      author: author,
      isbn: isbn
    }
    setBooks([...books, book])
    setTitle('')
    setAuthor('')
    setIsbn('')
    console.log(books)
  }

  //Borrar Libro
   const deleteBook = (isbn) =>{
    const filtBooks = books.filter((el, i) => {
      return el.isbn !== isbn
    })
    setBooks(filtBooks)
   }

  //Guardar en localstorage
  useEffect(() => {
    localStorage.setItem('books',JSON.stringify(books))
  },[books])

  return (
    <div className="wrapper">
      <h1 variant="h3">Lista de Libros</h1>
      <p variant="h3">
        Añada algún libro para utiliar el local storage
      </p>
      <div className="main">
        <form onSubmit={handleAddBookSubmit} autoComplete="off" className="form-group">
          <div className="form-container">
            <label>Titulo</label>
            <input type="text" className="form-control" required  onChange={(e) => setTitle(e.target.value)}></input>
            <br></br>
            <label>Autor</label>
            <input type="text" className="form-control" required onChange={(e) => setAuthor(e.target.value)}></input>
            <br></br>
            <label>ISNB</label>
            <input type="text" className="form-control" required  onChange={(e) => setIsbn(e.target.value)}></input>
            <br></br>
            <button type="submit" className="btn btn-success btn-md">Añadir</button>
          </div>
        </form>

        <div className="view-container">
          {books.length > 0 && 
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>ISBN</th>
                    <th>Titulo</th>
                    <th>Autor</th>
                    <th>Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  <View books={books} deleteBook={deleteBook}/>
                </tbody>
              </table>
            </div>
          }
          { books.length < 1 && <div>No hay libros para mostrar</div>}
        </div>
      </div>
    </div>
  );
}

export default App;
