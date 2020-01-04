import React from 'react'
import { graphql, Link } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import './blogPostTemplate.scss'

import SEO from '../components/SEO'
import Layout from '../components/layout'
import SocialShare from '../components/SocialShare'

export default ({ data, pageContext }) => {
  // const GITHUB_USERNAME = 'jibin2706'
  // const GITHUB_REPO_NAME = 'blog.jibin.tech'
  // const GITHUB_BRANCH = 'develop'

  const post = data.mdx
  let { frontmatter } = post
  let { slug } = post.fields
  let { title, date, info, tags, image } = frontmatter
  let { previous, next } = pageContext

  // const githubEditUrl = `https://github.com/${GITHUB_USERNAME}/${GITHUB_REPO_NAME}/edit/${GITHUB_BRANCH}/src/pages${slug}index.md`

  const imageURL = (image && image.publicURL) || ''

  return (
    <Layout>
      <SEO
        title={title}
        description={info}
        type="article"
        imagePath={imageURL}
        slug={slug}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: `{
            "@context": "http://schema.org",
            "@type": "Article",
            "headline": "${title}",
            "datePublished": "${date}",
            "author": {
              "@type": "Person",
              "name": "Jibin Thomas"
            },
            "image": "${'https://blog.jibin.tech' + imageURL}"
          }`,
        }}
      />

      <article className="blog">
        <header>
          <div className="blog__meta">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                <path d="M16 2L16 6"></path>
                <path d="M8 2L8 6"></path>
                <path d="M3 10L21 10"></path>
              </svg>
              {date}{' '}
            </span>
          </div>
          <h1 className="blog__title">{title}</h1>
          <h2 className="blog__info">{info}</h2>
          <div className="blog__tags">
            {tags.map(tag => (
              <Link key={tag} to={`/tags/${tag}`}>
                #{tag} &nbsp;
              </Link>
            ))}
          </div>
          <hr className="blog__divider" />
        </header>

        {/* <SocialShare
          title={title}
          slug={slug}
          body={info}
          hashtags={tags}
          showHeader={false}
        /> */}

        {/* <main
          
        /> */}
        <main
          className="blog-body"
          style={{ maxWidth: '720px', margin: 'auto' }}
        >
          <MDXRenderer className="blog-body">{post.body}</MDXRenderer>
        </main>
      </article>

      <hr />
      <SocialShare
        title={title}
        slug={slug}
        body={info}
        hashtags={tags}
        showHeader={true}
      />

      <section className="read-more">
        {previous && (
          <Link className="btn btn--full btn--hover" to={previous.fields.slug}>
            <svg
              fill="currentColor"
              height="1em"
              width="1em"
              viewBox="0 0 40 40"
              style={{
                verticalAlign: 'sub',
              }}
            >
              <path d="M33.4 18.4v3.2H13l9.3 9.4-2.3 2.4L6.6 20 20 6.6 22.3 9 13 18.4h20.4z" />
            </svg>
            &nbsp;
            {previous.frontmatter.title}
          </Link>
        )}
        {next && (
          <Link className="btn btn--full btn--hover" to={next.fields.slug}>
            {next.frontmatter.title}
            &nbsp;
            <svg
              fill="currentColor"
              height="1em"
              width="1em"
              viewBox="0 0 40 40"
              style={{
                verticalAlign: 'sub',
              }}
            >
              <path d="M20 6.6L33.4 20 20 33.4 17.7 31l9.3-9.4H6.6v-3.2H27L17.7 9z" />
            </svg>
          </Link>
        )}
      </section>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "MMM DD, YYYY")
        info
        image {
          publicURL
        }
        tags
      }
    }
  }
`
