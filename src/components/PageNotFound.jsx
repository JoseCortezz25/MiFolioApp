import React from 'react'
import '../assets/styles/PageNotFound.css'
import { useHistory } from "react-router-dom";

const PageNotFound = () => {
  const history = useHistory();
  return (
    <div className="container-error-page">
      <div id="page">
        <div id="container">
          <h1>:(</h1>
          <h2>Houston, we have a problem...</h2>
          <p>
            ERROR 404 | Our system has had a problem. The resource was not found.
            Don't worry, we will fix it soon.
          </p>
        </div>
        <div className="details">
          <button onClick={() => history.goBack()} className="btn-standard btn-back-error-page">Back to previous page</button>
        </div>
      </div>
    </div>
  )
}

export default PageNotFound
