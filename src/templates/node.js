import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"

const UserTemplate = ({ data }) => (
    <Layout>
        <h1>{data.strapiNode.name}</h1>
        <ul>
            {data.strapiNode.articles.map(article => (
                <li key={article.id}>
                    <h2>
                        <Link to={`/Article_${article.id}`}>{article.title}</Link>
                    </h2>
                    <p>{article.content}</p>
                </li>
            ))}
        </ul>
    </Layout>
)

export default UserTemplate

export const query = graphql`
  query UserTemplate($id: String!) {
    strapiNode(id: { eq: $id }) {
      id
      name
      description
      articles {
        id
        title
        url
      }
    }
  }
`
