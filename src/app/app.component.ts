import { Component, VERSION, ViewChild, ElementRef } from '@angular/core';
import { UploadService } from  '../upload.service';
import { catchError, map } from 'rxjs/operators';  
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';  

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  @ViewChild('fileInput') fileInput: ElementRef;


  name = 'Angular ' + VERSION.major;
   
  constructor(private uploadService: UploadService) { }

  onClick() {  
    const formData = new FormData();  
    var content = 'This is a test'; 
    var blob = new Blob([content], { type: "text/plain"});
    

    formData.append('file', this.fileInput.nativeElement.files[0] || blob);
    formData.append("DocumentTitle", 'sample.txt')
    this.uploadService.upload(formData);



  }
}
