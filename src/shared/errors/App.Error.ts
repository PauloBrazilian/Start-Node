class AppError{

  public readonly message: string;
  public readonly stastusCode: number;

  constructor(message: string, statusCode = 400){
    this.message = message;
    this.message = message;
  }
}


export default AppError;
