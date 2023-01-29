import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../store/configureStore';
interface Props {
    roles?: string[];
}
export const PrivateRoute = ({ roles }: Props) => {
    const { account } = useAppSelector((state) => state.account);
    // หน้าปัจจุบันอยู่ที่ไหน
    let location = useLocation(); //บันทึกพาทปัจจุบัน
    var obj = JSON.parse(JSON.stringify(location)); //แกะกล่อง
    var path = obj.pathname; // ชื่อพาท
    localStorage.setItem("savepath", path);
    if (!account) {
        // เปลี่ยนเส้นทางพวกเขาไปยังหน้า /login แต่บันทึกตำแหน่งปัจจุบันที่พวกเขาอยู่
        // พยายามไปที่เมื่อพวกเขาถูกเปลี่ยนเส้นทาง สิ่งนี้ทำให้เราสามารถส่งพวกเขาได้
        // ไปที่หน้านั้นหลังจากเข้าสู่ระบบ ซึ่งเป็นประสบการณ์การใช้งานที่ดีกว่า
        // กว่าจะวางมันลงบนโฮมเพจ
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    //ตรวจสอบว่าตรงกับ roles ["a","b","c"] ใดๆ ที่ส่งเข้ามาหรือไม่
    if (roles && !roles?.some((r) => account.role.name?.includes(r))) {
        // toast.error("Not authorized to access this area");
        return <Navigate to="/" state={{ from: location }} replace />;
    }
    return <Outlet />;
}

// ถ้าเราเข้าสู่ระบบแล้วจะไม่สามารถเข้าไปยังหน้า login ได้
export const PrivateLogin = ({ children }: { children: JSX.Element }) => {

    const { account } = useAppSelector((state) => state.account);
    let location = useLocation();
    let path = localStorage.getItem("savepath");
    
    if (path == null) path = "/";
    
    if (account) return  <Navigate to={`${path}`} state={{ from: location }} replace />
    
    return children;
};
