import React, { useState, useEffect } from 'react'
import { PagesList } from './PagesList'

// import and prepend the api url to any fetch calls
import apiURL from '../api'

export const App = () => {
  const [pages, setPages] = useState([])
  const [displayAll, setDisplayAll] = useState(true);
  const [pageDetails, setPageDetails] = useState({
    authorId: 0,
    content: '',
    createdAt: '',
    id: 0,
    slug: '',
    status: 'closed',
    title: '',
    updatedAt: ''
  });

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

  const handleBack = () =>{
    setDisplayAll(true);
    setPageDetails({
      authorId: 0,
      content: '',
      createdAt: '',
      id: 0,
      slug: '',
      status: 'closed',
      title: '',
      updatedAt: ''
    });
  }
  return (
		<main>
      {displayAll && (
        <>
        <h1>WikiVerse</h1>
        <h2>An interesting 📚</h2>
        <PagesList pages={pages} setDisplayAll={setDisplayAll} setPageDetails={setPageDetails}/>  
        </>
      )}
      {!displayAll && (
        <>
              <div> {pageDetails.title} </div>
              <div> <b> Published: {pageDetails.createdAt}</b></div>
              <div> {pageDetails.content} </div>
              <button onClick={handleBack}> Back to Page List </button>
        </>
      )}
		</main>
  )
}
