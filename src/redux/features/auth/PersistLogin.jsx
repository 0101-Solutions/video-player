/* eslint-disable no-undef */
import { Outlet } from "react-router-dom"
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import { useRefreshMutation } from "./authApiSlice"
import { selectCurrentToken } from "./authSlice"
// import { ToastNotification, showErrorToast } from '../../../components/Toast';

import usePersist from "../../../hooks/usePersist"
import UnauthorizedPage from "../../../components/401Page"

const PersistLogin = () => {
    const [refresh, { isUninitialized, isSuccess, isError }] = useRefreshMutation()

    const [persist] = usePersist()

    const token = useSelector(selectCurrentToken)

    const effectRan = useRef(false)

    const [trueSuccess, setTrueSuccess] = useState(false)

    useEffect(() => {
        if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
            const verifyRefreshToken = async () => {
                try {
                    await refresh()
                    setTrueSuccess(true)
                } catch (err) {
                    console.error(err)
                }
            }

            if (!token && persist) verifyRefreshToken()
        }
        return () => (effectRan.current = true)
    }, [persist, refresh, token])

    if (!persist) {
        return <Outlet />
    } else if (isError) {
        return (
            <UnauthorizedPage />
        )
    } else if (isSuccess && trueSuccess) {
        return <Outlet />
    } else if (token && isUninitialized) {
        return <Outlet />
    }
}

export default PersistLogin