import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { CommonService } from '../common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientServiceService } from '../service/client-service.service';
import { SupervisorData } from '../contractor-supervisor/contractor-supervisor.component';
import { FormanData } from '../contractor-forman/contractor-forman.component';

export class ContractorData {
  constructor(
    public contractorId: number,
    public contractorName: string,
    public contarctorAddress: string,
    public contarctorEmail: string,
    public contarctorPhone: string,
    public isActive: boolean
  ) { }
}

@Component({
  selector: 'app-contractor',
  templateUrl: './contractor.component.html',
  styleUrls: ['./contractor.component.css']
})
export class ContractorComponent implements OnInit {

  title = 'datatables'
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<ContractorData> = new Subject();

  dtElementSup: DataTableDirective;
  dtOptionsSup: DataTables.Settings = {};
  dtTriggerSup: Subject<SupervisorData> = new Subject();
  // submitted = false;
  contractors: ContractorData[]
  supervisorForm: FormGroup
  foremanForm: FormGroup
  isLoading = true;
  isDataLoad = false;
  contractorId: number = 0
  supervisors: SupervisorData
  foremans: FormanData
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private clientService: ClientServiceService
  ) { }


  ngOnInit() {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthMenu: [10, 25, 50]
    };

    this.commonService.getAllContractors().subscribe((data) => {
      console.log('----> office service : get all data', data);
      this.contractors = data;
      this.dtTrigger.next();
      this.isLoading = false

    }, (err) => {
      console.log('-----> err', err);
    })

    this.supervisorForm = this.formBuilder.group({
      supervisorName: ['', Validators.required]
    })
    this.foremanForm = this.formBuilder.group({
      foremanName: ['', Validators.required]
    })

  }

  editContractor(id) {

    this.router.navigate(['createContractor', id])

  }

  deleteContractor(id) {
    const isdelete = confirm('Are sure want to delete ?')
    if (isdelete) {
      this.clientService.deactiveContractor(id)
        .subscribe(
          data => {
            console.log('deActivated !')
            location.reload()
          },
          err => console.log(err)
        )
    }
  }
  changeContractorId(id) {
    this.contractorId = id
  }
  addSupervisor() {
    this.supervisorForm.value.contractorId = this.contractorId
    this.supervisorForm.value.isActive = true

    this.clientService.createSupervisor(this.supervisorForm.value)
      .subscribe(data => console.log('added--->', data))
    // console.log(data)
  }

  getSupervisors(contractorId) {
    this.isDataLoad = true
    this.clientService.getSupervisorByContractorId(contractorId)
      .subscribe(data => {
        this.isDataLoad = false
        // this.dtOptionsSup = {
        //   pagingType: 'full_numbers',
        //   pageLength: 10,
        //   lengthMenu: [10, 25, 50]
        // };
        console.log(data)
        // subject.subscribe()
        this.supervisors = data
        // this.dtTriggerSup.next()
      })
  }


  addForeman() {

    this.foremanForm.value.contractorId = this.contractorId
    this.foremanForm.value.active = true

    this.clientService.createFormeman(this.foremanForm.value)
      .subscribe(data => console.log('foreman added--->', data))
  }

  getForemans(id) {
    this.isDataLoad = true
    this.clientService.getForemanByContractorId(id)
      .subscribe(data => {
        this.isDataLoad = false
        this.foremans = data
        console.log(data)
        // this.dtTrigger.next()

      })
      
  }



}
