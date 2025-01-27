/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require(`path`)

const makeRequest = (graphql, request) =>
    new Promise((resolve, reject) => {
        // Query for article nodes to use in creating pages.
        resolve(
            graphql(request).then(result => {
                if (result.errors) {
                    reject(result.errors)
                }

                return result
            })
        )
    })

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = ({ boundActionCreators, graphql }) => {
    const { createPage } = boundActionCreators

    const getArticles = makeRequest(
        graphql,
        `
    {
      allStrapiArticle {
        edges {
          node {
            id,
            title,
            url,
            content
          }
        }
      }
    }
    `
    ).then(result => {
        // Create pages for each article.
        console.log(">>>"+JSON.stringify(result))
        result.data.allStrapiArticle.edges.forEach(({ node }) => {
            createPage({
                path: `/${node.id}`,
                component: path.resolve(`src/templates/article.js`),
                context: {
                    id: node.id,
                },
            })
        })
    })

    const getNodes = makeRequest(
        graphql,
        `
    {
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
    ).then(result => {
        // Create pages for each user.
        result.data.allStrapiNode.edges.forEach(({ node }) => {
            createPage({
                path: `/nodes/${node.id}`,
                component: path.resolve(`src/templates/node.js`),
                context: {
                    id: node.id,
                },
            })
        })
    })

    // Queries for articles and authors nodes to use in creating pages.
    return Promise.all([getArticles, getNodes])
}
