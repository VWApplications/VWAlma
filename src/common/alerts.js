import Swal from 'sweetalert2';

export const closeSwal = () => (Swal.close());

export const loadingAlert = (title, text, timer=500000) => {
    return Swal.fire({
        animation: false,
        customClass: 'animation fadeIn bg-white',
        allowOutsideClick: false,
        timer: timer,
        title,
        text,
        showConfirmButton: false,
        allowEscapeKey: false,
        onOpen: () => Swal.showLoading()
    });
};

export const errorAlert = (title, text) => {
    return Swal.fire({
        type: 'error',
        title: title,
        text: text
    })
}

export const infoAlert = (title, text) => {
    return Swal.fire({
        type: 'info',
        title: title,
        text: text
    })
}

export const successAlert = (title, text) => {
    return Swal.fire({
        type: 'success',
        title: title,
        text: text
    })
}

export async function choiceAlert(title, text, yesTextButton, noTextButton, yesTitle, yesText, noTitle, noText) {
    return Swal.fire({
        title: title,
        text: text,
        type: 'question',
        showCancelButton: true,
        confirmButtonText: yesTextButton,
        confirmButtonColor: '#3085d6',
        cancelButtonText: noTextButton,
        cancelButtonColor: '#d33'
      }).then((result) => {
        if (result.value) {
            Swal.fire(
                yesTitle,
                yesText,
                'success'
            )
            return true;
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
                noTitle,
                noText,
                'info'
            )
            return false;
        }
      })
}

export async function requestChoiceAlert(title, text, yesTextButton, noTextButton, noTitle, noText) {
    return Swal.fire({
        title: title,
        text: text,
        type: 'question',
        showCancelButton: true,
        confirmButtonText: yesTextButton,
        confirmButtonColor: '#3085d6',
        cancelButtonText: noTextButton,
        cancelButtonColor: '#d33'
      }).then((result) => {
        if (result.value) {
            return true;
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
                noTitle,
                noText,
                'info'
            )
            return false;
        }
      })
}