/** Contact form validation utilities */

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ValidationErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const NAME_MIN = 2;
const NAME_MAX = 80;
const SUBJECT_MIN = 3;
const SUBJECT_MAX = 120;
const MESSAGE_MIN = 10;
const MESSAGE_MAX = 2000;

export function validateName(value: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) return "Name is required.";
  if (trimmed.length < NAME_MIN)
    return `Name must be at least ${NAME_MIN} characters.`;
  if (trimmed.length > NAME_MAX)
    return `Name must be under ${NAME_MAX} characters.`;
  return undefined;
}

export function validateEmail(value: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) return "Email is required.";
  if (!EMAIL_REGEX.test(trimmed)) return "Please enter a valid email address.";
  return undefined;
}

export function validateSubject(value: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) return "Subject is required.";
  if (trimmed.length < SUBJECT_MIN)
    return `Subject must be at least ${SUBJECT_MIN} characters.`;
  if (trimmed.length > SUBJECT_MAX)
    return `Subject must be under ${SUBJECT_MAX} characters.`;
  return undefined;
}

export function validateMessage(value: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) return "Message is required.";
  if (trimmed.length < MESSAGE_MIN)
    return `Message must be at least ${MESSAGE_MIN} characters.`;
  if (trimmed.length > MESSAGE_MAX)
    return `Message must be under ${MESSAGE_MAX} characters.`;
  return undefined;
}

/**
 * Validate the entire contact form.
 * Returns an object with per-field errors (empty object = valid).
 */
export function validateContactForm(data: ContactFormData): ValidationErrors {
  const errors: ValidationErrors = {};
  const nameErr = validateName(data.name);
  const emailErr = validateEmail(data.email);
  const subjectErr = validateSubject(data.subject);
  const messageErr = validateMessage(data.message);
  if (nameErr) errors.name = nameErr;
  if (emailErr) errors.email = emailErr;
  if (subjectErr) errors.subject = subjectErr;
  if (messageErr) errors.message = messageErr;
  return errors;
}

/** Returns true when the errors object has zero entries. */
export function isFormValid(errors: ValidationErrors): boolean {
  return Object.keys(errors).length === 0;
}
