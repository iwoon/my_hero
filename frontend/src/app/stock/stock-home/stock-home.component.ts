import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductResponse } from 'src/app/models/product.model';
import { NetworkService } from 'src/app/services/network.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stock-home',
  templateUrl: './stock-home.component.html',
  styleUrls: ['./stock-home.component.css']
})
export class StockHomeComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['productId', 'name', 'price', 'stock', 'action'];
  dataSource = new MatTableDataSource<ProductResponse>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  get soldout(): number {
    return this.dataSource.data.reduce(
      (sum, product) => product.stock <= 0 ? sum + 1 : sum,
      0
    );
  }

  constructor(
    private networkService: NetworkService
  ) { }

  ngOnInit(): void {
    this.feedProduct();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  feedProduct(): void {
    this.networkService.getProducts().subscribe(
      result => {
        this.dataSource.data = result;
      },
      error => {
        alert(JSON.stringify(error))
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onClickDelete(productId: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteProduct(productId);
      }
    })
  }

  deleteProduct(productId: string): void {
    this.networkService.deleteProducts(productId).subscribe(
      result => {
        Swal.fire({
          icon: 'success',
          text: 'Successfully Deleted'
        })
        this.feedProduct();
      },
      error => {
        alert(JSON.stringify(error))
      }
    );
  }
}
