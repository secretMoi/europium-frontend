export class ChartData {
  value: number;
  label: string;
  valueToDisplay: string;

  constructor(value: number, label: string, valueToDisplay?: string) {
    this.value = value;
    this.label = label;

    if(valueToDisplay)
    {
      this.valueToDisplay = valueToDisplay;
    }
    else
    {
      this.valueToDisplay = value.toString();
    }
  }
}
