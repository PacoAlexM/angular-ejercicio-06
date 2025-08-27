import { FormArray, FormGroup, ValidationErrors } from '@angular/forms';

export class FormUtils {
    static getErrorsInControl(errors: ValidationErrors) {
        for (const key of Object.keys(errors)) {
            switch (key) {
                case 'required':
                    return 'Este campo es requerido';
                case 'minlength':
                    return `Minimo de ${errors['minlength'].requiredLength} caracteres`;
                case 'min':
                    return `Valor minimo de ${errors['min'].min}`;
                case 'email':
                    return 'Debe ingresar un correo electronico valido';
            }
        }

        return null;
    }

    static isValidField(form: FormGroup, field: string): boolean | null {
        return (!!form.controls[field].errors && form.controls[field].touched);
    }

    static getFieldError(form: FormGroup, field: string): string | null {
        if (!form.controls[field]) return null;

        const errors = form.controls[field].errors ?? {};

        return FormUtils.getErrorsInControl(errors);
    }

    static isValidFieldInArray(form: FormArray, index: number): boolean | null {
        return (form.controls[index].errors && form.controls[index].touched);
    }

    static getFieldErrorInArray(form: FormArray, index: number): string | null {
        if (form.controls.length === 0) return null;

        const errors = form.controls[index].errors ?? {};

        return FormUtils.getErrorsInControl(errors);
    }
}
