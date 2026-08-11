import { TextReferenceType } from "../types/enums";
import type { TextReferenceModel } from "../data/models/textReferenceModel";

import ExLink from "../components/exLink/exLink";

export default function ReferenceDescription(description: string, textReferenceModelList: TextReferenceModel[]) {

    const referenceDictionary: Record<string, TextReferenceModel> = textReferenceModelList.reduce((accumlator, model) => {
      accumlator[model.referenceCode] = model;
      return accumlator;
    }, {} as Record<string, TextReferenceModel>)

    const descriptionParts = description.split (/(\B@\d+)/g)
                                        .filter(part => part !== '');

    const descriptionComponent = descriptionParts.map((part, index) => {

      return part.startsWith('@') ? (
        <ExLink
          key={index}
          pageName={TextReferenceType[referenceDictionary[part].type].toLowerCase()}
          name={referenceDictionary[part].name}
        />
      ) : (
        <span key={index}>{part}</span>
      )
    });

    return (
      <>{descriptionComponent}</>
    )
  }