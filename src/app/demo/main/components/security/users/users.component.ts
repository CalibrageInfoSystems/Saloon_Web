import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { USER_ACCOUNT } from 'src/app/theme/shared/configurations/urls';
import { AlertInfo, CommonEnum, HttpMethod } from 'src/app/theme/shared/enums/http-handler';
import { FORMAT_DATE } from 'src/app/theme/shared/helpers/date.format';
import { SR_EMAIL, SR_PHONE_NO } from 'src/app/theme/shared/regex';
import { AlertService } from 'src/app/theme/shared/services/alert.service';
import { AppService } from 'src/app/theme/shared/services/app.service';
import { CommonAPIService } from 'src/app/theme/shared/services/common-api.service';
import { GlobalFilterService } from 'src/app/theme/shared/services/global-filter.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { EqualValidator } from 'src/app/theme/shared/validators/equal.validator';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export default class UsersComponent {
  userInfoList: any[] = [];
  globalFilterFields: string[] = ['UserName', 'firstName', 'Email', 'ContactNumber', 'MobileNumber', 'rolename', 'IsActive'];
  tHeaders: any = [
    {
      header: "User Name",
      key: "UserName",
    },
    {
      header: "Full Name",
      key: "FullName",
    },
    {
      header: "Email",
      key: "Email",
    },
    {
      header: "Mobile Number",
      key: "ContactNumber",
    },
    {
      header: "Alt. Mobile Number",
      key: "MobileNumber",
    },
    {
      header: "Role",
      key: "rolename",
    },
    {
      header: "Active",
      key: "IsActive",
    },
  ];
  formShow: any;
  postForm: FormGroup;
  currentUser: any;
  commonEnum = CommonEnum;
  submitted: boolean;
  @ViewChild('filter') filter!: ElementRef;
  roleInfoList: any[];
  selectedRole: any;
  filteredRoles: any[];
  reportingUsersList: any;
  reportingUsersListCopy: any;
  selectedManager: any;
  filteredManagers: any[];
  buttonName: any;
  processing: boolean;
  companyMultiData: any;
  companyList: any = [];
  roles: any;

  constructor(private formBuilder: FormBuilder, private commonService: CommonAPIService, private appService: AppService, private globalFilterService: GlobalFilterService,
    private alertService: AlertService) {
    this.currentUser = this.appService.getUserDetails();
    console.log(this.currentUser);

    this.buildForm();
    this.roles = [
      { roleId: 1, roleName: 'Admin' },
      { roleId: 2, roleName: 'Customer' },
    ];
  }

  ngOnInit() {
    this.getUser();
    // this.getRoles();
    // this.reportingUserData();
    // this.getCompanys();
  }


  buildForm() {
    this.postForm = this.formBuilder.group({
      id: null,
      userId: [null],
      userName: ['', [Validators.required]],
      // slpCode: [null, [Validators.required]],
      firstName: ['', [Validators.required]],
      middleName: [''],
      lastName: ['', [Validators.required]],
      email: [null, [Validators.required, Validators.pattern(SR_EMAIL)]],
      contactNumber: [null, [Validators.required, Validators.pattern(SR_PHONE_NO)]],
      mobileNumber: [null, Validators.pattern(SR_PHONE_NO)],
      isActive: true,
      confirmPassword: [null, [Validators.required]],
      password: [null, [Validators.required]],
      roleId: [null, [Validators.required]],
      createdByUserId: [null],
      updatedByUserId: [null],
      createdDate: [null],
      updatedDate: [null],
    });
    this.buttonName = CommonEnum.SAVE;
    this.submitted = false;
    this.selectedRole = null;
    this.selectedManager = null;
    this.companyMultiData = null;
    if (!this.appService.checkNullOrUndefined(this.currentUser)) {
      this.postForm.get("createdByUserId").patchValue(this.currentUser[0].Id);
      this.postForm.get("updatedByUserId").patchValue(this.currentUser[0].Id);
      this.postForm.get("createdDate").patchValue(new Date());
      this.postForm.get("updatedDate").patchValue(new Date());
    }

    if ((this.buttonName = this.commonEnum.SAVE)) {
      this.postForm.get("password").setValidators([
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?!.* )(?=.*\d)(?=.*[A-Z]).{8,15}$/)
      ]);
      this.postForm.get("password").updateValueAndValidity();
      this.postForm.get("confirmPassword").setValidators([Validators.required, EqualValidator("password")]);
      this.postForm.get("confirmPassword").updateValueAndValidity();
    }
  }
  get formControls() {
    return this.postForm.controls;
  }

  // Function to filter the table globally
  onGlobalFilter(table: Table, event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.globalFilterService.filterTableByDate(table, searchTerm);
  }
  // Function to clear the table
  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  getUser() {
    debugger;
    this.userInfoList = [];
    let url = USER_ACCOUNT.getUsers;
    this.commonService.commonApiCall(
      url + null,
      HttpMethod.GET,
      null, (result, statusFlag) => {
        debugger
        if (statusFlag) {
          if (result) {
            if (!this.appService.checkNullOrUndefined(result)) {
              this.userInfoList = result
              console.log(this.userInfoList);

            }

          }
        }

      }
    );
  }
  reportingUserData() {
    this.reportingUsersList = [];
    this.reportingUsersListCopy = [];
    let url = USER_ACCOUNT.activeUsersList + "/" + null;
    this.commonService.commonApiCall(
      url,
      HttpMethod.GET,
      null,
      (res, statusFlag) => {
        if (statusFlag) {
          if (!this.appService.checkNullOrUndefined(res.listResult)) {
            this.reportingUsersList = res.listResult;
            this.reportingUsersListCopy = res.listResult;
          }
        }
      }
    );
  }

  getRoles() {
    this.roleInfoList = [];
    let url = USER_ACCOUNT.getRoles;
    this.commonService.commonApiCall(
      url + null,
      HttpMethod.GET,
      null, (result, statusFlag) => {
        if (statusFlag) {
          if (result) {
            if (!this.appService.checkNullOrUndefined(result.listResult)) {
              this.roleInfoList = result.listResult
            }

          }
        }

      }
    );
  }

  onRoleChange(val) {
    let roles = [];
    roles.push(val.name);
    this.postForm.get("roles").patchValue(roles);
  }

  filterRole(event) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.roleInfoList.length; i++) {
      let country = this.roleInfoList[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.filteredRoles = filtered;
  }
  clearRoleFilter(event) {
    // console.log(event);
    if (event == "") {
      this.postForm.get("roles").setValue([]);
      this.reportingUsersList = JSON.parse(
        JSON.stringify(this.reportingUsersListCopy)
      );
      this.clearManagerFilter("");
      this.selectedManager = null;
    }
  }



  filterManager(event) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.reportingUsersList.length; i++) {
      let country = this.reportingUsersList[i];
      if (country.fullName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.filteredManagers = filtered;
  }
  onSelectManager(event) {
    this.postForm.get("reportingManager").patchValue(event.id);
  }
  clearManagerFilter(event) {
    if (event == "") {
      this.postForm.get("reportingManager").setValue("");
    }
  }

  onAddClick() {
    this.formShow = true;
    this.buildForm();

  }
  onAddCancel() {
    this.formShow = false;
    this.buildForm();
    // this.reportingUsersList = JSON.parse(
    //   JSON.stringify(this.reportingUsersListCopy)
    // );
  }


  onEditUser(item) {
    debugger;
    this.buttonName = CommonEnum.UPDATE;
    this.postForm.patchValue(item);
    this.formShow = !this.formShow;

    this.postForm.get("id").setValue(item.Id);
    this.postForm.get("userId").setValue(item.userid);
    this.postForm.get("userName").setValue(item.UserName);
    this.postForm.get("firstName").setValue(item.firstname);
    this.postForm.get("middleName").setValue(item.MiddleName);
    this.postForm.get("lastName").setValue(item.Lastname);
    this.postForm.get("email").setValue(item.Email);
    this.postForm.get("contactNumber").setValue(item.ContactNumber);
    this.postForm.get("mobileNumber").setValue(item.MobileNumber);
    this.postForm.get("isActive").setValue(item.IsActive);
    this.postForm.get("password").setValue(item.Password);
    this.postForm.get("confirmPassword").setValue(item.Password);
    this.postForm.get("roleId").setValue(item.RoleID);
    this.postForm.get("createdByUserId").patchValue(this.currentUser[0].Id);
    this.postForm.get("updatedByUserId").patchValue(this.currentUser[0].Id);
    this.postForm.get("createdDate").patchValue(FORMAT_DATE(new Date()));
    this.postForm.get("updatedDate").patchValue(FORMAT_DATE(new Date()));

    this.postForm.get("password").clearValidators();
    this.postForm.get("password").updateValueAndValidity();
    this.postForm.get("confirmPassword").clearValidators();
    this.postForm.get("confirmPassword").updateValueAndValidity();

    console.log(this.postForm.value);


    // if (item !== undefined) {
    //   this.postForm.patchValue(item);
    //   let roles = [];
    //   roles.push(item.roleName);
    //   this.selectedRole = this.roleInfoList.find(
    //     (x) => x.name.toLowerCase() == item.roleName.toLowerCase()
    //   );
    //   this.postForm.get("roles").patchValue(roles);
    //   this.postForm.get("slpCode").patchValue(item.slpCode);

    //   if (!this.appService.checkNullOrUndefined(this.currentUser)) {
    //     this.postForm.get("updatedByUserId").patchValue(this.currentUser.Id);
    //     this.postForm.get("updatedDate").patchValue(new Date());
    //     this.reportingUsersList = this.reportingUsersListCopy.filter(
    //       (x) => x.id != item.id
    //     );
    //     this.selectedManager = this.reportingUsersList.find((x) => x.id == item.reportingManager);

    //     this.postForm.get("reportingManager").patchValue(item.reportingManager);
    //   }

    //   if (item.companyIds != null) {
    //     var array = item.companyIds.split(",").map(function (item) {
    //       return parseInt(item);
    //     });
    //     this.postForm.get("companyIds").patchValue(array);
    //     const matchingItems = this.companyList.filter(item => array.includes(item.companyId));
    //     this.companyMultiData = matchingItems;
    //   }

    //   this.postForm.get("password").clearValidators();
    //   this.postForm.get("password").updateValueAndValidity();
    //   this.postForm.get("confirmPassword").clearValidators();
    //   this.postForm.get("confirmPassword").updateValueAndValidity();
    // }
    // this.formShow = !this.formShow;
  }





  onSubmit(type) {
    this.submitted = true;
    this.processing = true;
    if (!this.postForm.valid) {
      this.alertService.showMessage(
        AlertInfo.ERROR,
        CommonEnum.MANDOTORY_FIELDS
      );

      this.processing = false;
      return;
    }

    if (type == this.commonEnum.SAVE) {

      let url = USER_ACCOUNT.addUser;
      this.commonService.commonApiCall(
        url,
        HttpMethod.POST,
        this.postForm.getRawValue(), (result, statusFlag) => {
          debugger
          if (statusFlag) {
            this.buildForm();
            this.getUser();
            this.formShow = false;
          }

        }
      );
      this.processing = false;
    } else if (type == this.commonEnum.UPDATE) {
      let url = USER_ACCOUNT.updateUser;
      this.commonService.commonApiCall(
        url,
        HttpMethod.POST,
        this.postForm.getRawValue(), (result, statusFlag) => {
          debugger
          if (statusFlag) {
            this.getUser();
            this.buildForm();
            this.formShow = false;
          }

        }
      );
      this.processing = false;
    }
  }

  onDelete(item) {
    let message = item.isActive ? CommonEnum.DEACTIVATE : CommonEnum.ACTIVATE;
    this.alertService.displayDailog(message, (result) => {
      if (result) {
        const url = USER_ACCOUNT.userDelete;
        var reqObj = {
          id: item.id
        }
        this.commonService.commonApiCall(
          url,
          HttpMethod.POST,
          reqObj,
          (res, statusFlag) => {
            if (statusFlag) {
              this.getUser();
            }
          }
        );
      }
    });
  }


  changeUser(event) {
    let array = [];
    this.companyMultiData = event;
    event.forEach(element => {
      array.push(element.companyId);
    });
    this.postForm.get('companyIds').patchValue(array);
  }


  getCompanys() {


    this.companyList = [];
    let url = USER_ACCOUNT.getCompanyList;
    this.commonService.commonApiCall(
      url + null,
      HttpMethod.GET,
      null, (result, statusFlag) => {
        if (statusFlag) {
          if (result) {
            if (!this.appService.checkNullOrUndefined(result.listResult)) {
              this.companyList = result.listResult
            }



          }
        }

      }
    );
  }

}
