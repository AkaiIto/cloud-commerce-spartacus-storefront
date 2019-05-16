import { Injectable } from '@angular/core';
import { UserPaymentMethodAdapter } from './user-payment-method.adapter';
import { Observable } from 'rxjs';
import { PaymentDetails } from '../../../model/cart.model';

@Injectable({
  providedIn: 'root',
})
export class UserPaymentMethodConnector {
  constructor(private adapter: UserPaymentMethodAdapter) {}

  loadList(userId: string): Observable<PaymentDetails[]> {
    return this.adapter.loadList(userId);
  }

  delete(userId: string, paymentMethodID: string): Observable<{}> {
    return this.adapter.delete(userId, paymentMethodID);
  }

  setDefault(userId: string, paymentMethodID: string): Observable<{}> {
    return this.adapter.setDefault(userId, paymentMethodID);
  }
}
