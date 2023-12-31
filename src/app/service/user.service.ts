import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserView } from '../user-log/user-log.component';
import { Observable } from 'rxjs';
import { UseAllocationData } from '../create-user-allocation/create-user-allocation.component';
import { UserAllocationView } from '../user-allocation/user-allocation.component';
import { AssestView, EquipmentView } from '../add-equipment/add-equipment.component';
import { AssignedProjectData } from '../assign-project/assign-project.component';
import { RoleView } from '../add-role/add-role.component';
import { RegionView } from '../add-region/add-region.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // private REST_API_SERVER = "http://18.217.108.137:8080";
  // private REST_API_SERVER = "http://18.217.108.137:9090"; //working Ip
  private REST_API_SERVER = "http://localhost:9090"; //local IP For Testing


  //private REST_API_SERVER = "http://ec2-3-142-240-133.us-east-2.compute.amazonaws.com:9090";
  constructor(private httpClient: HttpClient) { }

  getAllUsers() {
    return this.httpClient.get<UserView[]>(this.REST_API_SERVER + '/user/getAllusers/');
  }

  createUser(data): Observable<UserService> {
    return this.httpClient.post<UserService>(`${this.REST_API_SERVER}/user/adduserData`, data)
  }

  retriveUser(id) {
    return this.httpClient.get<UserView[]>(`${this.REST_API_SERVER}/UserData/${id}`)
  }

  updateUSer(data, id) {
    return this.httpClient.put(`${this.REST_API_SERVER}/UserData/${id}`, data)
  }

  deactivateUser(id) {
    return this.httpClient.put(`${this.REST_API_SERVER}/UserData/${id}/${false}`, '')
  }

  //USER ALLOCATION API CALL
  getUserAllocation() {
    return this.httpClient.get<UserAllocationView>(`${this.REST_API_SERVER}/getalluserview`)
  }
  createUserAllocation(data): Observable<UserService> {
    return this.httpClient.post<UserService>(`${this.REST_API_SERVER}/saveData`, data)
  }

  retriveAllocation(id) {
    return this.httpClient.get<UseAllocationData>(`${this.REST_API_SERVER}/userAllocation/${id}`)
  }
  updateUserAllocation(data) :Observable<UserService> {
    return this.httpClient.post<UserService>(`${this.REST_API_SERVER}/updateData`, data)
  }


  //USER LIST FOR INSPECTION REPORT

  getApproverList() {
    return this.httpClient.get<UserView[]>(`${this.REST_API_SERVER}/UserDatabyapprover`)
  }

  getReviewverList() {
    return this.httpClient.get<UserView[]>(`${this.REST_API_SERVER}/UserDatabyrevever`)
  }

  getCreaterList() {
    return this.httpClient.get<UserView[]>(`${this.REST_API_SERVER}/UserDatabycreater`)
  }


  //ADD EQUIPMENT OR ASSIGN EQUIPMENT
  getAllAssetes() {
    return this.httpClient.get<AssestView>(`${this.REST_API_SERVER}/getAssets`)
  }
  getAllAssignEquipment() {
    return this.httpClient.get<EquipmentView>(`${this.REST_API_SERVER}/getEquipments`)
  }

  addEquipment(data): Observable<UserService> {
    return this.httpClient.post<UserService>(`${this.REST_API_SERVER}/addequipment`, data);
  }

  retriveEquipemnt(id) {
    return this.httpClient.get<EquipmentView>(`${this.REST_API_SERVER}/Equipment/${id}`)
  }

  updateEquipemt(data, id) {
    return this.httpClient.put(`${this.REST_API_SERVER}/Equipment/${id}`, data)
  }

  deleteAssignEqiopment(id){
    return this.httpClient.delete(`${this.REST_API_SERVER}/Equipment/${id}`)
  }


  //ASSIGN PROJECT TO USER API CALL
  getAssignedProjectByUserId(id){
    return this.httpClient.get<AssignedProjectData[]>(`${this.REST_API_SERVER}/getUserProjectbyuserids/${id}`)
  }

  assignProject(data) :Observable <UserService>{
    return this.httpClient.post<UserService>(`${this.REST_API_SERVER}/adduserproject`, data)
  }
  //ASSIGN PROJECT TO USER API CALL


  //ROLES API CALL
  addRoles(data) :Observable<UserService>{
    return this.httpClient.post<UserService>(`${this.REST_API_SERVER}/addroles`, data)
  }
  
  getAllRoles(){
    return this.httpClient.get<RoleView>(`${this.REST_API_SERVER}/getRoles`)
  }

  getRole(id){
    return this.httpClient.get<RoleView>(`${this.REST_API_SERVER}/roles/${id}`)
  }

  updateRole(data: RoleView, id){
    return this.httpClient.put(`${this.REST_API_SERVER}/roles/${id}`, data)
  }
  
  deactiveRole(id){
    return this.httpClient.delete(`${this.REST_API_SERVER}/roles/${id}`)
  }
  //ROLES API CALL

  //REGIONS API CALL
  getAllRegions(){
    return this.httpClient.get<RegionView>(`${this.REST_API_SERVER}/getRegions`)
  }

  AddRegion(data):Observable<UserService>{
    return this.httpClient.post<UserService>(`${this.REST_API_SERVER}/addRegiont`, data)
  }

  getRegion(id){
    return this.httpClient.get<RegionView>(`${this.REST_API_SERVER}/Region/${id}`)
  }

  updateRegion(data, id){
    return  this.httpClient.put(`${this.REST_API_SERVER}/Region/${id}`, data)
  }

  deactiveRegion(id){
    return this.httpClient.delete(`${this.REST_API_SERVER}/Region/${id}`)
  }

}
