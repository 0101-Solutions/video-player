import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';

import User from "./User";
import { useGetUsersQuery } from "./usersApiSlice"
import Loader from "../../../components/Loader";
import { showErrorToast } from "../../../components/Toast";

const UsersList = () => {
  const navigate = useNavigate();

  const {
    data: users,
    error,
    isLoading,
    isSuccess,
    isError,
  } = useGetUsersQuery();

  let content;

  if (isLoading) {
    content = <Loader />;
  }

  if (isSuccess) {

    const { ids } = users;

    const tableContent = ids?.length ? ids.map(userId => <User key={userId} userId={userId} />) : <tbody><tr><td>No users found.</td></tr></tbody>

    content = (
      <>
        <Helmet>
          <title>ELDT Users List</title>
          <meta name="description" content={`Users List - ELDT Trucking School App`} />
          <meta name="keyword" content="ELDT Trucking School" />
          <meta property="og:title" content="ELDT Trucking School App" />
          <link rel="canonical" href="https://www.eldttrucking.com" />
        </Helmet>
        <div className="dashboard-content-one">

          {isError && showErrorToast(error?.data?.message)}

          <div className="card height-auto mb-5 border-0 responsive">
            <div className="card-body">
              <div className="text-center mb-4">
                <Link to="/dashboard/admin/new-user" className="text-center btn btn-primary">Add User</Link>
              </div>
              <div className="heading-layout1">
                <div className="item-title">
                  <a onClick={() => navigate(-1)}><i className="fa-solid fa-arrow-left arrow"></i></a>
                  <h3 className="text-center edit mb-5">All Users Data</h3>
                </div>
              </div>
              <div className="table table-striped">
                <table className="table display data-table text-nowrap">
                  <thead>
                    <tr>
                      <th scope="col">Edit User</th>
                      <th scope="col">Full Names</th>
                      <th scope="col">Branch</th>
                      <th scope="col">Course(s)</th>
                      <th scope="col">Phone Number</th>
                      <th scope="col">E-mail</th>
                      <th scope="col">Roles</th>
                    </tr>
                  </thead>
                  {tableContent}
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  return content;
}

export default UsersList