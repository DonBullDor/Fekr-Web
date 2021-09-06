import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrorHandlerService} from 'src/app/_services/error-handler.service';
import {PlanEtudeService} from '../../../../_services';
import {MatTableDataSource} from '@angular/material/table';
import {PlanEtude} from '../../../../_models/plan-etude.model';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-plan-etude-list',
  templateUrl: './plan-etude-list.component.html',
  styleUrls: ['./plan-etude-list.component.css']
})
export class PlanEtudeListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['module', 'classe', 'annee', 'idEnseignant', 'detail', 'update'];
  public dataSource = new MatTableDataSource<PlanEtude>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private repo: PlanEtudeService,
              private activeRoute: ActivatedRoute,
              private router: Router,
              private errorService: ErrorHandlerService) {
  }

  ngOnInit(): void {
    this.getAllPlansEtudes();
  }

  public getAllPlansEtudes = () => {
    this.repo.getData('api/PlanEtude')
      .subscribe(res => {
          this.dataSource.data = res as PlanEtude[];
        },
        (error) => {
          this.errorService.handleError(error);
        });
  }

  get planEtudes(): PlanEtude[] {
    return this.repo.planEtudes;
  }

  get planEtude(): PlanEtude {
    return this.repo.planEtude;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public redirectToDetails = (id: string) => {
    const url = `/plan-etude-detail/${id}`;
    this.router.navigate([url]);
  }

  public redirectToUpdate = (id: string) => {

  }

}
