import React from 'react'
import Proptypes from "prop-types"
import Navbar from '../components/MainPages/Navbar'

const MainLayout = ({ children }) => {
    if (!localStorage.getItem("token")) {
        return (
            <React.Fragment>
                <Navbar />
                {children}
            </React.Fragment>
        )
    } else {
        window.location = '/panel'
    }
}

export default MainLayout

MainLayout.propTypes = {
    children: Proptypes.node
}