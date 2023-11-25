import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TradeMaintanceService } from '../trade-maintance.service';
import { ActivatedRoute } from '@angular/router';
import {first} from 'rxjs/operators'

@Component({
  selector: 'app-create-trade-group',
  templateUrl: './create-trade-group.component.html',
  styleUrls: ['./create-trade-group.component.css']
})
export class CreateTradeGroupComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  tradeGroupId:number

  constructor(
    private formBuilder: FormBuilder,
    private tradeService: TradeMaintanceService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.tradeGroupId = this.route.snapshot.params['id']
    console.log(this.tradeGroupId)
    if(this.tradeGroupId != -1)
    {
      this.tradeService.retriveTradeGroup(this.tradeGroupId)
      .pipe(first())
      .subscribe(data => {
        this.registerForm.patchValue(data)
      })
    }

    this.registerForm = this.formBuilder.group({
      tradeGroupName: ['', Validators.required]
    })
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
      console.log("Id==");
      console.log(this.registerForm.value)

      if(this.tradeGroupId === -1)
      {
        this.tradeService.createTradeGroup(this.registerForm.value)
        .subscribe(data => {
          console.log(data)
        })
      }else{
        this.tradeService.updateTradeGroup(this.registerForm.value, this.tradeGroupId)
        .subscribe(data => {
          console.log('updates')

        })
      }
     
    }

}
