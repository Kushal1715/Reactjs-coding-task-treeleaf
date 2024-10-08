import * as React from "react";
import { styled } from "@mui/system";

export default function Profiles() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [formData, setFormData] = React.useState([]);

  React.useEffect(() => {
    const data = JSON.parse(localStorage.getItem("formData")) || [];
    setFormData(data);
  }, []);

  const rows = formData.map((data) =>
    createData(
      data.name,
      data.email,
      data.phone,
      data.dob,
      data.city,
      data.district,
      data.country,
      data.province,
      data.profilePicture
    )
  );

  rows.sort((a, b) => (a.calories < b.calories ? -1 : 1));

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <>
      <h1 className="mt-2 text-4xl font-bold mb-4">All Profiles</h1>
      <Root sx={{ maxWidth: "100%", width: 1300 }}>
        <table aria-label="custom pagination table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>DOB</th>
              <th>City</th>
              <th>District</th>
              <th>Province</th>
              <th>Country</th>
              <th>Profile</th>
            </tr>
          </thead>
          <tbody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <tr key={row.phone}>
                <td>{row.name}</td>
                <td style={{ width: 160 }} align="right">
                  {row.email}
                </td>
                <td style={{ width: 160 }} align="right">
                  {row.phone}
                </td>
                <td style={{ width: 160 }} align="right">
                  {row.dob}
                </td>
                <td style={{ width: 160 }} align="right">
                  {row.city}
                </td>
                <td style={{ width: 160 }} align="right">
                  {row.district}
                </td>
                <td style={{ width: 160 }} align="right">
                  {row.province}
                </td>
                <td style={{ width: 160 }} align="right">
                  {row.country}
                </td>
                <td style={{ width: 350 }} align="right">
                  {row.profile ? (
                    <img
                      src={row.profile}
                      alt="Profile"
                      style={{ width: 350, height: 150 }}
                    />
                  ) : (
                    "No image"
                  )}
                </td>
              </tr>
            ))}
            {emptyRows > 0 && (
              <tr style={{ height: 41 * emptyRows }}>
                <td colSpan={9} aria-hidden />
              </tr>
            )}
          </tbody>
        </table>
      </Root>
    </>
  );
}

function createData(
  name,
  email,
  phone,
  dob,
  city,
  district,
  province,
  country,
  profile
) {
  return {
    name,
    email,
    phone,
    dob,
    city,
    district,
    province,
    country,
    profile,
  };
}

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Root = styled("div")(
  ({ theme }) => `
  table {
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[200]};
    text-align: left;
    padding: 8px;
  }

  th {
    background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  }
  `
);
