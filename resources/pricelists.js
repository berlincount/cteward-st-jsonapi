var jsonApi = require("jsonapi-server");
var posconfigHandler = require("../handlers/pricelistHandler.js");

jsonApi.define({
  namespace: "json:api",
  resource: "pricelists",
  description: "Represents good-to-price mappings for c-base-pos systems",
  handlers: posconfigHandler,
  attributes: {
    description: jsonApi.Joi.string().required()
      .description("A description of the price list")
      .example("Example pricelist"),
    color: jsonApi.Joi.string().hex().length(6)
      .description("Color to identify buttons or items related to this pricelist"),
    label: jsonApi.Joi.string().hex().length(6)
      .description("Label for buttons related to this pricelist"),
    created: jsonApi.Joi.string().isoDate()
      .description("The date and time on which the price list was created, ISO 8601")
      .example("2016-04-17"),
    changed: jsonApi.Joi.string().isoDate()
      .description("The date and time on which the price list was changed, ISO 8601")
      .example("2016-04-19T0341+00:00"),
    editor: jsonApi.Joi.one("people")
      .description("The last person editing it"),
    validfrom: jsonApi.Joi.string().isoDate()
      .description("The date and time after which the price list is valid")
      .example("2016-04-17"),
    validto: jsonApi.Joi.string().isoDate()
      .description("The date and time until which the price list is valid")
      .example("2116-04-17"),
    configs: jsonApi.Joi.belongsToMany({
         resource: "posconfigs",
         as: "pricelists"})
      .description("Configs in which this pricelist is used"),
    goods: jsonApi.Joi.many("goods")
  },
  examples: [
    {
      id: "88db86cb-87be-44b0-b735-d5c73d4eab32",
      type: "pricelists",
      description: "Test pricelist member",
      created: "2016-04-17",
      editor: {
        type: "people",
        id: "530e3ef2-876c-4c27-bccf-e12f6f168b0d",
        meta: { updated: "2016-04-17" }
      },
      goods: [
        { type: "goods", id: "7e1a54f6-9c5f-4765-ad29-70e316c8c0eb", meta: { label: "Clubmate 0,5l",         price: 1.30 }},
        { type: "goods", id: "5987dd1b-01d8-4be5-9a51-19dad8148ca2", meta: { label: "Flora Power Mate 0,5l", price: 1.30 }},
        { type: "goods", id: "3e5c4298-b456-4068-9fd4-abf559d3d4a6", meta: { label: "Random",                price: 0.10 }}
      ],
      meta: {
        updated: "2016-04-17"
      }
    },
    {
      id: "507b0af7-d83e-4727-ae8b-5af5cf434ea2",
      type: "pricelists",
      description: "Test pricelist alien",
      created: "2016-04-17",
      editor: {
        type: "people",
        id: "530e3ef2-876c-4c27-bccf-e12f6f168b0d",
        meta: { updated: "2016-04-17" }
      },
      goods: [
        { type: "goods", id: "7e1a54f6-9c5f-4765-ad29-70e316c8c0eb", meta: { label: "Clubmate 0,5l",         price: 2.00 }},
        { type: "goods", id: "5987dd1b-01d8-4be5-9a51-19dad8148ca2", meta: { label: "Flora Power Mate 0,5l", price: 2.00 }},
        { type: "goods", id: "3e5c4298-b456-4068-9fd4-abf559d3d4a6", meta: { label: "Random",                price: 0.10 }}
      ],
      meta: {
        updated: "2016-04-17"
      }
    },
    {
      id: "c8b8b78e-b03a-4529-b134-cf769e9daba2",
      type: "pricelists",
      description: "Test pricelist party",
      created: "2016-04-17",
      editor: {
        type: "people",
        id: "530e3ef2-876c-4c27-bccf-e12f6f168b0d",
        meta: { updated: "2016-04-17" }
      },
      goods: [
        { type: "goods", id: "7e1a54f6-9c5f-4765-ad29-70e316c8c0eb", meta: { label: "Clubmate 0,5l",         price: 2.00 }},
        { type: "goods", id: "5987dd1b-01d8-4be5-9a51-19dad8148ca2", meta: { label: "Flora Power Mate 0,5l", price: 2.00 }},
        { type: "goods", id: "3e5c4298-b456-4068-9fd4-abf559d3d4a6", meta: { label: "Random",                price: 0.10 }}
      ],
      meta: {
        updated: "2016-04-17"
      }
    }
  ]
});
