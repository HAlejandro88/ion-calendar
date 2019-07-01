import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { formatDate } from '@angular/common';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  eventSource = [];

  event = {
    title: '',
    desc: '',
    startTime: '',
    endTime: '',
    allDay: false
  }

  minDate = new Date().toISOString();

  calendar = {
    mode: 'day',
    currentDate: new Date()
  };

  @ViewChild(CalendarComponent) myCal: CalendarComponent

  constructor(private alertCtrl: AlertController, @Inject(LOCALE_ID)private locale) {}

  ngOnInit() {
    this.resetEvent();
  }

  resetEvent() {
    this.event = {
      title: '',
      desc: '',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      allDay: false
    }
  }

  addEvent() {
    let eventCopy = {
      title: this.event.title,
      startTime: new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      allDay: this.event.allDay,
      desc: this.event.desc
    }

    if (eventCopy.allDay) {
      let start = eventCopy.startTime;
      let end = eventCopy.endTime;
      eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(),start.getUTCMonth(), start.getUTCDay()));
      eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(),end.getUTCMonth(), end.getUTCDay() + 1))
    }

    this.eventSource.push(eventCopy);
    this.myCal.loadEvents();
    this.resetEvent();
  }

  changeMode(mode) {
    this.calendar.mode = mode;
  }

  back() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }

  next() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slideNext();
  }

  today() {
    this.calendar.currentDate = new Date();
  }

  async onEventSelect(event) {
   let start = formatDate(event.startTime, 'medium', this.locale);
   let end = formatDate(event.endTime, 'medium', this.locale); 

   const alert = await this.alertCtrl.create({
     header: event.title,
     subHeader: event.desc,
     message: 'From ' + start + '<br><br>To: '+ end
   });
   alert.present();
  }


  onTimeSelected(ev) {
    let selected = new Date(ev.selectedTime);
    this.event.startTime  =selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    this.event.endTime = (selected.toISOString());
  }

  onWiewTitleChanged(title) {
    
  }
}