import { Candidat } from "./candidat";
import { Formateur } from "./formateur";
import { Formation } from "./formation";

export interface Session {
  id: number;
  formationId: number;
  formateursIds: number[];
  candidats: Candidat[];
  dateDebut: string;
  dateFin: string;
  description: string;
}
