import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Beneficiary } from 'src/app/core/classes/beneficiary';
import { PieceType } from 'src/app/core/classes/pieceType';
import { User } from 'src/app/core/classes/user';
import { PieceTypeService } from 'src/app/core/services/piece-type/piece-type.service';
import { UserService } from 'src/app/core/services/users/user.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  disabledUserAction: string="disabled";
  ngSelect: any = "1";
  ngSelectUser = 0;
  ngSelect2 = 0;
  ngSelectTypePiece  = 0;
  openAddModal: string = "";
  openUpdateModal: string = "";
  openSponsoreModal: string = "";
  addUserForm!: FormGroup;
  updateUserForm!: FormGroup;
  addSponsoreForm!: FormGroup;
  beneficiaryForm!: FormGroup;
  pieceTypes: PieceType[] = [];
  users: User[];
  members: User[] = [];
  membersArray: any[] = [];
  user: User;
  idUser: number = 0; 
  Utilisateurs: string = "Utilisateurs"
  isProgressing: boolean = false;
  creatUser: boolean = false;
  updatUser: boolean = false;
  isList: boolean = true;
  isAdminAndOperator: boolean = false;
  isUser: boolean = false;
  adminIsConnected: boolean = false;
  birthDate: any;
  beneficiary: Beneficiary = new Beneficiary();

   @Input() isAdmin!: boolean
   @Input() isMember!: boolean;
   @Input() isOperator!: boolean;
   @Input() isMutulist!: boolean; 

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private utilityService: UtilityService,
    private pieceTypeService: PieceTypeService) { 
    this.users = [];
    this.user = new User();
  }

  ngOnInit(): void {
    this.formInit();
    this.getAllUsers();
    this.management();
    this.getConnectedUser();
    this.getAllMembers();
    this.getAllPieceType();
  }

  

  formInit() {
    this.addUserForm = this.formBuilder.group({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, Validators.required),
      userName: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      userType: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      confPassword: new FormControl(null, Validators.required),
      idUser: new FormControl(null, Validators.required),
    })

    this.updateUserForm = this.formBuilder.group({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, Validators.required),
      userName: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      id: new FormControl(null, Validators.required),
    })

    this.addSponsoreForm = this.formBuilder.group({
      id: new FormControl(null, Validators.required),
    })

    this.beneficiaryForm = this.formBuilder.group({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, Validators.required),
      whatsAppNumber: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required),
      pieceId: new FormControl(null, Validators.required),
      postalBox: new FormControl(null, Validators.required),
      birthDate: new FormControl(null, Validators.required),
      idPieceType: new FormControl(null, Validators.required),
    })

  }

  onOpenAddUser(){
    if(this.adminIsConnected == true){
      this.creatUser = true;
      this.isList = false;
    }else{
      this.creatUser = false;
      this.isList = true;
    }
    this.updatUser = false;

   }

   onAddUser(){
   const formValue = this.addUserForm.value;
   this.user.email = formValue.userName;
   this.user.firstName = formValue.firstName;
   this.user.lastName = formValue.lastName;
   this.user.password = formValue.password;
   this.user.phoneNumber = formValue.phoneNumber;
   this.user.userName = formValue.userName;
   this.user.city = formValue.city;

   if(formValue.userType == "ADMIN"){
    this.createAdmin(this.user)
   }else if(formValue.userType == "MEMBER"){
    this.createMember(this.user)
   }else if(formValue.userType == "MUTUALIST"){
    this.createMutualist(this.user, formValue.idUser)
   }else if(formValue.userType == "OPERATOR"){
    this.createOperator(this.user)
   }

   this.addUserForm.reset();
  }

  onSubmitUpdateUser(){
    const formValue = this.updateUserForm.value;
    this.user.firstName = formValue.firstName;
    this.user.lastName = formValue.lastName;
    this.user.email = formValue.userName;
    this.user.phoneNumber = formValue.phoneNumber;
    this.user.userName = formValue.userName
    this.user.city = formValue.city;
    console.log("update::", this.user);
    
    this.updateUser(this.user, formValue.id)
  }

  getConnectedUser() {
    this.userService.getUserByEmail(this.utilityService.getUserName()).subscribe((res) => {
      res.data.roles.forEach((role: any)=>{
        if(role.name == "ADMIN"){
          this.adminIsConnected = true;
          this.disabledUserAction = ""
        }
      })
    })
  }

  updateUser(user: User, id: number){
    console.log("user:", user);
    this.userService.updateMemberById(user, id).subscribe(()=>{
      this.getAllUsers();
      this.closeUpdateUserModal();
      this.utilityService.showMessage(
        'success',
        'User successfully update',
        '#06d6a0',
        'white'
      );
      this.isList = true
      this.updatUser = false
      this.creatUser = false
    }, ()=>{
      this.utilityService.showMessage(
        'warning',
        'An error has occurred',
        '#e62965',
        'white'
      );
    })
  }

  onDeleteUser(idUser: number){
    this.deleteMessage(idUser);
  }

  onUpdateUser(idUser: number){
    this.userService.getMemberById(idUser).subscribe((user)=>{
      this.isList = false;
      this.creatUser = false
      this.updatUser = true;
      this.user = user.data;
    })
   
  }

  closeUpdateUserModal(){
    this.openUpdateModal = ""
  }

  closeUserModal(){
    this.openAddModal = ""
  }

  getAllUsers(){
    this.userService.getAllUsers().subscribe((result)=>{
      this.users = result.data
      console.log("users::", result);
      
    })
  }

  createAdmin(user: User){
    this.userService.createAdmin(user).subscribe(()=>{
      this.getAllUsers();
      this.closeUserModal();
      this.utilityService.showMessage(
        'success',
        'Admin successfully created',
        '#06d6a0',
        'white'
      );
    }, ()=>{
      this.utilityService.showMessage(
        'warning',
        'An error has occurred',
        '#e62965',
        'white'
      );
    })
  }

  createMember(user:User){
    this.userService.createMember(user).subscribe(()=>{
      console.log("user::", user);
      
      this.getAllUsers();
      this.closeUserModal();
      this.utilityService.showMessage(
        'success',
        'Member successfully created',
        '#06d6a0',
        'white'
      );
    }, (error)=>{
      this.utilityService.showMessage(
        'warning',
        'An error has occurred',
        '#e62965',
        'white'
      );
    })
  }

  createMutualist(user: User, idUser: number){
    this.userService.createMutualist(user, idUser).subscribe((res)=>{
      this.getAllUsers();
      this.closeUserModal();
      // this.utilityService.showMessage(
      //   'success',
      //   'Mutualist successfully created',
      //   '#06d6a0',
      //   'white'
      // );
      console.log("resNewUser::", res);
      console.log("resNewUser2::", res.data.id);
      
      this.idUser = res.data.id
      this.onAddFiciary()
    })
  }

  createOperator(user: User){
    this.userService.createOperator(user).subscribe(()=>{
      this.getAllUsers();
      this.closeUserModal();
      this.utilityService.showMessage(
        'success',
        'Operator successfully created',
        '#06d6a0',
        'white'
      );
    }, (error)=>{
      this.utilityService.showMessage(
        'warning',
        'An error has occurred',
        '#e62965',
        'white'
      );
    })
  }

  management(){
    if(this.isAdmin == true){
      alert("is admin !")
    }else if(this.isMember == true){
      alert("is Member !")
    }
  }

  

  deleteMessage(id: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      buttonsStyling: true,
    });
    swalWithBootstrapButtons
      .fire({
        showClass: {
          popup: 'animate__animated animate__fadeInDown',
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp',
        },
        title: 'Are you sure ?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        confirmButtonColor: '#198AE3',
        cancelButtonColor: '#d33',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.userService.deleteById(id).subscribe(
            () => {
              this.getAllUsers();
              swalWithBootstrapButtons.fire({
                title: 'Deleted !',
                text: 'User has been deleted.',
                confirmButtonColor: '#198AE3',
              });
            },
            () => {
              swalWithBootstrapButtons.fire({
                title: 'Cancelled',
                text: 'An error has occurred',
                confirmButtonColor: '#d33',
              });
            }
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: 'Cancelled',
            text: 'you have cancelled the deletion',
            confirmButtonColor: '#d33',
          });
        }
      });
  }

  cancelCreatingUser(){
    this.creatUser = false;
    this.isList = true;
  }

  onCreate(){
    this.onAddUser();
  }
  
  cancelUpdatingUser(){
    this.updatUser = false;
    this.isList = true
  }
  onUpdate(){
    this.onSubmitUpdateUser();
  }

  onOpenAddSponsore(id: number){
    this.openSponsoreModal = "is-active";
    this.idUser = id;
  }

  // getAllMembers(){
  //   this.userService.getAllMambers().subscribe((res)=>{
  //     console.log("resMembre::", res);
  //     this.members = res.data;
  //   })
  // }

  getAllMembers(){
    this.userService.getAllMambers().subscribe((res)=>{
      console.log("resMembre::", res);
      this.membersArray = res.data.map((member:any)=>({value:member.id, label:member.firstName}));
    })
  }

  closeSponsoreModal(){
    this.openSponsoreModal = "";
  }

  onAddSponsore(){
    const formValue = this.addSponsoreForm.value;
    this.addSponsore(this.idUser, formValue.id);
  }

  addSponsore(idUser: number, idToAdd: number){
    this.userService.addSponsoredMember(idUser, idToAdd).subscribe(()=>{
      this.getAllUsers();
      this.closeSponsoreModal();
      this.utilityService.showMessage(
        'success',
        'Member successfully added',
        '#06d6a0',
        'white'
      );
    }, ()=>{
      this.utilityService.showMessage(
        'warning',
        'An error has occurred',
        '#e62965',
        'white'
      );
    })
  }

  onSelectCreateDate(event: any){

  }

  getAllPieceType(){
    this.pieceTypeService.findAllPieceTypes().subscribe((res)=>{
      this.pieceTypes = res.data
    })
  }

  onAddFiciary(){
    const formValue = this.beneficiaryForm.value;
    this.beneficiary.firstName = formValue.firstName
    this.beneficiary.lastName = formValue.lastName
    this.beneficiary.phoneNumber = formValue.phoneNumber
    this.beneficiary.whatsAppNumber = formValue.whatsAppNumber
    this.beneficiary.email = formValue.email
    this.beneficiary.city = formValue.city
    this.beneficiary.country = formValue.country
    this.beneficiary.pieceId = formValue.pieceId
    this.beneficiary.postalBox = formValue.postalBox
    this.beneficiary.birthDate = formValue.birthDate
    this.createBeneficiary(this.idUser, formValue.idPieceType, this.beneficiary)
  }

  createBeneficiary(idUser: number, idPieceType: number, beneficiary: Beneficiary){
    this.userService.addBeneficiary(idUser, idPieceType, beneficiary).subscribe(()=>{
      this.utilityService.showMessage(
        'success',
        'mutualiste create successfully created',
        '#06d6a0',
        'white'
      );
    }, ()=>{
      this.utilityService.showMessage(
        'warning',
        'An error has occurred',
        '#e62965',
        'white'
      );
    })
  }

  onSelectUser(event: any){
    console.log("select:User::", event);
    if(event == "ADMIN" || event == "OPERATOR" || event == "1"){
      this.isAdminAndOperator = true
      this.isUser = false;
    }
    if(event == "USER"){
      this.isAdminAndOperator = false
      this.isUser = false;
    }
  }

  onMutualiste(){
    this.isUser = true;
  }

  onMembre(){
    this.isUser = true;
  }
}
