import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-summarize-url',
  templateUrl: './summarize-url.component.html',
  styleUrls: ['./summarize-url.component.css']
})
export class SummarizeUrlComponent implements OnInit {


  urlLinkForm: FormGroup;
  data:string
  sample: any
  today= new Date();
  tot_time: string
  flag:boolean

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,

    ) { }




  ngOnInit(): void {
    this.urlLinkForm = this.fb.group({
      urlLink: ['', [Validators.required, Validators.pattern('((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)')]],

    });
  }

  summaryUrl(){
    this.flag=true
    this.sample = {"dataUrl":this.urlLink.value}
    console.log("sample: ", this.sample)
    this.http.post('https://summarize-it-backend.herokuapp.com/summaryUrl', this.sample).subscribe((response: any) => {

      console.log("Done");
      console.log(response.data)
      this.flag=false
      this.data=response.data
      this.tot_time=response.tot_time
      console.log(response.tot_time)


    }, (error) => {

      console.log(error);
      console.log("Not done")
      


    });
  }

  // download(){
  //   console.log("Done")
  // }

  download(){
    const documentDefinition = {
      content: [
        {
          text: 'Summarization method selected : ',
          style: 'header'
        },
        'By pasting URL-link\n\n',
        {
          text: 'Date & Time : '+ formatDate(this.today, 'dd-MMM-yyyy & hh:mm:ss a', 'en-US', '+0530')+'\n\n',
          style: 'contents'
        },
        {
          text: 'Original Input : ',
          style: 'subheader'
        },
        {
          text: this.urlLinkForm.value['urlLink']+'\n\n',
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




  get urlLink() {
    return this.urlLinkForm.get('urlLink');
  }


}
