import React from 'react'
import { Page } from './Page'

export const PagesList = ({ pages, setDisplayAll, setPageDetails }) => {
  return <>
		{
			pages.map((page, idx) => {
				return <Page page={page} key={idx} setDisplayAll={setDisplayAll} setPageDetails={setPageDetails}/>
			})
		}
	</>
}
