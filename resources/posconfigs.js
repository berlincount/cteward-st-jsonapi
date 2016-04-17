var jsonApi = require("jsonapi-server");
var posconfigHandler = require("../handlers/posconfigHandler.js");

jsonApi.define({
  namespace: "json:api",
  resource: "posconfigs",
  description: "Represents discoverable configuration information for c-base-pos systems",
  handlers: posconfigHandler,
  attributes: {
    description: jsonApi.Joi.string().required()
      .description("A description of the configuration")
      .example("Example configuration"),
    created: jsonApi.Joi.string().isoDate()
      .description("The date and time on which the config was created, ISO 8601")
      .example("2016-04-17"),
    changed: jsonApi.Joi.string().isoDate()
      .description("The date and time on which the config was changed, ISO 8601")
      .example("2016-04-19T0341+00:00"),
    editor: jsonApi.Joi.one("people")
      .description("The last person editing it"),
    pricelists: jsonApi.Joi.many("pricelists")
      .description("All of the pricelists associated with this configuration"),
    account: jsonApi.Joi.one("accounts")
      .description("Account where money is registered")
  },
  examples: [
    {
      id: "default",
      type: "posconfigs",
      description: "Test configuration",
      created: "2016-04-17",
      editor: {
        type: "people",
        id: "530e3ef2-876c-4c27-bccf-e12f6f168b0d",
        meta: { updated: "2016-04-17" }
      },
      pricelists: [
        { type: "pricelists", id: "88db86cb-87be-44b0-b735-d5c73d4eab32" },
        { type: "pricelists", id: "507b0af7-d83e-4727-ae8b-5af5cf434ea2" },
        { type: "pricelists", id: "c8b8b78e-b03a-4529-b134-cf769e9daba2" }
      ],
      meta: {
        updated: "2016-04-17"
      }
    }
  ]
});
