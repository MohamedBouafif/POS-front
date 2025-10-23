// confirm-password-validator.validator.ts
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function confirmPasswordValidator(): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirm_password')?.value;

    // If either field is empty, let Validators.required handle it
    if (!password || !confirmPassword) {
      return null;
    }

    // Return error if passwords don't match
    return password === confirmPassword ? null : { invalidConfirmPassword: true };
  };
}