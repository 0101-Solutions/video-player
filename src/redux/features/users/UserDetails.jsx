import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import jsPDF from 'jspdf';

import { selectUserById } from './usersApiSlice';

import DashFooter from '../../../components/DashFooter';

import useAuth from '../../../hooks/useAuth';

const UserDetails = () => {
    // Fetch id from url
    const { id } = useParams()

    const { isAdmin } = useAuth();

    // Fetch user from store
    const user = useSelector(state => selectUserById(state, id))

    let content;

    if (user) {
        // Trim the user.name to the first whitespace
        const name = user.name.trim().split(' ')[0]

        const subjectsTaught = user?.subjectsTaught.toString().replaceAll(",", " and ") || <b>Add Subjects</b>;

        // Map Roles to their respective names
        const roles = user.roles.map(role => {
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

        // Download the user details as a pdf
        const downloadPdf = () => {
            // Create a new pdf document
            const doc = new jsPDF()

            doc.setFontSize(20)

            doc.setFont("helvetica", "bold")
            // Center the title below the top margin
            doc.text("GilGil Girls High School", 65, 20)
            doc.text("_______________________", 60, 25)

            doc.text(`Teacher Details For ${user.name}:`, 55, 40)

            // Add the school logo to the center of the page
            // doc.addImage(logo, 'PNG', 80, 60, 70, 70)
            // Make text bold
            doc.setFont("helvetica", "normal")

            // Add user details to the pdf
            doc.text(`Teacher Name: ${user.name}`, 20, 60)
            doc.text(`Teacher ID Number: ${user.idNumber}`, 20, 70)
            doc.text(`Teacher TSC Number: ${user.tscNumber}`, 20, 80)

            doc.text(`Teacher Class: ${user.class?.name ? user.class.name : "No Class Assigned"}`, 20, 90)
            doc.text(`Teacher Dorm: ${user.dorm?.name ? user.dorm.name : "No Dorm Assigned"}`, 20, 100)

            doc.text(`Teacher Roles: ${rolesString}`, 20, 110)
            doc.text(`Teacher School Presence Status: ${user.status}`, 20, 120)
            doc.text(`Teacher Subjects Taught: ${subjectsTaught}`, 20, 130)

            // Make text bold
            doc.setFont("helvetica", "bold")
            doc.text("Next Of Kin Details:", 70, 150)
            doc.text("___________________", 65, 155)
            // Make text normal
            doc.setFont("helvetica", "normal")
            // Add Guardian details to the pdf
            doc.text(`Next Of Kin Name: ${user.nextOfKin?.name}`, 20, 170)
            doc.text(`Next Of Kin Phone Number: ${user.nextOfKin?.phoneNumber}`, 20, 180)
            doc.text(`Next Of Kin Relationship: ${user.nextOfKin?.relationship}`, 20, 190)
            doc.text(`Next Of Kin Address: ${user.nextOfKin?.address}`, 20, 200)

            // Save the pdf
            doc.save(`${user.tscNumber}-${user.name}.pdf`)
        }

        content = (
            <>
                <Helmet>
                    <title>GGHS Teacher {user.name}</title>
                    <meta name="description" content={`Teacher ${user.name} - Gilgil Girls High School School Management System App`} />
                    <meta name="keyword" content="GilGil Girls High School" />
                    <meta property="og:title" content="Gilgil Girls High School School Management System App" />
                    <link rel="canonical" href="https://admin.gghs.sc.ke" />
                </Helmet>
                <div className="dashboard-content-one">
                    <div className="breadcrumbs-area">
                        <h3>Users</h3>
                        <ul>
                            <li>
                                <Link to="/admin/dashboard">Home</Link>
                            </li>
                            <li>
                                <Link to="/admin/dashboard/users">Teachers List</Link>
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
                                    {user?.photoUrl ? <img src={user.photoUrl} alt={user.name} /> : <img src="../../../assets/images/figure/teacher.jpg" alt={user.name} />}
                                </div>
                                <div className="item-content">
                                    <div className="header-inline item-header">
                                        <h3 className="text-dark-medium font-medium">{user.name}</h3>
                                        <div className="header-elements">
                                            <ul>
                                                {isAdmin && <li><Link to={`/admin/dashboard/users/${id}`}><i className="far fa-edit"></i></Link></li>}
                                                <li><Link onClick={downloadPdf}><i className="fas fa-download"></i></Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <p>{user.bio}</p>
                                    <div className="info-table table-responsive">
                                        <table className="table text-nowrap">
                                            <tbody>
                                                <tr>
                                                    <td>Class:</td>
                                                    <td className="font-medium text-dark-medium">{user?.class ? user.class.name : <b>No Class Assigned</b>}</td>
                                                </tr>
                                                <tr>
                                                    <td>Roles:</td>
                                                    <td className="font-medium text-dark-medium">{rolesString}</td>
                                                </tr>
                                                <tr>
                                                    <td>Email:</td>
                                                    <td className="font-medium text-dark-medium">{user.email}</td>
                                                </tr>
                                                <tr>
                                                    <td>Subjects Taught:</td>
                                                    <td className="font-medium text-dark-medium">{subjectsTaught}</td>
                                                </tr>
                                                <tr>
                                                    <td>ID Number:</td>
                                                    <td className="font-medium text-dark-medium">{user.idNumber}</td>
                                                </tr>
                                                <tr>
                                                    <td>TSC Number:</td>
                                                    <td className="font-medium text-dark-medium">{user.tscNumber}</td>
                                                </tr>
                                                <tr>
                                                    <td>School Presence:</td>
                                                    <td className="font-medium text-dark-medium">{user.status}</td>
                                                </tr>
                                                <tr>
                                                    <td>Dorm/House:</td>
                                                    <td className="font-medium text-dark-medium">{user.dorm?.name ? user?.dorm.name : <b>No Dorm Assigned</b>}</td>
                                                </tr>
                                                <tr>
                                                    <td><h3><u>Next Of Kin Information:</u></h3></td>
                                                </tr>
                                                <tr>
                                                    <td>Name:</td>
                                                    <td className="font-medium text-dark-medium">{user.nextOfKin?.name}</td>
                                                </tr>
                                                <tr>
                                                    <td>Phone Number:</td>
                                                    <td className="font-medium text-dark-medium"><a>{user.nextOfKin?.phoneNumber}</a></td>
                                                </tr>
                                                <tr>
                                                    <td>Relationship:</td>
                                                    <td className="font-medium text-dark-medium">{user.nextOfKin?.relationship}</td>
                                                </tr>
                                                <tr>
                                                    <td>Address:</td>
                                                    <td className="font-medium text-dark-medium">{user.nextOfKin?.address}</td>
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
        content = <div>No user information is available</div>
    }

    return content
}

export default UserDetails