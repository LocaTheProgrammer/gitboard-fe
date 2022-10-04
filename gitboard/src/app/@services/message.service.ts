import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private subject = new Subject<any>();
  private typeSubject = new Subject<any>();

  sendMessage(message: string) {
    this.subject.next({ text: message });
  }

  sendType(type: string) {
    this.typeSubject.next({ type: type })
  }

  clearMessages() {
    this.subject.next();
  }

  clearType() {
    this.typeSubject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }


  getTypeSubject(): Observable<any> {
    return this.typeSubject.asObservable();
  }
}
