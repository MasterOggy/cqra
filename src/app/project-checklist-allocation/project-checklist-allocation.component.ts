import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TradeMaintanceService } from '../trade-maintance.service';
import { Trade } from '../trade/trade.component';
import { supportsScrollBehavior } from '@angular/cdk/platform';
import { SubgroupView } from '../subgroup/subgroup.component';
import { CheckListView } from '../edit-non-conf/edit-non-conf.component';
import { ClientServiceService } from '../service/client-service.service';
@Component({
  selector: 'app-project-checklist-allocation',
  templateUrl: './project-checklist-allocation.component.html',
  styleUrls: ['./project-checklist-allocation.component.css']
})
export class ProjectChecklistAllocationComponent implements OnInit {

  configureForm: FormGroup
  projectId: number
  trades: Trade
  SelTrade: any
  SelSubgroup: any
  subgroups: SubgroupView
  checklists: CheckListView
  submitted: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private tradeService: TradeMaintanceService,
    private clientService: ClientServiceService
  ) { }

  ngOnInit() {
    this.projectId = this.route.snapshot.params['id']
    this.configureForm = this.formBuilder.group({
      pkTradeId: ['', Validators.required],
      pkSubgroupId: ['', Validators.required],
      checklistId: ['', Validators.required],
    })

    this.tradeService.getProjectTrades(this.projectId)
      .subscribe(data => {
        console.log(data)
        this.trades = data
      })

  }

  get f() { return this.configureForm.controls; }


  getSubgroups() {
    this.tradeService.getSubgroupsByTrades(this.SelTrade)
      .subscribe(data => {
        console.log(data)
        this.subgroups = data
      })
  }

  getChecklist() {
    this.tradeService.getChecklistBySubgroupId(this.SelSubgroup)
      .subscribe(data => {
        console.log(data)
        this.checklists = data
      })
  }

  onSubmit() {

    let checklistIds = this.configureForm.value.checklistId
    let finalArray = checklistIds.map((id) => {
      return {
        ...this.configureForm.value,
        checklistId: id,
        schemeId: this.projectId
      }
    })

    console.log(finalArray)
    this.clientService.projectChecklistAlloaction(finalArray)
    .subscribe(data => console.log('checklist Aloocated-->', data))
  }
}
