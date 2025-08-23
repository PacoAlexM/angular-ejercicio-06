import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
    selector: 'dynamic-page',
    imports: [JsonPipe, ReactiveFormsModule],
    templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent {
    private formBuilder = inject(FormBuilder);
    formUtils = FormUtils;

    myForm: FormGroup = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        favoriteGames: this.formBuilder.array([
            ['Metal Gear Solid IV', [Validators.required]],
            ['Death Stranding', [Validators.required]],
            // ['The Last of Us', [Validators.required]],
        ], Validators.minLength(3)),
    });

    newFavoriteInput = new FormControl('', [Validators.required]);

    get favoriteGames() {
        return this.myForm.get('favoriteGames') as FormArray;
    }

    // isValidFieldInArray(form: FormArray, index: number) {
    //     return (form.controls[index].errors && form.controls[index].touched);
    // }

    onAddFavorite() {
        if (this.newFavoriteInput.invalid) return;

        const newGame = this.newFavoriteInput.value;

        this.favoriteGames.push(this.formBuilder.control(newGame, [Validators.required]));

        this.newFavoriteInput.reset();
    }

    onDeleteFavorite(index: number) {
        this.favoriteGames.removeAt(index); 
    }

    onSubmit() {
        this.myForm.markAllAsTouched();
    }
}
