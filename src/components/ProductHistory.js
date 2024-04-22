import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useParams, useNavigate } from "react-router-dom";
import { executeQuery } from "../service/api.service";
import { GET_HISTORY_BY_PLATFORM_PRODUCT } from "../graphql/queries";
import "../styles/common.css";
import { PAGE_SIZE } from "../constants";
import { columns } from "../columns";
const ProductHistory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const variables = {
          platformProductId: id,
          page: page,
          pageSize: PAGE_SIZE
        };
        const response = await executeQuery(GET_HISTORY_BY_PLATFORM_PRODUCT, variables);
        const items = response.data.findByPlatformProductId.items;
        const totalCount = response.data.findByPlatformProductId.totalCount;

        setData(items);
        setTotalRows(totalCount);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [id, page]);

  const handlePageChange = (currentPage) => {
    setPage(currentPage);
  };

  return (
    <>
      <div className="button-container">
        <button className="button" onClick={() => navigate("/")}>
          Back to Products
        </button>
      </div>
      <div className="history-container">
        <div className="table-container">
          <DataTable
            columns={columns}
            data={data}
            pagination
            paginationServer
            paginationTotalRows={totalRows}
            paginationPerPage={PAGE_SIZE}
            paginationRowsPerPageOptions={[PAGE_SIZE]}
            progressPending={loading}
            onChangePage={handlePageChange}
            striped
            highlightOnHover
            pointerOnHover
            noDataComponent="No historical data found."
          />
        </div>
      </div>
    </>
  );
};

export default ProductHistory;
