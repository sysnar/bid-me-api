import { Exclude, Expose } from 'class-transformer';

export class ErrorEntity extends Error {
  @Exclude() private readonly _code: string;
  @Exclude() private readonly _status: number;

  constructor(code: string, status = 500) {
    super();
    this._code = code;
    this._status = status;
  }

  static SERVICE_ERROR(code: string, status = 500): Record<string, any> {
    return new ErrorEntity(code, status);
  }

  @Expose()
  get code(): string {
    return this._code;
  }

  @Expose()
  get status(): number {
    return this._status;
  }
}
