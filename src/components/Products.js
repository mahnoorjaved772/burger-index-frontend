import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { executeQuery } from "../service/api.service";
import { SEARCH_PRODUCTS_QUERY, DEFAULT_PRODUCTS_QUERY } from "../graphql/queries";
import { columns } from "../columns";
import { PAGE_SIZE, INITIAL_PAGE } from "../constants"
import "../styles/common.css";

const Products = () => {
  const [data, setData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchData = async (page) => {
    setLoading(true);
    const pageSize = PAGE_SIZE;
    try {
      const query = searchText.trim() ? SEARCH_PRODUCTS_QUERY : DEFAULT_PRODUCTS_QUERY;
      const variables = {
        query: searchText.trim(),
        page: page,
        pageSize: pageSize
      };
      const response = await executeQuery(query, variables);
      const dataKey = searchText.trim() ? 'searchProducts' : 'allProducts';
      const items = response.data && response.data[dataKey] ? response.data[dataKey].items : [];
      const totalCount = response.data && response.data[dataKey] ? response.data[dataKey].totalCount : 0;
      
      setData(items.map(item => ({
        ...item,
        category: ""  
      })));
      setTotalRows(totalCount);
      setErrorMessage(items.length === 0 ? "Nothing found." : "");
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrorMessage("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(INITIAL_PAGE);
  }, []);

  const handleSearch = async () => {
    await fetchData(INITIAL_PAGE);  // Always reset to page 1 on a new search
  };

  const handlePageChange = async page => {
    await fetchData(page);  // Fetch the next page data
  };

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      setSearchText(e.target.value);
      handleSearch();
    }
  };

  return (
    <div className="container">
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="table-container">
        <DataTable
          columns={columns}
          data={data}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10]}
          progressPending={loading}
          onChangePage={handlePageChange}
          striped
          highlightOnHover
          pointerOnHover
          noDataComponent={errorMessage || "No products available."}
        />
      </div>
    </div>
  );
};

export default Products;
