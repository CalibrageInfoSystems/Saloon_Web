import { Injectable } from "@angular/core";

@Injectable()
export class Utilities {
  public static readonly captionAndMessageSeparator = ':';
  public static readonly noNetworkMessageCaption = 'No Network';
  public static readonly noNetworkMessageDetail = 'The server cannot be reached';
  public static readonly accessDeniedMessageCaption = 'Access Denied!';
  public static readonly accessDeniedMessageDetail = '';
  public static readonly notFoundMessageCaption = 'Not Found';
  public static readonly notFoundMessageDetail = 'The target resource cannot be found';


  public static GetObjectWithLoweredPropertyNames(obj: any) {
    const loweredObj = Object.keys(obj).reduce((newObj, k) => {
      newObj[k.toLowerCase()] = obj[k];
      return newObj;
    }, {});

    return loweredObj;
  }
}