import { Left } from "shared/types";

/** If response.data has an error field then the server was reached, we can report the returned error
 *  Else something else went wrong (perhaps server not running).
*/
export const apiErrorHandler = (err: any) => err.response.data.error 
    ? new Left(err.response.data.error)
    : new Left("Unknown error occured (server may be currently unavailable)");