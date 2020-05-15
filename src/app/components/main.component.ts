import { Component } from '@angular/core';
declare var module: {
    id: string;
};

@Component({
    moduleId: module.id,
    selector: 'app-main',
    templateUrl: './main.component.html'
})
export class MainComponent {
  tasks: Task [];
  filterd: Task [];
  tsk: Task;
  taskfield: string;
  section: string;
  remaining: number;

  constructor() {
    this.tasks = [];
    this.taskfield = '';
    this.section = '';
    this.getAll();
  }


  addTask(val: any) {
    if (val.length === 0) {
        return;
    }
    this.tsk = {
      text: val,
      isCompleted: false
    };
    this.tasks.push(this.tsk);
    this.taskfield = '';
    if (this.section === 'Completed') {
        this.getCompleted();
    } else if (this.section === 'Not Completed') {
        this.getNotCompleted();
    }
  }


  toggleCompleted(i){
    this.tasks[i].isCompleted = !this.tasks[i].isCompleted;
  }


  deleteTask(i: any){
    this.tasks.splice(i, 1);
    if (this.section === 'Completed') {
        this.getCompleted();
    } else if (this.section === 'Not Completed') {
        this.getNotCompleted();
    }
  }

  countRemaining() {
    this.remaining = 0;
    this.tasks.forEach(element => {
        if (!element.isCompleted) {
            this.remaining++;
        }
    });
    return this.remaining;
  }

  getAll() {
    this.filterd = this.tasks;
    this.section = 'All';
  }

  getCompleted() {
      this.filterd = this.tasks.filter(task => task.isCompleted);
      this.section = 'Completed';
  }

  getNotCompleted() {
    this.filterd = this.tasks.filter(task => !task.isCompleted);
    this.section = 'Not Completed';
  }

  clearAll() {
      this.tasks = [];
      this.filterd = [];
  }
}

interface Task {
    text: string;
    isCompleted: boolean;
}