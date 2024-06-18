import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { routerFeature } from '../../../shared/logic-router-state';
import { initialFlight } from '../../logic-flight';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'app-flight-edit',
    templateUrl: './flight-edit.component.html',
    standalone: true,
    imports: [ReactiveFormsModule]
})
export class FlightEditComponent implements OnChanges {
  private route = inject(ActivatedRoute);

  @Input() flight = initialFlight;

  protected editForm = this.formBuilder.group({
    id: [0],
    from: [''],
    to: [''],
    date: [new Date().toISOString()],
    delayed: [false]
  });

  constructor(
    private store: Store,
    private formBuilder: NonNullableFormBuilder
  ) {
    this.store.select(routerFeature.selectRouteParams).subscribe(
      params => console.log(params)
    );

    /* this.route.data.subscribe(
      data => this.editForm.patchValue(data['flight'])
    ); */
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['flight'].previousValue !== changes['flight'].currentValue) {
      this.editForm.patchValue(this.flight);
    }
  }

  protected save(): void {
    console.log(this.editForm.value);
  }
}
