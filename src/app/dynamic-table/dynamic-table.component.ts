import {DataSource, SelectionModel} from '@angular/cdk/collections';
import {
  AfterContentInit,
  Component,
  ContentChildren,
  Input,
  QueryList,
  ViewChild,
  ContentChild,
  OnInit,
  OnChanges,
  ViewChildren, ViewContainerRef, SimpleChanges
} from '@angular/core';
import {
  MatColumnDef,
  MatFooterRowDef,
  MatHeaderRowDef,
  MatNoDataRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';

import { ColumnDefinition } from '../models/column-definition.model';

/**
 * Table component that accepts column and row definitions in its content to be registered to the
 * table.
 */
@Component({
  selector: 'wrapper-table',
  styleUrls: ['dynamic-table.component.scss'],
  templateUrl: 'dynamic-table.component.html'
})
export class DynamicTableComponent<T> implements OnInit, OnChanges, AfterContentInit {

  @Input()  showFooter:        boolean;
  @Input()  displayedColumns:  string[];
  @Input()  displayColumnDefs: ColumnDefinition[];
  @Input()  showSelectBox:     boolean;
  @Input()  dataList:          T[];
  selection:                   SelectionModel<T>;
  dataSource:                  MatTableDataSource<T>;

  @ContentChildren(MatHeaderRowDef) headerRowDefs: QueryList<MatHeaderRowDef>;
  @ContentChildren(MatRowDef)       rowDefs:       QueryList<MatRowDef<T>>;
  @ContentChildren(MatHeaderRowDef) footerRowDefs: QueryList<MatFooterRowDef>;
  @ContentChildren(MatColumnDef)    columnDefs:    QueryList<MatColumnDef>;
  @ContentChild(MatNoDataRow)       noDataRow:     MatNoDataRow;

  @ViewChild(MatTable, {static: true}) table: MatTable<T>;
  @ViewChildren('matrow', { read: ViewContainerRef }) rows: QueryList<ViewContainerRef>;

  constructor() {}

  ngAfterContentInit() {
    this.columnDefs.forEach(columnDef       => this.table.addColumnDef(columnDef));
    this.rowDefs.forEach(rowDef             => this.table.addRowDef(rowDef));
    this.headerRowDefs.forEach(headerRowDef => this.table.addHeaderRowDef(headerRowDef));
    this.table.setNoDataRow(this.noDataRow);

    if (this.showFooter) {
      this.footerRowDefs.forEach(footerRowDef => this.table.addFooterRowDef(footerRowDef));
    } else {
      this.footerRowDefs.forEach(footerRowDef => this.table.removeFooterRowDef(footerRowDef));
    }

    // init grid state
    this.selection = new SelectionModel<T>(true, []);
    this.table.setNoDataRow(this.noDataRow);
  }

  ngOnInit(): void {
    if (!this.displayedColumns) {
      this.displayedColumns = this.displayColumnDefs.map(col => col.key);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.dataList && changes.dataList.currentValue) {
      this.dataSource = new MatTableDataSource<T>(this.dataList);
    }
  }

  selectRow(row: T): void {
    // this.rowSelected.emit(row);
  }

  // ----START CHECKBOX LOGIC

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const  numSelected = this.selection.selected.length;
    const  numRows     = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ? this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: T): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row`; //  ${row.id + 1}
  }
  // ----END CHECKBOX LOGIC
}
