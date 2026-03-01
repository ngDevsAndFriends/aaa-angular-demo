import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TaskService} from '../task-service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertBanner} from '../shared/components/alert-banner/alert-banner';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule, AlertBanner],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm {
  private taskService = inject(TaskService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  private id = this.route.snapshot.paramMap.get("id");

  form = new FormGroup({
    title: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.minLength(3)]),
  });

  constructor() {
    if(this.id) {
      this.taskService.getTask(this.id).subscribe(task => {
        this.form.patchValue(task);
      });
    }
  }

  submit() {
    if(this.form.invalid) {
      console.log("Your form is invalid. Please check the fields.");
      console.log("Your form: ", this.form.value);
      console.log("Title Errors: ", this.form.controls.title.errors);
      console.log("Description Errors: ", this.form.controls.description.errors);

      return;
    }

    const taskObservable = this.id
      ? this.taskService.updateTask(this.form.value, this.id)
      : this.taskService.addTask(this.form.value);
    taskObservable.subscribe(() => {
      this.router.navigate(["/"]);
    });
  }

  prefillForm() {
    this.form.setValue({
      title: "Generated Task",
      description: "Generated Description"
    });
  }
}
