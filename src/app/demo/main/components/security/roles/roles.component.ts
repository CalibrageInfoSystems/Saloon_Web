import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { USER_ACCOUNT, USER_ROLES } from 'src/app/theme/shared/configurations/urls';
import { AlertInfo, CommonEnum, HttpMethod } from 'src/app/theme/shared/enums/http-handler';
import { AlertService } from 'src/app/theme/shared/services/alert.service';
import { AppService } from 'src/app/theme/shared/services/app.service';
import { CommonAPIService } from 'src/app/theme/shared/services/common-api.service';
import { GlobalFilterService } from 'src/app/theme/shared/services/global-filter.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import * as _ from "underscore";

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export default class RolesComponent {

  rolesInfoList: any[]=[];
  rolePermisonsList:any=[];
commonEnum=CommonEnum;
globalFilterFields:string[]=['name','parenRoleName'];
  tHeaders: any = [
    {
      header: "Name",
      key: "name"
    },
    {
      header: "Reporting Role",
      key: "parentRoleName"
    },
    {
      header: "Active",
      key: "isActive"
    }];
  showForm: boolean;
  currentUser: any;
  roleForm: FormGroup;
  buttonName=CommonEnum.SAVE;
  submitted: boolean;
  processing: boolean;
  selectedRights: any[];
  activityRights: any;
@ViewChild('filter') filter!: ElementRef;
  parentRoleList: any;
  parentRoleCopyList: any;

  constructor(private formBuilder: FormBuilder,private commonService:CommonAPIService,private appService:AppService, private globalFilterService: GlobalFilterService,private alertService: AlertService) {
    this.currentUser = this.appService.getUserDetails();
    this.buildForm();
  }

  ngOnInit(){
   this.getUserRoles();
   this.rolesData();
   this.getAllPermissions();
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


  buildForm(){
  this.roleForm = this.formBuilder.group({
    id:[null],
    name: ["", [Validators.required, Validators.maxLength(50),Validators.pattern("^[a-zA-Z0-9-() ]+$")]],
    description: [""],
    parentRoleId: [null],
    isActive: true,
    createdBy: [''],
    updatedBy: [''],
    createdDate: [''],
    updatedDate: [''],
    premissions: this.formBuilder.array([]),
  });
  this.buttonName = this.commonEnum.SAVE;
  this.processing = false;
  this.submitted = false;
  if (!this.appService.checkNullOrUndefined(this.currentUser)) {
    this.roleForm.get('createdBy').patchValue(this.currentUser.userId);
    this.roleForm.get('updatedBy').patchValue(this.currentUser.userId);
    this.roleForm.get('createdDate').patchValue(new Date());
    this.roleForm.get('updatedDate').patchValue(new Date());
  }

}
get formControls() {
  return this.roleForm.controls;
}

get permissions(): FormArray {
  return this.roleForm.get('premissions') as FormArray;
}
addPermission(val): void {
  if (!this.appService.checkNullOrUndefined(val)) {
    this.permissions.push(
      new FormControl(val));
  }
}
removePermission(id: number): void {
  var ind = this.permissions.value.findIndex(x => x == id);
  this.permissions.removeAt(ind);
}

// On Permissions toggle change
  onToggleChange(event, row, permissions, index) {
    if (event.target.checked == true) {
      this.addPermission(row.id);
      var obj = permissions.find(x => x.id == row.id);
      obj.isEnabled = true;
      const allSelected = permissions.every(permission => permission.isEnabled);

      if (allSelected) {
        permissions.forEach(element => {
          element.isSelectAll = true
        });
      }

    } else {
      this.removePermission(row.id)
      var obj = permissions.find(x => x.id == row.id);
      obj.isEnabled = false;

      permissions.forEach(element => {
        element.isSelectAll = false
      });

    }
  }

onToggleSelectAll(event,row)
{
  if (event.target.checked == true) {

    for(var obj of row)
    {
      this.addPermission(obj.id);
      obj.isEnabled = true;
      obj.isSelectAll =true;
    }

   
  } else {
    
    for(var obj of row)
    {
      this.removePermission(obj.id);
      obj.isEnabled = false;
      obj.isSelectAll =false;
    }
  
  }
}



rolesData() {
  this.parentRoleList = [];
  this.parentRoleCopyList = [];
  let url = USER_ROLES.getAllRoles + '/' + null;
  this.commonService.commonApiCall(
    url,
    HttpMethod.GET,
    null,
    (res, statusFlag) => {
      // console.log(res);

      if (statusFlag) {
        this.parentRoleList = res.listResult;
        this.parentRoleCopyList = res.listResult;

      }
      // this.spinner.hide();
    }
  );
}

  // To get all permissions
  getAllPermissions() {
    this.activityRights=[];
    var Id = null;
    var url = USER_ROLES.getActivityRights;
    this.commonService.commonApiCall(
      url + '/' + Id,
      HttpMethod.GET,
      null,
      (res, statusFlag) => {
        if (statusFlag) {
         var obj = res.listResult == null ? [] :  res.listResult.map(function (ele) {
            ele.isEnabled = false;
            ele.isSelectAll =false;
          });
          this.activityRights= res.listResult;
          
        }
      }
    );
  }


getRowActivityRightsByRole(Id) {
  this.rolePermisonsList=[];
  var url = USER_ROLES.getActivityRightsByRole;
  this.commonService.commonApiCall(
    url + '/' + Id,
    HttpMethod.GET,
    null,
    (res, statusFlag) => {
      if (statusFlag) {
        this.rolePermisonsList = res.listResult == null ? [] : res.listResult;
      }
    });
}


  // To get ActivityRights by Role
  getActivityRightsByRole(Id) {
    this.rolePermisonsList = [];
    var url = USER_ROLES.getActivityRightsByRole;
    this.commonService.commonApiCall(
      url + '/' + Id,
      HttpMethod.GET,
      null,
      (res, statusFlag) => {
        if (statusFlag) {
          this.rolePermisonsList = res.listResult == null ? [] : res.listResult;
          this.rolePermisonsList.forEach((obj) => {
            // this.selectedRights.push(obj.id)
            this.addPermission(obj.id);
          })
          this.activityRights.forEach((obj) => {
            this.rolePermisonsList.forEach(function (ele) {
              if (obj.id == ele.id) {
                obj.isEnabled = true;
                obj.isSelectAll=false;
              }
            });
          });
         
                
          // Assuming activityRights is a flat list of permissions
          const uniqueGroups = Array.from(new Set(this.activityRights.map(permission => permission.groupName)));

          uniqueGroups.forEach(groupName => {
          const groupPermissions = this.activityRights.filter(permission => permission.groupName === groupName);

          const allEnabledInGroup = groupPermissions.every(permission => permission.isEnabled);
            if(allEnabledInGroup)
            {
              groupPermissions.forEach(function (ele) {
              ele.isSelectAll = true;
              });
            }

          });


        }
        else{
          this.activityRights.forEach((obj) => {
         
                obj.isEnabled = false;
                obj.isSelectAll=false;
          });
          this.permissions.clear();
        }
      }
    );

  }



  getUserRoles()
  {
    this.rolesInfoList=[];
    let url=USER_ROLES.getAllRoles;
    this.commonService.commonApiCall(
      url+null,
      HttpMethod.GET,
      null, (result, statusFlag) => {
        if (statusFlag) {
          if (result) {
            if (!this.appService.checkNullOrUndefined(result.listResult)) {
            this.rolesInfoList=result.listResult
            }

          }
        }

      }
    );
  }


  onAddClick() {
    this.showForm= true;
    this.buildForm();
    this.activityRights.forEach((obj) => {
      obj.isEnabled = false;
      obj.isSelectAll= false;
    });
  }
  onAddCancel(){
    this.showForm = false;
  }

  onEditRole(item)
  {
    this.showForm = true;
    this.buildForm();
    this.buttonName = CommonEnum.UPDATE;
    if (item !== undefined) {
      this.roleForm.patchValue(item);
      this.permissions.value.length = 0;
      this.parentRoleList =this.parentRoleCopyList.filter(x=>x.id != item.id);
      
      if (!this.appService.checkNullOrUndefined(this.currentUser)) {
        this.roleForm.get('updatedBy').patchValue(this.currentUser.userId);
        this.roleForm.get('updatedDate').patchValue(new Date());
      }
      this.getActivityRightsByRole(item.id);
    }
  }




  onSubmit(type) {
    this.submitted = true;
    this.processing = true;
    if (!this.roleForm.valid) {
      this.alertService.showMessage(
        AlertInfo.ERROR,
        CommonEnum.MANDOTORY_FIELDS
      );

      this.processing = false;
      return;
    }

    if (this.permissions.length == 0) {
      this.alertService.showMessage(
        AlertInfo.ERROR,
        CommonEnum.PERMISSIONS_REQUIRED
      );

      this.processing = false;
      return;
    }

    let url;
    this.processing = true;
    if (type == this.commonEnum.SAVE) {
      url = USER_ROLES.addRole;
      this.commonService.commonApiCall(
        url,
        HttpMethod.POST,
        this.roleForm.getRawValue(),
        (res, statusFlag) => {
          if (statusFlag) {
            this.onAddCancel();
            this.getUserRoles();
          }
          this.processing = false;
        }
      );
    } else if (type == this.commonEnum.UPDATE) {
      url = USER_ROLES.updateRole;
      this.commonService.commonApiCall(
        url,
        HttpMethod.POST,
        this.roleForm.getRawValue(),
        (res, statusFlag) => {
          if (statusFlag) {
            this.onAddCancel();
            this.getUserRoles();
          }
          this.processing = false;
        }
      );
    }


  }
  


    onDelete(item)
    {
      let deleteMessage="Role Deactivate Successfully"
      let message = item.isActive ? CommonEnum.DEACTIVATE : CommonEnum.ACTIVATE;
      this.alertService.displayDailog(message, (result) => {
        if (result) {
          const url = USER_ROLES.deleteRole+'?id='+item.id;
          
          this.commonService.commonApiCall(
            url,
            HttpMethod.GET,
            null,
            (res, statusFlag) => {
              if (statusFlag) {   
                this.alertService.showMessage(AlertInfo.SUCCESS,deleteMessage);            
                this.getUserRoles();
              }
            }
          );
        }
      });
    }


  

}
