import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-database-error-dialog',
  templateUrl: './database-error-dialog.component.html',
  styleUrls: ['./database-error-dialog.component.scss']
})
export class DatabaseErrorDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DatabaseErrorDialogComponent>
  ) {}

  ngOnInit(): void {}

  public onClose(): void {
    this.dialogRef.close();
  }

}
