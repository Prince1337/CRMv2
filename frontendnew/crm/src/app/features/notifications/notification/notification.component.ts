import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/core/http/event.service';
import { NotificationService } from 'src/app/core/http/notification.service';
import { NotificationResponse } from 'src/app/shared/models/notification-response';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  
  notifications !: NotificationResponse [];

  constructor(private notificationService: NotificationService, private eventService: EventService) { }

  ngOnInit(): void {
    this.getAllNotifications();
  }

  getAllNotifications() {
    this.notificationService.getAllNotifications().subscribe((data: NotificationResponse[]) => {
      this.notifications = data;
      console.log(this.notifications);
    })
  }

  markNotificationAsRead(notificationId: number) {
    this.eventService.markNotificationAsRead(notificationId)
      .subscribe(() => {
        this.getAllNotifications();
        console.log('Notification marked as read');
      }, error => {
        console.error(error);
        // Error handling, e.g., show an error message
      });
  }


}
