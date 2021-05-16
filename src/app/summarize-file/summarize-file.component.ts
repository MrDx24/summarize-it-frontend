import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {formatDate } from '@angular/common';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-summarize-file',
  templateUrl: './summarize-file.component.html',
  styleUrls: ['./summarize-file.component.css']
})
export class SummarizeFileComponent implements OnInit {

  fileLinkForm: FormGroup;
  data:string
  sample: any
  tot_time: string
  today = new Date()
  fileToUpload: File = null;
  fileSize:any
  flag:boolean

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.fileLinkForm = this.fb.group({
      fileLink: ['', Validators.required],

    });
  }

  summaryfile(){
    this.flag=true
    const formData: FormData = new FormData();
    formData.append('file', this.fileToUpload, this.fileToUpload.name);
    console.log(formData)
    this.http.post('https://summarize-it-backend.herokuapp.com/summaryFile', formData).subscribe((response: any) => {

      // console.log("Done");
      // console.log("Data response from server : ",response.data)
      this.flag=false
      this.data=response.data
      this.tot_time=response.tot_time
      // console.log("Time from the server : ",response.tot_time)
      this.createNotification("success",
      "Success",
      "Summary generated successfully.");

    }, (error) => {
      console.log(error);
      this.createNotification("error",
      "Error",
      "There is an error in generating summary, please try again later.");
      // console.log("Not done")
    });

  }

  // download(){
  //   console.log("Done")
  //   // this.postFile(this.fileToUpload);
  // }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  download(){
    const documentDefinition = {
      content: [
        {
          text: 'Summarization method selected : ',
          style: 'header'
        },
        'By uploading a file\n\n',
        {
          text: 'Date & Time : '+ formatDate(this.today, 'dd-MMM-yyyy & hh:mm:ss a', 'en-US', '+0530')+'\n\n',
          style: 'contents'
        },
        {
          text: 'Original Input : ',
          style: 'subheader'
        },
        {
          text: "Filename : "+this.fileToUpload.name+'\n\n',
          style: 'contents'
        },
        {
          text: 'Output Summary : ',
          style: 'subheader'
        },
        {
          text: this.data + '\n\n',
          style: ['contents']
        },
        {
          text: 'This sumarization is done using Summarize-IT',
          style: ['quote', 'small']
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true
        },
        subheader: {
          fontSize: 15,
          bold: true
        },
        contents: {
          fontSize: 12,
          alignment:"justify"
        },
        quote: {
          italics: true
        },
        small: {
          fontSize: 8
        }
      }

    };
    pdfMake.createPdf(documentDefinition).open();
    console.log("pdf generated!!!!")
  }

  createNotification(type: string, title, message): void {
    this.notification.create(
      type,
      title,
      message,
      {
        nzStyle:{
          marginTop: '100px'
        }
      }
    );
  }



  get fileLink() {
    return this.fileLinkForm.get('fileLink');
  }

}
