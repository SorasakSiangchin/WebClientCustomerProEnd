import Swal, { SweetAlertIcon } from 'sweetalert2'

interface Props {
    onThen : any ,
    title : string ,
    icon : SweetAlertIcon ,
}

const AppSwalConfirm = ({ icon , onThen , title } : Props) => {
    return (
        Swal.fire({
            title: title,
            icon: icon,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: "ยกเลิก",
            confirmButtonText: 'ตกลง' 
        }).then(onThen)
    )
}

export default AppSwalConfirm