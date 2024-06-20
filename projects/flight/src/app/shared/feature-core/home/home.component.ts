import { Component } from '@angular/core';
import { TabbedPaneComponent } from '../../ui-common/tabs/tabbed-pane.component';
import { TabComponent } from '../../ui-common/tabs/tab.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TabbedPaneComponent, TabComponent
  ],
  template: `
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Modern Angular</h2>
      </div>

      <div class="card-body">
        <ul>
          <li>Standalone APIs</li>
          <li>Signals</li>
          <li>Dependency Injection</li>
          <li>Router, HTTP Client, Forms</li>
          <li>Control Flow</li>
          <li>Performance</li>
          <li>... and much more!</li>
        </ul>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Modern Angular</h2>
      </div>

      <div class="card-body">

      <app-tabbed-pane [(current)]="current">
        <app-tab title="1st tab">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur aliquam at quam facilis ducimus maxime
          suscipit numquam quidem quis autem? Dicta consequuntur a, laudantium iusto unde praesentium inventore fugit
          quibusdam.
        </app-tab>
        <app-tab title="2nd tab">
          Sammas ergo gemma, ipsum dolor sit amet consectetur adipisicing elit. Consectetur aliquam at quam facilis ducimus
          maxime suscipit numquam quidem quis autem? Dicta consequuntur a, laudantium iusto unde praesentium inventore fugit
          quibusdam.
        </app-tab>
        <app-tab title="3nd tab">
          Gemma ham ipsum dolor sit amet consectetur adipisicing elit. Consectetur aliquam at quam facilis ducimus maxime
          suscipit numquam quidem quis autem? Dicta consequuntur a, laudantium iusto unde praesentium inventore fugit
          quibusdam.
        </app-tab>
      </app-tabbed-pane>

      </div>
    </div>
  `,
  styles: [`
    code {
      color: blue;
    }
  `]
})
export class HomeComponent {
  current = 0;
}
