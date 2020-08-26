import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddEditBuildingData } from '../../app.interface';

@Component({
  selector: 'app-add-building',
  templateUrl: './add-building.component.html',
})
export class AddBuildingComponent implements OnInit {
  public form: FormGroup;
  public title: string;

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<AddBuildingComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data: AddEditBuildingData,
  ) {}

  ngOnInit(): void {
    this.title = this.data.title;
    this.form = this.fb.group({
      name: [this.data.name || '', [Validators.required]],
      address: [this.data.address || '', [Validators.required]],
      nbOfFloor: [this.data.nbOfFloor || 0, [Validators.required]],
    });
  }

  save(): void {
    this.dialogRef.close(this.form.value);
  }

  close(): void {
    this.dialogRef.close();
  }
}
