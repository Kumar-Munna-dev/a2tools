export interface PasswordOptions {
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

export function generatePasswordLogic(length: number, options: PasswordOptions): string {
  const { uppercase, lowercase, numbers, symbols } = options;
  const sets = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+~`|}{[]:;?><,./-=",
  };

  let charset = "";
  if (uppercase) charset += sets.uppercase;
  if (lowercase) charset += sets.lowercase;
  if (numbers) charset += sets.numbers;
  if (symbols) charset += sets.symbols;

  if (!charset) {
    return ""; // Indicate no charset selected
  }

  let pwd = "";
  for (let i = 0; i < length; i++) {
    pwd += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  return pwd;
}

export function calculatePasswordStrength(pwd: string): { score: number; text: string } {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (pwd.length >= 12) score++;
  if (/[a-z]/.test(pwd)) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;

  let text = "Very Weak";
  if (score > 5) text = "Very Strong";
  else if (score > 4) text = "Strong";
  else if (score > 2) text = "Moderate";
  else if (score > 1) text = "Weak";

  return { score, text };
}
