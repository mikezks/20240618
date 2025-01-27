import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Flight } from '../../logic-flight';


@Component({
  selector: 'app-flight-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="card"
      [ngStyle]="{ 'background-color': selected ? 'rgb(204, 197, 185)' : 'white' }"
    >
      <div class="card-header">
        <h2 class="card-title">{{ item?.from }} - {{ item?.to }}</h2>
      </div>

      <div class="card-body">
        <p>Flight-No.: #{{ item?.id }}</p>
        <p>Date: {{ item?.date | date : "dd.MM.yyyy HH:mm" }}</p>
        <p>
          <button
            (click)="toggleSelection()"
            class="btn btn-info btn-sm"
            style="min-width: 85px; margin-right: 5px"
          >{{ selected ? "Remove" : "Select" }}</button>
          <a
            [routerLink]="['../edit', item?.id]"
            class="btn btn-success btn-sm"
            style="min-width: 85px; margin-right: 5px"
          >Edit</a>
          <button
            (click)="delay()"
            class="btn btn-danger btn-sm"
            style="min-width: 85px; margin-right: 5px"
          >Delay</button>
        </p>
      </div>
    </div>
  `
})
export class FlightCardComponent {
  @Input() item?: Flight;
  @Input() selected = false;
  @Output() selectedChange = new EventEmitter<boolean>();
  @Output() delayTrigger = new EventEmitter<Flight>();

  toggleSelection(): void {
    this.selected = !this.selected;
    this.selectedChange.emit(this.selected);
  }

  delay(): void {
    this.delayTrigger.emit(this.item);
  }
}
