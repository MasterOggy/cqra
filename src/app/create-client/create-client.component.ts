import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ClientData } from '../client/client.component';
import { ClientServiceService } from '../service/client-service.service';
@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {
  form!: FormGroup;
  id:number;
  clientData: ClientData;
  registerForm: FormGroup;
    submitted = false;
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,private router: Router,private clientServiceService:ClientServiceService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    if(this.id!=-1) {
      this.clientServiceService.retrieveClient(this.id)
      .pipe(first())
      .subscribe(x => this.registerForm.patchValue(x));
    }

    this.registerForm = this.formBuilder.group({
      clientName: ['', Validators.required],
      clientCode: ['', Validators.required],
      clientEmail: ['', [Validators.required, Validators.email]],
      clientAddress: ['', [Validators.required, Validators.minLength(6)]],
      clientContactPerson: ['', [Validators.required]],
      clientContactNumber: ['', Validators.required]

    });
  }
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;
      // stop here if form is invalid
      console.log(this.registerForm.value);
      if (this.registerForm.invalid) {
          return;
      }
      console.log("Id=="+this.id);
      if(this.id == -1) {
      this.clientServiceService.createClient(this.registerForm.value)
      .subscribe( data => {
        this.router.navigate(['client']);
      });
    } else {
      this.clientServiceService.updateClient(  this.registerForm.value,this.id)
      .subscribe (
        data => {
          console.log(data)
          this.router.navigate(['client'])
        }
      )
    }

      //this.clientServiceService.createClient(JSON.stringify(this.registerForm.value);
      console.log('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
  }

}
