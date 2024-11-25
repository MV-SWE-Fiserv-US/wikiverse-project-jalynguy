import React from 'react'
import apiURL from '../api';
export const Page = (props) => {
  const handleClick = async () => {
    const result = await fetch(`${apiURL}/wiki/${props.page.slug}`);
    const data = await result.json();

    let newTags = [];
    for(var i = 0; i<data.tags.length; i++){
      newTags.push(data.tags[i].name);
    }


    props.setDisplayAll(false);
    props.setPageDetails({
      author: data.author.name,
      authorId: data.authorId,
      content: data.content,
      createdAt: data.createdAt,
      id: data.id,
      slug: data.slug,
      status: data.status,
      tags: data.tags,
      title: data.title,
      updatedAt: data.updatedAt,
    });
  }
  return <>
    <br/>
    <button onClick={handleClick}>{props.page.title}</button>
  </>
}
