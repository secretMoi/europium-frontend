export class ChartData {
  value: number;
  label: string;
  valueToDisplay: string;

  constructor(value: number, label: string, valueToDisplay?: string) {
    this.value = Math.floor(value);
    this.label = label;

    this.valueToDisplay = valueToDisplay ? valueToDisplay : value.toString();
  }
}
