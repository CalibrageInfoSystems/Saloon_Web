import { environment } from "src/environments/environment";

let url = environment.baseUrl; /* + '/Api/' */
// let url = '/api/';
export const USER_ACCOUNT = {
    //Login
    login: url + '/ValidateUserData',
    getUsers:url+'/GetUserData?id=/',
    getRoles:url+'Account/GetAllRoles/',
    activeUsersList:url+'Account/GetActiveUsers/',
    addUser:url+'/Register',
    updateUser:url+'/UpdateUser',
    userDelete:url+'Account/DeleteUserById',
    userForgotPassword:url+'Account/ForgotPassword',
    userResetPassword:url+'Account/ResetPassword',
    userChangePassword:url+'Account/ChangePassword',
    accountActivation: url + 'Account/AccountActivation',
    getCompanyList: url + 'Account/GetCompanies/',
}

export const USER_ROLES = {
    //Get Roles
    getAllRoles: url + 'Account/GetAllRoles/',
    getActivityRightsByRole:url+'ActivityRight/GetActivityRightsByRoleId/',
    getActivityRights:url+'ActivityRight/GetActivityRights/',
    addRole:url+'Account/AddRole',
    updateRole:url+'Account/UpdateRole',
    deleteRole:url+'Account/DeleteRole'
}

export const VIEW_COLLECTIONS = {
    //Get Collection
    getSalesPersons: url + 'Account/GetSalesPersonsByState/',
    getDealersBySlpCode : url + 'Account/GetDealersBySlpCode',
    getAllCollectionDataSearch : url + 'Collections/GetAllCollectionDataSearch',
    getStates : url + 'Collections/GetStates/',
    updateCollectionStatus : url + 'Collections/UpdateCollectionStatus'
}

export const MASTER_URLS ={
    getAllTypeCdDmt: url + 'Master/GetAllTypeCdDmt/',
}

export const ORDER_URLS = {
    getOrdersBySearch: url + 'Order/GetOrdersBySearch',
    updateOrderStatus : url + 'Order/UpdateOrderStatus',
    uploadFileDataInfo : url + 'Order/UploadFileDataInfo',
    getOrderDetailsById : url + 'Order/GetOrderDetailsById/'
}
