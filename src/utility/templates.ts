import * as Handlebars from "handlebars";
import _, { capitalize } from "lodash";
import pluralize from "pluralize";

Handlebars.registerHelper("capitalize", _.capitalize);
Handlebars.registerHelper("pluralize", pluralize);
Handlebars.registerHelper("capitalize_pluralize", (str) =>
  capitalize(pluralize(str))
);

export function compile(content: string) {
  return Handlebars.compile(content);
}

export function plural(content: string) {
  return pluralize(content);
}
