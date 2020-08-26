import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-device',
  templateUrl: './edit-device.component.html',
})
export class EditDeviceComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<EditDeviceComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.data.name || '', [Validators.required]],
      deviceId: [this.data.deviceId || '', [Validators.required]],
    });
  }

  save(): void {
    this.dialogRef.close(this.form.value);
  }

  close(): void {
    this.dialogRef.close();
  }
}
