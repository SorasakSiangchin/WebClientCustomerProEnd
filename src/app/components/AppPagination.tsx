import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Pagination } from "antd";
import { MetaData } from "../models/Pagination";


interface Props {
    metaData: MetaData;
    onPageChange: (page: number) => void;
    isSimple? :boolean;
}

export default function AppPagination({ metaData, onPageChange , isSimple= true }: Props) {
    const { currentPage, totalCount, pageSize } = metaData;
    return (
        <div className="toolbar bottom">
            <div className="display-product-option">
                <Pagination simple={isSimple} defaultCurrent={1} responsive current={currentPage} total={totalCount} onChange={(page) => onPageChange(page)} pageSize={pageSize} />
            </div>
        </div>
    )
} 
