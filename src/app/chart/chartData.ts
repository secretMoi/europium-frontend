export class ChartData {
  value: number;
  label: string;
  valueToDisplay: string;

  constructor(value: number, label: string, valueToDisplay?: string) {
    this.value = value;
    this.label = label;

    this.valueToDisplay = valueToDisplay ? valueToDisplay : value.toString();
  }
}
