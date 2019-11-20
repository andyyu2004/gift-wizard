import { toast } from "react-toastify";

/** Wraps toast.error as to not have a return value so its easier to use in certain callbacks */
export function toastErr(error: string) {
    toast.error(error);
}