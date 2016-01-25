import { bootstrap } from "angular2/platform/browser" ;
import { Component } from "angular2/core" ;

class newTask {
	task: string;
	desp: string;
	status: boolean
	
	constructor(task:string,desp:string,status: boolean){
		this.task = task;
		this.desp = desp;
		this.status = status
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
	template:`
	<td> {{ tasks.task }} </td>
	<td> {{ tasks.desp }} </td>
	<td><button class="ui green button">Active</button> </td>
	<td><button class="ui red button" (click)="delete()">Remove</button> </td>	
	
	`
})
class taskTable {
	tasks :newTask[];
	
	delete(){
	this.tasks.delete()	
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
			var obj = new newTask(task.value,desp.value,true)
			console.log(obj)
				this.tasks.push(obj);
			task.value = "";
			desp.value = "";

			
	}
	
}


bootstrap(todoApp)