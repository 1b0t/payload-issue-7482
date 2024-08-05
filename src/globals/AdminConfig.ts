import { GlobalConfig } from "payload/types";

export const AdminConfig: GlobalConfig = {
  slug: "admin-config",
  fields: [
    {
      name: "feature1",
      type: "checkbox",
      access: {
        read: () => true,
      },
    },
  ],
};
