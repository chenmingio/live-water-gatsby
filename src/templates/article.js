import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"

const ArticleTemplate = ({ data }) => (
    <Layout>
        <h1>{data.strapiArticle.title}</h1>
        <p>
            by{" "}
            <Link to={`/nodes/Node_${data.strapiArticle.node.id}`}>
                {data.strapiArticle.node.name}
            </Link>
        </p>
        {/*<Img fixed={data.strapiArticle.image.childImageSharp.fixed} />*/}
        <p>{data.strapiArticle.url}</p>
      <p>{data.strapiArticle.content}</p>
    </Layout>
)

export default ArticleTemplate

export const query = graphql`
  query ArticleTemplate($id: String!) {
    strapiArticle(id: { eq: $id }) {
      title
      url
      content
      node {
        id
        name
        description
        url
      }
    }
  }
`
