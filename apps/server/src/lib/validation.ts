import { z } from "zod";
import { AUTH_RULES } from "@cardtable/shared";

// Le serveur est l'autorité : ces schémas sont appliqués sur TOUTES les
// entrées, indépendamment de ce que le client a pu valider de son côté.

export const usernameSchema = z
  .string()
  .trim()
  .min(AUTH_RULES.username.min, `Le pseudo doit faire au moins ${AUTH_RULES.username.min} caractères`)
  .max(AUTH_RULES.username.max, `Le pseudo ne peut pas dépasser ${AUTH_RULES.username.max} caractères`)
  .regex(AUTH_RULES.username.pattern, "Le pseudo ne peut contenir que lettres, chiffres, tirets et underscores");

export const passwordSchema = z
  .string()
  .min(AUTH_RULES.password.min, `Le mot de passe doit faire au moins ${AUTH_RULES.password.min} caractères`)
  .max(AUTH_RULES.password.max, "Mot de passe trop long");

export const displayNameSchema = z
  .string()
  .trim()
  .min(AUTH_RULES.displayName.min, "Le nom affiché ne peut pas être vide")
  .max(AUTH_RULES.displayName.max, `Le nom affiché ne peut pas dépasser ${AUTH_RULES.displayName.max} caractères`);

export const registerSchema = z.object({
  username: usernameSchema,
  email: z.string().trim().toLowerCase().email("Adresse e-mail invalide"),
  password: passwordSchema,
  displayName: displayNameSchema.optional(),
});

export const loginSchema = z.object({
  identifier: z.string().trim().min(1, "Pseudo ou e-mail requis"),
  password: z.string().min(1, "Mot de passe requis"),
});

export const updateProfileSchema = z.object({
  displayName: displayNameSchema,
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Mot de passe actuel requis"),
  newPassword: passwordSchema,
});

export const deleteAccountSchema = z.object({
  password: z.string().min(1, "Mot de passe requis"),
});

/** Transforme une erreur zod en message lisible pour l'utilisateur. */
export function firstErrorMessage(error: z.ZodError): string {
  return error.issues[0]?.message ?? "Données invalides";
}
