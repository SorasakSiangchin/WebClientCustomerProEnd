// ใช้งานหน้า product detail
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

interface Props {
    titles: string[],
    keys: string[]
}
// reviews_tabs
// product_tabs_custom

const TitleTap = ({ titles, keys }: Props) => {
    return (
        <Fragment>
            <ul id="product-detail-tab" className="nav nav-tabs product-tabs">
                {titles.map((title, index) => <li key={index} className={index === 0 ? "active" : "ss"}> <Link to={`#${keys[index]}`} data-toggle="tab">{title}</Link> </li>)}
            </ul>
        </Fragment>
    )
}

export default TitleTap