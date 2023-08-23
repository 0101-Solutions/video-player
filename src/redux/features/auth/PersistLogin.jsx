/* eslint-disable no-undef */
import { Link, Outlet, useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import { useRefreshMutation } from "./authApiSlice"
import { selectCurrentToken } from "./authSlice"

import usePersist from "../../../hooks/usePersist"

const PersistLogin = () => {
    const [persist] = usePersist()
    const token = useSelector(selectCurrentToken)
    const effectRan = useRef(false)
    const [trueSuccess, setTrueSuccess] = useState(false)
    const [refresh, { isUninitialized, isSuccess, isError, error }] = useRefreshMutation()

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
            <div className="my-4 text-xs text-red-500 text-center tracking-wide">
                {`${error?.data?.message} - `}
                <Link to="/login">Please login again</Link>
            </div>
        )
    } else if (isSuccess && trueSuccess) {
        return <Outlet />
    } else if (token && isUninitialized) {
        return <Outlet />
    }
}

export default PersistLogin