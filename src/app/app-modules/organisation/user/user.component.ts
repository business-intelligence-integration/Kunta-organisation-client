import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Beneficiary } from 'src/app/core/classes/beneficiary';
import { Civility } from 'src/app/core/classes/civility';
import { FamilySituation } from 'src/app/core/classes/familySituation';
import { PieceType } from 'src/app/core/classes/pieceType';
import { Status } from 'src/app/core/classes/status';
import { User } from 'src/app/core/classes/user';
import { GlobalConstants } from 'src/app/core/constants/global.contant';
import { CivilityService } from 'src/app/core/services/civility/civility.service';
import { CountryService } from 'src/app/core/services/country/country.service';
import { FamilySituationService } from 'src/app/core/services/family-situation/family-situation.service';
import { StatusService } from 'src/app/core/services/organisation/status/status.service';
import { PieceTypeService } from 'src/app/core/services/piece-type/piece-type.service';
import {Location} from "@angular/common";

import { UserService } from 'src/app/core/services/users/user.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import Swal from 'sweetalert2';
import { Role } from 'src/app/core/classes/role';

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
  ngSelectCivility = 0;
  ngSelectFamilySituation = 0;
  ngSelectTypePiece1 = 0;
  ngSelectTypePiece2 = 0;
  ngSelectStatus = 0;
  ngSelectRole = 0;
  openBeneficiaryModal: string = "";
  openUpdateModal: string = "";
  openSponsoreModal: string = "";
  addUserForm!: FormGroup;
  updateUserForm!: FormGroup;
  addSponsoreForm!: FormGroup;
  beneficiaryForm!: FormGroup;
  changeStatusForm!: FormGroup;
  selectRoleForm!: FormGroup;
  searchForm!: FormGroup;
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
  isSelectMutualist: boolean = false;
  isSelectMember: boolean = false;
  adminIsConnected: boolean = false;
  operatorIsConnected: boolean = false;
  isSaving: boolean = false;
  showErroMessage: boolean = false;
  birthDate: any;
  dateOfValidity: any;
  dateOfIssue: any;
  beneficiary: Beneficiary = new Beneficiary();
  cyvilities: Civility[] = [];
  familySitautions: FamilySituation[] = [];
  status: Status[] = [];
  userOfSelect: any;
  countries: any;
  openStatusModal: string = "";
  maxAge: any;
  minValidityDate: any
  selectedRoleS: string = "ALL"

   @Input() isAdmin!: boolean
   @Input() isMember!: boolean;
   @Input() isOperator!: boolean;
   @Input() isMutulist!: boolean; 

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private utilityService: UtilityService,
    private pieceTypeService: PieceTypeService,
    private civilityService: CivilityService,
    private familySituationService: FamilySituationService,
    private statusService: StatusService,
    private location: Location,
    private countryService: CountryService) { 
    this.users = [];
    this.user = new User();
  }

  ngOnInit(): void {
    this.getAllUsers();
    this.formInit();
    this.management();
    this.getAllMembers();
    this.getConnectedUser();
    this.getAllPieceType();
    this.getAllcivilities();
    this.getAllFamilySituation();
    this.getAllStatus();
    this.getAllCountries();
    this.getMaxAge();
  }

  

  formInit() {
    this.addUserForm = this.formBuilder.group({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, Validators.required),
      userName: new FormControl(null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]),
      city: new FormControl(null, Validators.required),
      userType: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      confPassword: new FormControl(null, Validators.required),
      idSponsor: new FormControl(null, Validators.required),
      dateOfIssue: new FormControl(null, Validators.required),
      dateOfValidity: new FormControl(null, Validators.required),
      mainAddress: new FormControl(null, Validators.required),
      nationalIDNumber: new FormControl(null, Validators.required),
      nationality: new FormControl(null, Validators.required),
      numberOfChildren: new FormControl(null, Validators.required),
      pieceId: new FormControl(null, Validators.required),
      placeOfIssue: new FormControl(null, Validators.required),
      postalBox: new FormControl(null, Validators.required),
      secondPhoneNumber: new FormControl(null),
      secondaryAddress: new FormControl(null),
      secondaryEmail: new FormControl(null, [Validators.pattern(GlobalConstants.emailRegex)]),
      whatsappPhoneNumber:new FormControl(null, Validators.required),
      idCivility: new FormControl(null, Validators.required),
      idFamilySituation: new FormControl(null, Validators.required),
      idPieceType: new FormControl(null, Validators.required),
      idCountry: new FormControl(null, Validators.required),
    })

    this.updateUserForm = this.formBuilder.group({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, Validators.required),
      userName: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      id: new FormControl(null, Validators.required),
      dateOfIssue: new FormControl(null, Validators.required),
      dateOfValidity: new FormControl(null, Validators.required),
      mainAddress: new FormControl(null, Validators.required),
      nationalIDNumber: new FormControl(null, Validators.required),
      nationality: new FormControl(null, Validators.required),
      numberOfChildren: new FormControl(null, Validators.required),
      pieceId: new FormControl(null, Validators.required),
      placeOfIssue: new FormControl(null, Validators.required),
      postalBox: new FormControl(null, Validators.required),
      secondPhoneNumber: new FormControl(null, Validators.required),
      secondaryAddress: new FormControl(null, Validators.required),
      secondaryEmail: new FormControl(null, Validators.required),
      whatsappPhoneNumber:new FormControl(null, Validators.required),
    })

    this.addSponsoreForm = this.formBuilder.group({
      id: new FormControl(null, Validators.required),
    })

    this.selectRoleForm = this.formBuilder.group({
      selectedRole: new FormControl(null),
    })

    this.searchForm = this.formBuilder.group({
      lastName: new FormControl(null),
    })

    this.beneficiaryForm = this.formBuilder.group({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null),
      email: new FormControl(null),
      pieceId: new FormControl(null, Validators.required),
      birthDate: new FormControl(null, Validators.required),
      idPieceType: new FormControl(null, Validators.required),
    })

    this.changeStatusForm = this.formBuilder.group({
      idStatus: new FormControl(null, Validators.required),
    })
  }

  comeBack(){this.location.back()}

  onOpenAddUser(){
    if(this.adminIsConnected == true || this.operatorIsConnected == true){
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
   this.user.dateOfIssue = formValue.dateOfIssue;
   this.user.dateOfValidity = formValue.dateOfValidity;
   this.user.mainAddress = formValue.mainAddress;
   this.user.nationalIDNumber = formValue.nationalIDNumber;
   this.user.nationality = formValue.nationality;
   this.user.numberOfChildren = formValue.numberOfChildren;
   this.user.pieceId = formValue.pieceId;
   this.user.placeOfIssue = formValue.placeOfIssue;
   this.user.postalBox = formValue.postalBox;
   this.user.secondPhoneNumber = formValue.secondPhoneNumber;
   this.user.secondaryAddress = formValue.secondaryAddress;
   this.user.secondaryEmail = formValue.secondaryEmail;
   this.user.whatsappPhoneNumber = formValue.whatsappPhoneNumber;

   if(formValue.userType == "USER"){
    if(this.isSelectMember){
      this.createMember(this.user, formValue.idSponsor, formValue.idCivility, formValue.idPieceType, formValue.idFamilySituation, formValue.idCountry)
    }else{
      this.createMutualist(this.user, formValue.idSponsor, formValue.idCivility, formValue.idPieceType, formValue.idFamilySituation, formValue.idCountry)
    }
   }if(formValue.userType == "ADMIN"){
    this.createAdmin(this.user, formValue.idSponsor, formValue.idCivility, formValue.idPieceType, formValue.idFamilySituation, formValue.idCountry)
  }else if(formValue.userType == "OPERATOR"){
    this.createOperator(this.user, formValue.idSponsor, formValue.idCivility, formValue.idPieceType, formValue.idFamilySituation, formValue.idCountry)
   }

   this.addUserForm.reset();
  }

  onSubmitUpdateUser(){
    this.isSaving = true;
    const formValue = this.updateUserForm.value;
    this.user.firstName = formValue.firstName;
    this.user.lastName = formValue.lastName;
    this.user.email = formValue.userName;
    this.user.phoneNumber = formValue.phoneNumber;
    this.user.userName = formValue.userName
    this.user.city = formValue.city;
    this.user.dateOfIssue = formValue.dateOfIssue;
    this.user.dateOfValidity = formValue.dateOfValidity;
    this.user.mainAddress = formValue.mainAddress;
    this.user.nationalIDNumber = formValue.nationalIDNumber;
    this.user.nationality = formValue.nationality;
    this.user.numberOfChildren = formValue.numberOfChildren;
    this.user.pieceId = formValue.pieceId;
    this.user.placeOfIssue = formValue.placeOfIssue;
    this.user.postalBox = formValue.postalBox;
    this.user.secondPhoneNumber = formValue.secondPhoneNumber;
    this.user.secondaryAddress = formValue.secondaryAddress;
    this.user.secondaryEmail = formValue.secondaryEmail;
    this.user.whatsappPhoneNumber = formValue.whatsappPhoneNumber;

    this.updateUser(this.user, formValue.id)
  }

  getConnectedUser() {
    this.userService.getUserByEmail(this.utilityService.getUserName()).subscribe((res) => {
      this.user = res.data;
      if(this.users.length <= 0){
        this.userOfSelect = [{value: this.user.id, label: this.user.firstName}]
      }
      res.data.roles.forEach((role: any)=>{
        if(role.name == "ADMIN"){
          this.adminIsConnected = true;
          this.disabledUserAction = ""
        }else if(role.name == "OPERATOR"){
          this.operatorIsConnected = true;
          
        }
      })
    })
  }

  updateUser(user: User, id: number){
    this.userService.updateMemberById(user, id).subscribe(()=>{
      this.isSaving = false;
      this.getAllUsers();
      this.closeUpdateUserModal();
      this.utilityService.showMessage(
        'success',
        'Utilisateur mis a jour avec succès !',
        '#06d6a0',
        'white'
      );
      this.isList = true
      this.updatUser = false
      this.creatUser = false
    }, ()=>{
      this.isSaving = false;
      this.utilityService.showMessage(
        'warning',
        'Une erreur s\'est produite !',
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

  onOpenBeneficiaryModal(id: number){
    this.openBeneficiaryModal = "is-active"
    this.idUser = id;
  }

  closeBeneficiaryModal(){
    this.openBeneficiaryModal = ""
  }

  // getAllUsers(){
  //   this.userService.getAllUsers().subscribe((result)=>{
  //     this.users = result.data
  //     if(this.users.length >0){
  //       this.userOfSelect = result.data.map((user:any)=>({value: user.id, label: user.firstName}))
  //     }
      
  //   })
  // }

  getAllUsers(){
    let users: User[] = [];
    this.userService.getAllUsers().subscribe({
      next: (res)=> res.data.map((user: any)=>{
        this.userOfSelect = {value: user.id, label: user.firstName}
        let isSimpleUser = false;
        if(this.adminIsConnected){
          users.push(user)
        }else if(this.operatorIsConnected){
          user.roles.map((role:Role)=>{
            if(role.name != "ADMIN" && role.name != "OPERATOR"){
              isSimpleUser = true;
            }
          })
          if(isSimpleUser){
            users.push(user)
          }
        }
      })
    })

    this.userService.getAllUsers().subscribe((result)=>{
          if(result.data.length >0){
            this.userOfSelect = result.data.map((user:any)=>({value: user.id, label: user.firstName}))
          }      
        })

    this.users = users;

    
  }

  createAdmin(admin: User, idSponsor: number, idCivility: number, idPieceType: number, idFamilySituation: number, idCountry: number){
    this.isSaving = true;
    this.userService.createAdmin(admin, idSponsor, idCivility, idPieceType, idFamilySituation, idCountry).subscribe((res)=>{
      console.log("isSaving2...");
      this.isSaving = false;
      this.getAllUsers();
      this.utilityService.showMessage(
        'success',
        'Admin crée avec succès !',
        '#06d6a0',
        'white'
      );
    }, ()=>{
      this.isSaving = false;
      this.utilityService.showMessage(
            'warning',
            'Une erreur s\'est produite !',
            '#e62965',
            'white'
          );
    })
  }

  createMember(member: User, idSponsor: number, idCivility: number, idPieceType: number, idFamilySituation: number, idCountry: number){
    this.isSaving = true;
    this.userService.createMember(member, idSponsor, idCivility, idPieceType, idFamilySituation, idCountry).subscribe(()=>{
      this.isSaving = false;
      this.getAllUsers();
      this.utilityService.showMessage(
        'success',
        'Membre crée avec succès !',
        '#06d6a0',
        'white'
      );
    },()=>{
      this.isSaving = false;
      this.utilityService.showMessage(
        'warning',
        'Une erreur s\'est produite !',
        '#e62965',
        'white'
      );
    })
  }

  createMutualist(mutualist: User, idSponsor: number, idCivility: number, idPieceType: number, idFamilySituation: number, idCountry: number){
    this.isSaving = true;
    this.userService.createMutualist(mutualist, idSponsor, idCivility, idPieceType, idFamilySituation, idCountry).subscribe((res)=>{
      this.isSaving = false;
      this.getAllUsers();
      this.utilityService.showMessage(
        'success',
        'Mutualiste crée avec succès !',
        '#06d6a0',
        'white'
      );
    }, ()=>{
      this.isSaving = false;
      this.utilityService.showMessage(
        'warning',
        'Une erreur s\'est produite !',
        '#e62965',
        'white'
      );
    })
  }

  createOperator(operator: User, idSponsor: number, idCivility: number, idPieceType: number, idFamilySituation: number, idCountry: number){
    this.isSaving = true;
    this.userService.createOperator(operator, idSponsor, idCivility, idPieceType, idFamilySituation, idCountry).subscribe((res)=>{
      this.isSaving = false;
      this.getAllUsers();
      this.utilityService.showMessage(
        'success',
        'Operator crée avec succès !',
        '#06d6a0',
        'white'
      );
    }, ()=>{
      this.isSaving = false;
      this.utilityService.showMessage(
        'warning',
        'Une erreur s\'est produite !',
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
        title: 'Êtes-vous sûre ?',
        text: "Cette action est irreversible!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, supprimer!',
        cancelButtonText: 'Non, annuler!',
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
                title: 'Supprimé !',
                text: 'L\'utilisateur a été supprimé.',
                confirmButtonColor: '#198AE3',
              });
            },
            () => {
              swalWithBootstrapButtons.fire({
                title: 'Annulé',
                text: 'Une erreure s\'est produite',
                confirmButtonColor: '#d33',
              });
            }
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: 'Annulé',
            text: 'Vous avez annulé la suppression',
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

  getAllMembers(){
    this.userService.getAllMambers().subscribe((res)=>{
      this.membersArray = res.data.map((member:any)=>({value:member.id, label:member.firstName}));
    })
  }

  closeSponsoreModal(){
    this.openSponsoreModal = "";
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
    // this.beneficiary.whatsAppNumber = formValue.whatsAppNumber
    this.beneficiary.email = formValue.email
    // this.beneficiary.city = formValue.city
    // this.beneficiary.country = formValue.country
    this.beneficiary.pieceId = formValue.pieceId
    // this.beneficiary.postalBox = formValue.postalBox
    this.beneficiary.birthDate = formValue.birthDate
    this.createBeneficiary(this.idUser, formValue.idPieceType, this.beneficiary)
    this.beneficiaryForm.reset();
  }

  createBeneficiary(idUser: number, idPieceType: number, beneficiary: Beneficiary){
    this.isSaving = true;
    this.userService.addBeneficiary(idUser, idPieceType, beneficiary).subscribe(()=>{
      this.isSaving = false;
      this.getAllUsers();
      this.closeBeneficiaryModal()
      this.utilityService.showMessage(
        'success',
        'L\'ayant droit a été crée avec succès !',
        '#06d6a0',
        'white'
      );
    }, ()=>{
      this.isSaving = false;
      this.utilityService.showMessage(
        'warning',
        'Une erreur s\'est produite !',
        '#e62965',
        'white'
      );
    })
  }

  onSelectUser(event: any){
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
    this.isSelectMutualist = true;
    this.isSelectMember = false;
  }

  onMembre(){
    this.isUser = true;
    this.isSelectMember = true;
    this.isSelectMutualist = false
  }

  getAllcivilities(){
    this.civilityService.findAllCivilities().subscribe((res)=>{
      this.cyvilities = res.data;
    })
  }

  getAllFamilySituation(){
    this.familySituationService.findAllFamilySituations().subscribe((res)=>{
      this.familySitautions = res.data;
    })
  }

  getAllStatus(){
    this.statusService.findAllStatus().subscribe((res)=>{
      this.status = res.data
    })
  }

  onUpdateUserStatus(idUser: number){
   this.openStatusModal = "is-active";
   this.idUser = idUser;
  }

  onSubmitUpdateStatus(){
    const formValue = this.changeStatusForm.value;
    this.updateStatusUser(this.idUser, formValue.idStatus)
  }

  updateStatusUser(idUser: number, idStatus: number){
    this.isSaving = true;
    this.userService.changeUserStatus(idUser, idStatus).subscribe(()=>{
      this.isSaving = false;
      this.closeStatusModal();
      this.getAllUsers();
      this.utilityService.showMessage(
        'success',
        'Le status de l\'utilisateur a été modifié avec succès !',
        '#06d6a0',
        'white'
      );
    }, ()=>{
       this.isSaving = false;
      this.utilityService.showMessage(
        'warning',
        'Une erreur s\'est produite !',
        '#e62965',
        'white'
      );
    })
  }

  closeStatusModal(){
    this.openStatusModal = "";
  }

  getAllCountries(){
    this.countryService.findAllCountries().subscribe((res)=>{
      this.countries = res.data.map((country:any)=>({value:country.id, label: country.name}));
    })
  }

  getMaxAge(){
    this.maxAge = new DatePipe('en-US').transform(new Date(Date.now()),'yyyy-MM-dd');
  }


 onSelectIssueDate(event: any){
  this.minValidityDate = this.dateOfIssue;
  this.dateOfValidity = null;
 }

 onSelectValidityDate(event: any){
  if(this.dateOfIssue == undefined || this.dateOfIssue == null){
    this.showErroMessage = true;
    this.dateOfValidity = null;
  }else{
    this.showErroMessage = false;
  }
 }

 onSelectUserRole(roleName: any){
    if(roleName == "ALL" || roleName == "0"){
      this.getAllUsers();
    }else{
      this.findUsersByRoleName(roleName);
    }
 }

 searchUsers(){
    this.findUsersByLastName(this.searchForm.value.lastName);
 }

 findUsersByLastName(lastName: string){
  this.userService.findUsersByLastName(lastName).subscribe((res)=>{
    this.users = [];
    this.users = res?.data;
  })
 }

 findUsersByRoleName(name: string){
  this.userService.findUsersByRoleName(name).subscribe((res)=>{
    this.users = [];
    this.users = res.data;
  })
 }

}
