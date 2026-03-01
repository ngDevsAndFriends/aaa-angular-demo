import {Component, inject} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {TaskService} from '../task-service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm {
  private taskService = inject(TaskService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  private id = this.route.snapshot.paramMap.get("id");

  form = new FormGroup({
    title: new FormControl(""),
    description: new FormControl(""),
  });

  constructor() {
    if(this.id) {
      this.form.patchValue(this.taskService.getTask(this.id));
    }
  }

  submit() {
    this.taskService.addTask(this.form.value);

    this.router.navigate(["/"]);
  }
}
