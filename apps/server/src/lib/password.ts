import argon2 from "argon2";

// Argon2id : recommandé actuellement pour le hachage de mots de passe.
// Les mots de passe ne sont JAMAIS stockés ni journalisés en clair.
const OPTIONS: argon2.Options = {
  type: argon2.argon2id,
  memoryCost: 19456, // 19 Mio
  timeCost: 2,
  parallelism: 1,
};

export function hashPassword(plain: string): Promise<string> {
  return argon2.hash(plain, OPTIONS);
}

export async function verifyPassword(hash: string, plain: string): Promise<boolean> {
  try {
    return await argon2.verify(hash, plain);
  } catch {
    // Hash corrompu ou format inconnu : on refuse, on ne fait pas planter la requête.
    return false;
  }
}
