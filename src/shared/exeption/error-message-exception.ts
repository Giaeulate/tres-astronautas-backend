import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrorMessageException extends HttpException {
  constructor(
    message: string = 'No encontrado',
    httpStatus: HttpStatus = HttpStatus.NOT_FOUND,
  ) {
    super(
      HttpException.createBody({
        status: false,
        message: message,
      }),
      httpStatus,
    );
  }
}
