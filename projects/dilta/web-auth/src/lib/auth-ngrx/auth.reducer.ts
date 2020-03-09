import { Auth } from '@dilta/platform-shared';
import { AuthActions, AuthActionTypes, Authorized, Status } from './auth.action';



export const authInitialState: Authorized = {
  status: Status.Pending,
  timeStamp: Date(),
  error: null,
};

/**
 * reducer responsible for the authentication of the system
 */
export function authReducer(
  state = authInitialState,
  action: AuthActions
): Authorized {
  switch (action.type) {
    // when the login is succesfull
    case AuthActionTypes.Success: {
      return {
        // return new class state
        ...authInitialState,
        ...action.payload,
        status: Status.Success,
        timeStamp: Date.now()
      };
    }
    case AuthActionTypes.LoginFailure:
    case AuthActionTypes.SignUpFailure: {
      return {
        ...authInitialState,
        error: action.payload,
        status: Status.Failure,
        timeStamp: Date.now()
      };
    }
    // when the login auth is loged - out
    case AuthActionTypes.LogOut: {
      return {
        ...authInitialState,
        status: Status.Success
      };
    }

    default: {
      return state;
    }
  }
}

/**
 * interface for notifying the store of a succesful update
 */
export interface AuthUpdateStatusPayload {
  /**
   * status of the operation
   *
   */
  status: string;
  /**
   * id of the auth user to updated
   *
   */
  id: string;
  /**
   * the updated auth detail
   */
  update: Auth;
}
