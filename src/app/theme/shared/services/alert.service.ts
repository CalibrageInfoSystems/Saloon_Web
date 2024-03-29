import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { CommonEnum } from '../enums/http-handler';

@Injectable({
  providedIn: 'root'
})




export class AlertService {

  constructor() { }
  showMessage(icon, msg) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      iconColor: 'white',
      customClass: {
        popup: 'colored-toast'
      },
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: icon,
      title: msg
    })
  }
  showMessageHeader(header, icon, msg) {
    Swal.fire(
      header,
      msg,
      icon
    )
  }
  displayDailog(message, callback) {
    Swal.fire({
      title: message,
      showCancelButton: true,
      confirmButtonText: CommonEnum.YES,
      cancelButtonText: CommonEnum.NO
    }).then((result) => {
      if (result.isConfirmed) {
        callback(result.isConfirmed);
      }
    })
  }
}
