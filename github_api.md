# GitHub API - Example

Given the username `brainnco`:

**API v3 using shell**

```sh
curl -slv https://api.github.com/users/brainnco/starred?sort=updated&direction=desc
```

**API v4 using Python**
```python
from gql import gql, Client
from gql.transport.requests import RequestsHTTPTransport

user = 'brainnco'
query = ''
  query {
  user(login: "%s") {
      starredRepositories(first: 1) {
        totalCount
        edges {
          node {
            id
            name
            url
            languages(first: 10) {
              edges {
                node {
                  name
                }
              }
            }
          }
          cursor
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          endCursor
        }
      }
  }'' % user
headers = {'Authorization': 'bearer %s' % os.getenv('GITHUB_API_TOKEN')}
url = 'https://api.github.com/graphql'
transport = RequestsHTTPTransport(url, headers=headers, use_json=True)
client = Client(transport=transport)
resp = client.execute(gql(query))
repositories = resp.get('user').get('starredRepositories')
print(repositories)
```
