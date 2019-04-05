import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { OccUserService } from '../../occ/index';
import * as fromAction from '../actions/update-email.action';
import * as fromEffect from './update-email.effect';

class MockOccUserService {
  updateEmail(
    _userid: string,
    _currentPassword: string,
    _newUserId: string
  ): Observable<{}> {
    return of();
  }
}

describe('Update Email Effect', () => {
  let updateEmailEffect: fromEffect.UpdateEmailEffect;
  let userService: OccUserService;
  let actions$: Observable<Action>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        fromEffect.UpdateEmailEffect,
        { provide: OccUserService, useClass: MockOccUserService },
        provideMockActions(() => actions$),
      ],
    });

    updateEmailEffect = TestBed.get(fromEffect.UpdateEmailEffect);
    userService = TestBed.get(OccUserService);
  });

  describe('updateEmail$', () => {
    it('should return UpdateEmailSuccess action', () => {
      spyOn(userService, 'updateEmail').and.returnValue(of({}));

      const userId = 'test@test.com';
      const currentPassword = 'Qwe123!';
      const newUserId = 'tester@sap.com';

      const action = new fromAction.UpdateEmailAction({
        userId,
        currentPassword,
        newUserId,
      });
      const completion = new fromAction.UpdateEmailSuccessAction(newUserId);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(updateEmailEffect.updateEmail$).toBeObservable(expected);
    });

    it('should return UpdateEmailFail action', () => {
      const error = 'error';
      spyOn(userService, 'updateEmail').and.returnValue(throwError(error));

      const userId = 'test@test.com';
      const currentPassword = 'Qwe123!';
      const newUserId = 'tester@sap.com';

      const action = new fromAction.UpdateEmailAction({
        userId,
        currentPassword,
        newUserId,
      });
      const completion = new fromAction.UpdateEmailErrorAction(error);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(updateEmailEffect.updateEmail$).toBeObservable(expected);
    });
  });
});
