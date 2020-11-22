import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {ColumnDefinition} from './models/column-definition.model';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1,  name: 'Hydrogen',  weight: 1.0079,  symbol: 'H'  },
  {position: 2,  name: 'Helium',    weight: 4.0026,  symbol: 'He' },
  {position: 3,  name: 'Lithium',   weight: 6.941,   symbol: 'Li' },
  {position: 4,  name: 'Beryllium', weight: 9.0122,  symbol: 'Be' },
  {position: 5,  name: 'Boron',     weight: 10.811,  symbol: 'B'  },
  {position: 6,  name: 'Carbon',    weight: 12.0107, symbol: 'C'  },
  {position: 7,  name: 'Nitrogen',  weight: 14.0067, symbol: 'N'  },
  {position: 8,  name: 'Oxygen',    weight: 15.9994, symbol: 'O'  },
  {position: 9,  name: 'Fluorine',  weight: 18.9984, symbol: 'F'  },
  {position: 10, name: 'Neon',      weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  displayColumnDefs: ColumnDefinition[] = [
    { key: 'position', label: 'Position', cell: (element: PeriodicElement) => element.position ? `${element.position}` : '' },
    { key: 'name',     label: 'Name',     cell: (element: PeriodicElement) => element.name     ? `${element.name}`     : '' },
    { key: 'weight',   label: 'Weight',   cell: (element: PeriodicElement) => element.weight   ? `${element.weight}`   : '' },
    { key: 'symbol',   label: 'Symbol',   cell: (element: PeriodicElement) => element.symbol   ? `${element.symbol}`   : '' }
  ];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  data: PeriodicElement[] = ELEMENT_DATA;

  // @ViewChild('sort') sort: MatSort;

  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
  }

  clearTable() {
    // this.dataSource.data = [];
  }

  addData() {
    // this.dataSource.data = ELEMENT_DATA;
  }
}
