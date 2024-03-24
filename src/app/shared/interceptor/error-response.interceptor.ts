import { 
    HttpErrorResponse,
    HttpHandlerFn, HttpInterceptorFn, 
    HttpRequest } from "@angular/common/http";
import { catchError, throwError } from "rxjs";

export const ErrorresponseInterceptor: HttpInterceptorFn = (
    req: HttpRequest<unknown>, 
    next: HttpHandlerFn
) => next(req).pipe(catchError(handleErrorResponse));

function handleErrorResponse (error: HttpErrorResponse): ReturnType<typeof throwError> {
    const errorResponse = `Error code: ${error.status}, message: ${error.message}`;

    return throwError(() => errorResponse)
}