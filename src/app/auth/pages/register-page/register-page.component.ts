import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
    selector: 'register-page',
    imports: [JsonPipe, ReactiveFormsModule],
    templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
    private formBuilder = inject(FormBuilder);
    formUtils = FormUtils;

    myForm: FormGroup = this.formBuilder.group({
        name: ['', [Validators.required, Validators.pattern(FormUtils.namePattern)]],
        email: ['', [Validators.required, Validators.pattern(FormUtils.emailPattern)]],
        username: ['', [Validators.required, Validators.minLength(6), Validators.pattern(FormUtils.notOnlySpacesPattern)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        password2: ['', [Validators.required]],
    }, {
        validators: [FormUtils.areFieldsEquals('password', 'password2')],
    });

    onSubmit() {
        this.myForm.markAllAsTouched();
    }
}
