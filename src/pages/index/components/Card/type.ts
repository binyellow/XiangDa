import { NewRecord, NewsRes } from "../../type";

// Componet_CardProps
export interface CCardProps {
  dataSource: NewsRes["data"];
}

// Component_NewsProps
export interface CNewsProps {
  dataSource: NewRecord["data"];
}
