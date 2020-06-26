import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType, HttpHeaderResponse, HttpHeaders } from  '@angular/common/http';  
import { map } from  'rxjs/operators';
import { sha256 } from 'js-sha256'


@Injectable({
  providedIn: 'root'  
})
export class UploadService {

	SERVER_URL: string = "http://localhost:8080/EDMS_FN_REST/operations/v1/uploadFile";  
  constructor(private httpClient: HttpClient) { }

  public upload(formData: FormData) {
    function createHash(key:string, requester:string, operation:string) {
      function pad2(n) { return n < 10 ? '0' + n : n }
      var now = new Date();
      // yyyyMMddHHmmss
      var dateStr = (now.getFullYear().toString() + pad2(now.getMonth() + 1) + pad2(now.getDate())
        + pad2(now.getHours()) + pad2(now.getMinutes()) + pad2(now.getSeconds()));
      var raw = requester.toUpperCase() + operation.toUpperCase() + dateStr.slice(-3) + key;
      var hash = sha256.create();
      hash.update(raw)

      return {
        requester: requester,
        timeStamp: dateStr,
        hashKey: hash.hex()
      }
    }

      var hash = {
        requester: 'BRS',
        timeStamp: '20200623115325',
        hashKey: '3d7850d7b3692edde7e59a7be5d18eafd7c0718027315cf53f40a192e4171642'
      };

      hash = createHash('b7e5f191-7893-04d0-7547-b2F31591e', 'BRS', 'filenetAddDocument')

    return this.httpClient.post<any>(this.SERVER_URL, formData, {
      headers: new HttpHeaders({
        ... hash,
        DocumentClass: 'AccountOpening'
      })
    }).subscribe(
          res => {
            console.log(res);
          }
    );;
  }
}