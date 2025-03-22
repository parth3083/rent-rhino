import {
  ownerPrivateProcedure,
  procedure,
  router,
  tenantprivateProcedure,
} from "./trpc";
import { db } from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { startOfDay, startOfMonth, startOfWeek } from "date-fns";
import { PropertyStatus } from "@prisma/client";

enum PROPERTY_STATUS {
  EMPTY = "EMPTY",
  RENTED = "RENTED",
}

enum TENANT_STATUS {
  STUDENT = "STUDENT",
  WORKING_PROFESSIONAL = "WORKING_PROFESSIONAL",
  FAMILY = "FAMILY",
  SELF_EMPLOYED = "SELF_EMPLOYED",
}
type AuthResponse = {
  isSynced: boolean;
  role?: "OWNER" | "TENANT";
};

export const appRouter = router({
  // GENERAL LOG IN API FUNCTIONS -------------------------------------------------

  // AUTH LOG IN

  authLogIn: procedure.query(async (): Promise<AuthResponse> => {
    const auth = await currentUser();
    if (!auth) {
      return { isSynced: false };
    }

    const owner = await db.owner.findFirst({
      where: {
        externalId: auth.id,
      },
    });

    if (owner) {
      return { isSynced: true, role: "OWNER" };
    } else {
      const tenant = await db.tenant.findFirst({
        where: {
          externalId: auth.id,
        },
      });

      if (tenant) {
        return { isSynced: true, role: "TENANT" };
      }
    }

    return { isSynced: false };
  }),

  //AUTH SIGN UP
  authSignUp: procedure
    .input(
      z.object({
        passedValue: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const auth = await currentUser();
      if (!auth) {
        return { isSynced: false };
      }
      if (input.passedValue === "OWNER") {
        const owner = await db.owner.findFirst({
          where: {
            externalId: auth.id,
          },
        });
        if (!owner) {
          await db.owner.create({
            data: {
              externalId: auth.id,
              email: auth.emailAddresses[0].emailAddress,
              name: auth.fullName,
            },
          });

          return { isSynced: true };
        }
        return { isSynced: true };
      } else {
        const tenant = await db.tenant.findFirst({
          where: {
            externalId: auth.id,
          },
        });
        if (!tenant) {
          await db.tenant.create({
            data: {
              externalId: auth.id,
              email: auth.emailAddresses[0].emailAddress,
              name: auth.fullName,
            },
          });
          return { isSynced: true };
        }
        return { isSynced: true };
      }
    }),

  // SHOW ALL THE PROPERTIES
  getAllProperties: tenantprivateProcedure.query(async () => {
    const properties = await db.property.findMany({
      where: {
        propertyStatus: PROPERTY_STATUS.EMPTY,
      },
      select: {
        id: true,
        name: true,
        address: true,
        images: true,
        area: true,
        city: true,
        state: true,
        zipCode: true,
        propertyStatus: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });
    return { success: true, properties };
  }),

  // OWNER API FUNCTIONS -------------------------------------------------

  // GET OWNER DETAILS
  getOwner: ownerPrivateProcedure.query(async ({ ctx }) => {
    const { owner } = ctx;
    return { success: true, owner };
  }),

  // UPDATE THE OWNER DETAILS
  updateOwnerDetails: ownerPrivateProcedure
    .input(
      z.object({
        contactNumber: z
          .string()
          .min(10)
          .max(10)
          .refine(
            (val) => /^\d+$/.test(val),
            "Aadhar number must contain only digits"
          ),
        adharNumber: z
          .string()
          .min(12)
          .max(12)
          .refine(
            (val) => /^\d+$/.test(val),
            "Aadhar number must contain only digits"
          ),
        adharImage: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { ownerId } = ctx;
      const properties = await db.property.count({
        where: {
          ownerId,
        },
      });
      await db.owner.update({
        where: {
          id: ownerId,
        },
        data: {
          contactNumber: Number(input.contactNumber),
          adharNumber: Number(input.adharNumber),
          adharImage: input.adharImage,
          numberOfProperties: properties,
        },
      });

      return { success: true };
    }),

  // ADD PROPERTY
  addProperty: ownerPrivateProcedure
    .input(
      z.object({
        name: z.string(),
        address: z.string(),
        area: z.string(),
        city: z.string(),
        state: z.string(),
        pinCode: z
          .string()
          .refine(
            (val) => /^\d+$/.test(val),
            "Aadhar number must contain only digits"
          ),
        images: z.array(z.string()).optional(),
        personLimit: z
          .string()
          .refine(
            (val) => /^\d+$/.test(val),
            "Aadhar number must contain only digits"
          ),
        propertyStatus: z.nativeEnum(PROPERTY_STATUS),
        rentAmount: z
          .string()
          .refine(
            (val) => /^\d+$/.test(val),
            "Aadhar number must contain only digits"
          ),
        depositAmount: z
          .string()
          .refine(
            (val) => /^\d+$/.test(val),
            "Aadhar number must contain only digits"
          ),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { ownerId } = ctx;
      await db.property.create({
        data: {
          address: input.address.toLowerCase(),
          area: input.area.toLowerCase(),
          city: input.city.toLowerCase(),
          images: input.images,
          name: input.name.toLowerCase(),
          personLimit: Number(input.personLimit),
          zipCode: Number(input.pinCode),
          propertyStatus: input.propertyStatus,
          rentAmount: Number(input.rentAmount),
          state: input.state.toLowerCase(),
          depositAmount: Number(input.depositAmount),
          ownerId,
        },
      });

      return { success: true };
    }),

  // ALL PROPERTIES
  allProperty: ownerPrivateProcedure.query(async ({ ctx }) => {
    const { ownerId } = ctx;
    const properties = await db.property.findMany({
      where: {
        ownerId,
      },
      select: {
        id: true,
        name: true,
        address: true,
        images: true,
        area: true,
        city: true,
        state: true,
        zipCode: true,
        propertyStatus: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return { success: true, properties };
  }),

  // SHOW SPECIFIC PROPERTY DETAILS TO THE OWNER
  showPropertyDetails: ownerPrivateProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      try {
        const { owner } = ctx;
        const property = await db.property.findUnique({
          where: { id: input.id },
          include: { owner: true },
        });
        if (!property) throw new TRPCError({ code: "NOT_FOUND" });

        return {
          ...property,
          owner: {
            ...property.owner,
            contactNumber: owner.contactNumber.toString(),
            adharNumber: owner.adharNumber.toString(),
          },
        };
      } catch (error) {
        console.error("Error fetching property details:", error);
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),

  //SHOW ALL THE PROPERTY REQUESTS BY THE USER
  getAllPropertyRequests: ownerPrivateProcedure.query(async ({ ctx }) => {
    const { ownerId } = ctx;
    const now = new Date();
    const startOfTheMonth = startOfMonth(now);
    const startOfTheWeek = startOfWeek(now);
    const startOfTheDay = startOfDay(now);
    const [monthlyRequests, weeklyRequest, todaysRequest] = await Promise.all([
      await db.propertyRequest.findMany({
        where: {
          ownerId,
          status: "PENDING",
          createdAt: {
            gte: startOfTheMonth,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          property: {
            select: {
              name: true,
              propertyStatus: true,
            },
          },
          tenant: {
            select: {
              name: true,
            },
          },
        },
      }),
      await db.propertyRequest.findMany({
        where: {
          ownerId,
          status: "PENDING",
          createdAt: {
            gte: startOfTheWeek,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          property: {
            select: {
              name: true,
              propertyStatus: true,
            },
          },
          tenant: {
            select: {
              name: true,
            },
          },
        },
      }),
      await db.propertyRequest.findMany({
        where: {
          ownerId,
          status: "PENDING",
          createdAt: {
            gte: startOfTheDay,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          property: {
            select: {
              name: true,
              propertyStatus: true,
            },
          },
          tenant: {
            select: {
              name: true,
            },
          },
        },
      }),
    ]);

    return { monthlyRequests, weeklyRequest, todaysRequest };
  }),

  //GET TENANT DETAILS
  getTenantDetailsForOwner: ownerPrivateProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const allDetails = await db.propertyRequest.findUnique({
        where: {
          id: input.id,
        },
        include: {
          tenant: true,
          property: true,
        },
      });

      return {
        ...allDetails,
        tenant: {
          ...allDetails?.tenant,
          contactNumber: allDetails?.tenant?.contactNumber?.toString() || "",
          adharNumber: allDetails?.tenant?.adharNumber?.toString() || "",
        },
      };
    }),

  // SET THE PROPERTY REQUEST STATUS
  updateThePropertyRequestStatus: ownerPrivateProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const propertyRequestDetails = await db.propertyRequest.findUnique({
        where: {
          id: input.id,
        },
      });
      await Promise.all([
        await db.propertyRequest.update({
          where: {
            id: input.id,
          },
          data: {
            status: "ACCEPTED",
          },
        }),
        await db.property.update({
          where: {
            id: propertyRequestDetails?.propertyId,
          },
          data: {
            tenantId: propertyRequestDetails?.tenantId,
          },
        }),
      ]);
      return { success: true };
    }),

  //REJECT THE PROPERTY REQUEST
  rejectPropertyRequest: ownerPrivateProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      await db.propertyRequest.update({
        where: {
          id: input.id,
        },
        data: {
          status: "REJECTED",
        },
      });
      return { success: true };
    }),

  // TENANT API FUNCTIONS -------------------------------------------------
  getTenant: tenantprivateProcedure.query(async ({ ctx }) => {
    const { tenant } = ctx;
    return { success: true, tenant };
  }),

  updateTenantDetails: tenantprivateProcedure
    .input(
      z.object({
        contactNumber: z
          .string()
          .min(10)
          .max(10)
          .refine(
            (val) => /^\d+$/.test(val),
            "Aadhar number must contain only digits"
          ),
        adharNumber: z
          .string()
          .min(12)
          .max(12)
          .refine(
            (val) => /^\d+$/.test(val),
            "Aadhar number must contain only digits"
          ),
        adharImage: z.string().optional(),
        workingArea: z.string(),
        tenantStatus: z.nativeEnum(TENANT_STATUS),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { tenantId } = ctx;
      await db.tenant.update({
        where: {
          id: tenantId,
        },
        data: {
          contactNumber: Number(input.contactNumber),
          adharNumber: Number(input.adharNumber),
          adharImage: input.adharImage,
          workingArea: input.workingArea,
          tenantStatus: input.tenantStatus,
        },
      });
      return { success: true };
    }),

  // SHOW SPECIFIC PROPERTY DETAILS TO THE TENANT
  showPropertyDetailsTenant: tenantprivateProcedure
    .input(
      z.object({
        id: z.string(),
        propertyRequestId: z.string().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      try {
        const { tenantId } = ctx;

        const [property, propertyRequest] = await Promise.all([
          // Fetch the property with the owner information
          db.property.findUnique({
            where: { id: input.id },
            include: { owner: true },
          }),

          // Fetch property request only if propertyRequestId is provided
          input.propertyRequestId
            ? db.propertyRequest.findUnique({
                where: {
                  id: input.propertyRequestId,
                },
              })
            : Promise.resolve(null),
        ]);

        if (!property) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Property not found",
          });
        }

        return {
          ...property,
          owner: {
            ...property.owner,
            contactNumber: property.owner?.contactNumber?.toString() || "",
            adharNumber: property.owner?.adharNumber?.toString() || "",
          },
          propertyRequest,
        };
      } catch (error) {
        console.error("Error fetching property details:", error);
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),

  // REQUEST FOR THE PROPERTY
  registerPropertyRequest: tenantprivateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      try {
        const { tenantId } = ctx;
        const property = await db.property.findUnique({
          where: { id: input.id },
          select: { ownerId: true },
        });
        const updatedPropertyRequest = await db.propertyRequest.create({
          data: {
            tenantId,
            propertyId: input.id,
            ownerId: property!.ownerId!,
            status: "PENDING",
          },
        });
        return { success: true, updatedPropertyRequest };
      } catch (error) {
        console.log("Error registering property request:", error);
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
