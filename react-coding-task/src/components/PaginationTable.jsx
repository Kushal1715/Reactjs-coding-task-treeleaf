import React from "react";
import { styled } from "@mui/system";
import {
  TablePagination,
  tablePaginationClasses as classes,
} from "@mui/base/TablePagination";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function PaginationTable({
  formData,
  handleDelete,
  handleEdit,
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const navigate = useNavigate();

  const deleteItem = (index) => {
    handleDelete(index);
  };

  const editItem = (index) => {
    handleEdit(index); // Pass the index of the item to be edited to the parent
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const rows = formData.map((data, index) =>
    createData(
      index,
      data.name,
      data.email,
      data.phone,
      data.dob,
      data.city,
      data.district,
      data.province,
      data.country,
      data.profilePicture // Correct field
    )
  );

  // Sort by name (or any other field)
  rows.sort((a, b) => (a.name < b.name ? -1 : 1));

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <h1 className="mt-16 text-4xl font-bold mb-4">Profiles</h1>
      <Root sx={{ maxWidth: "100%", width: 1300 }} className="scroll-smooth">
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <tr key={row.index}>
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
                <td style={{ width: 160 }} align="right">
                  <FaEdit
                    size={25}
                    className="cursor-pointer"
                    onClick={() => editItem(row.index)} // Handle edit
                  />
                  <MdDelete
                    size={25}
                    className="cursor-pointer"
                    onClick={() => deleteItem(row.index)} // Handle delete
                  />
                </td>
              </tr>
            ))}
            {emptyRows > 0 && (
              <tr style={{ height: 41 * emptyRows }}>
                <td colSpan={9} aria-hidden />
              </tr>
            )}
          </tbody>
          <tfoot className="pt-4">
            <tr className="text-[16px]">
              <CustomTablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={9}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                  select: {
                    "aria-label": "rows per page",
                  },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </tr>
          </tfoot>
        </table>
      </Root>
      <button
        className="px-4 py-2 cursor-pointer bg-blue-500 text-white rounded-md mt-4 "
        onClick={() => navigate("/profiles")}
      >
        All Profiles
      </button>
    </>
  );
}

function createData(
  index,
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
    index,
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

const CustomTablePagination = styled(TablePagination)`
  & .${classes.toolbar} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .${classes.selectLabel} {
    margin: 0;
  }

  & .${classes.displayedRows} {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }

  & .${classes.spacer} {
    display: none;
  }

  & .${classes.actions} {
    display: flex;
    gap: 0.25rem;
  }
`;
