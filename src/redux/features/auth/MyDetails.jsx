import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';

import { store } from "../../store";

import { selectUser } from './authApiSlice';

import { useUpdateUserMutation } from '../users/usersApiSlice';

import Loader from '../../../components/Loader';
import DashFooter from '../../../components/DashFooter';

const MyDetails = () => {
    const { data } = useSelector(state => selectUser(state, store.getState()));

    const user = data

    const [updateUser, { isLoading, isError }] = useUpdateUserMutation("me");

    const navigate = useNavigate();

    const [name, setName] = React.useState(user.name)
    const [email, setEmail] = React.useState(user.email)
    const [password, setPassword] = React.useState('')
    const [idNumber, setIDNumber] = React.useState(user.idNumber)
    const [tscNumber, setTSCNumber] = React.useState(user.tscNumber)
    const [phoneNumber, setPhoneNumber] = React.useState(user.phoneNumber)

    const [teacherPhoto, setTeacherPhoto] = React.useState(user.photoUrl)
    const [nextOfKinName, setNextOfKinName] = React.useState(user.nextOfKin?.name)
    const [nextOfKinPhoneNumber, setNextOfKinPhoneNumber] = React.useState(user.nextOfKin?.phoneNumber)
    const [nextOfKinRelationship, setNextOfKinRelationship] = React.useState(user.nextOfKin?.relationship)
    const [nextOfKinAddress, setNextOfKinAddress] = React.useState(user.nextOfKin?.address)

    const onNameChanged = e => setName(e.target.value)
    const onEmailChanged = e => setEmail(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)
    const onIDNumberChanged = e => setIDNumber(e.target.value)
    const onTSCNumberChanged = e => setTSCNumber(e.target.value)
    const onPhoneNumberChanged = e => setPhoneNumber(e.target.value)
    const onTeacherPhotoChanged = e => setTeacherPhoto(e.target.value)
    const onNextOfKinNameChanged = e => setNextOfKinName(e.target.value)
    const onNextOfKinPhoneNumberChanged = e => setNextOfKinPhoneNumber(e.target.value)
    const onNextOfKinRelationshipChanged = e => setNextOfKinRelationship(e.target.value)
    const onNextOfKinAddressChanged = e => setNextOfKinAddress(e.target.value)

    const showPassword = () => {
        var x = document.getElementById("password");

        var y = document.getElementById("togglePassword");

        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }

        if (y.innerHTML === "Show Password") {
            y.innerHTML = "Hide Password";
        } else {
            y.innerHTML = "Show Password";
        }
    }

    const onUpdateUserClicked = async e => {
        e.preventDefault()
        updateUser({
            id: user._id,
            body: {
                name,
                email,
                password,
                idNumber,
                tscNumber,
                phoneNumber,
                photoUrl: teacherPhoto,
                nextOfKin: {
                    name: nextOfKinName,
                    phoneNumber: nextOfKinPhoneNumber,
                    relationship: nextOfKinRelationship,
                    address: nextOfKinAddress
                }
            }
        })
        navigate('/admin/dashboard');
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <>
            <Helmet>
                <title>GGHS My Details</title>
                <meta name="description" content={`Teacher Details ${user.name} - Gilgil Girls High School School Management System App`} />
                <meta name="keyword" content="GilGil Girls High School" />
                <meta property="og:title" content="Gilgil Girls High School School Management System App" />
                <link rel="canonical" href="https://admin.gghs.sc.ke" />
            </Helmet>
            <div className="dashboard-content-one">
                {isError && <div className=" mt-5 alert alert-danger alert-dismissible fade show" role="alert">{isError?.data?.message}</div>}
                <div className="breadcrumbs-area">
                    <h3>Me</h3>
                    <ul>
                        <li>
                            <Link to="/admin/dashboard">Home</Link>
                        </li>
                        <li>Edit My Profile</li>
                    </ul>
                </div>

                <div className="card height-auto">
                    <div className="card-body">
                        <div className="heading-layout1">

                        </div>
                        <form className="new-added-form" onSubmit={onUpdateUserClicked}>
                            <div className="row">
                                <div className="col-xl-3 col-lg-6 col-12 form-group">
                                    <div className="item-title">
                                        <h3>Add New Teacher</h3>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-6 col-12 form-group">
                                    <label>Full Names *</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        autoComplete="off"
                                        value={name}
                                        onChange={onNameChanged}
                                        required
                                    />
                                </div>
                                <div className="col-xl-3 col-lg-6 col-12 form-group">
                                    <label>School Email*</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        autoComplete="off"
                                        value={email}
                                        onChange={onEmailChanged}
                                        required
                                    />
                                </div>
                                <div className="col-xl-3 col-lg-6 col-12 form-group">
                                    <label>Password*</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        autoComplete="off"
                                        value={password}
                                        onChange={onPasswordChanged}
                                        required
                                    />
                                    <a href="#" id="togglePassword" onClick={showPassword} className="show-password">Show Password</a>
                                </div>
                                <div className="col-xl-3 col-lg-6 col-12 form-group">
                                    <label>ID Number*</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="idNumber"
                                        name="idNumber"
                                        autoComplete="off"
                                        value={idNumber}
                                        onChange={onIDNumberChanged}
                                        required

                                    />
                                </div>
                                <div className="col-xl-3 col-lg-6 col-12 form-group">
                                    <label>TSC Number</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="tscNumber"
                                        name="tscNumber"
                                        autoComplete="off"
                                        value={tscNumber}
                                        onChange={onTSCNumberChanged}
                                        required

                                    />
                                </div>
                                <div className="col-xl-3 col-lg-6 col-12 form-group">
                                    <label>Phone Number*</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        autoComplete="off"
                                        value={phoneNumber}
                                        onChange={onPhoneNumberChanged}
                                        required

                                    />
                                </div>
                                <div className="col-lg-6 col-12 form-group mg-t-30">
                                    <label className="text-dark-medium">Upload Photo (150px X 150px)*</label>
                                    <input
                                        type="file"
                                        className="form-control-file"
                                        id="teacherPhoto"
                                        name='teacherPhoto'
                                        autoComplete="off"
                                        value={teacherPhoto}
                                        onChange={onTeacherPhotoChanged}
                                    />
                                </div>

                                <div className="heading-layout1 mt-4 mb-4">
                                    <div className="item-title">
                                        <h3><u>Add Next Of Kin Information</u></h3>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-6 col-12 form-group">
                                    <label>Full Names *</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nextOfKinName"
                                        name='nextOfKinName'
                                        autoComplete="off"
                                        value={nextOfKinName}
                                        onChange={onNextOfKinNameChanged}
                                    />
                                </div>
                                <div className="col-xl-3 col-lg-6 col-12 form-group">
                                    <label>Phone Number*</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        id="nextOfKinPhoneNumber"
                                        name='nextOfKinPhoneNumber'
                                        autoComplete="off"
                                        value={nextOfKinPhoneNumber}
                                        onChange={onNextOfKinPhoneNumberChanged}
                                    />
                                </div>
                                <div className="col-xl-3 col-lg-6 col-12 form-group">
                                    <label>Relationship</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nextOfKinRelationship"
                                        name='nextOfKinRelationship'
                                        autoComplete="off"
                                        value={nextOfKinRelationship}
                                        onChange={onNextOfKinRelationshipChanged}
                                    />
                                </div>
                                <div className="col-xl-3 col-lg-6 col-12 form-group">
                                    <label>Address</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nextOfKinAddress"
                                        name='nextOfKinAddress'
                                        autoComplete="off"
                                        value={nextOfKinAddress}
                                        onChange={onNextOfKinAddressChanged}
                                    />
                                </div>
                                <div className="col-12 form-group mg-t-8">
                                    <button type="submit" className="btn-fill-lg btn-gradient-yellow btn-hover-green">Update My Profile</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <DashFooter />
            </div>
        </>
    )
}

export default MyDetails