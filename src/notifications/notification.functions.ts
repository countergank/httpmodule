import { replaceAll } from "../functions";
import {
  BodyQueue,
  BodyRequestNotification,
  NameValue,
} from "./notification.interfaces";

export const convertInterfaceToArrayNameValue = (data: any): NameValue[] => {
  if (!data) {
    return [];
  }
  try {
    const resp: NameValue[] = [];
    for (const [key] of Object.entries(data)) {
      resp.push({
        name: key,
        value: data[key],
      });
    }
    return resp;
  } catch (error) {
    return [];
  }
};

export const bodyIsOk = (body: BodyRequestNotification): boolean => {
  const infoOk =
    body?.rawHTML || (Array.isArray(body.info) && body.info.length > 0);

  if (
    !body?.key ||
    !infoOk ||
    !Array.isArray(body.target) ||
    body.target.length === 0
  ) {
    return false;
  }
  return true;
};

export const bodyQueueIsOk = (body: BodyQueue): boolean => {
  if (!body || !body.email || !body.content) {
    return false;
  }
  return true;
};

export const buildTemplate = (
  contentHTML: string,
  title: string,
  info: NameValue[]
): {
  content: string;
  title: string;
} => {
  let content = contentHTML;
  if (!content || content === "") {
    return {
      content: "",
      title,
    };
  }

  const trashComments: any[] = [];
  const getTemplateTable = (
    prefix: string,
    text: string
  ): { content: string; subcontent: string } => {
    const beginStr = "<!-- BEGIN " + prefix.toUpperCase() + " -->";
    const endStr = "<!-- END " + prefix.toUpperCase() + " -->";
    const indexBegin = text.indexOf(beginStr, 0);
    const indexEnd = text.indexOf(endStr, 0);
    trashComments.push(beginStr);
    trashComments.push(endStr);
    const aux = replaceAll(text, [beginStr, endStr], ["", ""], true);
    if (indexBegin && indexEnd && indexBegin > 0 && indexBegin < indexEnd) {
      return {
        content: aux,
        subcontent: text.substr(
          indexBegin + beginStr.length,
          indexEnd - indexBegin
        ),
      };
    }

    return {
      content: aux,
      subcontent: "",
    };
  };
  const simpleFileNames: NameValue[] = [];
  for (const item of info) {
    if (!item?.name) {
      continue;
    }
    if (Array.isArray(item.value)) {
      const subItem = getTemplateTable(item.name, content);

      if (subItem.subcontent !== "") {
        let fullTemplate = "";

        for (const subitem of item.value) {
          let bufferText = subItem.subcontent;
          for (const [key] of Object.entries(subitem)) {
            bufferText = replaceAll(
              bufferText,
              [`{{${key.toUpperCase()}}}`],
              [subitem[key] || ""],
              true
            );
          }
          fullTemplate += bufferText;
        }
        content = replaceAll(
          content,
          [subItem.subcontent],
          [fullTemplate],
          true
        );
      } else {
        content = subItem.content;
      }
    } else {
      simpleFileNames.push(item);
    }
  }
  /*
    Se almacena en un array a parte todos los campos simples, ya que dentro de un campo tabla,
    puede existir el mismo nombre de campo, entonces lo reemplaza mal.
    Ejemplo:
    [
      {name: "nombre", value: "pepe"},
      {name: "items", value: [{nombre: "juan", apellido: "perez"},{nombre: "maria", apellido: "gomez"}]}
    ]
    Se reemplazaria todas las incidencias de campo nombre por "pepe"
  */
  for (const item of simpleFileNames) {
    title = replaceAll(
      title,
      [`{{${item.name.toUpperCase()}}}`],
      [item.value || ""],
      true
    );
    content = replaceAll(
      content,
      [`{{${item.name.toUpperCase()}}}`],
      [item.value || ""],
      true
    );
  }

  for (const comment of trashComments) {
    title = replaceAll(title, [comment], [""], true);
    content = replaceAll(content, [comment], [""], true);
  }

  return {
    content: removeUnknownFileds(content),
    title: removeUnknownFileds(title),
  };
};

export const removeUnknownFileds = (content: string): string => {
  const beginStr = "{{";
  const endStr = "}}";
  let indexBegin = content.indexOf(beginStr, 0);
  let indexEnd = content.indexOf(endStr, 0);
  let control = 1000;
  while (
    control > 0 &&
    indexBegin &&
    indexEnd &&
    indexBegin > 0 &&
    indexBegin < indexEnd
  ) {
    const aux = content.substr(
      indexBegin,
      indexEnd - indexBegin + beginStr.length
    );
    content = content.replace(aux, "");
    indexBegin = content.indexOf(beginStr, 0);
    indexEnd = content.indexOf(endStr, 0);
    control--;
  }
  return content;
};
