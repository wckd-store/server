import { ExistingDocumentException, NonExistingDocumentException } from '../../common/exceptions/document.exception';

export class UserExistsException extends ExistingDocumentException {
  constructor (field: string) {
    super ("user", field);
  }
}
export const EMAIL_USER_EXISTS_ERROR = new UserExistsException("email");
export const ID_USER_EXISTS_ERROR = new UserExistsException("id");

export class UserDoesntExistException extends NonExistingDocumentException {
  constructor (field: string) {
    super ("user", field);
  }
}
export const EMAIL_USER_DOESNT_EXIST_ERROR = new UserDoesntExistException("email");
export const ID_USER_DOESNT_EXIST_ERROR = new UserDoesntExistException("id");
