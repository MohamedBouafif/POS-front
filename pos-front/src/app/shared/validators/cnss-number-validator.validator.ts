// cnss-validator.validator.ts
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Custom CNSS number validator function
export function cnssValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // Get the CNSS number value and ensure it's a string
    const cnss = control.value as string;

    // If the field is empty, let Validators.required handle it
    if (!cnss) {
      return null;
    }

    // Regular expression for 8 digits, a hyphen, then 2 digits
    const cnssPattern = /^\d{8}-\d{2}$/;

    // Test the CNSS number against the pattern
    return cnssPattern.test(cnss) ? null : { invalidCnss: true };
  };
}