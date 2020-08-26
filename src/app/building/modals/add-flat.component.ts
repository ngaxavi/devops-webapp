import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Building, AddEditFlatData } from '../../app.interface';

@Component({
  selector: 'app-add-flat',
  templateUrl: './add-flat.component.html',
})
export class AddFlatComponent implements OnInit {
  public form: FormGroup;
  public title: string;
  public buildings: Building[];

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<AddFlatComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data: AddEditFlatData,
  ) {}

  ngOnInit(): void {
    this.title = this.data.title;
    this.buildings = this.data.buildings;
    this.form = this.fb.group({
      flatId: [this.data.flatId || '', [Validators.required]],
      building: [this.data.building || '', [Validators.required]],
    });
  }

  save(): void {
    this.dialogRef.close(this.form.value);
  }

  close(): void {
    this.dialogRef.close();
  }
}
