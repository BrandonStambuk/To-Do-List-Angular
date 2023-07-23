import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    taskObj: Task = new Task();
    taskArr: Task[]=[];
    addTaskValue: string ='';
    editTaskValue: string ='';
    
    constructor(private crudService:CrudService){
    
    }

    ngOnInit():void{
      this.editTaskValue = '';
      this.addTaskValue='';
      this.taskObj = new Task();
      this.taskArr = [];
      this.getAllTask();
    }
    

    getAllTask(){
        this.crudService.getAllTask().subscribe(res=>{
          this.taskArr = res;
        },err =>{
          alert("Error a la hora de obtener las tareas");
        }); 
      
    }
    addTask(){
      this.taskObj.task_name = this.addTaskValue;
      this.crudService.addTask(this.taskObj).subscribe(res => {
        this.ngOnInit();  // el metodo llama al metodo del servicio CRUD que recibe como parametro
        this.addTaskValue ='';                  //una tarea si no hay un error se actualiza el componente EL ACTUAL
      },err=> {
        alert(err);
      })
    }

    editTask(){
      this.taskObj.task_name = this.editTaskValue;
      this.crudService.editTask(this.taskObj).subscribe(res => {
        this.ngOnInit();  
      },err=> {
        alert("Fallo al editar la tarea");
      })
    }

    call(etask:Task){
      this.taskObj = etask;
      this.editTaskValue = etask.task_name;
    }



    deleteTask(etask: Task){
      this.crudService.deleteTask(etask).subscribe(res => {
        this.ngOnInit();  
      },err=> {
        alert("Fallo al eliminar la tarea");
      })
    }
}
