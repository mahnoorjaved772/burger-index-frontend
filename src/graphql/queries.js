export const listProviders = `
query {
    providers {
      id
      platformStoreDescription
      neighbourhood
      phoneNumberOne
      phoneNumberTwo
      type
      cityCode
      imageUrl
      cityName
      scrape_date
      categoryTags
    }
  }`;

  export const SEARCH_PRODUCTS_QUERY = `
query SearchProducts($query: String!, $page: Int!, $pageSize: Int!) {
  searchProducts(query: $query, page: $page, pageSize: $pageSize) {
    items {
      platformProductId
      name
      isAvailable
      isPopular
      isSoldOut
      currency
      price
      discountedPrice
      discountAmount
      priceDiscountPercent
      imageUrl
      description
    }
    totalCount
    page
    pageSize
  }
}`;

export const DEFAULT_PRODUCTS_QUERY = `
query FindAllProducts($page: Int!, $pageSize: Int!) {
  allProducts(page: $page, pageSize: $pageSize) {
    items {
      platformProductId
      name
      platform
      description
      imageUrl
      isAvailable
      isPopular
      isSoldOut
      currency
      price
      discountedPrice
      discountAmount
      priceDiscountPercent
    }
    totalCount
    page
    pageSize
  }
}
`;

export const GET_HISTORY_BY_PLATFORM_PRODUCT = `
query GetHistoryByPlatformProductAndStoreId($platformProductId: String!, $page: Int!, $pageSize: Int!) {
  findByPlatformProductId(platformProductId: $platformProductId, page: $page, pageSize: $pageSize) {
    items {
      platformProductId
      name
      platform
      description
      imageUrl
      isAvailable
      isPopular
      isSoldOut
      currency
      price
      discountedPrice
      discountAmount
      priceDiscountPercent
    }
    totalCount
    page
    pageSize
  }
}
`;
