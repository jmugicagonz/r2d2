import { TbPdf } from "react-icons/tb";
import { Document } from "./lib/types"; // text-ellipsis overflow-hidden ...

export function DocumentCard({ document, number }: { document: Document, number: number}) {
    return (
        <div className="flex flex-col font-sans pb-10">
          <div className="flex flex-row items-center gap-2 text-slate-400 pb-2"> 
              <p className="text-sm text-nowrap"><b>[ {number} ]</b></p>
              <p className="text-xs truncate">{document.uri}</p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <div
              style={{
                backgroundColor: "#ff0000",
              }}
              className="w-4 h-4 rounded"
            >
              <TbPdf
                style={{
                  color: "#ffffff",
                }}
              />
            </div>
            <h1 className="text-lg">
              <b>
                <a href={document.uri} target="_blank" rel="noopener noreferrer">
                  {document.title}
                </a>
              </b>
            </h1>
          </div>
          <div className="text-sm pb-2" dangerouslySetInnerHTML={{ __html: document.extractive_answer }}/>
          <div className="text-slate-500/75 text-sm"><b>Page {document.page_number}</b></div>
      </div>
    )
}