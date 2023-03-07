import Swal, { SweetAlertIcon } from 'sweetalert2';
interface Props {
    onThen : any ,
    title : string ,
    icon : SweetAlertIcon ,
    timer? : number
}
const AppSwal = ({ icon , onThen , title , timer = 1500 } : Props) => {
  return (
    Swal.fire({
        position: 'center',
        icon: icon,
        title: title ,
        showConfirmButton: false,
        timer: timer
      }).then(onThen)
  )
}

export default AppSwal