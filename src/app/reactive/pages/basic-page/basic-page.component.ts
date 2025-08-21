import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'basic-page',
    imports: [JsonPipe, ReactiveFormsModule],
    templateUrl: './basic-page.component.html',
})
export class BasicPageComponent {
    // myForm = new FormGroup({
    //     name: new FormControl(''),
    //     price: new FormControl(0),
    //     inStorage: new FormControl(0),
    // });

    formBuilder = inject(FormBuilder);

    myForm: FormGroup = this.formBuilder.group({
        name: ['', /* Validadores sincronos */ [Validators.required, Validators.minLength(3)] /*, Validadores asincronos */],
        price: [0, [Validators.required, Validators.min(10)]],
        inStorage: [0, [Validators.required, Validators.min(0)]],
    });

    isValidField(field: string): boolean | null {
        return (this.myForm.controls[field].errors && this.myForm.controls[field].touched);
    }

    getFieldError(field: string): string | null {
        if (!this.myForm.controls[field]) return null;

        const errors = this.myForm.controls[field].errors ?? {};

        for (const key of Object.keys(errors)) {
            switch (key) {
                case 'required':
                    return 'Este campo es requerido';
                case 'minlength':
                    return `Minimo de ${errors['minlength'].requiredLength} caracteres`;
                case 'min':
                    return `Valor minimo de ${errors['min'].min}`;
            }
        }

        return null;
    }

    onSubmit() {
        if (this.myForm.invalid) {
            this.myForm.markAllAsTouched();
        }

        console.log(this.myForm.value);

        this.myForm.reset({
            price: 0,
            inStorage: 0,
        });
    }
}
