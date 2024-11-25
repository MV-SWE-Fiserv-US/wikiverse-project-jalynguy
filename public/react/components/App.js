import React, { useState, useEffect } from 'react'
import { PagesList } from './PagesList'

// import and prepend the api url to any fetch calls
import apiURL from '../api'

export const App = () => {
  const [pages, setPages] = useState([])
  const [displayAll, setDisplayAll] = useState(true);
  const [displayForm, setDisplayForm] = useState(false);
  const [pageDetails, setPageDetails] = useState({
    author: '',
    authorId: 0,
    content: '',
    createdAt: '',
    id: 0,
    slug: '',
    status: 'closed',
    tags: [],
    title: '',
    updatedAt: '',
  });


  // Form details
  const [newBookDetail, setNewBookDetail] = useState({
    title:'',
    content:'',
    name: '', 
    email: '',
    tags: ''
  })

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [email, setEmail] = useState('');
  const [tags, setTags] = useState([]);


  // On Change functions
  const handleTitle = (e) =>{
      setTitle(e.target.value);
  }
  const handleContent = (e) =>{
      setContent(e.target.value);
  }
  const handleAuthor = (e)=>{
    setAuthor(e.target.value);
  }
  const handleEmail = (e) =>{
    setEmail(e.target.value);
  }
  const handleTags = (e) => {
    setTags(e.target.value);
  }


  // Header variable
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  // Fetch functions
  async function fetchPages () {
    try {
      const response = await fetch(`${apiURL}/wiki`)
      const pagesData = await response.json()
      setPages(pagesData)
    } catch (err) {
      console.log('Oh no an error! ', err)
    }
  }


  useEffect(() => {
    fetchPages()
  }, [])


  // submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setNewBookDetail({
      title: title,
      content: content,
      name: author,
      email: email,
      tags: tags
    });
    const response = await fetch(`${apiURL}/wiki`, 
    {
      method: 'POST',
      headers: myHeaders,
      body:  JSON.stringify(newBookDetail)
    });
    const data = await response.json();
    setNewBookDetail({
      title:'',
      content:'',
      name: '', 
      email: '',
      tags: ''
    })
  };
 // Return to list of books functions
  const handleBack = () =>{
    setDisplayAll(true);
    setPageDetails({
      author: '',
      authorId: 0,
      content: '',
      createdAt: '',
      id: 0,
      slug: '',
      status: 'closed',
      tags: [],
      title: '',
      updatedAt: '',
    });
  }

  const returnToList = async () =>{
     await fetchPages();
     setDisplayForm(false);
     setNewBookDetail({
      title:'',
      content:'',
      name: '', 
      email: '',
      tags: ''
     })
  }

  // Delete Functions
  const handleDelete = async () =>{
    const response = await fetch(`${apiURL}/wiki/:`+pageDetails.slug, {
      method: 'DELETE'
    });
    const data = await response.json();
    handleBack();
  }
  return (
		<main>
      <h1>WikiVerse</h1>
      {displayAll && !displayForm && (
        <>
        <h2>An interesting 📚</h2>
        <PagesList pages={pages} setDisplayAll={setDisplayAll} setPageDetails={setPageDetails}/> 
        <br/>
        <br/>
        <button onClick={()=>setDisplayForm(true)}> Create Page </button> 
        </>
      )}
      {!displayAll &&  !displayForm &&(
        <>
              <div> {pageDetails.title} </div>
              <div> <b> Author:  {pageDetails.author}</b></div>
              <div> <b> Published: {pageDetails.createdAt}</b></div>
              <div> {pageDetails.content} </div>
              <div>
                <title> Tags </title>
                <ol>
                  {pageDetails.tags.map((item, index)=> (
                      <li key={index}>{item.name}</li>
                  ))}
                </ol>
              </div>
              <div><button onClick={handleDelete}>Delete</button><button onClick={handleBack}> Back to Page List </button></div>
        </>
      )}
      {displayForm && (
        <>
        <h1> Add a new book </h1>
        <form onSubmit={handleSubmit}>
          <label> Title
          <input type='text' placeholder='Book Title' value={title} onChange={handleTitle}/>
          </label>
          <br/>
          <label> Content 
          <input type='text' placeholder='Content' value={content} onChange={handleContent}/>
          </label>
          <br/>
          <label> Author Name 
          <input type='text' placeholder='Author Name' value={author} onChange={handleAuthor}/>
          </label>
          <br/>
          <label> Author Email 
          <input type='text' placeholder='Author Email' value={email} onChange={handleEmail}/>
          </label>
          <br/>
          <label> Tags 
          <input type='text' placeholder='Add tags, seperated by spaces' value={tags} onChange={handleTags}/>
          </label>
          <br/>
          <button type='submit'> Submit </button>
        </form>
        <br/>
        <button onClick={returnToList}> View All Authors </button>
        </>
      )}
		</main>
  )
}
