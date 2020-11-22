export interface ColumnDefinition {
    key:        string;
    label:      string;
    index?:     number;
    cell?:      any;
    hasFooter?: boolean;
}
