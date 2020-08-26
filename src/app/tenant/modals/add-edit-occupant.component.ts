import { AddEditOccupantData } from 'src/app/app.interface';

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Flat } from '../../app.interface';

@Component({
  selector: 'app-add-building',
  templateUrl: './add-edit-occupant.component.html',
})
export class AddEditOccupantComponent implements OnInit {
  public form: FormGroup;
  public title: string;
  public flats: Flat[];

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<AddEditOccupantComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data: AddEditOccupantData,
  ) {}

  ngOnInit(): void {
    this.title = this.data.title;
    this.flats = this.data.flats;
    this.form = this.fb.group({
      name: [this.data.name || '', [Validators.required]],
      flat: [this.data.flat || '', [Validators.required]],
      moveInDate: [this.data.moveInDate, [Validators.required]],
      moveOutDate: [this.data.moveOutDate],
    });
  }

  save(): void {
    this.dialogRef.close(this.form.value);
  }

  close(): void {
    this.dialogRef.close();
  }
}
