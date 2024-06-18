import { Component, effect, input } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { routerFeature } from '../../../shared/logic-router-state';
import { Flight } from '../../logic-flight';
import { JsonPipe } from '@angular/common';


@Component({
    selector: 'app-flight-edit',
    templateUrl: './flight-edit.component.html',
    standalone: true,
    imports: [
      ReactiveFormsModule,
      JsonPipe
    ]
})
export class FlightEditComponent {
  flight = input.required<Flight>();

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

    effect(() => this.editForm.patchValue(this.flight()));
  }

  protected save(): void {
    console.log(this.editForm.value);
  }
}
