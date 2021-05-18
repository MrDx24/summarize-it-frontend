import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {formatDate } from '@angular/common';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-my-summarizer',
  templateUrl: './my-summarizer.component.html',
  styleUrls: ['./my-summarizer.component.css']
})
export class MySummarizerComponent implements OnInit {

  mainForm: FormGroup;
  data:string
  tot_time:string
  //placement = 'topRight';
  sample:boolean;
  selectedMethod: string
  today= new Date();
  todaysDataTime = '';
  flag:boolean

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,

  ) { }

  ngOnInit() {
    this.mainForm = this.fb.group({
      ogstr: ['', Validators.required],

    });
  }

  summary() {
    this.flag=true
    console.log(this.mainForm.value)
    this.http.post('https://summarize-it-backend.herokuapp.com/summary', this.mainForm.value).subscribe((response: any) => {

      this.flag=false
      // console.log(response.data);
      this.data = response.data;
      this.tot_time = response.tot_time
      // console.log(response.tot_time)
      this.sample=true
      //alert('Summarization Successful');
      //this.onCreateUpdate();


    }, (error) => {

      // console.log(error);
      this.sample=false
      //alert('Summarization not Successful');

    });
  }



  download(){
    const documentDefinition = {
      content: [
        {
          text: 'Summarization method selected : ',
          style: 'header'
        },
        'Text pasted in textarea\n\n',
        {
          text: 'Date & Time : '+ formatDate(this.today, 'dd-MMM-yyyy & hh:mm:ss a', 'en-US', '+0530')+'\n\n',
          style: 'contents'
        },
        {
          text: 'Original Input : ',
          style: 'subheader'
        },
        {
          text: this.mainForm.value['ogstr']+'\n\n',
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

  selectHandler(event: any){
    this.selectedMethod = event.target.value;
    console.log(this.selectedMethod)
  }



  get ogstr() {
    return this.mainForm.get('ogstr');
  }




}
