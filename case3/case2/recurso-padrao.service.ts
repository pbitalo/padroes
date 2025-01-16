import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { Injector } from "@angular/core";

import { RecursoPadraoModelo } from "@shared/models/recurso-padrao-model";
import { AppResponsePadraoModel } from "@shared/models/interface/app-response-padrao.model";
import { ParamsConsultaDto } from "@shared/models/interface/dtos/params-consulta-dto";
import { environment } from "../../../environments/environment";
import { HttpUtilService } from "@core/services/http-util.service";
import { PaginaResultadoPiweb } from "@shared/modules/modules/piweb-tabela";
import { HistoricoAlteracaoModel } from "@shared/models/interface/historico-alteracao.model";

export abstract class RecursoPadraoServico<T extends RecursoPadraoModelo> {
  readonly url = environment.apiUrl;

  protected http: HttpClient;

  protected httpUtil: HttpUtilService;

  _path = "";

  constructor(protected apiPath: string, protected injector: Injector) {
    this._path = apiPath;
    this.http = injector.get(HttpClient);
    this.httpUtil = injector.get(HttpUtilService);
  }

  get urlCompleta() {
    return `${this.url}/${this._path}`;
  }

  salvar(resource: T): Observable<T> {
    return resource.id ? this.atualizar(resource) : this.criar(resource);
  }

  criar(resource: T): Observable<T> {
    return this.http
      .post(`${this.urlCompleta}`, resource)
      .pipe(map(() => resource));
  }

  atualizar(resource: T): Observable<T> {
    return this.http
      .put(`${this.urlCompleta}${resource.id}`, resource)
      .pipe(map(() => resource));
  }

  deletar(id: number): Observable<AppResponsePadraoModel> {
    return this.http.delete(`${this.urlCompleta}${id}`).pipe(map(() => null));
  }

  pegarRecursoAlternativo(params: any, path: string) {
    return this.pegarDados(params, path);
  }

  pegarTodos(params: T) {
    return this.pegarDados(params);
  }

  pegarDados(params: any, path?: string): Observable<PaginaResultadoPiweb<T>> {
    return this.http
      .get<PaginaResultadoPiweb<T>>(
        path ? `${this.url}/${path}` : `${this.urlCompleta}`,
        { params: this.httpUtil.httpParamsByObjeto(params) }
      )
      .pipe(take(1));
  }

  pegarPorId(id: number): Observable<T> {
    return this.http.get<T>(`${this.urlCompleta}${id}`).pipe(take(1));
  }

  pegarHistoricoRevisoes(
    id: number,
    params: ParamsConsultaDto
  ): Observable<PaginaResultadoPiweb<HistoricoAlteracaoModel>> {
    return this.http.get<PaginaResultadoPiweb<HistoricoAlteracaoModel>>(
      `${this.urlCompleta}historico-revisoes/${id}`,
      { params: this.httpUtil.httpParamsByObjeto(params) }
    );
  }

  baixarArquivo(params: T, tipoArquivo: string): void {
    this.http
      .get(`${this.urlCompleta}${tipoArquivo}`, {
        params: this.httpUtil.httpParamsByObjeto(params),
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

  // pegarTodos(params: T): Observable<T> {

  //     return this.http.get(`${ this.urlCompleta }`,
  //     { params: this.httpUtil.httpParamsByObjeto(params)} )
  //     .pipe(
  //         map( this.converterJsonRecursos.bind(this) )
  //     );

  // }

  // pegarRecursoAlternativo(params: any, path: string): Observable<PaginaResultadoPiweb<T>> {

  //     return this.http.get<PaginaResultadoPiweb<T>>(`${this.url}/${path}`,
  //     { params: this.httpUtil.httpParamsByObjeto(params)} ).pipe( take(1) );

  // }

  // protected converterJsonRecursos(json: any): T {

  //     const resources = {} as PaginaResultadoPiweb<any>;

  //     resources.itens = [];

  //     json.itens.forEach(
  //         element => resources.itens.push( this.converterJsonRecursoFn(element) )
  //     );

  //     json.itens = resources.itens;

  //     return json;

  // }

  // protected converterJsonRecurso(json: any): T {

  //     return this.converterJsonRecursoFn(json);

  // }

  // protected converterJsonRecursosAlt(json: any): T {

  //     const resources = {} as PaginaResultadoPiweb<any>;

  //     resources.itens = json.itens;
  //     resources.totalRegistros = json.totalRegistros;

  //     return json;

  // }
}
