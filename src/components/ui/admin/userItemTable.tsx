import { useEffect, useState } from "react";
import type { UserItem } from "../../../models/rootModel";
import Pagination from "../pagination";

interface UserItemTableProps {
  userItems: UserItem[];
  isLoading: boolean;
  error?: string | null;
  totalRecords: number;
  itemsPerPage: number;
  onDelete: (id: number) => void;
  onEdit: (item: UserItem) => void;
  onPageChange: (page: number) => void;
}

const UserItemTable: React.FC<UserItemTableProps> = ({
  userItems,
  isLoading,
  error,
  totalRecords,
  itemsPerPage,
  onDelete,
  onEdit,
  onPageChange,
}) => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(totalRecords / itemsPerPage);

  // Reset page if totalRecords changes
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
      onPageChange(1);
    }
  }, [currentPage, totalPages, onPageChange]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    onPageChange(page);
  };
  // Loading
  if (isLoading) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading users...</p>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="alert alert-danger">
        <h5>Error Loading Users</h5>
        <p>{error}</p>
      </div>
    );
  }

  // Empty
  if (userItems.length === 0) {
    return (
      <div className="text-center py-5">
        <i className="bi bi-people text-muted" style={{ fontSize: "3rem" }}></i>
        <h4 className="mt-3 text-muted">No Users</h4>
        <p className="text-muted">Start by adding your first user.</p>
      </div>
    );
  }

  return (
    <>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {userItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  <strong>{item.firstName}</strong>
                </td>
                <td>
                  <div className="btn-group" role="group">
                    <button
                      onClick={() => onEdit(item)}
                      className="btn btn-sm btn-outline-success"
                      title="Edit"
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button
                      onClick={() => onDelete(item.id)}
                      className="btn btn-sm btn-outline-danger"
                      title="Delete"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalRecords}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default UserItemTable;
