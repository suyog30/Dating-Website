import React from 'react'
import {useState, useEffect} from 'react'
import NavigationBarDashboard from "./NavigationBarDashboard"
import TinderCards from './tinderCards/TinderCards'
import SwipeButtons from './swipeButtons/SwipeButtons'
import { getUser } from '../utils/Common';
import AdminDashboard from './adminDashboard/AdminDashboard'

function Dashboard() {

    const [isAdmin, setIsAdmin] = useState();


    useEffect(() => {
      setIsAdmin(getUser().isAdmin)
  
    }, [isAdmin])


    if(getUser().isAdmin){
        return <AdminDashboard />
    }
    return (
        <>
        <NavigationBarDashboard/>
        <TinderCards />
        <SwipeButtons />
        </>
    )
}

export default Dashboard
