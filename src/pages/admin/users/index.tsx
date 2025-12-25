import { useEffect, useState } from "react";
import type {
  UserItem,
  UserPaginationApiResponse,
} from "../../../models/rootModel";
import { userService } from "../../../services/userService";
import Swal from "sweetalert2";
import UserItemTable from "../../../components/ui/admin/userItemTable";

function UserManagement() {
  const [selectedUserItem, setSelectedUserItem] = useState<UserItem | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<UserItem[]>([]);
  const [total, setTotal] = useState(0);

  const limit = 5;

  const resetForm = () => {
    // future modal usage
  };
  const fetchInitialData = async (page: number) => {
    setLoading(true);
    try {
      const newSkip = (page - 1) * limit;
      const data: UserPaginationApiResponse<UserItem> = await userService.get(
        newSkip,
        limit
      );
      setUsers(data.users);
      setTotal(data.total);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchInitialData(1);
  }, []);
  const handleEditUserItem = (item: UserItem) => {
    setSelectedUserItem(item);
  };

  const handleAddUserItem = () => {
    resetForm();
    setSelectedUserItem(null);
  };

  const handleDeleteUserItem = async (id: number) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    await userService.delete(id);

    setUsers((prev) => prev.filter((u) => u.id !== id));

    Swal.fire({
      title: "Deleted!",
      text: "User has been deleted.",
      icon: "success",
    });
  };

  return (
    <div className="container-fluid p-4 mx-3">
      <div className="row mb-4">
        <div className="col">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>User Management</h2>
              <p className="text-muted mb-0">Manage system users</p>
            </div>
            <button className="btn btn-primary" onClick={handleAddUserItem}>
              <i className="bi bi-plus-circle me-2"></i>
              Add User
            </button>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <UserItemTable
                userItems={users}
                isLoading={loading}
                onDelete={handleDeleteUserItem}
                onEdit={handleEditUserItem}
                itemsPerPage={limit}
                onPageChange={fetchInitialData}
                totalRecords={total}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserManagement;
