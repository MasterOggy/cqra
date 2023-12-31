import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Checklist } from './checklist/checklist.component';
import { ProjectData, ProjectView } from './project/project.component';
import { QuestionGroup } from './question-group/question-group.component';
import { Question } from './question/question.component';
import { Trade } from './trade/trade.component';
import { ContractorData } from './contractor-forman/contractor-forman.component';
import { UserView } from './users/users.component';
import { StageData, StructureData } from './wbs/wbs.component';
import { FirstNote } from './manualIndexCalulator/firstNote/first-note/first-note.component';
import { RegionList, CycleOfInspection } from './ncclosure-sa/ncclosure-sa.component';
import { UserLogDataView } from './user-log/user-log.component';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { NcCountReportData } from './nc-count-report/nc-count-report.component';
import { QualityIndexReport } from './quality-index-report/quality-index-report.component';
import { InspectionReport } from './creaate-inspectionreport/creaate-inspectionreport.component';
import { SnaggingReportView } from './create-snagging-document/create-snagging-document.component';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  // private REST_API_SERVER = "http://18.217.108.137:9090";//working IP Address
  private REST_API_SERVER = "http://localhost:9090"; //local IP For Testing
  //private REST_API_SERVER = "http://18.217.108.137:8080";
  constructor(private httpClient: HttpClient) { }

  getClientProject(id){
    return this.httpClient.get<ProjectData[]>(this.REST_API_SERVER+`/common/ClientProjects/${id}`);
  }

  getStructures(clientId,projectId){
    return this.httpClient.get<StructureData[]>(this.REST_API_SERVER+`/common/getSelectedStructure/${clientId}/${projectId}`);
  }

  getStages(clientId,projectId,structureId){
    return this.httpClient.get<StageData[]>(this.REST_API_SERVER+`/common/getSelectedStages/${clientId}/${projectId}/${structureId}`);
  }

  getUnits(clientId,projectId,structureId,stageId){
    return this.httpClient.get<StageData[]>(this.REST_API_SERVER+`/common/getSelectedUnits/${clientId}/${projectId}/${structureId}/${stageId}`);
  }

  getSubUnit(clientId,projectId,structureId,stageId,unitId){
    return this.httpClient.get<StageData[]>(this.REST_API_SERVER+`/common/getSelectedSubUnits/${clientId}/${projectId}/${structureId}/${stageId}/${unitId}`);
  }
  getRegionalManagers(){
    return this.httpClient.get<UserView[]>(this.REST_API_SERVER+`/user/getAllRegionalManager`);
  }
  getUsers(){
    return this.httpClient.get<UserView[]>(this.REST_API_SERVER+`/user/getAllusers`);
  }

  getProjects(userId){
    return this.httpClient.get<ProjectView[]>(this.REST_API_SERVER+`/user/getAllRproject/${userId}`);
  }
  
  getTrades(projectId,structureId){
    return this.httpClient.get<Trade[]>(this.REST_API_SERVER+`/common/getAllTrades/${projectId}/${structureId}`);
  }

  getChecklists(userId,tradeId){
    return this.httpClient.get<Checklist[]>(this.REST_API_SERVER+`/common/getAllChecklists/${userId}`);
  }
  getChecklistsByTrade(tradeId){
    return this.httpClient.get<Checklist[]>(this.REST_API_SERVER+`/findbytradeid/${tradeId}`);
  }

  getQuestionGroup(userId){
    return this.httpClient.get<QuestionGroup[]>(this.REST_API_SERVER+`/common/getAllQuestionGroup/${userId}`);
  }

  getQuestion(userId,questionGroup){
    return this.httpClient.get<Question[]>(this.REST_API_SERVER+`/common/getAllQuestion/${userId}/${questionGroup}`);
  }

  getAllProject(){
    return this.httpClient.get<ProjectData[]>(this.REST_API_SERVER+`/project/getAllProjects`);
  }

  getAllContractors(){
    return this.httpClient.get<ContractorData[]>(this.REST_API_SERVER+`/getContractors`);
  }

  getProjectTrades(projectId){
    return this.httpClient.get<Trade[]>(this.REST_API_SERVER+`/common/getProjectTrades/${projectId}`);

  }

  getTrade(clientId,projectId,structureId){
    return this.httpClient.get<Trade[]>(this.REST_API_SERVER+`/common/getProjectAllTrades/${projectId}/${structureId}`);
  }

  getContractors(clientId,projectId,structureId,tradeId){
    return this.httpClient.get<Trade[]>(this.REST_API_SERVER+`/common/getProjectAllContractors/${projectId}/${structureId}/${tradeId}`);
  }

  getApprovers(){
    return this.httpClient.get<UserView[]>(this.REST_API_SERVER+`/common/getAllApprover`);
  }

  getReviewer(){
    return this.httpClient.get<UserView[]>(this.REST_API_SERVER+`/common/getAllReviwer`);
  }

  getCreater(){
    return this.httpClient.get<UserView[]>(this.REST_API_SERVER+`/common/getAllCreater`);
  }

  getQuestionByTrade(tradeId, groupId)
  {
    return this.httpClient.get<Question[]>(this.REST_API_SERVER+`/question/question/${tradeId}/${groupId}`);
    
  }
 
  getContractorsList(){
    return this.httpClient.get<ContractorData[]>(this.REST_API_SERVER+`/getContractors/`);
  }
  getContractorsById(id){
    return this.httpClient.get<ContractorData[]>(this.REST_API_SERVER+`/contractor/107`);
  }

  getAllUsers(){
    return this.httpClient.get<UserView[]>(this.REST_API_SERVER+'/user/getAllusers');
  }

  getAllFirstNotes()
  {
    return this.httpClient.get<FirstNote[]>(this.REST_API_SERVER+'/getfirstNotes')
  }

  getAllRegions()
  {
    return this.httpClient.get<RegionList[]>(`${this.REST_API_SERVER}/getRegions`)
  }

  getAllCycleOfInspection()
  {
    return this.httpClient.get<CycleOfInspection[]>(`${this.REST_API_SERVER}/getCycleOfInspections`)
  }

  getNcClosedSAReport(region, project, cycle, trade, status)
  {
    return this.httpClient.get<CycleOfInspection[]>(`${this.REST_API_SERVER}/getCycleOfInspections`)

  }


  //USer log
  getUserLogData(id){
    return this.httpClient.get<UserLogDataView[]>(`${this.REST_API_SERVER}/getCountViews/${id}`)

  }

  getUserLogAnswers(data): Observable<CommonService>{
    return this.httpClient.post<CommonService>(`${this.REST_API_SERVER}/getarrayy`, data);
    
  }

  addCheckList(data): Observable<CommonService>{
    return this.httpClient.post<CommonService>(`${this.REST_API_SERVER}/checklist/adddatalist`, data);
    
  }


  //REPORT API CALL
  //NC COUNT API CALL
