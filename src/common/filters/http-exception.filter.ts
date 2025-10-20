import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<any>();
    const request = ctx.getRequest<Request & { id?: string }>();

    const isHttp = exception instanceof HttpException;
    const status = isHttp
      ? (exception as HttpException).getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const payload: any = {
      statusCode: status,
      error: isHttp ? (exception as any).name || "HttpException" : "Error",
      message: isHttp
        ? (exception as HttpException).getResponse()
        : "Internal server error",
    };

    // Normaliza message cuando getResponse() devuelve objeto
    if (typeof payload.message === "object" && payload.message !== null) {
      const m = payload.message as any;
      payload.message = m.message || m.error || JSON.stringify(m);
    }

    // Opcional: incluir requestId si existiera
    if ((request as any)?.id) payload.requestId = (request as any).id;

    response.status(status).json(payload);
  }
}
