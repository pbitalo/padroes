import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormGroup } from "@angular/forms";
import { Observable, Subject } from "rxjs";
import { take } from "rxjs/operators";

import { HttpUtilService } from "@core/services/http-util.service";
import { AppResponsePadraoModel } from "@shared/models/interface/app-response-padrao.model";
import { PaginaResultadoPiweb } from "@shared/modules/modules/piweb-tabela";
import { QueryParamsEspecialidadePrincipalModel } from "../models/query-params-especialidade-principal.model";
import { PesquisarEspecialidadePrincipalDto } from "../models/dtos/pesquisar-especialidade-principal-dto";
import { AtualizarEspecialidadePrincipalDto } from "../models/dtos/atualizar-especialidade-principal-dto";
import { RecuperarEspecialidadePrincipalDto } from "../models/dtos/recuperar-especialidade-principal-dto";
import { environment } from "../../../../../../environments/environment";
import { QueryParamsEspecialidadeSecundariaModel } from "../../fm-especialidade-secundaria/models/query-params-especialidade-secundaria.model";
import { ParamsConsultaDto } from "@shared/models/interface/dtos/params-consulta-dto";
import { HistoricoAlteracaoModel } from "@shared/models/interface/historico-alteracao.model";
import { PesquisarEspecialidadeSecundariaDtoModel } from "../../fm-especialidade-secundaria/models/dtos/pesquisar-especialidade-secundaria-dto.model";
import { AutocompleteDtoModel } from "@shared/models/interface/dtos/autocomplete-dto.model";
import { FswHttpService } from "@shared/models/class/fsw-crud/fsw-http.service";
import { Router } from "@angular/router";
import { CadastrarEspecialidadePrincipalDto } from "../models/dtos/cadastrar-especialidade-principal-dto";

@Injectable({
  providedIn: "root",
})
export class EspecialidadePrincipalService extends FswHttpService {
  readonly url = environment.apiUrl;
  tempFiltroPesquisa: FormGroup;
  especialidadeSecundariaSubject = new Subject();
  especialidadeSecundaria$ = this.especialidadeSecundariaSubject.asObservable();
  moduleParentRouter = "/admin/especialidade-principal";

  constructor(
    private http: HttpClient,
    private httpUtil: HttpUtilService,
    router: Router
  ) {
    super(router);
  }

  atualizarDados(
    id: number,
    atualizarModeloDto: AtualizarEspecialidadePrincipalDto
  ): Observable<AppResponsePadraoModel> {
    return this.http
      .put<AppResponsePadraoModel>(
        `${this.url}/especialidade-principal/${id}`,
        atualizarModeloDto
      )
      .pipe(take(1));
  }

  cadastrarDados(
    cadastrarModeloDto: CadastrarEspecialidadePrincipalDto
  ): Observable<AppResponsePadraoModel> {
    return this.http
      .post<AppResponsePadraoModel>(
        `${this.url}/especialidade-principal`,
        cadastrarModeloDto
      )
      .pipe(take(1));
  }

  pesquisarDados(
    queryParamConsulta?: QueryParamsEspecialidadePrincipalModel
  ): Observable<PaginaResultadoPiweb<PesquisarEspecialidadePrincipalDto>> {
    return this.http
      .get<PaginaResultadoPiweb<PesquisarEspecialidadePrincipalDto>>(
        `${this.url}/especialidade-principal`,
        {
          params: this.httpUtil.httpParamsByObjeto(queryParamConsulta),
        }
      )
      .pipe(take(1));
  }

  recuperarDados(id: number): Observable<RecuperarEspecialidadePrincipalDto> {
    return this.http
      .get<RecuperarEspecialidadePrincipalDto>(
        `${this.url}/especialidade-principal/${id}`
      )
      .pipe(take(1));
  }

  baixarArquivo(
    queryParams: QueryParamsEspecialidadePrincipalModel,
    arquivo: string
  ): void {
    this.http
      .get(`${this.url}/especialidade-principal/${arquivo}`, {
        params: this.httpUtil.httpParamsByObjeto(queryParams),
        observe: "response",
        responseType: "arraybuffer" as "json",
      })
      .subscribe((response) => {
        this.httpUtil.baixarArquivo(
          response,
          response.headers.get("content-type")
        );
      });
  }

  recuperarHistoricoAlteracao(
    id: number,
    queryParamVisualizar: ParamsConsultaDto
  ): Observable<PaginaResultadoPiweb<HistoricoAlteracaoModel>> {
    return this.http.get<PaginaResultadoPiweb<HistoricoAlteracaoModel>>(
      `${this.url}/especialidade-principal/historico-revisoes/${id}`,
      {
        params: this.httpUtil.httpParamsByObjeto(queryParamVisualizar),
      }
    );
  }

  pesquisarEspecialidadeSecundaria(
    queryParamConsulta: QueryParamsEspecialidadeSecundariaModel
  ): Observable<
    PaginaResultadoPiweb<PesquisarEspecialidadeSecundariaDtoModel>
  > {
    return this.http
      .get<PaginaResultadoPiweb<PesquisarEspecialidadeSecundariaDtoModel>>(
        `${this.url}/especialidades-secundarias`,
        {
          params: this.httpUtil.httpParamsByObjeto(queryParamConsulta),
        }
      )
      .pipe(take(1));
  }

  recuperarEspecialidadeSecundaria(
    queryParams: object
  ): Observable<AutocompleteDtoModel[]> {
    return this.http.get<AutocompleteDtoModel[]>(
      `${this.url}/especialidades-secundarias/filtro`,
      {
        params: this.httpUtil.httpParamsByObjeto(queryParams),
      }
    );
  }

  recuperarCbo(queryParams: object): Observable<AutocompleteDtoModel[]> {
    return this.http.get<AutocompleteDtoModel[]>(`${this.url}/cbo/filtro`, {
      params: this.httpUtil.httpParamsByObjeto(queryParams),
    });
  }
}
