import { db } from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import { initTRPC, TRPCError } from "@trpc/server";

const t = initTRPC.create();
const middleware = t.middleware;

const isOwnerAuth = middleware(async (opts) => {
  const auth = await currentUser();
  if (!auth) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  const ownerData = await db.owner.findUnique({
    where: {
      externalId: auth.id,
    },
  });
  if (!ownerData) {
    throw new TRPCError({ code: "NOT_FOUND" });
  }
  const owner = JSON.parse(
    JSON.stringify(ownerData, (_, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
  return opts.next({
    ctx: {
      ownerId: owner.id,
      owner,
    },
  });
});

const isTenantAuth = middleware(async (opts) => {
  const auth = await currentUser();
  if (!auth) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  const tenantData = await db.tenant.findUnique({
    where: {
      externalId: auth.id,
    },
  });
  if (!tenantData) {
    throw new TRPCError({ code: "NOT_FOUND" });
  }
  const tenant = JSON.parse(
    JSON.stringify(tenantData, (_, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
  return opts.next({
    ctx: {
      tenantId: tenant.id,
      tenant,
    },
  });
});

export const router = t.router;
export const procedure = t.procedure;
export const ownerPrivateProcedure = t.procedure.use(isOwnerAuth);
export const tenantprivateProcedure = t.procedure.use(isTenantAuth);
