import { Injectable, Injector } from "@angular/core";

import { RecursoPadraoServico } from "app/shared/shared-services/recurso-padrao.service";
import { pathEtnia } from "@shared/models/enum/path-servicos.enum";
import { EtniaPadrao } from "../model/etnia-dto.model";

@Injectable({
  providedIn: "root",
})
export class EtniaService extends RecursoPadraoServico<EtniaPadrao> {
  constructor(protected injector: Injector) {
    super(pathEtnia.PADRAO, injector);
  }
}
