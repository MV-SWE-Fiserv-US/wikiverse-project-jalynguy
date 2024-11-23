import React from 'react'

export const Page = (props) => {
  const handleClick = () =>{
    props.setDisplayAll(false);
    props.setPageDetails(props.page);
  }
  return <>
    <br/>
    <button onClick={handleClick}>{props.page.title}</button>
  </>
}
