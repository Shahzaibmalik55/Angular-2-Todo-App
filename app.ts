import { bootstrap } from "angular2/platform/browser" ;
import { Component, EventEmitter } from "angular2/core" ;

class newTask {
	task: string;
	desp: string;
	status: boolean;
	show: boolean;
	id: number
	
	constructor(task:string,desp:string,status: boolean,show: boolean,id?: number){
		this.task = task;
		this.desp = desp;
		this.status = status;
		this.show = show,
		this.id = Date.now()
		
	}
	delete(){
		this.status = false;
	}

}


@Component({
	selector: 'tr',
	host:{
		class: 'td'
	},
	inputs: ['tasks'],
	outputs:['deleteEvent'],
	template:`
	<td> {{ tasks.task }} </td>
	<td> {{ tasks.desp }} </td>
	<td><button class="ui green button" *ngIf="tasks.status" (click)="inactive()">Activated</button> <button class="ui red button" *ngIf="!tasks.status"  (click)="inactive()">Unactivated</button></td>
	<td><button class="ui red button" (click)="delete()">Remove</button> </td>	
	
	
	`
})
class taskTable {
	tasks :newTask;
	
	deleteEvent: EventEmitter<newTask>
	
	constructor(){
		this.deleteEvent = new EventEmitter();
		
	}
	inactive(){
		this.tasks.status = this.tasks.status ? false : true
	}
	delete(){
		this.deleteEvent.emit(this.tasks)
	}
	
}

@Component({
	selector: 'todoApp',
	directives:[taskTable],
	templateUrl: 'TodoApp.html',
	
	
	
})

class todoApp{
	tasks: newTask[] = [];
	
	addTodo(task: HTMLInputElement, desp:HTMLInputElement){
		console.log(`task: ${task.value} description : ${desp.value}`)
			var obj = new newTask(task.value,desp.value,true,true)
			console.log(obj)
			this.tasks.push(obj);
			task.value = "";
			desp.value = "";

			
	}
	
	delete(task){
		for(var i = 0; i < this.tasks.length; i++){
			if(this.tasks[i].id == task.id)
			this.tasks.splice(i,1);
		}
	}
	
}


bootstrap(todoApp)