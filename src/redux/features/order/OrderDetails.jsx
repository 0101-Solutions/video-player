import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import jsPDF from 'jspdf';

import { selectOrderById } from './ordersApiSlice';

import DashFooter from '../../../components/DashFooter';

import useAuth from '../../../hooks/useAuth';

const OrderDetails = () => {
  // Fetch id from url
  const { id } = useParams()

  const { isAdmin } = useAuth();

  // Fetch order from store
  const order = useSelector(state => selectOrderById(state, id))

  let content;

  if (order) {
    // Trim the order.name to the first whitespace
    const name = order.name.trim().split(' ')[0]

    const subjectsTaught = order?.subjectsTaught.toString().replaceAll(",", " and ") || <b>Add Subjects</b>;

    // Map Roles to their respective names
    const roles = order.roles.map(role => {
      if (role === "admin" || role === "Admin") {
        return "Administator"
      } else if (role === "headOfDepartment" || role === "HeadOfDepartment") {
        return "Head Of Department"
      } else if (role === "teacher" || role === "Teacher") {
        return "Teacher"
      } else {
        return "No Role Assigned"
      }
    });

    // Map roles and separate them with a comma
    const rolesString = roles.toString().replaceAll(",", ", ")

    // Download the order details as a pdf
    const downloadPdf = () => {
      // Create a new pdf document
      const doc = new jsPDF()

      doc.setFontSize(20)

      doc.setFont("helvetica", "bold")
      // Center the title below the top margin
      doc.text("GilGil Girls High School", 65, 20)
      doc.text("_______________________", 60, 25)

      doc.text(`Teacher Details For ${order.name}:`, 55, 40)

      // Add the school logo to the center of the page
      // doc.addImage(logo, 'PNG', 80, 60, 70, 70)
      // Make text bold
      doc.setFont("helvetica", "normal")

      // Add order details to the pdf
      doc.text(`Teacher Name: ${order.name}`, 20, 60)
      doc.text(`Teacher ID Number: ${order.idNumber}`, 20, 70)
      doc.text(`Teacher TSC Number: ${order.tscNumber}`, 20, 80)

      doc.text(`Teacher Class: ${order.class?.name ? order.class.name : "No Class Assigned"}`, 20, 90)
      doc.text(`Teacher Dorm: ${order.dorm?.name ? order.dorm.name : "No Dorm Assigned"}`, 20, 100)

      doc.text(`Teacher Roles: ${rolesString}`, 20, 110)
      doc.text(`Teacher School Presence Status: ${order.status}`, 20, 120)
      doc.text(`Teacher Subjects Taught: ${subjectsTaught}`, 20, 130)

      // Make text bold
      doc.setFont("helvetica", "bold")
      doc.text("Next Of Kin Details:", 70, 150)
      doc.text("___________________", 65, 155)
      // Make text normal
      doc.setFont("helvetica", "normal")
      // Add Guardian details to the pdf
      doc.text(`Next Of Kin Name: ${order.nextOfKin?.name}`, 20, 170)
      doc.text(`Next Of Kin Phone Number: ${order.nextOfKin?.phoneNumber}`, 20, 180)
      doc.text(`Next Of Kin Relationship: ${order.nextOfKin?.relationship}`, 20, 190)
      doc.text(`Next Of Kin Address: ${order.nextOfKin?.address}`, 20, 200)

      // Save the pdf
      doc.save(`${order.tscNumber}-${order.name}.pdf`)
    }

    content = (
      <>
        <Helmet>
          <title>GGHS Teacher {order.name}</title>
          <meta name="description" content={`Teacher ${order.name} - Gilgil Girls High School School Management System App`} />
          <meta name="keyword" content="GilGil Girls High School" />
          <meta property="og:title" content="Gilgil Girls High School School Management System App" />
          <link rel="canonical" href="https://admin.gghs.sc.ke" />
        </Helmet>
        <div className="dashboard-content-one">
          <div className="breadcrumbs-area">
            <h3>Orders</h3>
            <ul>
              <li>
                <Link to="/admin/dashboard">Home</Link>
              </li>
              <li>
                <Link to="/admin/dashboard/orders">Teachers List</Link>
              </li>
              <li>Teacher Details</li>
            </ul>
          </div>
          <div className="card height-auto">
            <div className="card-body">
              <div className="heading-layout1">
                <div className="item-title">
                  <h3>About {name}</h3>
                </div>
              </div>
              <div className="single-info-details">
                <div className="item-img">
                  {order?.photoUrl ? <img src={order.photoUrl} alt={order.name} /> : <img src="../../../assets/images/figure/teacher.jpg" alt={order.name} />}
                </div>
                <div className="item-content">
                  <div className="header-inline item-header">
                    <h3 className="text-dark-medium font-medium">{order.name}</h3>
                    <div className="header-elements">
                      <ul>
                        {isAdmin && <li><Link to={`/admin/dashboard/orders/${id}`}><i className="far fa-edit"></i></Link></li>}
                        <li><Link onClick={downloadPdf}><i className="fas fa-download"></i></Link></li>
                      </ul>
                    </div>
                  </div>
                  <p>{order.bio}</p>
                  <div className="info-table table-responsive">
                    <table className="table text-nowrap">
                      <tbody>
                        <tr>
                          <td>Class:</td>
                          <td className="font-medium text-dark-medium">{order?.class ? order.class.name : <b>No Class Assigned</b>}</td>
                        </tr>
                        <tr>
                          <td>Roles:</td>
                          <td className="font-medium text-dark-medium">{rolesString}</td>
                        </tr>
                        <tr>
                          <td>Email:</td>
                          <td className="font-medium text-dark-medium">{order.email}</td>
                        </tr>
                        <tr>
                          <td>Subjects Taught:</td>
                          <td className="font-medium text-dark-medium">{subjectsTaught}</td>
                        </tr>
                        <tr>
                          <td>ID Number:</td>
                          <td className="font-medium text-dark-medium">{order.idNumber}</td>
                        </tr>
                        <tr>
                          <td>TSC Number:</td>
                          <td className="font-medium text-dark-medium">{order.tscNumber}</td>
                        </tr>
                        <tr>
                          <td>School Presence:</td>
                          <td className="font-medium text-dark-medium">{order.status}</td>
                        </tr>
                        <tr>
                          <td>Dorm/House:</td>
                          <td className="font-medium text-dark-medium">{order.dorm?.name ? order?.dorm.name : <b>No Dorm Assigned</b>}</td>
                        </tr>
                        <tr>
                          <td><h3><u>Next Of Kin Information:</u></h3></td>
                        </tr>
                        <tr>
                          <td>Name:</td>
                          <td className="font-medium text-dark-medium">{order.nextOfKin?.name}</td>
                        </tr>
                        <tr>
                          <td>Phone Number:</td>
                          <td className="font-medium text-dark-medium"><a>{order.nextOfKin?.phoneNumber}</a></td>
                        </tr>
                        <tr>
                          <td>Relationship:</td>
                          <td className="font-medium text-dark-medium">{order.nextOfKin?.relationship}</td>
                        </tr>
                        <tr>
                          <td>Address:</td>
                          <td className="font-medium text-dark-medium">{order.nextOfKin?.address}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DashFooter />
        </div>
      </>
    )
  } else {
    content = <div>No order information is available</div>
  }

  return content
}

export default OrderDetails