import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {EmploiDuTempService} from '../../../../_services/emploi-du-temp.service';
import {Router} from '@angular/router';
import {ErrorHandlerService} from '../../../../_services/error-handler.service';
import {EmploiDuTemp} from '../../../../_models/emploi-du-temp.model';

@Component({
  selector: 'app-emploi-du-temp-list',
  templateUrl: './emploi-du-temp-list.component.html',
  styleUrls: ['./emploi-du-temp-list.component.css']
})
export class EmploiDuTempListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['codeModule', 'codeClasse', 'anneeDeb', 'semestre', 'numSemestre', 'typeSeance', 'jour', 'update'];
  public dataSource = new MatTableDataSource<EmploiDuTemp>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private repo: EmploiDuTempService,
              private router: Router,
              private errorService: ErrorHandlerService) { }

  ngOnInit(): void {
    this.getAllEmplois();
  }
  public getAllEmplois = () => {
    this.repo.getData('api/EmploiDuTemp')
      .subscribe(res => {
          this.dataSource.data = res as EmploiDuTemp[];
        },
        (error) => {
          this.errorService.handleError(error);
        });
  }

  get emplois(): EmploiDuTemp[] {
    return this.repo.emplois;
  }

  get emploi(): EmploiDuTemp {
    return this.repo.emploi;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public redirectToDetails = (id: string) => {
    const url = `/emploi-du-temp-detail/${id}`;
    this.router.navigate([url]);
  }

  public redirectToUpdatePage = (id) => {
    const updateUrl = `/emploi-du-temp-update/${id}`;
    this.router.navigate([updateUrl]);
  }

  public redirectToDelete = (id: string) => {

  }
}
