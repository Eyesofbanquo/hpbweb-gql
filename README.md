# Half Price Books Web - `GraphQL` edition.

# Purpose

The purpose of this service is to provide a `GraphQL` interface for the
[Half Price Books - Web](https://github.com/Eyesofbanquo/hpbweb) service.

# Types

The types for this service can be found in the
[Half Price Books - Types](https://github.com/Eyesofbanquo/hpbtypes) repository.

### Interfaces

```graphql
interface Search {
  id: Int
  gqlType: String
  name: String
  rareFind: Boolean
  slug: String
  type: String
  categories: [Category]
}

# The following implement Search
# LiveSearch | NormalSearch | TopSearch
```

# Queries

The supported queries are listed below:

```graphql
input TopSearchInput {
  search: String
  page: String = "0"
  author: String = ""
}

input NormalInput {
  search: String
  page: String = "0"
}

type Query {
  live(search: String): [Search]
  normal(input: NormalInput): [Search]
  topSearch(input: TopSearchInput): [Search]
}
```
