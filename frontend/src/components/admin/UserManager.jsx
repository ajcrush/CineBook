import { useState, useEffect } from "react";
import api from "../../services/api";
import Toast from "../Toast";

export default function UserManager() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [actionInProgress, setActionInProgress] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get("/admin/users");
      setUsers(response.data);
    } catch (error) {
      setToast({
        message: error.response?.data?.message || "Failed to fetch users",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePromote = async (userId) => {
    if (
      !window.confirm("Are you sure you want to promote this user to admin?")
    ) {
      return;
    }

    setActionInProgress(userId);
    try {
      const response = await api.post(`/admin/users/${userId}/promote`);
      setToast({
        message: response.data.message || "User promoted to admin",
        type: "success",
      });
      fetchUsers();
    } catch (error) {
      setToast({
        message: error.response?.data?.message || "Failed to promote user",
        type: "error",
      });
    } finally {
      setActionInProgress(null);
    }
  };

  const handleBan = async (userId) => {
    if (!window.confirm("Are you sure you want to ban this user?")) {
      return;
    }

    setActionInProgress(userId);
    try {
      const response = await api.post(`/admin/users/${userId}/ban`);
      setToast({
        message: response.data.message || "User banned successfully",
        type: "success",
      });
      fetchUsers();
    } catch (error) {
      setToast({
        message: error.response?.data?.message || "Failed to ban user",
        type: "error",
      });
    } finally {
      setActionInProgress(null);
    }
  };

  const handleUnban = async (userId) => {
    if (!window.confirm("Are you sure you want to unban this user?")) {
      return;
    }

    setActionInProgress(userId);
    try {
      const response = await api.post(`/admin/users/${userId}/unban`);
      setToast({
        message: response.data.message || "User unbanned successfully",
        type: "success",
      });
      fetchUsers();
    } catch (error) {
      setToast({
        message: error.response?.data?.message || "Failed to unban user",
        type: "error",
      });
    } finally {
      setActionInProgress(null);
    }
  };

  // Filter users based on search and filters
  const filteredUsers = users.filter((user) => {
    const searchMatch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.phone && user.phone.includes(searchTerm));

    const roleMatch = filterRole === "all" || user.role === filterRole;
    const statusMatch = filterStatus === "all" || user.status === filterStatus;

    return searchMatch && roleMatch && statusMatch;
  });

  const getRoleBadgeColor = (role) => {
    return role === "admin"
      ? "bg-purple-100 text-purple-800"
      : "bg-blue-100 text-blue-800";
  };

  const getStatusBadgeColor = (status) => {
    return status === "active"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter((u) => u.status === "active").length,
    admins: users.filter((u) => u.role === "admin").length,
    bannedUsers: users.filter((u) => u.status === "banned").length,
  };

  return (
    <div>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Manage Users
      </h2>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white p-4 rounded-lg">
          <p className="text-sm opacity-80">Total Users</p>
          <p className="text-2xl font-bold">{stats.totalUsers}</p>
        </div>
        <div className="bg-gradient-to-br from-green-400 to-green-600 text-white p-4 rounded-lg">
          <p className="text-sm opacity-80">Active Users</p>
          <p className="text-2xl font-bold">{stats.activeUsers}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-400 to-purple-600 text-white p-4 rounded-lg">
          <p className="text-sm opacity-80">Admins</p>
          <p className="text-2xl font-bold">{stats.admins}</p>
        </div>
        <div className="bg-gradient-to-br from-red-400 to-red-600 text-white p-4 rounded-lg">
          <p className="text-sm opacity-80">Banned Users</p>
          <p className="text-2xl font-bold">{stats.bannedUsers}</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors"
          />
        </div>
        <div>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors"
          >
            <option value="all">All Roles</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="banned">Banned</option>
          </select>
        </div>
        <div>
          <button
            onClick={fetchUsers}
            disabled={loading}
            className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 transition"
          >
            {loading ? "Loading..." : "Refresh"}
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
        {filteredUsers.length === 0 ? (
          <div className="text-center py-12 text-gray-600 dark:text-gray-400">
            <p>No users found</p>
          </div>
        ) : (
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 dark:bg-gray-700 border-b-2 border-gray-300 dark:border-gray-600">
              <tr>
                <th className="px-4 py-3 text-left font-bold text-gray-900 dark:text-white">
                  Name
                </th>
                <th className="px-4 py-3 text-left font-bold text-gray-900 dark:text-white">
                  Email
                </th>
                <th className="px-4 py-3 text-left font-bold text-gray-900 dark:text-white">
                  Phone
                </th>
                <th className="px-4 py-3 text-left font-bold text-gray-900 dark:text-white">
                  Role
                </th>
                <th className="px-4 py-3 text-left font-bold text-gray-900 dark:text-white">
                  Status
                </th>
                <th className="px-4 py-3 text-left font-bold text-gray-900 dark:text-white">
                  Bookings
                </th>
                <th className="px-4 py-3 text-left font-bold text-gray-900 dark:text-white">
                  Joined
                </th>
                <th className="px-4 py-3 text-left font-bold text-gray-900 dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user._id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white">
                    {user.name}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    {user.email}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    {user.phone || "-"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded text-xs font-semibold ${getRoleBadgeColor(
                        user.role
                      )}`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded text-xs font-semibold ${getStatusBadgeColor(
                        user.status
                      )}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center font-semibold text-gray-900 dark:text-white">
                    {user.bookings?.length || 0}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2 flex-wrap">
                      {user.role !== "admin" && (
                        <button
                          onClick={() => handlePromote(user._id)}
                          disabled={actionInProgress === user._id}
                          className="px-2 py-1 bg-purple-500 text-white rounded text-xs font-semibold hover:bg-purple-600 disabled:opacity-50 transition"
                          title="Promote to Admin"
                        >
                          {actionInProgress === user._id ? "..." : "Promote"}
                        </button>
                      )}
                      {user.status === "active" ? (
                        <button
                          onClick={() => handleBan(user._id)}
                          disabled={actionInProgress === user._id}
                          className="px-2 py-1 bg-red-500 text-white rounded text-xs font-semibold hover:bg-red-600 disabled:opacity-50 transition"
                          title="Ban User"
                        >
                          {actionInProgress === user._id ? "..." : "Ban"}
                        </button>
                      ) : (
                        <button
                          onClick={() => handleUnban(user._id)}
                          disabled={actionInProgress === user._id}
                          className="px-2 py-1 bg-green-500 text-white rounded text-xs font-semibold hover:bg-green-600 disabled:opacity-50 transition"
                          title="Unban User"
                        >
                          {actionInProgress === user._id ? "..." : "Unban"}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
