import { useNavigate } from "react-router-dom";
import { useGetSchoolInfoQuery } from "./schoolApiSlice";
import Loader from "../../../components/Loader";
import { Helmet } from "react-helmet-async";
import School from "./School";
import { showErrorToast } from "../../../components/Toast";
import { useState } from "react";

const SchoolList = () => {
  const [branch, setBranch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const onBranchChange = (e) => setBranch(e.target.value);
  const onStartDateChange = (e) => setStartDate(e.target.value);
  const onEndDateChange = (e) => setEndDate(e.target.value);

  const navigate = useNavigate();

  const queryParams = {
    branch,
    startDate,
    endDate,
  };

  const {
    data: info,
    error,
    isLoading,
    isSuccess,
    isError,
  } = useGetSchoolInfoQuery(queryParams);

  console.log(info)

  let content;

  if (isLoading) {
    content = <Loader />;
  }

  let tableContent;

  if (isSuccess) {
    const { ids } = info;

    tableContent = ids?.length ? ids.map(infoId => <School key={infoId} infoId={infoId} />) : <tbody><tr><td>No students found.</td></tr></tbody>

  }

  content = (
    <>
      <Helmet>
        <title>ELDT Orders List</title>
        <meta name="description" content={`Orders List - ELDT Trucking School App`} />
        <meta name="keyword" content="ELDT Trucking School" />
        <meta property="og:title" content="ELDT Trucking School App" />
        <link rel="canonical" href="https://www.eldttrucking.com/dashboard/admin/orders" />
      </Helmet>
      <div className="container-fluid dashboard-content-one">

        {isError && showErrorToast(error?.message)}
        <div className="container-fluid">
          <div className="heading-layout1">
            <div className="item-title">
              <a onClick={() => navigate(-1)}><i className="fa-solid fa-arrow-left arrow"></i></a>
              <h3 className="text-center edit mb-5">All School Info Data</h3>
            </div>
          </div>
        </div>
        {/* Help me create 3 input components side by side */}
        <div className="col-12 fs-1">
          <div className="card">
            <div className="card-body">
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="branch">Branch</label>
                      <select className="form__group--input" id="branch" value={branch} onChange={onBranchChange}>
                        <option value="">Select -----</option>
                        <option value="Salt Lake City Utah">Salt Lake City Utah</option>
                        <option value="Columbus Ohio">Columbus Ohio</option>
                        <option value="Minneapolis Minnesota">Minneapolis Minnesota</option>
                        <option value="Saint Cloud Minnesota">
                          Saint Cloud Minnesota
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="startDate">Start Date</label>
                      <input
                        type="date"
                        className="form__group--input"
                        id="startDate"
                        value={startDate}
                        onChange={onStartDateChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="endDate">End Date</label>
                      <input
                        type="date"
                        className="form__group--input"
                        id="endDate"
                        value={endDate}
                        onChange={onEndDateChange}
                      />
                    </div>
                  </div>
                </div>
              </form>


            </div>
          </div>
        </div>
        <div className="card height-auto mb-5 border-0 responsive">
          <div className="card-body">
            <div className="table-responsive table table-striped">
              <table className="table display data-table text-nowrap">
                <thead>
                  <tr>
                    <th scope="col">Full Names</th>
                    <th scope="col">Payment Status</th>
                    <th scope="col">Course(s)</th>
                    <th scope="col">Branch</th>
                    <th scope="col">Total Paid</th>
                    <th scope="col">Paid On</th>
                  </tr>
                </thead>
                {tableContent}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )

  return content;
}

export default SchoolList