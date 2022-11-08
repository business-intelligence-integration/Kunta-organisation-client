import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  roles: any
  constructor() { }

loadToken(){
    return localStorage.getItem('token') || '{}';
}

isConnect() {
    return localStorage.getItem('token') !== null;
}

saveToken(token: any): void {
    localStorage.setItem('token', token);
    var jwtHelper = new JwtHelperService();
    this.roles = jwtHelper.decodeToken(token).roles;
}

getUserName() {
  let token = localStorage.getItem('token') || '{}';
  var jwtHelper = new JwtHelperService();
  return jwtHelper.decodeToken(token).sub;
}

deleteToken(){
    localStorage.removeItem('token');
}

getUserRole(token: string) {
  localStorage.setItem('token', token);
  var jwtHelper = new JwtHelperService();
  return (this.roles = jwtHelper.decodeToken(token).roles);
}
showMessage(icon: any, title: any, background: any, color: any) {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: icon,
    title: title,
    background: background,
    color: color,
  });
}



}
