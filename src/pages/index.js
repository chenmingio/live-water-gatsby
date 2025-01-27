import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"

const IndexPage = ({ data }) => (
    <Layout>
        <h1>活水基金</h1>
        <p>信息分析工具箱</p>
        <ul>
            {data.allStrapiArticle.edges.map(document => (
                <li key={document.node.id}>
                    <h2>
                        <Link to={`/${document.node.id}`}>{document.node.title}</Link>
                    </h2>
                    <p>{document.node.content}</p>
                </li>
            ))}
        </ul>
        <Link to="/page-2/">Go to page 2</Link>
    </Layout>
)

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery {
    allStrapiArticle {
      edges {
        node {
          id
          title
          url
        }
      }
    }
  }
`
