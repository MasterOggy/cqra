import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientData } from '../client/client.component';
import { ClientServiceService } from '../service/client-service.service';

@Component({
  selector: 'app-create-kickoff',
  templateUrl: './create-kickoff.component.html',
  styleUrls: ['./create-kickoff.component.css']
})
export class CreateKickoffComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  SelProject:string="0"; 
  SelClient:string="0"; 
  clients:ClientData[]
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,private router: Router,private clientServiceService:ClientServiceService) { }

  ngOnInit() {
    this.clientServiceService.getAllClients().subscribe((data) => {
      console.log('----> office service : get all data', data);
      this.clients= data;
    }, (err) => {
      console.log('-----> err', err);
    })
  }
  get f() { return this.registerForm.controls; }

  onSubmit() {
      console.log("Id==");
  }

}