import { Component, OnInit, Output, EventEmitter, Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalService } from './modal.service';

export interface DialogData {
  id: string
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'modal',
  styles: ['./modal.css'],
  templateUrl: './modal.html',
  providers: [ModalService]
})
export class ModalComponent implements OnInit {
  modalTitle: string;
  page = 1;
  myModalDataService = [];
    // tslint:disable-next-line:no-output-on-prefix
    @Output() onClose = new EventEmitter();

  constructor(private service: ModalService, public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.modalTitle = data.id;
    // console.log(data)
  }
  ngOnInit() {
    this.getModalNews();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  getModalNews() {
    this.service.getSourceNews(this.modalTitle)
      .subscribe((result: any) => {
        if (result) {
          this.myModalDataService = result['articles'];
        } else {
          console.log('errorHttp');
        }
      },
        error => {
          console.log('Error', error);
        }
    );
  }
}
