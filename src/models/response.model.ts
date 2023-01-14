interface resMsg {
  success: boolean;
  data: any;
}

export class ResponseMessage {
  public success: boolean 
  public data: any

  constructor(data: resMsg) {
    this.success = data.success;
    this.data = data.data;
  }
}