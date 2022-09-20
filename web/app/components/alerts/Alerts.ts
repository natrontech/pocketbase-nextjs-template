import Swal from "sweetalert2"

export enum AlertType {
    Success = "success",
    Error = "error",
    Warning = "warning",
    Info = "info",
    Question = "question"
}

export const DefaultAlert = (title: string, type: AlertType) => {
    Swal.fire({
        title: title,
        icon: type,
        toast: true,
        position: "top",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        showCloseButton: true
    })

    // const [show, setShow] = useState(true)
}

export const DefaultAlertMessage = (title: string, message: string, type: AlertType) => {
    Swal.fire({
        title: title,
        text: message,
        icon: type,
        toast: true,
        position: "top",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        showCloseButton: true
    })
}
