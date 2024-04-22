import { Link } from "react-router-dom";

export const columns = [
    {
      name: "ID",
      selector: row => row.platformProductId,
      cell: row => (
        <Link
          to={`product-history/${row.platformProductId}`}
          style={{ color: "blue" }}
        >
          {row.platformProductId}
        </Link>
      ),
    },
    {
      name: "Product Name",
      selector: row => row.name,
      cell: row => (
        <Link
          to={`product-history/${row.platformProductId}`}
          style={{ color: "blue" }}
        >
          {row.name}
        </Link>
      ),
    },
    {
      name: "Available",
      selector: row => row.isAvailable ? "Yes" : "No",
    },
    {
      name: "Popular",
      selector: row => row.isPopular ? "Yes" : "No",
    },
    {
      name: "Sold Out",
      selector: row => row.isSoldOut ? "Yes" : "No",
    },
    {
      name: "Currency",
      selector: row => row.currency,
    },
    {
      name: "Price",
      selector: row => row.price,
    },
    {
      name: "Discounted Price",
      selector: row => row.discountedPrice,
    },
    {
      name: "Discount Amount",
      selector: row => row.discountAmount,
    },
    {
      name: "Discount Percent",
      selector: row => `${row.priceDiscountPercent}%`,
    },
    {
      name: "Image",
      selector: row => row.imageUrl,
      cell: row => (
        <img src={row.imageUrl} alt={row.name} style={{ width: "50px", height: "50px" }} />
      ),
    },
    {
      name: "Description",
      selector: row => row.description,
      wrap: true,
      grow: 2,
    }
  ];
  