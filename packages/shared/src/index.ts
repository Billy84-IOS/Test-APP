// Types partagés entre apps/web et apps/server. Ce package ne dépend de rien
// d'autre (pas de React, pas de Prisma, pas de Socket.IO côté implémentation)
// — uniquement des types et constantes.

export * from "./gameTypes";
export * from "./socketEvents";
export * from "./dto";
