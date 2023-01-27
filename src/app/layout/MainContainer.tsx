import { Fragment } from 'react'

const MainContainer = ({ children , className }: any) => {
    return (
        <Fragment>
            <div className={`main-container ${className}`} >
                <div className="main container" >
                    {children}
                </div>
            </div>
        </Fragment>
    )
}

export default MainContainer