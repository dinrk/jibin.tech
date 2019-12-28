import React from 'react'
import { Link } from 'gatsby'

import './blogList.scss'

const BlogList = ({ data, templateTitle }) => {
  let blog = data.allMdx.edges
  return (
    <>
      {templateTitle === 'Articles' ? (
        <h1 className="main__list__header">
          Articles
          <span>
            I write about random stuff that I come across while developing for
            the web.
          </span>
        </h1>
      ) : (
        <h1 className="main__list__header">{templateTitle}</h1>
      )}

      <main className="main__list">
        {blog.map(({ node }) => {
          let { id, frontmatter, fields } = node
          let { title, date, info, tags } = frontmatter
          let { slug } = fields

          return (
            <article key={id} className="blog__list">
              <div className="blog__list__meta">
                <small>{date}</small>
              </div>
              <Link to={slug}>
                <h2 className="blog__list__title">{title}</h2>
              </Link>
              <p className="blog__list__info">{info}</p>
              {templateTitle === 'Articles' && (
                <p className="blog__list__tags">
                  {tags.map(tag => (
                    <span key={tag}>#{tag}</span>
                  ))}
                </p>
              )}
            </article>
          )
        })}
      </main>
    </>
  )
}

export default BlogList
