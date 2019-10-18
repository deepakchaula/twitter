import { Component, OnInit } from '@angular/core';
import { MydataserviceService } from './mydataservice.service';
import { Photos, PhotosObj } from './_modal';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {ModalComponent} from './modal/modal.component';
import { debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MydataserviceService]
})
export class AppComponent implements OnInit {
  title = 'app';
  myPhotosList: Photos[] = [];
  page = 1;
  myGroupPostDataService = [];
  public form: FormGroup;
  public groupName: AbstractControl;
  modalOpen = false;
  id: string;
  public searchText: string;
  public counter: number;
  private subscription: Subscription;

  constructor(private service: MydataserviceService, fb: FormBuilder, public dialog: MatDialog) {
    this.form = fb.group({
      groupName: ['', Validators.compose([Validators.required, Validators.minLength(3)])]
    }, );
    this.groupName = this.form.controls['groupName'];
    this.counter = 30;
   }
  ngOnInit() {
    this.subscription = this.service.refreshNeeded$.pipe(
      debounceTime(30000)
    )
      .subscribe(() => {
        this.getNews();
      });
    this.getNews();
    this.countCounter();
  }
  toggleModal() {
    this.modalOpen = !this.modalOpen;
  }
  openDialog(id): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '100%',
      data: {id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  getNews() {
    // console.log(this.searchText);
    this.service.getMyNews(this.searchText?this.searchText:'adobe')
      .subscribe((result: any) => {
        if (result) {
          this.myGroupPostDataService = result['statuses'];
        } else {
          console.log('errorHttp');
        }
      },
      error => {
        console.log('Error', error);
      }
    );
  }
  countCounter() {
    const self = this;
    let count = setInterval(() => {
      if (this.counter != 0) {
        self.counter -= 1;
      } else {
        this.resetCounter();
      }
    }, 1000);
  }
  resetCounter() {
    this.counter = 30;
  }
  onScroll() {
    console.log('Scrolled');
    this.page = this.page + 1;
    this.getNews();
  }
}
