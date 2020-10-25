import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Config} from '../../_configs/config';

@Injectable({
  providedIn: 'root'
})
export class ContactusService {

  constructor(private http: HttpClient) { }

  public sendMessage(model: ContactUsOutModel) {
    return this.http.post(`${Config.apiUrl}/contactus`, model);
  }
}

export class ContactUsOutModel{
  public firstName: string;
  public email: string;
  public subject: string;
  public message: string;

}
