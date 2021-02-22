import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"

const IndexPage = ({ data }) => (
    <Layout>
        <h1>信息节点汇总</h1>
        <ul>
            {data.allStrapiNode.edges.map(document => (
                <li key={document.node.id}>
                  <h2>
                      {document.node.name}
                  </h2>
                  <p>{document.node.description}</p>
                  <p>
                    <Link to={`${document.node.url}`}>{'官网'}</Link>
                    {'  '}
                    <Link to={`/nodes/${document.node.id}`}>{'所有文章'}</Link>
                  </p>
                </li>
            ))}
        </ul>
        <Link to="/page-2/">Go to page 2</Link>
    </Layout>
)

export default IndexPage

export const pageQuery = graphql`
  query NodesQuery {
    allStrapiNode {
      edges {
        node {
          id
          name
          description
          url
        }
      }
    }
  }
`
