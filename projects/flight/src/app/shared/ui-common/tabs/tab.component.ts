import { Component, computed, inject, input } from "@angular/core";
import { TabbedPaneComponent } from "./tabbed-pane.component";

@Component({
  selector: 'app-tab',
  standalone: true,
  template: `
    @if(visible()) {
      <div class="tab">
        <h2>{{ title() }}</h2>
        <ng-content></ng-content>
      </div>
    }
  `
})
export class TabComponent {
  private readonly tabbedPane = inject(TabbedPaneComponent);

  protected readonly visible = computed(() => this.tabbedPane.currentTab() === this);
  readonly title = input('');
}
