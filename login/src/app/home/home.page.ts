import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Task, TaskService } from '../services/task.service';
import { TaskModalPage } from '../task-modal/task-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  tasks: Task[];

  constructor(private service: TaskService, 
              private alertCtrl: AlertController,
              private modalCtrl: ModalController) { }

  ngOnInit() {
    this.service.getAll().subscribe(response =>  {
     this.tasks = response;
    })

  }

  addTask() {
    this.modalCtrl
    .create({
      component: TaskModalPage
    })
    .then(modal => {
      modal.present();
      return modal.onDidDismiss();
    }).then(({data, role}) => {
      if (role === 'created') {
        this.tasks.push(data);
      }
    });
  }

  updateTask(task:Task) {
    this.modalCtrl.create({
      component: TaskModalPage,
      componentProps: {task} //shot hand of {task: task}
      //Pass the task object to the modal
    })
    .then(modal => {
     modal.present();
     return modal.onDidDismiss();
    }).then(({data, role}) => {
      this.tasks = this.tasks.filter(std => {
        if(data.id === std.id) {
          return data; //return updated
        }
        return std;
      })
    });
  }


  removeTask(id: string){
    this.alertCtrl.create({
      header: 'Delete',
      message: 'Are you sure you want to delete?',
      buttons: [{
        text: 'Yes',
        handler: () => {
          this.service.remove(id).subscribe(() =>{
            this.tasks = this.tasks.filter(std => std.id !== id);
        });
      }
      }, 
      { text: 'No' } 
    ]
    }) .then(alertEl => alertEl.present());
  }
}
