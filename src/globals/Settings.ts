import { GlobalConfig } from "payload/types";

export const Settings: GlobalConfig = {
  slug: "settings",
  fields: [
    {
      name: "option1",
      type: "checkbox",
      access: {
        read: () => true,
      },
    },
  ],
};
