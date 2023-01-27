import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { Fragment } from 'react'
import AppCheckbox from '../../app/components/AppCheckbox';
import AppNumberRange from '../../app/components/AppNumberRange';
import { CategoryProduct } from '../../app/models/Product';


interface Props {
    categorys: CategoryProduct[],
    onCateChange: (cate: string) => void;
    onRangeChange: (start: number, end: number) => void;
}

const SideNavCategories = ({ categorys, onCateChange , onRangeChange}: Props) => {
    const onChangeCheckbox = (checkedValues: CheckboxValueType[]) => onCateChange(checkedValues.toString());

    return (
        <Fragment>
            <div className="side-nav-categories">
                <div className="block block-layered-nav">
                    <div className="block-title"> เมนู </div>
                    <div className="block-content">
                        <dl id="narrow-by-list">
                            <dt className="odd">ชนิดสินค้า</dt>
                            <dd className="odd">
                                <AppCheckbox  onChange={onChangeCheckbox} data={categorys} />
                            </dd>
                            <dt className="even">ช่วงราคา</dt>
                            <dd className="even">
                                <AppNumberRange onRangeChange={onRangeChange} />
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
        </Fragment>

    )
}

export default SideNavCategories