getNcCountReports(){
  return this.httpClient.get<any>(`${this.REST_API_SERVER}/getAllnccount`)
}

  createNcCountReport(data): Observable<CommonService>{
    return this.httpClient.post<CommonService>(`${this.REST_API_SERVER}/NcCount`, data)
  }

  retirveNcCountReport(id){
    return this.httpClient.get<NcCountReportData>(`${this.REST_API_SERVER}/NcCount/${id}`)
  }

  updateNcCountReport(data, id){
    return this.httpClient.put(`${this.REST_API_SERVER}/NcCount/${id}`, data)
  }

  //QUALITY INDEX REPORT
  createQualityIndexReport(data): Observable<CommonService>{
    return this.httpClient.post<CommonService>(`${this.REST_API_SERVER}/QualityIndex/addQualityIndex`, data)
  }

  retriveQualityIndexReport(id){
    return this.httpClient.get<QualityIndexReport>(`${this.REST_API_SERVER}/QualityIndex/QualityIndexx/${id}`)
  }

  updateQualityINdexReport(data, id){
    return this.httpClient.put(`${this.REST_API_SERVER}/QualityIndex/QualityIndex/${id}`, data)
  }
  

  //NEW API FOR STRUCURES AND STAGE GET
  getStructureByProjectId(id){
    return this.httpClient.get<StructureData[]>(`${this.REST_API_SERVER}/structure/getSelectedStructure/${id}`)
  }

  getStagesByStructureId(id){
    return this.httpClient.get<StageData[]>(`${this.REST_API_SERVER}/stage/getstagebystructure/${id}`)

  }

  

  //INSPECTION REPORT CRUD API CALL
  createInspectionReport(data):Observable<CommonService>{
    return this.httpClient.post<CommonService>(`${this.REST_API_SERVER}/addminspectrep`,data)
  }

  retriveInspectionReport(id){
    return this.httpClient.get<InspectionReport>(`${this.REST_API_SERVER}/getInspectDataByReportId/${id}`)
  }

  updateInspectionReport(data, id){
    return this.httpClient.put(`${this.REST_API_SERVER}/updateminspectrep/${id}`, data)
  }
  


//SANGGING REPORT
  createSnaggingReport(data): Observable<CommonService>{
    return this.httpClient.post<CommonService>(`${this.REST_API_SERVER}/addSnaggingMul`, data)
  }

  getSnaggingReport(id){
    return this.httpClient.get<SnaggingReportView>(`${this.REST_API_SERVER}/getSnaggingMul/${id}`)
  }

  updateSnaggingReport(data, id){
    return this.httpClient.put(`${this.REST_API_SERVER}/updateSnaggingMul/${id}`, data)
  }

  // createStructure(clientData): Observable<ClientServiceService> {
  //   return this.httpClient.post<ClientServiceService>(`${this.REST_API_SERVER}/structure/addStructure`, clientData);
  // }

  private oldMessage = sessionStorage.getItem('pkId')
  private message = new BehaviorSubject(this.oldMessage)
  getMessage = this.message.asObservable();

  setMessage(message:string){
    this.message.next(message)
  }
 

}
