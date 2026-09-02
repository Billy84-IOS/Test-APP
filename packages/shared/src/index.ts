// Types partagés entre apps/web et apps/server. Ce package ne dépend de rien
// d'autre (pas de React, pas de Prisma, pas de Socket.IO côté implémentation)
// — uniquement des types et constantes.

export * from "./gameTypes.js";
export * from "./socketEvents.js";
export * from "./dto.js";
export * from "./auth.js";
