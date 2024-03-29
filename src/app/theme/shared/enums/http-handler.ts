export enum HttpMethod {
  POST = 'Post',
  PUT = 'Put',
  DELETE = 'Delete',
  GET = 'Get',
  LOGIN_POST = 'LoginPost',
  FORM_POST = 'Form-Post',
  FORM_PUT = 'Form-Put',
}

export enum AlertInfo {
  QUESTION = 'question',
  INFO = 'info',
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning'
}

export enum CommonEnum  {
  YES= 'Yes',
  NO= 'No',
  MANDOTORY_FIELDS= 'Mandatory Fields Are Required With  Valid Data.',
  ACTIVE= "Active",
  INACTIVE= "InActive",
  CREATE='Add',
  SAVE= "Save",
  UPDATE= "Update",
  PROCESSING="Proccesing...",
  DEACTIVATE= 'Are you sure you want to Deactivate?',
  DELETE= 'Are You Sure You Want To Delete?',
  REMOVE= 'Are You Sure You Want To Remove?',
  ACTIVATE= 'Are you sure you want to Activate?',
  PERMISSIONS_REQUIRED='Atleast one permission is required',
  MAX_FILESIZE= 'Allowed file size is max: 10240 KB',
}

export enum Appconfig {
  CURRENTUSER ='current_user',
  COMPANYID ='company_id'
}

export class DialogRequest {
  dialogData?: any;
  header?: string;
  width?: string;
}

