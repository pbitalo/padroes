import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { take } from "rxjs/operators";
import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { PaginaResultadoPiweb } from "@shared/modules/modules/piweb-tabela";
import { environment } from "../../../../../../environments/environment";
import { HttpUtilService } from "@core/services/http-util.service";
import { PesquisarEtniaDtoModel } from "../models/dtos/pesquisar-etnia-dto.model";
import { RecuperarEtniaDtoModel } from "../models/dtos/recuperar-etnia-dto.model";
import { AppResponsePadraoModel } from "@shared/models/interface/app-response-padrao.model";
import { EditarEtniaDtoModel } from "../models/dtos/editar-etnia-dto.model";
import { CadastrarEtniaDtoModel } from "../models/dtos/cadastrar-etnia-dto.model";
import { QueryParamsEtniaModel } from "../models/query-params-etnia.model";
import { ParamsConsultaDto } from "@shared/models/interface/dtos/params-consulta-dto";
import { HistoricoAlteracaoModel } from "@shared/models/interface/historico-alteracao.model";
import { Router } from "@angular/router";
import { FswHttpService } from "@shared/models/class/fsw-crud/fsw-http.service";

@Injectable({
  providedIn: "root",
})
export class EtniaService extends FswHttpService {
  readonly url = environment.apiUrl;
  moduleParentRouter = "/admin/etnia";
  tempFiltroPesquisa: FormGroup;

  constructor(
    private http: HttpClient,
    private httpUtil: HttpUtilService,
    router: Router
  ) {
    super(router);
  }

  pesquisarDados(
    queryParamConsulta: QueryParamsEtniaModel
  ): Observable<PaginaResultadoPiweb<PesquisarEtniaDtoModel>> {
    return this.http
      .get<PaginaResultadoPiweb<PesquisarEtniaDtoModel>>(`${this.url}/etnia`, {
        params: this.httpUtil.httpParamsByObjeto(queryParamConsulta),
      })
      .pipe(take(1));
  }

  cadastrarDados(
    dados: CadastrarEtniaDtoModel
  ): Observable<AppResponsePadraoModel> {
    return this.http
      .post<AppResponsePadraoModel>(`${this.url}/etnia`, dados)
      .pipe(take(1));
  }

  recuperarDados(id: number): Observable<RecuperarEtniaDtoModel> {
    return this.http
      .get<RecuperarEtniaDtoModel>(`${this.url}/etnia/${id}`)
      .pipe(take(1));
  }

  atualizarDados(
    id: number,
    dados: EditarEtniaDtoModel
  ): Observable<AppResponsePadraoModel> {
    return this.http
      .put<AppResponsePadraoModel>(`${this.url}/etnia/${id}`, dados)
      .pipe(take(1));
  }

  removerDados(id: number): Observable<AppResponsePadraoModel> {
    return this.http
      .delete<AppResponsePadraoModel>(`${this.url}/etnia/${id}`)
      .pipe(take(1));
  }

  recuperarHistoricoAlteracao(
    id: number,
    queryParams: ParamsConsultaDto
  ): Observable<PaginaResultadoPiweb<HistoricoAlteracaoModel>> {
    return this.http.get<PaginaResultadoPiweb<HistoricoAlteracaoModel>>(
      `${this.url}/etnia/historico-revisoes/${id}`,
      {
        params: this.httpUtil.httpParamsByObjeto(queryParams),
      }
    );
  }
}
