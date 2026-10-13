import { TextReferenceType } from "../types/enums";
import type { TextReferenceModel } from "../data/models/textReferenceModel";

import ExLink from "../components/exLink/exLink";

export default function ReferenceDescription(description: string, textReferenceModelList: TextReferenceModel[]): React.ReactNode {

    const referenceDictionary: Record<string, TextReferenceModel> = textReferenceModelList.reduce((accumlator, model) => {
      accumlator[model.referenceCode] = model;
      return accumlator;
    }, {} as Record<string, TextReferenceModel>)

    const descriptionParts = description.split (/(\B@\d+)/g)
                                        .filter(part => part !== '');

    const descriptionComponent = descriptionParts.map((part, index) => {

      const textReferenceModel = referenceDictionary[part];

      return part.startsWith('@') ? (
        textReferenceModel.waypointTextReferenceModel ? (
          <ExLink
            key={index}
            name={textReferenceModel.name}
            params={['terrain', textReferenceModel.waypointTextReferenceModel.regionName, textReferenceModel.waypointTextReferenceModel.terrainName]}
            optionalParams={{waypoint: textReferenceModel.name}}
          />
        ) : (
          <ExLink
            key={index}
            name={textReferenceModel.name}
            params={[TextReferenceType[textReferenceModel.type].toLowerCase(), textReferenceModel.name]} 
          />
        )
      ) : (
        <span key={index}>{part}</span>
      );
    });

    return (
      descriptionComponent
    )
  }