import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Task, TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.page.html',
  styleUrls: ['./task-modal.page.scss'],
})
export class TaskModalPage implements OnInit {
  @Input() task: Task;
  isUpdate = false; //check if tthe modal is used for update or not


  data = {
    title: '',
    subtitle: '',
    content: '',
  };

  constructor(private modalCtrl: ModalController,
    private service: TaskService) { }

  ngOnInit() {
    if (this.task){
      this.isUpdate = true;
      this.data = this.task;
    }
  }

  closeModal() {
    this.modalCtrl.dismiss(null, 'closed');

  }

  onSubmit(form: NgForm){
    const task = form.value;
    if(this.isUpdate){
      this.service.update(task, this.task.id).subscribe(() => {
        task.id = this.task.id; //append id to the updated task object
        this.modalCtrl.dismiss(task, 'updated');
      })

    } else {
    this.service.create(task).subscribe(response => {
      //Pass data back and close modal
      this.modalCtrl.dismiss(response, 'created');

    });
  }
}


  //close modal after create

}
